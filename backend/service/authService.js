import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.js';
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import Admin from '../models/adminModel.js';
import OTP from '../models/otpModel.js';
import { sendNotification } from '../config/emailConfig.js';
import { generateOTP } from '../utils/otpGenerator.js';
import { ApiError } from '../utils/errorHandler.js';

// Helper: Find user by email across all collections
const getUserByEmail = async (email) => {
  return (
    (await Patient.findOne({ email })) ||
    (await Doctor.findOne({ email })) ||
    (await Admin.findOne({ email }))
  );
};

// REGISTRATION SERVICES 
export const registerPatientService = async (patientData) => {
  const { email, password, ...rest } = patientData;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  if (await getUserByEmail(email)) {
    throw new ApiError(409, 'Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const patient = await Patient.create({ ...rest, email, password: hashedPassword });

  const patientResponse = patient.toObject();
  delete patientResponse.password;

  return {
    success: true,
    message: 'Patient registered successfully',
    data: patientResponse,
  };
};

export const registerDoctorService = async (doctorData, files) => {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    specialization,
    experience,
    qualifications,
    clinicDetails,
  } = doctorData;

  if (!files || files.length === 0) {
    throw new ApiError(400, 'Please upload required documents');
  }

  const documentUrls = files.map((file) => file.path);
  const existingDoctor = await Doctor.findOne({ email });

  if (existingDoctor) {
    throw new ApiError(400, 'Doctor already exists');
  }

  if (!password) {
    throw new ApiError(400, 'Password is required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const doctor = await Doctor.create({
    fullName,
    email,
    phoneNumber,
    password: hashedPassword,
    specialization,
    experience,
    qualifications,
    clinicDetails,
    documents: documentUrls,
    isVerified: false,
    isApproved: false,
    isProfileComplete: false,
  });

  return {
    success: true,
    message: 'Doctor registered (pending approval)',
    doctor: {
      id: doctor._id,
      fullName: doctor.fullName,
      email: doctor.email,
      specialization: doctor.specialization,
    },
  };
};

//LOGIN SERVICES 
export const loginUserService = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  let role = 'patient';
  if (user instanceof Doctor) role = 'doctor';
  if (user instanceof Admin) role = 'admin';

  return {
    accessToken,
    refreshToken,
    userData: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role,
    },
  };
};

// PASSWORD RESET SERVICES 
export const forgotPasswordService = async (email) => {
  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return { success: true, message: 'If email exists, OTP will be sent' };
  }

  await OTP.deleteMany({ email });

  const otpCode = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

  await OTP.create({ email, otpCode, expiresAt });

  const subject = 'Password Reset OTP';
  const text = `Your OTP: ${otpCode} (Valid for 10 minutes)`;
  await sendNotification(email, subject, text);

  return {
    success: true,
    message: 'OTP sent successfully',
    debugOtp: process.env.NODE_ENV === 'development' ? otpCode : undefined,
  };
};

export const verifyOTPService = async (email, otpCode) => {
  if (!email || !otpCode) {
    throw new ApiError(400, 'Email and OTP are required');
  }

  const normalizedEmail = email.toLowerCase().trim();
  const otpRecord = await OTP.findOne({
    email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') },
    otpCode,
  });

  if (!otpRecord) {
    throw new ApiError(400, 'Invalid OTP');
  }

  if (otpRecord.expiresAt < new Date()) {
    await OTP.deleteOne({ _id: otpRecord._id });
    throw new ApiError(400, 'OTP expired');
  }

  if (!process.env.JWT_RESET_SECRET) {
    throw new ApiError(500, 'Server configuration error');
  }

  const resetToken = jwt.sign(
    { email: normalizedEmail, otpId: otpRecord._id },
    process.env.JWT_RESET_SECRET,
    { expiresIn: '15m' }
  );

  return {
    success: true,
    message: 'OTP verified',
    resetToken,
    email: normalizedEmail,
  };
};

export const resetPasswordService = async (resetToken, newPassword) => {
  if (!resetToken || !newPassword) {
    throw new ApiError(400, 'Token and new password required');
  }

  const decoded = jwt.verify(resetToken, process.env.JWT_RESET_SECRET);
  const { email, otpId } = decoded;

  const otpRecord = await OTP.findById(otpId);
  if (!otpRecord) {
    throw new ApiError(400, 'Invalid token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password in all possible collections
  const updateResults = await Promise.all([
    Patient.findOneAndUpdate({ email }, { password: hashedPassword }),
    Doctor.findOneAndUpdate({ email }, { password: hashedPassword }),
    Admin.findOneAndUpdate({ email }, { password: hashedPassword }),
  ]);

  const updatedUser = updateResults.find((result) => result !== null);
  if (!updatedUser) {
    throw new ApiError(404, 'User not found');
  }

  await OTP.deleteOne({ _id: otpId });

  return {
    success: true,
    message: 'Password reset successful',
  };
};

// TOKEN SERVICES 
export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token required');
  }

  const decoded = verifyRefreshToken(refreshToken);
  const user = await getUserByEmail(decoded.email);

  if (!user) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const newAccessToken = generateAccessToken(user);
  return { accessToken: newAccessToken };
};



//LOGOUT SERVICE 
export const logoutUserService = () => {
  return { success: true, message: 'Logged out successfully' };
};