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

// import { verifyToken } from '../utils/jwt.js';

import { generateAccessToken, verifyToken } from '../utils/jwt.js';
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import Admin from '../models/adminModel.js';

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
  res.cookie('accessToken', accessToken, {
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
  console.log("Cookies set: accessToken, refreshToken");


res.status(200).json({
  success: true,
  message: 'Login successful',
  // data: userData,
  data: {
    token: accessToken,
    user: {
      _id: userData._id,
      fullName: userData.fullName,
      email: userData.email,
      role: userData.role
    }
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
// export const refreshToken = asyncHandler(async (req, res) => {
//   const { refreshToken } = req.cookies;
//   const { accessToken } = await refreshTokenService(refreshToken);

//   res.cookie('accessToken', accessToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     maxAge: 15 * 60 * 1000, // 15 minutes
//   });

//   res.status(200).json({
//     success: true,
//     message: 'Token refreshed',
//     token: accessToken,
//   });
// });

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    const decoded = verifyToken(refreshToken);

    let user;
    switch (decoded.role) {
      case 'patient':
        user = await Patient.findById(decoded.id);
        break;
      case 'doctor':
        user = await Doctor.findById(decoded.id);
        break;
      case 'admin':
        user = await Admin.findById(decoded.id);
        break;
      default:
        return res.status(403).json({ message: 'Invalid user role' });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const newAccessToken = generateAccessToken({ id: user._id, role: user.role });

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.log("Refresh token error:", err);
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
});


export const getCurrentUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.accessToken;
  console.log("Access Token from cookie:", token);
  if (!token) {
    throw new ApiError(401, 'Not authenticated - token missing');
  }

  let decoded;
  try {
    // decoded = jwt.verify(token, process.env.JWT_SECRET);
   decoded = verifyToken(token);
   console.log("decode data fron the current user............'''''",decoded)
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
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  const result = logoutUserService();
  res.status(200).json(result);
});


