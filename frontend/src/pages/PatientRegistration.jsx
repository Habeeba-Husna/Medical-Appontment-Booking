import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const PatientRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    medicalHistory: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    medicalHistory: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let formErrors = {};
    for (let field in formData) {
      if (!formData[field]) {
        formErrors[field] = "Required";
      }
    }
  
    setErrors(formErrors);
  
    if (Object.values(formErrors).some((error) => error)) {
      return; // Stop form submission if there are errors
    }
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Dispatch with Patient role
    const result = await dispatch(registerUser({ formData, role: "Patient" }));
  
    if (result?.payload?.message) {
      alert(result.payload.message);
      navigate("/login");
    }
  };
  
  
  
  return (
    <div className="flex justify-center items-center py-12 sm:px-6 lg:px-8 min-h-screen bg-gray-100">
      <div className="mt-8 sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Patient Registration</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Full Name *"
                className="bg-white text-black rounded-md w-full p-4 pl-12 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Email *"
                className="bg-white text-black rounded-md w-full p-4 pl-12 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="relative">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Phone Number *"
                maxLength={10}
                required 
                pattern="\d*"  
                // className="inputField"
                className="bg-white text-black rounded-md w-full p-4 pl-12 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-2">{errors.phoneNumber}</p>}
             
            </div>

            {/* Age and Gender (Two Columns) */}
            <div className="grid grid-cols-2 gap-6">
              {/* Age */}
              <div className="relative">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Age *"
                  className="bg-white text-black rounded-md w-full p-4 pl-12 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.age && <p className="text-red-500 text-sm mt-2">{errors.age}</p>}
              </div>

              {/* Gender */}
              <div className="relative">
                <div className="flex gap-6 mt-2">
                  {["Male", "Female", "Other"].map((option) => (
                    <label key={option} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="form-radio h-5 w-5 text-indigo-600"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-2">{errors.gender}</p>}
              </div>
            </div>

            {/* Password and Confirm Password (Two Columns) */}
            <div className="grid grid-cols-2 gap-6">
              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Password *"
                  className="bg-white text-black rounded-md w-full p-4 pl-12 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Confirm Password *"
                  className="bg-white text-black rounded-md w-full p-4 pl-12 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
              </div>
            </div>


            {/* Medical History */}
            <div className="relative">
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your medical history (Optional)"
                className="bg-white text-black rounded-md w-full p-4 pl-12 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 h-20 resize-none"
              />
              {/* {errors.medicalHistory && <p className="text-red-500 text-sm mt-2">{errors.medicalHistory}</p>} */}
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? "Registering..." : "Sign up"}
              </button>
            </div>

             {/* Sign In Link */}
             <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Have an account?{" "}
                <a
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Sign In
                </a>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;

