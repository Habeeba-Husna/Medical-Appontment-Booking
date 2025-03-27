import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import axios from 'axios';
import axiosInstance, { ENDPOINTS } from '../api/axiosInstance';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(ENDPOINTS.AUTH.ADMIN_LOGIN, { ...formData });
      console.log('Login Success:', response.data);
    } catch (error) {
      console.error('Login Failed:', error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-8 border rounded-lg shadow-md w-96" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-6 font-bold text-center">Admin Login</h2>
        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
        <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" />
        <Button label="Login" type="submit" loading={loading} />
      </form>
    </div>
  );
};

export default AdminLogin;


// src/pages/AdminLogin.jsx

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { adminLogin } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';
// import InputField from '../components/InputField';
// import Button from '../components/Button';

// const AdminLogin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const result = await dispatch(adminLogin(formData));
//     if (adminLogin.fulfilled.match(result)) {
//       console.log('Login Successful:', result.payload);
//       navigate('/admin-dashboard');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form className="p-8 border rounded-lg shadow-md w-96" onSubmit={handleLogin}>
//         <h2 className="text-2xl mb-6 font-bold text-center">Admin Login</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
//         <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" />
//         <Button label={loading ? 'Logging in...' : 'Login'} type="submit" loading={loading} />
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
