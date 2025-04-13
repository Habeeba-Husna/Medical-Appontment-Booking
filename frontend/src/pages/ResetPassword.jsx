import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endPoints";
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email and OTP from navigation state
  const { email, otpCode } = location.state || {};

  const formik = useFormik({
    initialValues: {
      email: email || '',
      otpCode: otpCode || '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
      otpCode: Yup.string()
        .length(6, 'OTP must be 6 digits')
        .required('OTP is required'),
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Please confirm your password'),
    }),
   
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(
          ENDPOINTS.AUTH.RESET_PASSWORD, 
          {
            resetToken: location.state.resetToken,
            newPassword: values.newPassword
          }
        );
        
        toast.success(response.data.message);
        navigate('/login');
      } catch (error) {
        toast.error(
          error.response?.data?.message || 
          'Password reset failed. Please try again.'
        );
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full p-2 border rounded"
            readOnly={!!email} // Make email read-only if pre-filled
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">OTP Code</label>
          <input
            type="text"
            name="otpCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.otpCode}
            className="w-full p-2 border rounded"
            readOnly={!!otpCode} // Make OTP read-only if pre-filled
          />
          {formik.touched.otpCode && formik.errors.otpCode && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.otpCode}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            className="w-full p-2 border rounded"
            placeholder="Enter new password"
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className="w-full p-2 border rounded"
            placeholder="Confirm new password"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Reset Password
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;