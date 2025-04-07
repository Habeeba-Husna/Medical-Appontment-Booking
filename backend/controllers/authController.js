import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import Admin from '../models/adminModel.js';
import OTP from '../models/otpModel.js';
import { sendNotification } from '../config/emailConfig.js';
import dotenv from 'dotenv';
dotenv.config();

// Generate Access Token

const generateAccessToken = (user) => {
  const role = user instanceof Admin ? 'admin' : user instanceof Patient ? 'patient' : 'doctor';
  return jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

// Generate Refresh Token

const generateRefreshToken = (user) => {
  const role = user instanceof Admin ? 'admin' : user instanceof Patient ? 'patient' : 'doctor';
  return jwt.sign({ id: user._id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Register Patient

export const registerPatient = async (req, res) => {
  // console.log("in controller parti.................")
  // console.log(req.body,"req body........")
  const { fullName, email, phoneNumber, password, age, gender, medicalHistory } = req.body;
  // console.log(fullName,email,phoneNumber,password,age,gender,medicalHistory)
  try {
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) return res.status(400).json({ message: 'Patient already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = await Patient.create({
      fullName, email, phoneNumber, password: hashedPassword, age, gender, medicalHistory
    });

    res.status(201).json({ message: 'Patient registered successfully',
      Patient: {
        id: Patient._id,
        fullName: Patient.fullName,
        email: Patient.email,
        specialization: Patient.age,
        isVerified: Patient.gender,
        isApproved: Patient.medicalHistory
      }
     });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const registerDoctor = async (req, res) => {
  // console.log("Doctor Registration Started...");

  const { fullName, email, phoneNumber, password, specialization, experience, qualifications, clinicDetails } = req.body;

  let documentUrls = [];
  // console.log(req.files,"files...........")
  if (req.files && req.files.length > 0) {
    // console.log("Files Received:", req.files);
    documentUrls = req.files.map(file => file.path);
  } else {
    return res.status(400).json({
      success: false,
      message: 'Document upload failed. Please include valid documents.',
    });
  }
// console.log(documentUrls,"documentUrls.................")
  try {
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
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

    res.status(201).json({ message: 'Doctor registered successfully, pending admin approval',
      doctor: {
        id: doctor._id,
        fullName: doctor.fullName,
        email: doctor.email,
        specialization: doctor.specialization,
        isVerified: doctor.isVerified,
        isApproved: doctor.isApproved,
        isProfileComplete: doctor.isProfileComplete,
      }
     });
  } catch (error) {
    console.error("Error Registering Doctor:", error);
    res.status(500).json({ message: error.message });
  }
};


// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    const admin = await Admin.findOne({ email });

    let user = patient || doctor || admin;
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    const role = patient ? 'Patient' : doctor ? 'Doctor' : 'Admin';
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Return user's fullName along with tokens
    res.status(200).json({ 
      accessToken, 
      refreshToken, 
      role, 
      fullName: user.fullName ,
      id: user._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Refresh Token
export const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const refreshedUser = await Patient.findById(user.id) || await Doctor.findById(user.id) || await Admin.findById(user.id);
    if (!refreshedUser) return res.status(404).json({ message: 'User not found' });

    const newAccessToken = generateAccessToken(refreshedUser);
    res.status(200).json({ accessToken: newAccessToken });
  });
};


// Generate OTP Function
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Forgot Password - Send OTP
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const patient = await Patient.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    const admin = await Admin.findOne({ email });

    // console.log("Patient:", patient);
    // console.log("Doctor:", doctor);
    // console.log("Admin:", admin);

    const user = patient || doctor || admin;
    if (!user) return res.status(404).json({ message: 'User not found' });

    await OTP.deleteMany({ email }); // Remove existing OTP 

    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    await OTP.create({ email, otpCode, expiresAt }); // Save OTP to the database
    const subject = 'Password Reset OTP'; // Send OTP via email
    const text = `<p>Your OTP for password reset is: <strong>${otpCode}</strong>. It is valid for 10 minutes.</p>`;

    await sendNotification(email, subject, text);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP and Reset Password
export const resetPassword = async (req, res) => {
  const { email, otpCode, newPassword } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email, otpCode });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    await OTP.deleteOne({ email, otpCode });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const patient = await Patient.findOneAndUpdate({ email }, { password: hashedPassword });
    const doctor = await Doctor.findOneAndUpdate({ email }, { password: hashedPassword });
    const admin = await Admin.findOneAndUpdate({ email }, { password: hashedPassword });

    if (!patient && !doctor && !admin) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Login

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // console.log("Provided Email:", email);

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

if (!isPasswordValid) {
  return res.status(401).json({ message:"Invalid password" });
}

const accessToken = generateAccessToken(admin);
const refreshToken = generateRefreshToken(admin);

return res.status(200).json({ accessToken, refreshToken, role: 'admin', message: "Admin login successful" });
} catch (error) {
console.error('Admin login error:', error.message);
return res.status(500).json({ message: "Internal server error" });
}
};
