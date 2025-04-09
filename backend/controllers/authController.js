// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// // import { generateAccessToken, generateRefreshToken,getUserRole } from '../utils/jwt.js';



// import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

// import Patient from '../models/patientModel.js';
// import Doctor from '../models/doctorModel.js';
// import Admin from '../models/adminModel.js';
// import OTP from '../models/otpModel.js';
// import { sendNotification } from '../config/emailConfig.js';
// import dotenv from 'dotenv';

// dotenv.config();

// // Register Patient

// export const registerPatient = async (req, res) => {
//   const { fullName, email, phoneNumber, password, age, gender, medicalHistory } = req.body;
//   try {
//     const existingPatient = await Patient.findOne({ email });
//     if (existingPatient) return res.status(400).json({ message: 'Patient already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const patient = await Patient.create({
//       fullName,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       age,
//       gender,
//       medicalHistory
//     });

//     res.status(201).json({
//       message: 'Patient registered successfully',
//       patient: {
//         id: patient._id,
//         fullName: patient.fullName,
//         email: patient.email,
//         phoneNumber: patient.phoneNumber,
//         age: patient.age,
//         gender: patient.gender,
//         medicalHistory: patient.medicalHistory
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Register Doctor
// // export const registerDoctor = async (req, res) => {
// //   const { fullName, email, phoneNumber, password, specialization, experience, qualifications, clinicDetails } = req.body;

// //   let documentUrls = [];
// //   if (req.files && req.files.length > 0) {
// //     documentUrls = req.files.map(file => file.path);
// //   } else {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Document upload failed. Please include valid documents.',
// //     });
// //   }

// //   try {
// //     const existingDoctor = await Doctor.findOne({ email });
// //     if (existingDoctor) {
// //       return res.status(400).json({ message: 'Doctor already exists' });
// //     }

// //     if (!password) {
// //       return res.status(400).json({ message: 'Password is required' });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);


// //     const doctor = await Doctor.create({
// //       fullName,
// //       email,
// //       phoneNumber,
// //       password: hashedPassword,
// //       specialization,
// //       experience,
// //       qualifications,
// //       clinicDetails,
// //       documents: documentUrls,
// //       isVerified: false,
// //       isApproved: false,
// //       isProfileComplete: false,
// //     });

// //     res.status(201).json({ message: 'Doctor registered successfully, pending admin approval',
// //       doctor: {
// //         id: doctor._id,
// //         fullName: doctor.fullName,
// //         email: doctor.email,
// //         specialization: doctor.specialization,
// //         isVerified: doctor.isVerified,
// //         isApproved: doctor.isApproved,
// //         isProfileComplete: doctor.isProfileComplete,
// //       }
// //      });
// //   } catch (error) {
// //     console.error("Error Registering Doctor:", error);
// //     res.status(500).json({ message: error.message });
// //   }
// // };


// // Register Doctor
// export const registerDoctor = async (req, res) => {
//   const { fullName, email, phoneNumber, password, specialization, experience, qualifications, clinicDetails } = req.body;

//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Document upload failed. Please include valid documents.',
//       });
//     }

//     const documentUrls = req.files.map(file => file.path); // Cloudinary URLs

//     const existingDoctor = await Doctor.findOne({ email });
//     if (existingDoctor) return res.status(400).json({ message: 'Doctor already exists' });

//     if (!password) return res.status(400).json({ message: 'Password is required' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const doctor = await Doctor.create({
//       fullName,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       specialization,
//       experience,
//       qualifications,
//       clinicDetails,
//       documents: documentUrls,
//       isVerified: false,
//       isApproved: false,
//       isProfileComplete: false,
//     });

//     res.status(201).json({
//       message: 'Doctor registered successfully, pending admin approval',
//       doctor: {
//         id: doctor._id,
//         fullName: doctor.fullName,
//         email: doctor.email,
//         specialization: doctor.specialization,
//         isVerified: doctor.isVerified,
//         isApproved: doctor.isApproved,
//         isProfileComplete: doctor.isProfileComplete,
//       }
//     });
//   } catch (error) {
//     console.error("Error Registering Doctor:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login(Patient, Doctor, Admin)
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const patient = await Patient.findOne({ email });
//     const doctor = await Doctor.findOne({ email });
//     const admin = await Admin.findOne({ email });

//     let user = patient || doctor || admin;
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

//     // const role = patient ? 'Patient' : doctor ? 'Doctor' : 'Admin';
//     const role = getUserRole(user);


//     const accessToken = generateAccessToken(user);
//     console.log("Setting access token:", accessToken);
//     const refreshToken = generateRefreshToken(user);
//     console.log("Setting refreshToken token:", refreshToken);

//     // Store tokens in cookies
//     res.cookie('token', accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
//       // sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
//       sameSite: 'lax',
//       maxAge: 15 * 60 * 1000, // Access token expires in 15 minutes
//       path: '/',
//     });

//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       // sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
//       sameSite: 'lax',
//       maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token expires in 7 days
//       path: '/',
//     });


//     // Return user's fullName along with tokens in cookies (cookies will be sent automatically with every subsequent request)
//     res.status(200).json({
//       message: 'Login successful',
//       role,
//       accessToken,
//       refreshToken, 
//     user: {
//       _id: user._id,
//       fullName: user.fullName,
//       email: user.email
//     }
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Admin Login
// // export const adminLogin = async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const admin = await Admin.findOne({ email });

// //     if (!admin) {
// //       return res.status(404).json({ message: "Admin not found" });
// //     }

// //     const isPasswordValid = await bcrypt.compare(password, admin.password);
// //     if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

// //     const accessToken = generateAccessToken(admin);
// //     const refreshToken = generateRefreshToken(admin);

// //     // Store tokens in cookies
// //     res.cookie('token', accessToken, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       // sameSite: 'Strict',
// //       sameSite: 'lax',
// //       maxAge: 15 * 60 * 1000, // Access token expires in 15 minutes
// //       path:'/',
// //     });

// //     res.cookie('refreshToken', refreshToken, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       // sameSite: 'Strict',
// //       sameSite: 'lax',
// //       path:'/',
// //       maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token expires in 7 days
// //     });

// //     return res.status(200).json({
// //       message: 'Admin login successful',
// //       role: 'admin',
// //       accessToken,  
// //      user: {
// //     _id: admin._id,
// //     fullName: admin.fullName,
// //     email: admin.email,
// //   }
// //     });
// //   } catch (error) {
// //     console.error('Admin login error:', error.message);
// //     return res.status(500).json({ message: "Internal server error" });
// //   }
// // };

// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     const isPasswordValid = await bcrypt.compare(password, admin.password);
//     if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

//     const accessToken = generateAccessToken(admin);
//     const refreshToken = generateRefreshToken(admin);

//     res.cookie('token', accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 15 * 60 * 1000, // 15 mins
//       path: '/',
//     });

//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       path: '/',
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     res.status(200).json({
//       message: 'Admin login successful',
//       role: 'admin',
//       accessToken,
//       user: {
//         _id: admin._id,
//         fullName: admin.fullName,
//         email: admin.email,
//       }
//     });

//   } catch (error) {
//     console.error('Admin login error:', error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Refresh Token
// // export const refreshToken = async (req, res) => {
// //   console.log("Request headers:", req.headers);
// // console.log("Request cookies:", req.cookies); 

// //   const token = req.cookies.refreshToken;

// //   if (!token) return res.status(401).json({ message: 'Access Denied' });

// //   jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, user) => {
// //     if (err) return res.status(403).json({ message: 'Invalid refresh token' });

// //     const refreshedUser = await Patient.findById(user.id) || await Doctor.findById(user.id) || await Admin.findById(user.id);
// //     if (!refreshedUser) return res.status(404).json({ message: 'User not found' });

// //     const newAccessToken = generateAccessToken(refreshedUser);
// //     res.status(200).json({ accessToken: newAccessToken });
// //   });
// // };


// // authController.js
// export const refreshToken = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;
    
//     if (!refreshToken) {
//       return res.status(401).json({ message: 'Refresh token required' });
//     }

//     const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//     const user = await User.findById(decoded.id);
    
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid refresh token' });
//     }

//     const accessToken = generateAccessToken(user);
    
//     res.cookie('token', accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 15 * 60 * 1000 // 15 minutes
//     });

//     res.json({ accessToken });
//   } catch (error) {
//     res.status(403).json({ message: 'Invalid refresh token' });
//   }
// };
// // Generate OTP Function
// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// // Forgot Password - Send OTP
// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
  
//   try {

//     const user = await Patient.findOne({ email }) || await Doctor.findOne({ email }) || await Admin.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     await OTP.deleteMany({ email }); // Remove existing OTP 

//     const otpCode = generateOTP();
//     const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

//     await OTP.create({ email, otpCode, expiresAt }); // Save OTP to the database

//     const subject = 'Password Reset OTP'; // Send OTP via email
//     const text = `<p>Your OTP for password reset is: <strong>${otpCode}</strong>. It is valid for 10 minutes.</p>`;

//     await sendNotification(email, subject, text);

//     res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Verify OTP and Reset Password
// export const resetPassword = async (req, res) => {
//   const { email, otpCode, newPassword } = req.body;

//   try {
//     const otpRecord = await OTP.findOne({ email, otpCode });

//     if (!otpRecord || otpRecord.expiresAt < new Date()) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     await OTP.deleteOne({ email, otpCode });

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

// const updatedUser =
//       await Patient.findOneAndUpdate({ email }, { password: hashedPassword }) ||
//       await Doctor.findOneAndUpdate({ email }, { password: hashedPassword }) ||
//       await Admin.findOneAndUpdate({ email }, { password: hashedPassword });

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found to reset password' });
//     }

//     res.status(200).json({ message: 'Password reset successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // Generate Access Token

// // const generateAccessToken = (user) => {
// //   const role = user instanceof Admin ? 'admin' : user instanceof Patient ? 'patient' : 'doctor';
// //   return jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '15m' });
// // };

// // // Generate Refresh Token

// // const generateRefreshToken = (user) => {
// //   const role = user instanceof Admin ? 'admin' : user instanceof Patient ? 'patient' : 'doctor';
// //   return jwt.sign({ id: user._id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
// // };

// // // Login
// // export const loginUser = async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     const patient = await Patient.findOne({ email });
// //     const doctor = await Doctor.findOne({ email });
// //     const admin = await Admin.findOne({ email });

// //     let user = patient || doctor || admin;
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     const isPasswordValid = await bcrypt.compare(password, user.password);
// //     if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

// //     const role = patient ? 'Patient' : doctor ? 'Doctor' : 'Admin';
// //     const accessToken = generateAccessToken(user);
// //     const refreshToken = generateRefreshToken(user);

// //     // Return user's fullName along with tokens
// //     res.status(200).json({ 
// //       accessToken, 
// //       refreshToken, 
// //       role, 
// //       fullName: user.fullName ,
// //       id: user._id
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // Admin Login

// // export const adminLogin = async (req, res) => {
// //   const { email, password } = req.body;

// //   // console.log("Provided Email:", email);

// //   try {
// //     const admin = await Admin.findOne({ email });

// //     if (!admin) {
// //       return res.status(404).json({ message: "Admin not found" });
// //     }

// //     const isPasswordValid = await bcrypt.compare(password, admin.password);

// // if (!isPasswordValid) {
// //   return res.status(401).json({ message:"Invalid password" });
// // }

// // const accessToken = generateAccessToken(admin);
// // const refreshToken = generateRefreshToken(admin);

// // return res.status(200).json({ accessToken, refreshToken, role: 'admin', message: "Admin login successful" });
// // } catch (error) {
// // console.error('Admin login error:', error.message);
// // return res.status(500).json({ message: "Internal server error" });
// // }
// // };

























import bcrypt from 'bcryptjs';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from '../utils/jwt.js';
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import Admin from '../models/adminModel.js';
import OTP from '../models/otpModel.js';
import { sendNotification } from '../config/emailConfig.js';

// Helper function
const getUserByEmail = async (email) => {
  return await Patient.findOne({ email }) || 
         await Doctor.findOne({ email }) || 
         await Admin.findOne({ email });
};

// Registration
export const registerPatient = async (req, res) => {
  try {
    const { email, password, ...patientData } = req.body;
    
    if (await getUserByEmail(email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = await Patient.create({
      ...patientData,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'Registration successful',
      user: patient.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      message: 'Login successful',
      role: user.role,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Token Refresh
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await getUserByEmail(decoded.email);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user);
    
    res.cookie('token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

// Logout
export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logout successful' });
};