// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PatientRegistration from './pages/PatientRegistration';
// import DoctorRegistration from './pages/DoctorRegistration';
// import Login from './pages/Login';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';
// import PatientDashboard from './components/Dashboard/PatientDashboard';
// import Dashboard from './pages/Dashboard';
// import Appointments from './pages/Appointments';
// import Navbar from './pages/Navbar';
// import Sidebar from './pages/Sidebar';
// import DoctorDashboard from './pages/DoctorDasboard';

// const App = () => {
//   return (
//     <Router>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1">
//           <Navbar />
//       <Routes>
//         <Route path="/patient-registration" element={<PatientRegistration />} />
//         <Route path="/doctor-registration" element={<DoctorRegistration />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/patient-dashboard" element={<PatientDashboard />} />
//         <Route path="/dashboard1" element={<Dashboard role="Patient" />} />
//         <Route path="/dashboard2" element={<DoctorDashboard role="Doctor" />} />
//         <Route path="/appointments" element={<Appointments />} />
//         <Route path="*" element={<h1>404 Not Found</h1>} />
//       </Routes>
//       </div>
//       </div>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PatientRegistration from './pages/PatientRegistration';
import DoctorRegistration from './pages/DoctorRegistration';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
// import PatientDashboard from './components/Dashboard/PatientDashboard';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Navbar from './pages/Navbar';
import Sidebar from './pages/Sidebar';
import DoctorDashboard from './pages/DoctorDasboard';
import DoctorSidebar from './pages/DoctorSidebar';
import AdminSidebar from './pages/AdminSidebar';
import RegistrationSelection from './pages/RegistrationSelection ';
import AdminDashboard from './pages/AdminDashboard';

// Separate Component for Layout
const Layout = () => {
  const location = useLocation();

  const showPatientSidebar = location.pathname === '/dashboard1' || location.pathname === '/patient-dashboard';
  const showDoctorSidebar = location.pathname === '/dashboard2';
  const showAdminSidebar = location.pathname === '/dashboard3';
  const hideNavbar = ['/register-selection', '/register-patient', '/register-doctor', '/', '/forgot-password', '/reset-password'].includes(location.pathname);

  return (
    <div className="flex">
      {showPatientSidebar && <Sidebar />}
      {showDoctorSidebar && <DoctorSidebar />}
      {showAdminSidebar && <AdminSidebar />}
      <div className="flex-1">
        {!hideNavbar && <Navbar />}
        <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register-selection" element={<RegistrationSelection />} />
        <Route path="/register-patient" element={<PatientRegistration />} />
        <Route path="/register-doctor" element={<DoctorRegistration />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* <Route path="/patient-dashboard" element={<PatientDashboard />} /> */}
          <Route path="/dashboard1" element={<Dashboard role="Patient" />} />
          <Route path="/dashboard2" element={<DoctorDashboard role="Doctor" />} />
          <Route path="/dashboard3" element={<AdminDashboard role="Admin" />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;

