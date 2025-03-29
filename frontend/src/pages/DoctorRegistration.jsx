import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";



const DoctorRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    specialization: "",
    experience: "",
    qualifications: "",
    clinicDetails: "",
    documents: null,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    specialization: "",
    experience: "",
    qualifications: "",
    clinicDetails: "",
    documents: "",
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "documents") {
      // Store the FileList object directly
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";
    
    if (!value) {
      errorMsg = "Required";
    } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      errorMsg = "Invalid email format";
    } else if (name === "phoneNumber" && !/^\d{10}$/.test(value)) {
      errorMsg = "Phone number must be 10 digits";
    } else if (name === "experience" && isNaN(value)) {
      errorMsg = "Must be a number";
    }
    
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check required fields
    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== "documents") {
        newErrors[key] = "Required";
        isValid = false;
      }
    });

    // Special validation for documents (optional here)
    if (!formData.documents) {
      newErrors.documents = "Please upload verification documents";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
  
    // Append all regular fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "documents") {
        data.append(key, value);
      }
    });
  
    // Append files
    if (formData.documents && formData.documents.length > 0) {
      Array.from(formData.documents).forEach(file => {
        data.append("documents", file);
      });
    } else {
      alert("Please upload at least one document");
      return;
    }
  
    try {
      const result = await dispatch(registerUser({ 
        formData: data, 
        role: "Doctor" 
      }));

      console.log(result,"result...............");
      // if (result?.payload?.success || result?.payload?.status === 201) {
      //   alert("Doctor registered successfully. Waiting for admin approval. Redirecting to login page.");

      //   console.log("Navigation Attempt");
      //    setTimeout(() => navigate("/login"), 500);
      // } else {
      //   alert(result.payload?.message || "Registration failed. Please try again.");
      // }
      if (result?.type === 'auth/registerUser/fulfilled') {
        alert(result?.payload?.message || "Doctor registered successfully. Waiting for admin approval.");
        navigate("/login");
      } else {
        alert(result?.payload?.message || "Registration failed. Please try again.");
      }
      
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };
 
  return (
    <div className="flex justify-center items-center py-12 sm:px-6 lg:px-8 min-h-screen bg-gray-100">
      <div className="mt-8 sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Doctor Registration
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* <form onSubmit={handleSubmit} encType="multipart/form-data"> */}

          <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>

            {/* Full Name */}
            <div className="mb-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Full Name *"
                className="bg-white text-black rounded-md w-full p-4 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Email *"
                className="bg-white text-black rounded-md w-full p-4 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Password *"
                className="bg-white text-black rounded-md w-full p-4 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            {/* Phone Number & Specialization */}
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
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
                  className="bg-white text-black rounded-md w-full p-4 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-2">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="w-1/2">
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Specialization *"
                  className="bg-white text-black rounded-md w-full p-4 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.specialization && (
                  <p className="text-red-500 text-sm mt-2">{errors.specialization}</p>
                )}
              </div>
            </div>

            {/* Experience & Qualifications */}
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Experience (Years) *"
                  min="0"
                  className="bg-white text-black rounded-md w-full p-4 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-2">{errors.experience}</p>
                )}
              </div>

              <div className="w-1/2">
                <input
                  type="text"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Qualifications *"
                  className="bg-white text-black rounded-md w-full p-4 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.qualifications && (
                  <p className="text-red-500 text-sm mt-2">{errors.qualifications}</p>
                )}
              </div>
            </div>

            {/* Clinic Details */}
            <div className="mb-4">
              <input
                type="text"
                name="clinicDetails"
                value={formData.clinicDetails}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Clinic/Hospital Details *"
                className="bg-white text-black rounded-md w-full p-4 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.clinicDetails && (
                <p className="text-red-500 text-sm mt-2">{errors.clinicDetails}</p>
              )}
            </div>

            {/* Documents */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Verification Documents (License, ID Proof) *
              </label>
              <input
                type="file"
                name="documents"
                multiple 
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
               
                className="block w-full text-sm text-gray-500 
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
                required
              />
              {errors.documents && (
                <p className="text-red-500 text-sm mt-2">{errors.documents}</p>
              )}
            </div>


            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? "Registering..." : "REGISTER"}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
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

export default DoctorRegistration;