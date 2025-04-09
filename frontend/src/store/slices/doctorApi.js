// // doctorApi.js
// import axios from 'axios';

// export const fetchDoctorsApi = async (setLoading, setDoctors, setError) => {
//   try {
//     setLoading(true);  // Set loading state to true before making the request
//     const response = await axios.get('/api/doctors');
//     setDoctors(response.data);  // Set the doctors data in the state
//     setLoading(false);  // Set loading state to false once data is fetched
//   } catch (error) {
//     setLoading(false);  // Set loading state to false in case of an error
//     setError(error.response?.data.message || 'Failed to fetch doctors');  // Set error message in the state
//   }
// };

// // doctorApi.js
// export const fetchDoctorByIdApi = async (doctorId, setLoading, setDoctor, setError) => {
//     try {
//       setLoading(true);  // Set loading state to true
//       const response = await axios.get(`/api/doctors/${doctorId}`);
//       setDoctor(response.data);  // Set doctor details in the state
//       setLoading(false);  // Set loading state to false once data is fetched
//     } catch (error) {
//       setLoading(false);  // Set loading state to false in case of an error
//       setError(error.response?.data.message || 'Failed to fetch doctor details');  // Set error message in the state
//     }
//   };

//   // doctorApi.js
// export const refreshTokenApi = async (setLoading, setError) => {
//     try {
//       setLoading(true);  // Set loading state to true before making the request
//       const response = await axios.post('/api/auth/refresh-token');
//       localStorage.setItem('token', response.data.token);  // Save the new token in localStorage
//       axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;  // Set new token in the request headers globally
//       setLoading(false);  // Set loading state to false after successful token refresh
//     } catch (error) {
//       setLoading(false);  // Set loading state to false if there is an error
//       setError(error.response?.data.message || 'Failed to refresh token');  // Set error message in the state
//     }
//   };

//   // doctorApi.js
// // export const fetchDoctorsApi = async (setLoading, setDoctors, setError) => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.get('/api/doctors');
// //       setDoctors(response.data);
// //       setLoading(false);
// //     } catch (error) {
// //       setLoading(false);
// //       if (error.response?.status === 401) {
// //         // Token expired, try refreshing the token
// //         await refreshTokenApi(setLoading, setError);
// //         // Retry the API call after refreshing the token
// //         return fetchDoctorsApi(setLoading, setDoctors, setError);
// //       }
// //       setError(error.response?.data.message || 'Failed to fetch doctors');
// //     }
// //   };
  







// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../api/axiosInstance';
// import { ENDPOINTS } from '../../api/endPoints';
// import Cookies from 'js-cookie';

// // 🔁 Thunks

// // Fetch all doctors
// export const fetchDoctors = createAsyncThunk(
//   'doctors/fetchDoctors',
//   async (_, thunkAPI) => {
//     try {
//       console.log("Fetching doctors...");

//       // Check all available cookies for debugging
//       console.log("All cookies:", document.cookie);

//       // Retrieve the access token from cookies
//       const token = Cookies.get('token');
//       console.log("Token retrieved", token);
      
//       // Check if the token exists
//       if (!token) {
//         console.error("No token found in cookies. Available cookies:", document.cookie);
//         return thunkAPI.rejectWithValue('Authentication required');
//       }

//       console.log("Token before API call:", token);
      
//       // API call to fetch doctors with token in header
//       // const response = await axiosInstance.get(ENDPOINTS.FETCH_DOCTORS, {
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //   },
//       // });
//       // const response = await axiosInstance.get('/patient/doctors');
//       const response = await axiosInstance.get(ENDPOINTS.PATIENT.DOCTORS);
//       return response.data;  // Return the fetched data
//     } catch (error) {
//       // console.error("Detailed error:", {
//       //   message: error.message,
//       //   response: error.response,
//       //   stack: error.stack
//       // });
//       console.error("Detailed error:", error);

//       if (error.response?.status === 401) {
//         try {
//           const refreshed = await thunkAPI.dispatch(refreshToken());
//           if (refreshToken.fulfilled.match(refreshed)) {
//             const retryResponse = await axiosInstance.get('/patient/doctors');
//             return retryResponse.data;
//           }
//         } catch (refreshError) {
//           return thunkAPI.rejectWithValue('Session expired. Please login again.');
//         }
//       }
//       return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching doctors');
//     }
//   }
// );

// // Slice definition
// const doctorSlice = createSlice({
//   name: 'doctors',
//   initialState: {
//     doctors: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDoctors.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchDoctors.fulfilled, (state, action) => {
//         state.loading = false;
//         state.doctors = action.payload;
//       })
//       .addCase(fetchDoctors.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default doctorSlice.reducer;





// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { generateAccessToken, generateRefreshToken,getUserRole } from '../utils/jwt.js';
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
// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });

//     if (!admin) {
//       return res.status(404).json({ message: "Admin not found" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, admin.password);
//     if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

//     const accessToken = generateAccessToken(admin);
//     const refreshToken = generateRefreshToken(admin);

//     // Store tokens in cookies
//     res.cookie('token', accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       // sameSite: 'Strict',
//       sameSite: 'lax',
//       maxAge: 15 * 60 * 1000, // Access token expires in 15 minutes
//       path:'/',
//     });

//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       // sameSite: 'Strict',
//       sameSite: 'lax',
//       path:'/',
//       maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token expires in 7 days
//     });

//     return res.status(200).json({
//       message: 'Admin login successful',
//       role: 'admin',
//       accessToken,  
//      user: {
//     _id: admin._id,
//     fullName: admin.fullName,
//     email: admin.email,
//   }
//     });
//   } catch (error) {
//     console.error('Admin login error:', error.message);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Refresh Token
// export const refreshToken = async (req, res) => {
//   console.log("Request headers:", req.headers);
// console.log("Request cookies:", req.cookies); 

//   const token = req.cookies.refreshToken;

//   if (!token) return res.status(401).json({ message: 'Access Denied' });

//   jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid refresh token' });

//     const refreshedUser = await Patient.findById(user.id) || await Doctor.findById(user.id) || await Admin.findById(user.id);
//     if (!refreshedUser) return res.status(404).json({ message: 'User not found' });

//     const newAccessToken = generateAccessToken(refreshedUser);
//     res.status(200).json({ accessToken: newAccessToken });
//   });
// };


// // export const refreshToken = async (req, res) => {
// //   const token = req.cookies.refreshToken;

// //   if (!token) return res.status(401).json({ message: 'Access Denied' });

// //   jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, user) => {
// //     if (err) return res.status(403).json({ message: 'Invalid refresh token' });

// //     const refreshedUser =
// //       (await Patient.findById(user.id)) ||
// //       (await Doctor.findById(user.id)) ||
// //       (await Admin.findById(user.id));

// //     if (!refreshedUser) return res.status(404).json({ message: 'User not found' });

// //     const newAccessToken = generateAccessToken(refreshedUser);

// //     // ✅ Set the new access token in cookie
// //     res.cookie('accessToken', newAccessToken, {
// //       httpOnly: true,
// //       sameSite: 'lax',
// //       secure: process.env.NODE_ENV === 'production',
// //       maxAge: 15 * 60 * 1000 // 15 minutes
// //     });

// //     res.status(200).json({ message: 'Token refreshed successfully' });
// //   });
// // };


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







// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import Patient from '../models/patientModel.js';
// import Doctor from '../models/doctorModel.js';
// import Admin from '../models/adminModel.js';

// dotenv.config();

// // 🔐 Token verification middleware (reads from cookies)
// export const verifyToken = async (req, res, next) => {
//   const token = req.cookies.token;
//   console.log("Token received from cookie:", token);
//   if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

//   try {
//     let decoded;

//     // Try normal user token first
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("decoding.....",decoded)

//     } catch (err) {
//       // If normal secret fails, try admin token
//       decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
//     }

//     req.user = decoded; // Contains: { id, role }
//     console.log("Decoded Token:", req.user);
//     next();
//   } catch (error) {
//     console.error('❌ Token verification failed:', error);
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };

// // 👨‍⚕️ Patient authentication middleware
// export const authenticatePatient = async (req, res, next) => {
//   if (req.user?.role !== 'patient') {
//     return res.status(403).json({ message: 'Access denied. Patient only.' });
//   }

//   try {
//     const patient = await Patient.findById(req.user.id).select('-password');
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });

//     if (patient.isBlocked) {
//       return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
//     }

//     req.patient = patient;
//     next();
//   } catch (error) {
//     console.error('❌ Patient auth error:', error);
//     res.status(500).json({ message: 'Something went wrong.' });
//   }
// };

// // 👩‍⚕️ Doctor authentication middleware
// export const authenticateDoctor = async (req, res, next) => {
//   if (req.user?.role !== 'doctor') {
//     return res.status(403).json({ message: 'Access denied. Doctor only.' });
//   }

//   try {
//     const doctor = await Doctor.findById(req.user.id).select('-password');
//     if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

//     if (doctor.isBlocked) {
//       return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
//     }

//     req.doctor = doctor;
//     next();
//   } catch (error) {
//     console.error('❌ Doctor auth error:', error);
//     res.status(500).json({ message: 'Something went wrong.' });
//   }
// };

// // 🛡️ Admin authentication middleware
// export const authenticateAdmin = async (req, res, next) => {
//   if (req.user?.role !== 'admin') {
//     return res.status(403).json({ message: 'Access denied. Admin only.' });
//   }

//   try {
//     const admin = await Admin.findById(req.user.id).select('-password');
//     if (!admin) return res.status(404).json({ message: 'Admin not found' });

//     req.admin = admin;
//     next();
//   } catch (error) {
//     console.error('❌ Admin auth error:', error);
//     res.status(500).json({ message: 'Something went wrong.' });
//   }
// };







// import Patient from '../models/patientModel.js';
// import Doctor from '../models/doctorModel.js';
// import { handleError } from '../utils/errorHandler.js';
// import { sendNotification } from '../config/emailConfig.js';

// // Helper to compute next available slot
// const computeNextAvailableSlot = (slots) => {
//   if (!Array.isArray(slots) || slots.length === 0) return 'Not Available';
//   const sorted = slots.sort((a, b) => a.day.localeCompare(b.day));
//   const next = sorted[0];
//   return `${next.day} at ${next.startTime}`;
// };


// // Get logged-in patient profile
// export const getPatientProfile = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.patient._id).select('-password');
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });
//     res.status(200).json(patient);
//   } catch (error) {
//     console.error('❌ Error in getPatientProfile:', error);
//     handleError(res, error);
//   }
// };

// // Update patient profile
// export const updatePatientProfile = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.patient._id);
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });

//     const fields = ['fullName', 'email', 'phoneNumber', 'age', 'gender', 'medicalHistory'];
//     fields.forEach(field => {
//       if (req.body[field]) patient[field] = req.body[field];
//     });

//     await patient.save();
//     res.status(200).json({ message: 'Profile updated successfully', patient });
//   } catch (error) {
//     console.error('❌ Error in updatePatientProfile:', error);
//     handleError(res, error);
//   }
// };

// // Get all patients (Admin)
// export const getAllPatients = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search = '' } = req.query;
//     const query = search ? { fullName: { $regex: search, $options: 'i' } } : {};

//     const patients = await Patient.find(query, '-password')
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     const total = await Patient.countDocuments(query);

//     res.status(200).json({ total, page, limit, patients });
//   } catch (error) {
//     console.error('❌ Error in getAllPatients:', error);
//     handleError(res, error);
//   }
// };

// // Block patient
// export const blockPatient = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });

//     patient.isBlocked = true;
//     await patient.save();

//     await sendNotification(patient.email, 'Account Blocked', 'Your account has been blocked by the admin.');
//     res.status(200).json({ message: 'Patient blocked successfully' });
//   } catch (error) {
//     console.error('❌ Error in blockPatient:', error);
//     handleError(res, error);
//   }
// };

// // Unblock patient
// export const unblockPatient = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });

//     patient.isBlocked = false;
//     await patient.save();

//     await sendNotification(patient.email, 'Account Unblocked', 'Your account has been unblocked by the admin.');
//     res.status(200).json({ message: 'Patient unblocked successfully' });
//   } catch (error) {
//     console.error('❌ Error in unblockPatient:', error);
//     handleError(res, error);
//   }
// };

// // Dummy: Get notifications
// export const getNotifications = async (req, res) => {
//   try {
//     res.status(200).json({ message: 'Notifications feature coming soon' });
//   } catch (error) {
//     console.error('❌ Error in getNotifications:', error);
//     handleError(res, error);
//   }
// };





// import express from 'express';
// import authRoutes from './authRoutes.js';
// import otpRoutes from './otpRoutes.js';
// // import adminRoutes from './adminRoutes.js';
// import patientRoutes from './patientRoutes.js';
// // import notificationRoutes from './notificationRoutes.js';
// // import doctorRoutes from './doctorRoutes.js'; // if you have this

// const router = express.Router();

// // Grouped Routes
// router.use('/auth', authRoutes);
// router.use('/otp', otpRoutes);
// // router.use('/admin', adminRoutes);
// router.use('/patient', patientRoutes);
// // router.use('/notifications', notificationRoutes);
// // router.use('/doctor', doctorRoutes); // optional

// export default router;






// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import Admin from '../models/adminModel.js';
// import Patient from '../models/patientModel.js';
// import Doctor from '../models/doctorModel.js';

// dotenv.config();

// // Get role of the user
// export const getUserRole = (user) => {
//   console.log("User Role:", user?.role); // Log user role
//   if (user?.__t === 'Admin' || user?.role === 'admin') return 'admin';
//   if (user?.__t === 'Patient' || user?.role === 'patient') return 'patient';
//   return 'doctor'; // Defaulting to doctor
// };


// // Utility to get correct secret and expiry
// const getTokenConfig = (role, type) => {
//   const config = {
//     access: {
//       admin: {
//         secret: process.env.JWT_ADMIN_SECRET,
//         expiresIn: '30m'
//       },
//       user: {
//         secret: process.env.JWT_SECRET,
//         expiresIn: '15m'
//       }
//     },
//     refresh: {
//       admin: {
//         secret: process.env.JWT_ADMIN_REFRESH_SECRET,
//         expiresIn: '14d'
//       },
//       user: {
//         secret: process.env.JWT_REFRESH_SECRET,
//         expiresIn: '7d'
//       }
//     }
//   };

//   const isAdmin = role === 'admin';
//   return type === 'access'
//     ? isAdmin ? config.access.admin : config.access.user
//     : isAdmin ? config.refresh.admin : config.refresh.user;
// };

// // Generate Access Token
// export const generateAccessToken = (user) => {
//   const role = getUserRole(user);
//   const { secret, expiresIn } = getTokenConfig(role, 'access');
//   const payload = { id: user._id, role };

//   return jwt.sign(payload, secret, { expiresIn });
// };

// // Generate Refresh Token
// export const generateRefreshToken = (user) => {
//   const role = getUserRole(user);
//   const { secret, expiresIn } = getTokenConfig(role, 'refresh');
//   const payload = { id: user._id, role };

//   return jwt.sign(payload, secret, { expiresIn });
// };






// import { EventEmitter } from 'events';
// EventEmitter.defaultMaxListeners = 20; 

// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';

// // Centralized route
// import routes from './routes/mainRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();

// // Middleware
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CORS config
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
// }));

// // All routes mounted here
// app.use('/api', routes);

// // Optional: error handler
// // app.use(errorHandler);

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   withCredentials: true,
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//     failedQueue.forEach((prom) => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });
//     failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         // Handle 401 errors for expired tokens
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject });
//                 });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

// //             try {
// //                 // await axiosInstance.post("/refreshtoken");
// //                 await axiosInstance.post("/auth/refresh", { refreshToken: Cookies.get('refreshToken') });

// //                 // Retry the original request after refreshing the token
// //                 isRefreshing = false;
// //                 return axiosInstance(originalRequest);
// //             } catch (refreshError) {
// //                 isRefreshing = false;
// //                 processQueue(refreshError, null);

// //                 // Redirect to login if refresh fails
// //                 if (refreshError.response?.status === 401) {
// //                     window.location.href = "/login";
// //                 }
// //                 return Promise.reject(refreshError);
// //             }
// //         }

// //         return Promise.reject(error);
// //     }
// // );

// try {
//     const refreshToken = Cookies.get('refreshToken');
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
//       { refreshToken }
//     );
    
//     const { accessToken } = response.data;
//     Cookies.set('token', accessToken);
    
//     // Retry queued requests
//     processQueue(null, accessToken);
//     return axiosInstance(originalRequest);
//   } catch (refreshError) {
//     processQueue(refreshError, null);
//     Cookies.remove('token');
//     Cookies.remove('refreshToken');
//     window.location.href = '/login';
//     return Promise.reject(refreshError);
//   } finally {
//     isRefreshing = false;
//   }
// }

// return Promise.reject(error);
// }
// );

// export default axiosInstance;





// export const ENDPOINTS = {
//   AUTH: {
//     LOGIN: "/auth/login",
//     ADMIN_LOGIN: "/auth/admin-login",
//     REGISTER_PATIENT: "/auth/patient-register",
//     REGISTER_DOCTOR: "/auth/doctor-register",
//     FORGOT_PASSWORD: "/auth/forgot-password",
//     RESET_PASSWORD: "/auth/reset-password",
//     LOGOUT: "/auth/logout",
//     REFRESH_TOKEN: "/auth/refresh-token",
//     ME: "/auth/me",   //current logged-in user (Patient/Doctor/Admin)
//   },
//     PATIENT: {
//       // DOCTORS_LIST: '/api/patient/doctors', // Endpoint to fetch all doctors
//       DOCTORS: '/patient/doctors',
//     SINGLE_DOCTOR: (id) => `/doctors/${id}`, // Fetch a single doctor by ID
//     SINGLE_DOCTOR_DETAILS: (id) => `/doctors/${id}/details`, // Fetch additional details of a doctor
//     BOOK_APPOINTMENT: '/appointments/book', // Endpoint to book an appointment
//     CANCEL_APPOINTMENT: (id) => `/appointments/${id}`, // Endpoint to cancel an appointment (DELETE)
//     GET_APPOINTMENTS: '/appointments', // Endpoint to get all appointments
//     PROFILE: '/patients/profile', // Endpoint to fetch the patient profile
//     UPDATE_PROFILE: '/patients/profile/update', // Endpoint to update the patient profile
//     NOTIFICATIONS: '/notifications', // Endpoint to fetch notifications


//       // PROFILE: '/patients/profile', // GET
//       // UPDATE_PROFILE: '/patients/profile/update', // PUT
//       // DOCTORS_LIST: '/patient/doctors',
//       // SINGLE_DOCTOR: (id) => `/patient/doctors/${id}`,
//       // BOOK_APPOINTMENT: '/patient/book-appointment', 
//       // APPOINTMENTS: '/patient/get-appointments',
//       // CANCEL_APPOINTMENT: '/patient/appointments/cancel',
//       // NOTIFICATIONS: '/patient/notifications',
//     },
//   DOCTOR: {
//     PROFILE: "/doctor/profile",
//     UPDATE_PROFILE: "/doctor/profile",
    
//   },

//   ADMIN: {
//     // Doctor Management
//     VERIFY_DOCTOR: (id) => `/admin/verify-doctor/${id}`,
//     APPROVE_DOCTOR: (id) => `/admin/approve-doctor/${id}`,
//     DELETE_DOCTOR: (id) => `/admin/delete-doctor/${id}`,
//     GET_ALL_DOCTORS: "/admin/doctors",

//     // Patient Management
//     GET_ALL_PATIENTS: "/admin/patients",
//     DELETE_PATIENT: (id) => `/admin/delete-patients/${id}`,
//     BLOCK_PATIENT: (id) => `/admin/block-patient/${id}`,
//     UNBLOCK_PATIENT: (id) => `/admin/unblock-patient/${id}`,

//     // Appointment Management
//     GET_ALL_APPOINTMENTS: "/admin/appointments",
//     UPDATE_APPOINTMENT_STATUS: (id) => `/admin/appointments/${id}`,
//     DELETE_APPOINTMENT: (id) => `/admin/appointments/${id}`,

//     // Reports and Analytics
//     GET_REPORTS: "/admin/reports",

//     // Dispute Management
//     RAISE_DISPUTE: "/admin/dispute",
//     RESOLVE_DISPUTE: (id) => `/admin/dispute/${id}`,
//     GET_ALL_DISPUTES: "/admin/disputes",
//   },
// };





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../api/axiosInstance";
// import { ENDPOINTS } from "../../api/endPoints";
// import Cookies from 'js-cookie';


// // console.log(ENDPOINTS,"end points..........")

// // Login User

// export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials, {
//       withCredentials: true, // ⬅️ Add this line to send cookies
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Invalid credentials");
//   }
// });

// // Admin Login
// export const adminLogin = createAsyncThunk("auth/adminLogin", async (credentials, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(ENDPOINTS.AUTH.ADMIN_LOGIN, credentials, {
//       withCredentials: true, // ⬅️ Also here
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Invalid credentials");
//   }
// });

// // Register User (Patient/Doctor)

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async ({ formData, role }, { rejectWithValue }) => {
//     // console.log(formData, "FormData from Frontend");
//     try {
//       const endpoint =
//         role === "Patient"
//           ? ENDPOINTS.AUTH.REGISTER_PATIENT
//           : ENDPOINTS.AUTH.REGISTER_DOCTOR;
//       // console.log(endpoint, "API Endpoint");

//       const response = await axiosInstance.post(endpoint, formData);
//       // console.log(response, "API Response");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error?.message || "Something went wrong");
//     }
//   }
// );

// // Forgot Password
// export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Error sending OTP");
//   }
// });

// // Reset Password
// export const resetPassword = createAsyncThunk("auth/resetPassword", async (data, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Password reset failed");
//   }
// });

// // Initial State
// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// // Slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
   
//   reducers: {
//     logoutUser: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
      
//       //  Remove token from cookies
//       Cookies.remove('token');
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.token = action.payload.token || null;
//         state.isAuthenticated = !!action.payload.token;
      
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
        
//       })

//       // Login User
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         // state.user = action.payload;
//         state.user = action.payload.user;
//         state.token = action.payload.accessToken;
//         state.isAuthenticated = true; //  Set authentication

//           // Save token in cookies
//         Cookies.set('token', action.payload.accessToken, { expires: 7 });
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Admin Login
//       .addCase(adminLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(adminLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.accessToken;
//         state.isAuthenticated = true;
      
//         Cookies.set('token', action.payload.accessToken, { expires: 7 });
//       })
      
//       .addCase(adminLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//        // Forgot & Reset Password
//       .addCase(forgotPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logoutUser } = authSlice.actions;
// export default authSlice.reducer;






// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../api/axiosInstance';
// import { ENDPOINTS } from '../../api/endPoints';
// import Cookies from 'js-cookie';

// // 🔁 Thunks

// // Fetch all doctors
// export const fetchDoctors = createAsyncThunk(
//   'doctors/fetchDoctors',
//   async (_, thunkAPI) => {
//     try {
//       console.log("Fetching doctors...");

//       // Check all available cookies for debugging
//       console.log("All cookies:", document.cookie);

//       // Retrieve the access token from cookies
//       const token = Cookies.get('token');
//       console.log("Token retrieved", token);
      
//       // Check if the token exists
//       if (!token) {
//         console.error("No token found in cookies. Available cookies:", document.cookie);
//         return thunkAPI.rejectWithValue('Authentication required');
//       }

//       console.log("Token before API call:", token);
      
//       // API call to fetch doctors with token in header
//       // const response = await axiosInstance.get(ENDPOINTS.FETCH_DOCTORS, {
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //   },
//       // });
//       // const response = await axiosInstance.get('/patient/doctors');
//       const response = await axiosInstance.get(ENDPOINTS.PATIENT.DOCTORS);
//       return response.data;  // Return the fetched data
//     } catch (error) {
//       // console.error("Detailed error:", {
//       //   message: error.message,
//       //   response: error.response,
//       //   stack: error.stack
//       // });
//       console.error("Detailed error:", error);

//       if (error.response?.status === 401) {
//         try {
//           const refreshed = await thunkAPI.dispatch(refreshToken());
//           if (refreshToken.fulfilled.match(refreshed)) {
//             const retryResponse = await axiosInstance.get('/patient/doctors');
//             return retryResponse.data;
//           }
//         } catch (refreshError) {
//           return thunkAPI.rejectWithValue('Session expired. Please login again.');
//         }
//       }
//       return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching doctors');
//     }
//   }
// );

// // Slice definition
// const doctorSlice = createSlice({
//   name: 'doctors',
//   initialState: {
//     doctors: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDoctors.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchDoctors.fulfilled, (state, action) => {
//         state.loading = false;
//         state.doctors = action.payload;
//       })
//       .addCase(fetchDoctors.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default doctorSlice.reducer;








// // patientSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchPatientProfileApi, updatePatientProfileApi, rateDoctorApi } from './patientApi'; // API calls
// import { loadingErrorState } from '../utils/loadingErrorState';

// const initialState = {
//   patientProfile: null,
//   ...loadingErrorState,
// };

// // Thunks
// export const fetchPatientProfile = createAsyncThunk(
//   'patient/fetchPatientProfile',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchPatientProfileApi();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch profile');
//     }
//   }
// );

// export const updatePatientProfile = createAsyncThunk(
//   'patient/updatePatientProfile',
//   async (profileData, { rejectWithValue }) => {
//     try {
//       const response = await updatePatientProfileApi(profileData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to update profile');
//     }
//   }
// );

// export const rateDoctor = createAsyncThunk(
//   'patient/rateDoctor',
//   async (ratingData, { rejectWithValue }) => {
//     try {
//       const response = await rateDoctorApi(ratingData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to rate doctor');
//     }
//   }
// );

// // Slice
// const patientSlice = createSlice({
//   name: 'patient',
//   initialState,
//   reducers: {
//     clearPatientProfile(state) {
//       state.patientProfile = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPatientProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPatientProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.patientProfile = action.payload;
//       })
//       .addCase(fetchPatientProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearPatientProfile } = patientSlice.actions;
// export default patientSlice.reducer;

