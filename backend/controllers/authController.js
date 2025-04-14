import asyncHandler from '../utils/asyncHandler.js';
import {
  registerPatientService,
  registerDoctorService,
  loginUserService,
  forgotPasswordService,
  verifyOTPService,
  resetPasswordService,
  refreshTokenService,
  logoutUserService,
} from '../service/authService.js';
import getUserById from '../utils/getUserById.js';
import { ApiError } from '../utils/errorHandler.js';

//REGISTRATION CONTROLLERS 
export const registerPatient = asyncHandler(async (req, res) => {
  const result = await registerPatientService(req.body);
  res.status(201).json(result);
});

export const registerDoctor = asyncHandler(async (req, res) => {
  const result = await registerDoctorService(req.body, req.files);
  res.status(201).json(result);
});

// LOGIN CONTROLLER
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken, userData } = await loginUserService(email, password);

  // Set HTTP-only cookies
  res.cookie('token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    // data: userData,
    data: {
      token: accessToken,
      user: userData,
    },
  });
});

//PASSWORD RESET CONTROLLERS
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await forgotPasswordService(email);
  res.status(200).json(result);
});

export const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otpCode } = req.body;
  const result = await verifyOTPService(email, otpCode);
  res.status(200).json(result);
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword } = req.body;
  const result = await resetPasswordService(resetToken, newPassword);
  res.status(200).json(result);
});

// TOKEN CONTROLLER 
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const { accessToken } = await refreshTokenService(refreshToken);

  res.cookie('token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.status(200).json({
    success: true,
    message: 'Token refreshed',
    accessToken,
  });
});


export const getCurrentUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new ApiError(401, 'Not authenticated');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, 'Invalid or expired token');
  }

  const user = await getUserById(decoded.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json({
    success: true,
    user,
  });
});


// LOGOUT CONTROLLER 
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  const result = logoutUserService();
  res.status(200).json(result);
});




// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import {
//   generateAccessToken,
//   generateRefreshToken,
//   verifyRefreshToken
// } from '../utils/jwt.js';
// import Patient from '../models/patientModel.js';
// import Doctor from '../models/doctorModel.js';
// import Admin from '../models/adminModel.js';
// import OTP from '../models/otpModel.js';
// import { sendNotification } from '../config/emailConfig.js';
// import { generateOTP } from '../utils/otpGenerator.js';

// // Helper function
// const getUserByEmail = async (email) => {
//   return await Patient.findOne({ email }) || 
//          await Doctor.findOne({ email }) || 
//          await Admin.findOne({ email });
// };

// // Registration
// export const registerPatient = async (req, res) => {
//   try {
//     const { email, password, ...patientData } = req.body;
    
//     // Validate required fields
//     if (!email || !password) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Email and password are required' 
//       });
//     }

//     if (await getUserByEmail(email)) {
//       return res.status(409).json({ 
//         success: false,
//         message: 'Email already registered' 
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const patient = await Patient.create({
//       ...patientData,
//       email,
//       password: hashedPassword
//     });

//     // Remove password from response
//     const patientResponse = patient.toJSON();
//     delete patientResponse.password;

//     res.status(201).json({
//       success: true,
//       message: 'Patient registration successful',
//       data: patientResponse
//     });
//   } catch (error) {
//     console.error('Patient registration error:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Registration failed. Please try again.',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// //Register Doctor
// export const registerDoctor = async (req, res) => {
//   const {
//     fullName, email, phoneNumber, password,
//     specialization, experience, qualifications, clinicDetails
//   } = req.body;

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

// // Login
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // const user = await getUserByEmail(email);

//     const user =
//       await Patient.findOne({ email }) ||
//       await Doctor.findOne({ email }) ||
//       await Admin.findOne({ email });
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     res.cookie('token', accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 15 * 60 * 1000 // 15 minutes
//     });

//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//     });

//     let role = 'patient';
//     if (user instanceof Doctor) role = 'doctor';
//     if (user instanceof Admin) role = 'admin';


//     res.status(200).json({
//       message: 'Login successful',
//       role: user.role,
//       user: {
//         _id: user._id,
//         fullName: user.fullName,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Forgot Password - Send OTP
// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
  
//   try {
//       // Input validation
//       if (!email) {
//         return res.status(400).json({ message: 'Email is required' });
//       }

//     const user = await Patient.findOne({ email }) || await Doctor.findOne({ email }) || await Admin.findOne({ email });
//     if (!user) {
//       // For security, don't reveal if email doesn't exist
//       return res.status(200).json({ message: 'If this email exists, you will receive an OTP' });
//     }
   
//     // Delete existing OTPs
//     await OTP.deleteMany({ email });

//     // Generate new OTP
//     const otpCode = generateOTP();
//     const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    
// // Save OTP to database
// const otpRecord = await OTP.create({ 
//   email, 
//   otpCode, 
//   expiresAt 
// });

// console.log('Saved OTP record:', {
//   _id: otpRecord._id,
//   email: otpRecord.email,
//   otpCode: otpRecord.otpCode,
//   expiresAt: otpRecord.expiresAt
// });

//  // Send email
//  const subject = 'Password Reset OTP';
//  const text = `Your OTP is: ${otpCode}. Valid for 10 minutes.`;
// //  const text = `<p>Your OTP for password reset is: <strong>${otpCode}</strong>. It is valid for 10 minutes.</p>`;
 
//  await sendNotification(email, subject, text);

//  res.status(200).json({ 
//   message: 'OTP sent successfully',
//   // In development, return OTP for testing
//   ...(process.env.NODE_ENV === 'development' && { debugOtp: otpCode })
// });

// } catch (error) {
// console.error('Forgot password error:', error);
// res.status(500).json({ message: 'Failed to process request' });
// }
// };

//   export const verifyOTP = async (req, res) => {
//     const { email, otpCode } = req.body;

//     console.log('Starting OTP verification for:', email);
//     console.log('Received OTP code:', otpCode);
  
//     try {
//       // Validate input
//       if (!email || !otpCode) {
//         console.log('Missing email or OTP code');
//         return res.status(400).json({ 
//           success: false,
//           message: 'Email and OTP code are required' 
//         });
//       }
  
//     // Normalize email to lowercase
//     const normalizedEmail = email.toLowerCase().trim();

//       console.log('Searching for OTP in database...');
//     const otpRecord = await OTP.findOne({ 
//       email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') },
//       otpCode 
//     });

//     console.log('Found OTP record:', otpRecord ? 'Exists' : 'Not found');

//       if (!otpRecord) {
//       console.log('No matching OTP found for:', normalizedEmail);
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid OTP code',
//         debug: { received: { email, otpCode } }
//       });
//     }

//     // Check expiration
//     const now = new Date();
//     console.log('Current time:', now);
//     console.log('OTP expires at:', otpRecord.expiresAt);
    
//     if (otpRecord.expiresAt < now) {
//       console.log('OTP has expired');
//       await OTP.deleteOne({ _id: otpRecord._id });
//       return res.status(400).json({ 
//         success: false,
//         message: 'OTP has expired' 
//       });
//     }
     
//     // Generate reset token
//     console.log('Generating reset token...');

//     if (!process.env.JWT_RESET_SECRET) {
//       throw new Error('JWT_RESET_SECRET is not configured');
//     }

//     const resetToken = jwt.sign(
//       { 
//         email: normalizedEmail, 
//         otpId: otpRecord._id 
//       },
//       process.env.JWT_RESET_SECRET,
//       { expiresIn: '15m' }
//     );

//     console.log('OTP verification successful');
//     return res.status(200).json({ 
//       success: true,
//       message: 'OTP verified successfully',
//       resetToken,
//       email: normalizedEmail
//     });

//   } catch (error) {
//     console.error('OTP verification error:', error);
//     return res.status(500).json({ 
//       success: false,
//       message: 'Failed to verify OTP',
//       error: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// };

// //  Reset Password
// export const resetPassword = async (req, res) => {
//   const { resetToken, newPassword } = req.body;

//   try {
//     // Validate token and get email
//     const decoded = jwt.verify(resetToken, process.env.JWT_RESET_SECRET);
//     const { email, otpId } = decoded;

//     // Verify OTP still exists (extra security check)
//     const otpRecord = await OTP.findById(otpId);
//     if (!otpRecord) {
//       return res.status(400).json({ message: 'Invalid reset token' });
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update password in all possible collections
//     const updatePromises = [
//       Patient.findOneAndUpdate({ email }, { password: hashedPassword }),
//       Doctor.findOneAndUpdate({ email }, { password: hashedPassword }),
//       Admin.findOneAndUpdate({ email }, { password: hashedPassword })
//     ];

//     const results = await Promise.all(updatePromises);
//     const updatedUser = results.find(result => result !== null);

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Clean up - delete used OTP
//     await OTP.deleteOne({ _id: otpId });

//     res.status(200).json({ message: 'Password reset successfully' });

//   } catch (error) {
//     console.error('Password reset error:', error);
    
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Reset token has expired' });
//     }
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(400).json({ message: 'Invalid reset token' });
//     }
    
//     res.status(500).json({ message: 'Failed to reset password' });
//   }
// };

// // Token Refresh
// export const refreshToken = async (req, res) => {
//   console.log("refresh token,,,")
//   try {
//     const { refreshToken } = req.cookies;
    
//     if (!refreshToken) {
//       return res.status(401).json({ message: 'Refresh token required' });
//     }
// console.log("refresh token,,,,",refreshToken)
//     const decoded = verifyRefreshToken(refreshToken);
//     console.log("user informatim,",decoded)
//     const user = await getUserByEmail(decoded.email);
    
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid refresh token' });
//     }
//     console.log(user,"userdata.....")
//     const newAccessToken = generateAccessToken(user);
    
//     res.cookie('token', newAccessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 15 * 60 * 1000
//     });

//     res.json({ accessToken: newAccessToken });
//   } catch (error) {
//     res.status(403).json({ message: 'Invalid refresh token' });
//   }
// };

// // Logout
// export const logoutUser = (req, res) => {
//   res.clearCookie('token');
//   res.clearCookie('refreshToken');
//   res.status(200).json({ message: 'Logout successful' });
// };


