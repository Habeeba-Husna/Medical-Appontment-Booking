import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import Admin from '../models/adminModel.js';
import OTP from '../models/otpModel.js';
import { sendEmail } from '../config/emailConfig.js';



// Generate Access Token
const generateAccessToken = (user) => {
  const role = user instanceof Patient ? 'Patient' : user instanceof Doctor ? 'Doctor' : 'Admin';
  return jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
  const role = user instanceof Patient ? 'Patient' : user instanceof Doctor ? 'Doctor' : 'Admin';
  return jwt.sign({ id: user._id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Register Patient
export const registerPatient = async (req, res) => {
  const { fullName, email, phoneNumber, password, age, gender, medicalHistory } = req.body;
  try {
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) return res.status(400).json({ message: 'Patient already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = await Patient.create({
      fullName, email, phoneNumber, password: hashedPassword, age, gender, medicalHistory
    });

    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register Doctor
export const registerDoctor = async (req, res) => {
  const { fullName, email, phoneNumber, password, specialization, experience, qualifications, clinicDetails, documents } = req.body;
  try {
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) return res.status(400).json({ message: 'Doctor already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await Doctor.create({
      fullName, email, phoneNumber, password: hashedPassword, specialization, experience, qualifications, clinicDetails, documents
    });

    res.status(201).json({ message: 'Doctor registered successfully, pending admin approval' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// // Generate Access Token
// const generateAccessToken = (user) => {
//   return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
// };

// // Generate Refresh Token
// const generateRefreshToken = (user) => {
//   return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
// };



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

    // const role = patient ? 'Patient' : doctor ? 'Doctor' : 'Admin';
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({ accessToken, refreshToken, role: patient ? 'Patient' : doctor ? 'Doctor' : 'Admin' });
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

    const user = patient || doctor;
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

    // Save OTP to the database
    await OTP.create({ email, otpCode, expiresAt });

    // Send OTP via email
    const subject = 'Password Reset OTP';
    const text = `Your OTP for password reset is: ${otpCode}. It is valid for 10 minutes.`;

    await sendEmail(email, subject, text);

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

    if (!patient && !doctor) {
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
  
  try {
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);

    res.status(200).json({ accessToken, refreshToken, role: 'Admin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Forgot Password - Send OTP
export const adminForgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    await OTP.create({ email, otpCode, expiresAt });

    const subject = 'Admin Password Reset OTP';
    const text = `Your OTP for password reset is: ${otpCode}. It is valid for 10 minutes.`;

    await sendEmail(email, subject, text);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Reset Password using OTP
export const adminResetPassword = async (req, res) => {
  const { email, otpCode, newPassword } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email, otpCode });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    await OTP.deleteOne({ email, otpCode });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const admin = await Admin.findOneAndUpdate({ email }, { password: hashedPassword });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
