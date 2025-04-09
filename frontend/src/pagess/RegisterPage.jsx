// import React from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import RegisterForm from '../components/auth/RegisterForm';
// import Navbar from '../components/home/Navbar';
// import Footer from '../components/home/Footer';
// import { useAppSelector } from '../hooks/useAppSelector';

// const RegisterPage = () => {
//   const { isAuthenticated } = useAppSelector(state => state.auth);

//   // Redirect if already authenticated
//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
      
//       <main className="flex-grow py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-md mx-auto">
//             <RegisterForm />
//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default RegisterPage;