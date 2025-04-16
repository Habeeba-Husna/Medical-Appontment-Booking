

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { TooltipProvider } from "@radix-ui/react-tooltip";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider } from 'react-redux';
// import {Toaster } from "sonner";
// import store  from './redux/store';
// // import ToastContainer from "./components/ui/ToastContainer";


// import HomePage from "./pagess/HomePage";
// import PatientRegistration from './pages/PatientRegistration';
// import DoctorRegistration from './pages/DoctorRegistration';
// import Login from './pages/Login';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';
// import RegistrationSelection from './pages/RegistrationSelection';

// import DashboardPage from "./pagess/DashboardPage";
// import DoctorsPage from "./pagess/DoctorsPage";
// import AppointmentsPage from "./pagess/AppointmentsPage";
// import UIComponentsPage from "./pagess/UIComponentsPage";
// import BookAppointmentPage from "./pagess/BookAppointmentsPage";
// import ProfilePage from "./pagess/ProfilePage";
// import MainLayout from "./components/layout/MainLayout";
// import NotFound from "./pagess/NotFound";
// import DoctorDetailsPage from "./pagess/DoctorDetailsPage";
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';




// const queryClient = new QueryClient();

// const App = () => (
//   <Provider store={store}>
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//       {/* <Toaster  richColors position="top-center" closeButton /> Toaster
//        */}
//        <ToastContainer position="top-right" autoClose={3000} />
      
//         {/* <ToastContainer /> */}
//         <BrowserRouter>
       
//           <Routes>
//             {/* Public Routes */}
//             {/* <Route path="/" element={<HomePage />} /> */}

//             <Route path="/home" element={<HomePage />} />

//             <Route path="/login" element={<Login />} />
//         <Route path="/register-selection" element={<RegistrationSelection />} />
//         <Route path="/register-patient" element={<PatientRegistration />} />
//         <Route path="/register-doctor" element={<DoctorRegistration />} />

//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
            
//             {/* Protected Routes - Wrapped in MainLayout */}
//             <Route element={<MainLayout />}>
//               <Route path="/dashboard1" element={<DashboardPage />} />
//               <Route path="/doctors" element={<DoctorsPage />} />
//               <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
//               <Route path="/book-appointment/:doctorId" element={<BookAppointmentPage />} />
//               <Route path="/appointments" element={<AppointmentsPage />} />
//               <Route path="/book-appointment/:doctorId" element={<BookAppointmentPage />} />
//               <Route path="/profile" element={<ProfilePage />} />
//               <Route path="/ui" element={<UIComponentsPage />} />
//             </Route>
            
//             {/* 404 Route */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   </Provider>
 
// );

// export default App;







import React, { useEffect } from 'react';
import { useDispatch,useSelector  } from 'react-redux';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import store  from './redux/store';
import ErrorBoundary from './utils/ErrorBoundary';
import {fetchCurrentUser} from './store/slices/authSlice';
// import ToastContainer from "./components/ui/ToastContainer";

import HomePage from "./pagess/HomePage";
import PatientRegistration from './pages/PatientRegistration';
import DoctorRegistration from './pages/DoctorRegistration';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import RegistrationSelection from './pages/RegistrationSelection';

import DashboardPage from "./pagess/DashboardPage";
import DoctorsPage from "./pagess/DoctorsPage";
import AppointmentsPage from "./pagess/AppointmentsPage";
import BookAppointmentPage from "./pagess/BookAppointmentsPage";
import ProfilePage from "./pagess/ProfilePage";
import MainLayout from "./components/layout/MainLayout";
import NotFound from "./pagess/NotFound";
import DoctorDetailsPage from "./pagess/DoctorDetailsPage";
import ProtectedRoute from './routes/ProtectedRoute';
import DoctorDashboardPage from './pagess/DoctorDashboardPage';
import AdminDashboardPage from './components/AdminSection/adminPages/AdminDashboardPage';


const queryClient = new QueryClient();

const App = () =>{
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCurrentUser());
    }
  }, [isLoggedIn]);

return  (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      {/* <Toaster  richColors position="top-center" closeButton /> Toaster
       */}
       <ToastContainer position="top-right" autoClose={3000} />
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<Login />} />
        <Route path="/register-selection" element={<RegistrationSelection />} />
        <Route path="/register-patient" element={<PatientRegistration />} />
        <Route path="/register-doctor" element={<DoctorRegistration />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Protected Routes - Wrapped in MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard1" element={<DashboardPage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
              <Route path="/book-appointment/:doctorId" element={<BookAppointmentPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard2" element={<DoctorDashboardPage />} />
              <Route path="/dashboard3" element={<AdminDashboardPage />} />
              
            </Route>
            {/* ✅ Role-Protected Routes */}
  {/* <Route
    path="/admin-dashboard"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/doctor-dashboard"
    element={
      <ProtectedRoute allowedRoles={['doctor']}>
        <DoctorDashboard />
      </ProtectedRoute>
    }
  /> */}
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
);
};

export default App;









// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/contexts/auth-context"; 

// // Pages
// import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import DoctorRegister from "./pages/auth/DoctorRegister";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import PatientDashboard from "./pages/dashboard/PatientDashboard";
// import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
// import AdminDashboard from "./pages/dashboard/AdminDashboard";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <AuthProvider>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/doctor-register" element={<DoctorRegister />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
            
//             {/* Patient Routes */}
//             <Route path="/patient-dashboard" element={<PatientDashboard />} />
//             <Route path="/patient-dashboard/:section" element={<PatientDashboard />} />
            
//             {/* Doctor Routes */}
//             <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
//             <Route path="/doctor-dashboard/:section" element={<DoctorDashboard />} />
            
//             {/* Admin Routes */}
//             <Route path="/admin-dashboard" element={<AdminDashboard />} />
//             <Route path="/admin-dashboard/:section" element={<AdminDashboard />} />
            
//             {/* 404 - Not Found */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </AuthProvider>
//   </QueryClientProvider>
// );

// export default App;
