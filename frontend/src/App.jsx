


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import PatientRegistration from './pages/PatientRegistration';
// import DoctorRegistration from './pages/DoctorRegistration';
// import Login from './pages/Login';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';
// // import PatientDashboard from './components/Dashboard/PatientDashboard';
// import Dashboard from './pages/Dashboard';
// import Appointments from './pages/Appointments';
// import Navbar from './pages/Navbar';
// import Sidebar from './pages/Sidebar';
// import DoctorDashboard from './pages/DoctorDasboard';
// import DoctorSidebar from './pages/DoctorSidebar';
// import AdminSidebar from './pages/AdminSidebar';
// import RegistrationSelection from './pages/RegistrationSelection ';
// import AdminDashboard from './pages/AdminDashboard';

// // Separate Component for Layout
// const Layout = () => {
//   const location = useLocation();

//   const showPatientSidebar = location.pathname === '/dashboard1' || location.pathname === '/patient-dashboard';
//   const showDoctorSidebar = location.pathname === '/dashboard2';
//   const showAdminSidebar = location.pathname === '/dashboard3';
//   const hideNavbar = ['/register-selection', '/register-patient', '/register-doctor', '/', '/forgot-password', '/reset-password'].includes(location.pathname);

//   return (
//     <div className="flex">
//       {showPatientSidebar && <Sidebar />}
//       {showDoctorSidebar && <DoctorSidebar />}
//       {showAdminSidebar && <AdminSidebar />}
//       <div className="flex-1">
//         {!hideNavbar && <Navbar />}
//         <Routes>
        // <Route path="/" element={<Login />} />
        // {/* <Route path="/login" element={<Login />} /> */}
        // <Route path="/register-selection" element={<RegistrationSelection />} />
        // <Route path="/register-patient" element={<PatientRegistration />} />
        // <Route path="/register-doctor" element={<DoctorRegistration />} />

        //   <Route path="/forgot-password" element={<ForgotPassword />} />
        //   <Route path="/reset-password" element={<ResetPassword />} />
//           {/* <Route path="/patient-dashboard" element={<PatientDashboard />} /> */}
//           <Route path="/dashboard1" element={<Dashboard role="Patient" />} />
//           <Route path="/dashboard2" element={<DoctorDashboard role="Doctor" />} />
//           <Route path="/dashboard3" element={<AdminDashboard role="Admin" />} />
//           <Route path="/appointments" element={<Appointments />} />
//           <Route path="*" element={<h1>404 Not Found</h1>} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// };

// export default App;




//converted

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import {Toaster } from "sonner";
import store  from './redux/store';
// import ToastContainer from "./components/ui/ToastContainer";


import HomePage from "./pagess/HomePage";
import PatientRegistration from './pages/PatientRegistration';
import DoctorRegistration from './pages/DoctorRegistration';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RegistrationSelection from './pages/RegistrationSelection';

import DashboardPage from "./pagess/DashboardPage";
import DoctorsPage from "./pagess/DoctorsPage";
import AppointmentsPage from "./pagess/AppointmentsPage";
import UIComponentsPage from "./pagess/UIComponentsPage";
import BookAppointmentPage from "./pagess/BookAppointmentsPage";
import ProfilePage from "./pagess/ProfilePage";
import MainLayout from "./components/layout/MainLayout";
import NotFound from "./pagess/NotFound";
import DoctorDetailsPage from "./pagess/DoctorDetailsPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      {/* <Toaster  richColors position="top-center" closeButton /> Toaster
       */}
       <ToastContainer position="top-right" autoClose={3000} />
      
        {/* <ToastContainer /> */}
        <BrowserRouter>
       
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/register" element={<RegisterPage />} /> */}

            <Route path="/login" element={<Login />} />
        <Route path="/register-selection" element={<RegistrationSelection />} />
        <Route path="/register-patient" element={<PatientRegistration />} />
        <Route path="/register-doctor" element={<DoctorRegistration />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Protected Routes - Wrapped in MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard1" element={<DashboardPage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
              <Route path="/book-appointment/:doctorId" element={<BookAppointmentPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/book-appointment/:doctorId" element={<BookAppointmentPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/ui" element={<UIComponentsPage />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
 
);

export default App;




