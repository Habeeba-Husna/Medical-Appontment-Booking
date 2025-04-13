import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endPoints";
import { toast } from 'react-toastify';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from navigation state

  const formik = useFormik({
    initialValues: {
      email: email || '', // Pre-fill with email from state
      otpCode: '',
    },
    validationSchema: Yup.object({
      otpCode: Yup.string()
        .length(6, 'OTP must be 6 digits')
        .required('OTP is required'),
    }),

    onSubmit: async (values) => {
        try {
            console.log('Submitting OTP:', values);
       
        const response = await axiosInstance.post(ENDPOINTS.AUTH.VERIFY_OTP, 
            {
                email: values.email.toLowerCase().trim(),
                otpCode: values.otpCode.trim()
              }
        );
          
        if (response.data.success) {
            toast.success(response.data.message);
            navigate('/reset-password', { 
              state: { 
                resetToken: response.data.resetToken,
                email: response.data.email
              }
            });
          } else {
            toast.error(response.data.message);
          }
       
        } catch (error) {
        toast.error(
          error.response?.data?.message ||
          error.response?.data?.error ||
          'OTP verification failed. Please try again.'
        );
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Verify OTP</h2>

        {email && (
          <div className="mb-4">
            <p className="text-gray-700">Verification code sent to:</p>
            <p className="font-medium">{email}</p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">OTP Code</label>
          <input
            type="text"
            name="otpCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.otpCode}
            className="w-full p-2 border rounded"
            placeholder="Enter 6-digit OTP"
            maxLength="6"
          />
          {formik.touched.otpCode && formik.errors.otpCode && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.otpCode}</p>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-blue-500 hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOTP;