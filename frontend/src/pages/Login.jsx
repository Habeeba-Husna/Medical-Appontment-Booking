// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
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

//     try {
//       await dispatch(loginUser({ email, password })).unwrap();
//       navigate('/dashboard'); // Redirect to dashboard or the appropriate page
//     } catch (err) {
//       setError(loginError || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

//           {/* Forgot password link above the login button */}
//           <p className="text-sm text-center mb-4">
//             <a href="/forgot-password" className="text-blue-500 hover:underline">
//               Forgot password?
//             </a>
//           </p>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-500 text-white py-2 rounded-md focus:outline-none hover:bg-blue-600"
//           >
//             {isLoading ? 'Logging in...' : 'Login'}
//           </button>

//           {/* Register link below the login button */}
//           <p className="mt-4 text-sm text-center">
//             Don’t have an account yet?{' '}
//             <a href="/register" className="text-blue-500 hover:underline">
//               Register for free
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, adminLogin } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default to User
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
      if (role === 'Admin') {
        await dispatch(adminLogin({ email, password })).unwrap();
        navigate('/admin-dashboard');
      } else {
        await dispatch(loginUser({ email, password })).unwrap();
        navigate('/dashboard'); // User dashboard (Patient or Doctor)
      }
    } catch (err) {
      setError(loginError || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>

          {/* Role Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Login as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="User">User (Patient/Doctor)</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Error Display */}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          {/* Forgot Password */}
          <p className="text-sm text-center mb-4">
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-md focus:outline-none hover:bg-blue-600"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {/* Register Link */}
          {role !== 'Admin' && (
            <p className="mt-4 text-sm text-center">
              Don’t have an account yet?{' '}
              <a href="/register" className="text-blue-500 hover:underline">
                Register for free
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
