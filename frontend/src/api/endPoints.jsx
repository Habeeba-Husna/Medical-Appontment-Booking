

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../api/axiosInstance';

// // Admin Login
// export const adminLogin = createAsyncThunk('auth/adminLogin', async (credentials, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post('/auth/admin-login', credentials);
//     localStorage.setItem('token', response.data.token);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || 'Invalid credentials');
//   }
// });

// // Patient Registration
// export const registerPatient = createAsyncThunk('auth/registerPatient', async (userData, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post('/auth/patient-register', userData);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || 'Something went wrong');
//   }
// });

// // Doctor Registration
// export const registerDoctor = createAsyncThunk('auth/registerDoctor', async (userData, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post('/auth/doctor-register', userData);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || 'Something went wrong');
//   }
// });

// // Forgot Password
// export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post('/auth/forgot-password', { email });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || 'Error sending OTP');
//   }
// });

// // Reset Password
// export const resetPassword = createAsyncThunk('auth/resetPassword', async (data, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post('/auth/reset-password', data);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || 'Password reset failed');
//   }
// });



export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    ADMIN_LOGIN: "/auth/admin-login",
    REGISTER_PATIENT: "/auth/patient-register",
    REGISTER_DOCTOR: "/auth/doctor-register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    ME: "/auth/me",   //current logged-in user (Patient/Doctor/Admin)
  },
};
