// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser, 
//   // adminLogin 
// } from '../store/slices/authSlice';
// import { useNavigate } from 'react-router-dom';
// import { Stethoscope, User, Shield } from 'lucide-react';
// import Cookies from 'js-cookie';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('Patient'); // Default to Patient
//   const [error, setError] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isLoading, error: loginError } = useSelector(state => state.auth);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
  
//     if (!email || !password) {
//       setError('Both fields are required.');
//       return;
//     }
  
//   //   try {
//   //     if (role === 'Admin') {
//   //       await dispatch(adminLogin({ email, password })).unwrap();
//   //       navigate('/dashboard3');
//   //     } else {
//   //       await dispatch(loginUser({ email, password, role })).unwrap();
        
        
//   //       if (role === 'Patient') {
//   //         navigate('/dashboard1'); 
//   //       } else if (role === 'Doctor') {
//   //         navigate('/dashboard2'); 
//   //       }
//   //     }
//   //   } catch (err) {
//   //     setError(loginError || 'Login failed. Please try again.');
//   //   }
//   // };
  
//   try {
//     let response;
//     if (role === 'Admin') {
//       response = await dispatch(adminLogin({ email, password })).unwrap();

//        // Save the access token in cookies after successful login
//        console.log('Admin Login Success:', response.accessToken);
//       Cookies.set('accessToken', response.accessToken, {
//         expires: 1, // 1 day expiration
//         secure: true, // Only sent over HTTPS
//         sameSite: 'Strict',
//       });

//       navigate('/dashboard3');
//     } else {
//       response = await dispatch(loginUser({ email, password, role })).unwrap();

//       console.log('User Login Success:', response.accessToken);
//        // Save the access token in cookies after successful login
//        Cookies.set('accessToken', response.accessToken, {
//         expires: 1,
//         secure: true,
//         sameSite: 'Strict',
//       });

//       // Redirect based on user role
//       if (role === 'Patient') {
//         navigate('/dashboard1');
//       } else if (role === 'Doctor') {
//         navigate('/dashboard2');
//       }
    

//       console.log('Navigation Triggered for:', response.role);
//       navigate(role === 'Patient' ? '/dashboard1' : '/dashboard2');
//       console.log(role)
//       console.log(email,password)
//       console.log(response,"asdfghj...................")
//     }
//   } catch (err) {
//     // setError(err?.message || 'Login failed. Please try again.');
//     setError(loginError || 'Login failed. Please check your credentials and try again.');
//   }
//   };
//   // const authState = useSelector(state => state.auth);




//   const roleOptions = [
//     { label: 'Patient', icon: <User className="w-6 h-6 text-blue-600" />, color: 'blue' },
//     { label: 'Doctor', icon: <Stethoscope className="w-6 h-6 text-green-600" />, color: 'green' },
//     { label: 'Admin', icon: <Shield className="w-6 h-6 text-red-600" />, color: 'red' }
//   ];

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
//         <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Welcome Back!</h2>

//         {/* Role Selection with Icons */}
//         <div className="flex justify-around mb-8">
//           {roleOptions.map((option) => (
//             <button
//               key={option.label}
//               onClick={() => setRole(option.label)}
//               className={`flex flex-col items-center justify-center w-24 h-24 rounded-full transition-all duration-300 
//                 ${role === option.label ? 'shadow-xl bg-opacity-90 scale-110' : 'opacity-60'} 
//                 ${option.label === 'Patient' ? 'bg-blue-100' : option.label === 'Doctor' ? 'bg-green-100' : 'bg-red-100'}
//                 hover:scale-105 hover:opacity-100`}
//             >
//               <div className="p-4 rounded-full bg-white shadow-md">
//                 {option.icon}
//               </div>
//               <span className="mt-3 font-medium text-gray-700">{option.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Email Input */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         {/* Password Input */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         {/* Error Display */}
//         {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        // {/* Forgot Password */}
        // <p className="text-sm text-center mb-4">
        //   <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</a>
        // </p>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
//         >
//           {isLoading ? 'Logging in...' : 'Login'}
//         </button>

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
  
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }
  

  
  try {
    let response;
    if (role === 'Admin') {
      response = await dispatch(adminLogin({ email, password })).unwrap();
    } else {
      response = await dispatch(loginUser({ email, password, role })).unwrap();
    }

      // // Save the access token and role in cookies after successful login
      // Cookies.set('accessToken', response.accessToken, {
      //   expires: 1, // 1 day expiration
      //   secure: true, // Only sent over HTTPS
      //   sameSite: 'Strict',
      // });
      // Cookies.set('userRole', role, {
      //   expires: 1,
      //   secure: true,
      //   sameSite: 'Strict',
      // });

      
      // Redirect user based on role
      if (role === 'Admin') {
        navigate('/dashboard3');
      } else if (role === 'Doctor') {
        navigate('/dashboard2');
      } else {
        navigate('/dashboard1');
      }

    } catch (err) {
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



// return (
//   <form onSubmit={handleSubmit}>
//     <input 
//       type="email" 
//       value={email} 
//       onChange={(e) => setEmail(e.target.value)} 
//       placeholder="Email" 
//       required 
//     />
//     <input 
//       type="password" 
//       value={password} 
//       onChange={(e) => setPassword(e.target.value)} 
//       placeholder="Password" 
//       required 
//     />
//     <button type="submit" disabled={isLoading}>Login</button>
//     {error && <p>{error}</p>}
//   </form>
// );