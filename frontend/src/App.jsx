import React, { useEffect } from 'react';
import './App.css';
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
import ProtectedRoute from './routes/ProtectedRoute';

import HomePage from "./pagess/HomePage";
import PatientRegistration from './pages/PatientRegistration';
import DoctorRegistration from './pages/DoctorRegistration';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import RegistrationSelection from './pages/RegistrationSelection';

import DashboardPage from "./pagess/DashboardPage";
// import DoctorsPage from "./pagess/DoctorsPage";
// import AppointmentsPage from "./pagess/AppointmentsPage";
// import BookAppointmentPage from "./pagess/BookAppointmentsPage";
// import ProfilePage from "./pagess/ProfilePage";
import MainLayout from "./components/layout/MainLayout";
import NotFound from "./pagess/NotFound";
// import DoctorDetailsPage from "./pagess/DoctorDetailsPage";

// import DoctorDashboardPage from './pagess/DoctorDashboardPage';
// import AdminDashboardPage from './components/AdminSection/adminPages/AdminDashboardPage';

// import MedicalRecords from './components/patient/dashboard/MedicalRecords';
// import Payments from './components/patient/dashboard/Payments';
// import Notifications from './components/patient/dashboard/Notification';
import PatientRoutes from './routes/PatientRoutes';
// import MessagePage from './pagess/MessagePage';
import ChatUI from './pagess/ChatUI';


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
            {/* <Route element={<MainLayout />}>
              <Route path="/dashboard1" element={<DashboardPage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
              <Route path="/book-appointment/:doctorId" element={<BookAppointmentPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/records" element={<MedicalRecords />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/dashboard2" element={<DoctorDashboardPage />} />
              <Route path="/dashboard3" element={<AdminDashboardPage />} />
              
            </Route> */}


             {/* Protected routes */}
  <Route element={<MainLayout />}>
    <Route 
      path="/dashboard" 
      element={
        <ProtectedRoute allowedRoles={['patient', 'doctor', 'admin']}>
          <DashboardPage />
        </ProtectedRoute>
      } 
    />
    
    <Route 
      path="/patient/*" 
      element={
        <ProtectedRoute allowedRoles={['patient']}>
          <PatientRoutes />
        </ProtectedRoute>
      } 
    />
    
    {/* <Route 
      path="/doctor/*" 
      element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DoctorRoutes />
        </ProtectedRoute>
      } 
    /> */}
    
    {/* <Route 
      path="/admin/*" 
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminRoutes />
        </ProtectedRoute>
      } 
    /> */}
  </Route>
  <Route 
      path="/chat/:doctorId" 
      element={
        <ProtectedRoute allowedRoles={['patient', 'doctor']}>
          {/* <MessagePage /> */}
          <ChatUI />
        </ProtectedRoute>
      } 
    />
     
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
);
};

export default App;


