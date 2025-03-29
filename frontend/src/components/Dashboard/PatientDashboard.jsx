import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endPoints";
import DoctorCard from "./DoctorCard";
import AppointmentList from "./AppointmentList";
import NotificationList from "./NotificationList";
import BookAppointmentModal from "./BookAppointmentModal";

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Fetch Doctors
  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PATIENT.DOCTORS_LIST);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Fetch Appointments
  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PATIENT.APPOINTMENTS);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Fetch Notifications
  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PATIENT.NOTIFICATIONS);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
    fetchNotifications();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>

      {/* Doctors List */}
      <section>
        <h3 className="text-xl font-semibold">Available Doctors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} setSelectedDoctor={setSelectedDoctor} />
          ))}
        </div>
      </section>

      {/* Appointments Section */}
      <AppointmentList appointments={appointments} />

      {/* Notifications Section */}
      <NotificationList notifications={notifications} />

      {/* Book Appointment Modal */}
      {selectedDoctor && (
        <BookAppointmentModal 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
          onBookingSuccess={fetchAppointments}
        />
      )}
    </div>
  );
};

export default PatientDashboard;
