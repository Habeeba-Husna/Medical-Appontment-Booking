
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, 
  // adminLogin 
} from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, Shield } from 'lucide-react';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Patient'); // Default to Patient
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error: loginError } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Validation check
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }
  
    try {
      let response;
      console.log(role, "role");
  
      // Depending on the role, either admin login or user login
      if (role === 'Admin') {
        response = await dispatch(adminLogin({ email, password })).unwrap();
      } else {
        response = await dispatch(loginUser({ email, password, role })).unwrap();
        console.log(response);
      }
  
      // Save the access token and role in cookies after successful login
      // Cookies.set('accessToken', response.accessToken, {
      //   expires: 1, // 1 day expiration
      //   secure: true, // Only sent over HTTPS
      //   sameSite: 'Strict',
      // });
      Cookies.set('userRole', role, {
        expires: 1,
        secure: true,
        sameSite: 'Strict',
      });
  
      // Redirect user based on role
      // if (role === 'Admin') {
      //   navigate('/dashboard3');
      // } else if (role === 'Doctor') {
      //   navigate('/dashboard2');
      // } else {
      //   navigate("/dashboard");
      // }

      if (role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (role === 'Doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
  
    } catch (err) {
      // Handling any login errors
      setError(loginError || 'Login failed. Please check your credentials and try again.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Welcome Back!</h2>

         {/* Role Selection */}
         <div className="flex justify-around mb-8">
          {['Patient', 'Doctor', 'Admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex flex-col items-center justify-center w-24 h-24 rounded-full transition-all duration-300 ${
                role === r ? 'shadow-xl bg-opacity-90 scale-110' : 'opacity-60'
              } ${r === 'Patient' ? 'bg-blue-100' : r === 'Doctor' ? 'bg-green-100' : 'bg-red-100'}
                hover:scale-105 hover:opacity-100`}
            >
              <span className="mt-3 font-medium text-gray-700">{r}</span>
            </button>
          ))}
        </div>

       {/* Email Input */}
       <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

         {/* Password Input */}
         <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
     
                {/* Error Display */}
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                
        {/* Forgot Password */}
        <p className="text-sm text-center mb-4">
          <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</a>
        </p>


{/* Submit Button */}
<button
  type="submit"
  onClick={handleSubmit}
  disabled={isLoading}
  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
>
  {isLoading ? 'Logging in...' : 'Login'}
</button>

        {/* Register Link */}
        {role !== 'Admin' && (
          <p className="mt-4 text-sm text-center">
            Don’t have an account?{' '}
            <a href="/register-selection" className="text-blue-500 hover:underline">Register here</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;




//direct login...............//
// import React, { useState,useEffect  } from 'react';
// import { useDispatch,useSelector } from 'react-redux';
// import { loginUser, 
//   // adminLogin 
// } from '../store/slices/authSlice';
// import { Stethoscope, User, Shield } from 'lucide-react';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { setUser } from '../store/slices/authSlice';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('Patient'); // Default to Patient
//   const [error, setError] = useState('');
//   const [loginResponse, setLoginResponse] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isLoading } = useSelector(state => state.auth);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Clear any previous errors
  
//     try {
//       // Make the API call to login
//       const response  = await dispatch(loginUser({ email, password, role })).unwrap();
//       console.log('Login Response:', res); // Log the entire response to check its structure
  
//       const { token, user } = response.data;

//       // Set cookies - adjust based on actual response structure
// Cookies.set('token', res.token, { 
//   expires: 1,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: 'strict',
//     path: '/'
// });

// // If refreshToken exists in response
// // if (res.refreshToken) {
// //   Cookies.set('refreshToken', res.refreshToken, {
// //     expires: 7,
// //     secure: process.env.NODE_ENV === 'production',
// //     sameSite: 'strict',
// //      path: '/'
// //   });
// // }

// // Dispatch setUser action with the user data
// dispatch(setUser(user));

// toast.success('Login successful');

//   // Navigate based on role
//   const redirectPath = user.role === 'admin' ? '/dashboard3' 
//   : user.role === 'doctor' ? '/dashboard2' 
//   : '/dashboard1';
// navigate(redirectPath);

// } catch (err) {
// setError(err.message || 'Login failed');
// toast.error(err.message || 'Login failed');
// }
// };
  

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
//         <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Welcome Back!</h2>

//          {/* Role Selection */}
//          <div className="flex justify-around mb-8">
//           {['Patient', 'Doctor', 'Admin'].map((r) => (
//             <button
//               key={r}
//               onClick={() => setRole(r)}
//               className={`flex flex-col items-center justify-center w-24 h-24 rounded-full transition-all duration-300 ${
//                 role === r ? 'shadow-xl bg-opacity-90 scale-110' : 'opacity-60'
//               } ${r === 'Patient' ? 'bg-blue-100' : r === 'Doctor' ? 'bg-green-100' : 'bg-red-100'}
//                 hover:scale-105 hover:opacity-100`}
//             >
//               <span className="mt-3 font-medium text-gray-700">{r}</span>
//             </button>
//           ))}
//         </div>

//        {/* Email Input */}
//        <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//          {/* Password Input */}
//          <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>
     
//                 {/* Error Display */}
//                 {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                
//         {/* Forgot Password */}
//         <p className="text-sm text-center mb-4">
//           <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</a>
//         </p>


// {/* Submit Button */}
// <button
//   type="submit"
//   onClick={handleSubmit}
//   disabled={isLoading}
//   className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
// >
//   {isLoading ? 'Logging in...' : 'Login'}
// </button>

//         {/* Register Link */}
//         {role !== 'Admin' && (
//           <p className="mt-4 text-sm text-center">
//             Don’t have an account?{' '}
//             <a href="/register-selection" className="text-blue-500 hover:underline">Register here</a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
