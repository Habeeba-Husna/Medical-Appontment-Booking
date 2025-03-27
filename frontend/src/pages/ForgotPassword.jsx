import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance, { ENDPOINTS } from "../api/axiosInstance";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, values);
        toast.success(response.data.message);
        navigate("/reset-password");
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>

        <label className="block text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full p-2 border rounded-md mb-4"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mb-4">{formik.errors.email}</div>
        ) : null}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

