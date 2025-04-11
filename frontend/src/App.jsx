

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
// import UIComponentsPage from "./pagess/UIComponentsPage";
import BookAppointmentPage from "./pagess/BookAppointmentsPage";
import ProfilePage from "./pagess/ProfilePage";
import MainLayout from "./components/layout/MainLayout";
import NotFound from "./pagess/NotFound";
import DoctorDetailsPage from "./pagess/DoctorDetailsPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// import ProtectedRoute from './routes/ProtectedRoute';
import DoctorDashboardPage from "./pagess/DoctorDashboardPage";
// import AdminDashboard from './pages/AdminDashboard';




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
            {/* <Route path="/" element={<HomePage />} /> */}

            <Route path="/" element={<HomePage />} />

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
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard2" element={<DoctorDashboardPage />} />
              
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
  </Provider>
 
);

export default App;








