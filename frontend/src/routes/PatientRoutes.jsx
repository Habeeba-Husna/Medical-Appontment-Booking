
// src/routes/PatientRoutes.js

import { Routes, Route } from "react-router-dom";
import DoctorsPage from "../pagess/DoctorsPage";
import DoctorDetailsPage from "../pagess/DoctorDetailsPage";
import BookAppointmentPage from "../pagess/BookAppointmentsPage";
import AppointmentsPage from "../pagess/AppointmentsPage";
import ProfilePage from "../pagess/ProfilePage";
import MedicalRecords from "../components/patient/dashboard/MedicalRecords";
import Payments from "../components/patient/dashboard/Payments";
import Notifications from "../components/patient/dashboard/Notification";
import DashboardPage from "../pagess/DashboardPage";
// import MessagePage from "../pagess/MessagePage";

const PatientRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="doctors" element={<DoctorsPage />} />
      <Route path="doctors/:id" element={<DoctorDetailsPage />} />
      <Route path="book-appointment/:doctorId" element={<BookAppointmentPage />} />
      <Route path="appointments" element={<AppointmentsPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="records" element={<MedicalRecords />} />
      <Route path="payments" element={<Payments />} />
      <Route path="notifications" element={<Notifications />} />
      {/* <Route path="chat/:doctorId" element={<MessagePage />} /> */}
    </Routes>
  );
};

export default PatientRoutes;
