// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { useToast } from '@/hooks/use-toast';
// import { useAppDispatch, useAppSelector } from '@/hooks';
// import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { loading, error } = useAppSelector(state => state.auth);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       toast({
//         title: "Error",
//         description: "Please fill in all fields",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     dispatch(loginStart());
    
//     // Mock login for demonstration purposes
//     try {
//       // Simulate API call
//       setTimeout(() => {
//         // For demo, allow login with any credentials
//         const mockUser = {
//           id: 'p1',
//           name: 'John Doe',
//           email,
//           role: 'patient' as const,
//         };
        
//         const mockToken = 'mock-jwt-token';
        
//         dispatch(loginSuccess({ user: mockUser, token: mockToken }));
        
//         toast({
//           title: "Success",
//           description: "Logged in successfully!",
//         });
        
//         navigate('/dashboard');
//       }, 1000);
//     } catch (err) {
//       dispatch(loginFailure('Invalid credentials'));
//       toast({
//         title: "Login failed",
//         description: "Invalid email or password",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl font-bold text-center text-medical-secondary">
//           Welcome Back
//         </CardTitle>
//         <CardDescription className="text-center">
//           Log in to your Health Harbor Connect account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input 
//               id="email" 
//               type="email" 
//               placeholder="name@example.com" 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="password">Password</Label>
//               <a 
//                 href="/forgot-password"
//                 className="text-sm text-medical-primary hover:underline"
//               >
//                 Forgot password?
//               </a>
//             </div>
//             <Input 
//               id="password" 
//               type="password" 
//               placeholder="••••••••" 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
          
//           <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-secondary" disabled={loading}>
//             {loading ? 'Logging in...' : 'Sign In'}
//           </Button>
          
//           {error && (
//             <p className="text-sm text-red-500 text-center">{error}</p>
//           )}
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-center">
//         <p className="text-sm text-gray-500">
//           Don't have an account?{' '}
//           <a 
//             href="/register"
//             className="text-medical-primary hover:underline"
//           >
//             Sign up
//           </a>
//         </p>
//       </CardFooter>
//     </Card>
//   );
// };

// export default LoginForm;




import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, adminLogin } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, Shield } from 'lucide-react';

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
      if (role === 'Admin') {
        await dispatch(adminLogin({ email, password })).unwrap();
        navigate('/dashboard3');
      } else {
        await dispatch(loginUser({ email, password, role })).unwrap();
        
        
        if (role === 'Patient') {
          navigate('/dashboard1'); 
        } else if (role === 'Doctor') {
          navigate('/dashboard2'); 
        }
      }
    } catch (err) {
      setError(loginError || 'Login failed. Please try again.');
    }
  };
  

  const roleOptions = [
    { label: 'Patient', icon: <User className="w-6 h-6 text-blue-600" />, color: 'blue' },
    { label: 'Doctor', icon: <Stethoscope className="w-6 h-6 text-green-600" />, color: 'green' },
    { label: 'Admin', icon: <Shield className="w-6 h-6 text-red-600" />, color: 'red' }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Welcome Back!</h2>

        {/* Role Selection with Icons */}
        <div className="flex justify-around mb-8">
          {roleOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setRole(option.label)}
              className={`flex flex-col items-center justify-center w-24 h-24 rounded-full transition-all duration-300 
                ${role === option.label ? 'shadow-xl bg-opacity-90 scale-110' : 'opacity-60'} 
                ${option.label === 'Patient' ? 'bg-blue-100' : option.label === 'Doctor' ? 'bg-green-100' : 'bg-red-100'}
                hover:scale-105 hover:opacity-100`}
            >
              <div className="p-4 rounded-full bg-white shadow-md">
                {option.icon}
              </div>
              <span className="mt-3 font-medium text-gray-700">{option.label}</span>
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
