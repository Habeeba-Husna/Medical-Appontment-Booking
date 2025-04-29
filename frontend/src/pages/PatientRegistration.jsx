import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/authSlice";
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
    
    // Clear previous errors
    setErrors({});
  
    // Validate form
    let formErrors = {};
    Object.keys(formData).forEach(field => {
      if (!formData[field] && field !== 'medicalHistory') {
        formErrors[field] = 'This field is required';
      }
    });
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
  
    try {
      const result = await dispatch(
        registerUser({ 
          formData: {
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            age: formData.age,
            gender: formData.gender,
            medicalHistory: formData.medicalHistory || undefined
          },
          role: "Patient" 
        })
      );
  
      if (result?.error) {
        // Handle API validation errors
        if (result.payload?.details) {
          setErrors(result.payload.details);
        } else {
          alert(result.payload?.message || 'Registration failed');
        }
      } else {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An unexpected error occurred. Please try again.');
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

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     age: "",
//     gender: "",
//     medicalHistory: "",
//     specialization: "",
//     experience: "",
//     qualifications: "",
//     clinicDetails: "",
//     documents: null,
//     userType: "patient" // Added to handle both patient and doctor forms
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
    
//     if (name === "documents") {
//       setFormData(prev => ({ ...prev, [name]: files }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     let errorMsg = "";
    
//     if (!value) {
//       errorMsg = "Required";
//     } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
//       errorMsg = "Invalid email format";
//     } else if (name === "phone" && !/^\d{10}$/.test(value)) {
//       errorMsg = "Phone number must be 10 digits";
//     } else if ((name === "experience" || name === "age") && isNaN(value)) {
//       errorMsg = "Must be a number";
//     }
    
//     setErrors(prev => ({ ...prev, [name]: errorMsg }));
//   };

//   const handleGenderChange = (value) => {
//     setFormData(prev => ({ ...prev, gender: value }));
//   };

//   const handleUserTypeChange = (value) => {
//     setFormData(prev => ({ ...prev, userType: value }));
//     setErrors({});
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     let isValid = true;

//     // Common fields for both user types
//     const commonRequiredFields = ["fullName", "email", "phone", "password"];
    
//     if (formData.userType === "patient") {
//       // Patient specific validation
//       if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords don't match";
//         isValid = false;
//       }
      
//       const patientRequiredFields = [...commonRequiredFields, "age", "gender"];
//       patientRequiredFields.forEach(field => {
//         if (!formData[field]) {
//           newErrors[field] = "Required";
//           isValid = false;
//         }
//       });
//     } else {
//       // Doctor specific validation
//       const doctorRequiredFields = [...commonRequiredFields, "specialization", "experience", "qualifications"];
//       doctorRequiredFields.forEach(field => {
//         if (!formData[field]) {
//           newErrors[field] = "Required";
//           isValid = false;
//         }
//       });

//       if (!formData.documents || formData.documents.length === 0) {
//         newErrors.documents = "Please upload verification documents";
//         isValid = false;
//       }
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!validateForm()) {
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       if (formData.userType === "doctor") {
//         // Doctor registration logic
//         const formDataToSend = new FormData();
//         Object.entries(formData).forEach(([key, value]) => {
//           if (key === 'documents') {
//             Array.from(value).forEach(file => {
//               formDataToSend.append('documents', file);
//             });
//           } else if (value !== null && value !== undefined) {
//             formDataToSend.append(key, value);
//           }
//         });

//         console.log("Doctor registration data:", formDataToSend);
//         toast.success("Doctor registration submitted for approval!", {
//           description: "Your documents are under verification."
//         });
//       } else {
//         // Patient registration logic
//         console.log("Patient registration data:", formData);
//         toast.success("Registration successful!", {
//           description: "Please check your email to verify your account."
//         });
//       }
      
//       // Redirect to login page
//       navigate("/login");
//     } catch (error) {
//       toast.error("Registration failed", {
//         description: "There was an error creating your account. Please try again."
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-primary">
//           {formData.userType === "patient" ? "Create Patient Account" : "Doctor Registration"}
//         </h1>
//         <p className="mt-2 text-sm text-muted-foreground">
//           {formData.userType === "patient" 
//             ? "Sign up to book appointments and manage your healthcare" 
//             : "Register as a healthcare professional"}
//         </p>
//       </div>

//       <div className="flex justify-center mb-6">
//         <div className="flex items-center space-x-4">
//           <button
//             type="button"
//             className={`px-4 py-2 rounded-md ${formData.userType === "patient" ? "bg-primary text-white" : "bg-gray-200"}`}
//             onClick={() => handleUserTypeChange("patient")}
//           >
//             Patient
//           </button>
//           <button
//             type="button"
//             className={`px-4 py-2 rounded-md ${formData.userType === "doctor" ? "bg-primary text-white" : "bg-gray-200"}`}
//             onClick={() => handleUserTypeChange("doctor")}
//           >
//             Doctor
//           </button>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4" encType={formData.userType === "doctor" ? "multipart/form-data" : undefined}>
//         {/* Common Fields */}
//         <div className="space-y-2">
//           <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//             Full Name
//           </label>
//           <input
//             id="fullName"
//             name="fullName"
//             type="text"
//             placeholder="John Doe"
//             value={formData.fullName}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//             required
//           />
//           {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="you@example.com"
//             value={formData.email}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//             required
//           />
//           {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//             Phone Number
//           </label>
//           <input
//             id="phone"
//             name="phone"
//             type="tel"
//             placeholder="1234567890"
//             value={formData.phone}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//             required
//           />
//           {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//             required
//           />
//           {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//         </div>

//         {formData.userType === "patient" ? (
//           <>
//             {/* Patient Specific Fields */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label htmlFor="age" className="block text-sm font-medium text-gray-700">
//                   Age
//                 </label>
//                 <input
//                   id="age"
//                   name="age"
//                   type="number"
//                   min="0"
//                   max="120"
//                   placeholder="30"
//                   value={formData.age}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//                   required
//                 />
//                 {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Gender</label>
//                 <div className="flex space-x-4 pt-2">
//                   {["male", "female", "other"].map((gender) => (
//                     <div key={gender} className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         id={gender}
//                         name="gender"
//                         value={gender}
//                         checked={formData.gender === gender}
//                         onChange={() => handleGenderChange(gender)}
//                         className="h-4 w-4 text-primary focus:ring-primary"
//                       />
//                       <label htmlFor={gender} className="text-sm font-medium text-gray-700">
//                         {gender.charAt(0).toUpperCase() + gender.slice(1)}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//                 {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//                 required
//               />
//               {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">
//                 Medical History (Optional)
//               </label>
//               <textarea
//                 id="medicalHistory"
//                 name="medicalHistory"
//                 placeholder="Brief description of any relevant medical conditions..."
//                 value={formData.medicalHistory}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary min-h-[100px]"
//               />
//             </div>
//           </>
//         ) : (
//           <>
//             {/* Doctor Specific Fields */}
//             <div className="space-y-2">
//               <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
//                 Specialization
//               </label>
//               <input
//                 id="specialization"
//                 name="specialization"
//                 type="text"
//                 placeholder="Cardiology, Neurology, etc."
//                 value={formData.specialization}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//                 required
//               />
//               {errors.specialization && <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>}
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
//                   Experience (Years)
//                 </label>
//                 <input
//                   id="experience"
//                   name="experience"
//                   type="number"
//                   min="0"
//                   placeholder="5"
//                   value={formData.experience}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//                   required
//                 />
//                 {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">
//                   Qualifications
//                 </label>
//                 <input
//                   id="qualifications"
//                   name="qualifications"
//                   type="text"
//                   placeholder="MD, MBBS, etc."
//                   value={formData.qualifications}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//                   required
//                 />
//                 {errors.qualifications && <p className="mt-1 text-sm text-red-600">{errors.qualifications}</p>}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="clinicDetails" className="block text-sm font-medium text-gray-700">
//                 Clinic Details
//               </label>
//               <textarea
//                 id="clinicDetails"
//                 name="clinicDetails"
//                 placeholder="Clinic name, address, and other details..."
//                 value={formData.clinicDetails}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary min-h-[100px]"
//               />
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="documents" className="block text-sm font-medium text-gray-700">
//                 Verification Documents (License, ID Proof)
//               </label>
//               <input
//                 id="documents"
//                 name="documents"
//                 type="file"
//                 multiple
//                 onChange={handleChange}
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
//               />
//               {errors.documents && <p className="mt-1 text-sm text-red-600">{errors.documents}</p>}
//               <p className="mt-1 text-sm text-gray-500">Upload scanned copies of your professional documents</p>
//             </div>
//           </>
//         )}

//         <button
//           type="submit"
//           className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
//               {formData.userType === "patient" ? "Creating Account..." : "Registering..."}
//             </>
//           ) : (
//             formData.userType === "patient" ? "Create Account" : "Register as Doctor"
//           )}
//         </button>
//       </form>

//       <div className="mt-4 text-center text-sm text-muted-foreground">
//         Already have an account?{" "}
//         <a href="/login" className="text-primary hover:underline">
//           Sign in
//         </a>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;