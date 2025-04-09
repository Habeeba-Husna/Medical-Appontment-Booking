import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import axiosInstance, { ENDPOINTS } from '../api/axiosInstance';
import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endPoints";

const ResetPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      otpCode: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      otpCode: Yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
      newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, values);
        alert(response.data.message);
        navigate('/login');
      } catch (error) {
        alert(error.response?.data?.message || 'An error occurred');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full p-2 border rounded"
        />
        {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}

        <label className="block mt-4 mb-2">OTP Code</label>
        <input
          type="text"
          name="otpCode"
          onChange={formik.handleChange}
          value={formik.values.otpCode}
          className="w-full p-2 border rounded"
        />
        {formik.touched.otpCode && formik.errors.otpCode && <p className="text-red-500 text-sm">{formik.errors.otpCode}</p>}

        <label className="block mt-4 mb-2">New Password</label>
        <input
          type="password"
          name="newPassword"
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          className="w-full p-2 border rounded"
        />
        {formik.touched.newPassword && formik.errors.newPassword && <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>}

        <button type="submit" className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;



