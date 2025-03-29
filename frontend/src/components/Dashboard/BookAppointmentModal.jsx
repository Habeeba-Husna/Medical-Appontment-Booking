import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endPoints";

const BookAppointmentModal = ({ doctor, onClose, onBookingSuccess }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async () => {
    try {
      await axiosInstance.post(ENDPOINTS.PATIENT.BOOK_APPOINTMENT, {
        doctorId: doctor.id,
        date,
        time,
      });
      alert("Appointment booked successfully!");
      onBookingSuccess();
      onClose();
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg">
        <h3>Book Appointment with Dr. {doctor.fullName}</h3>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <button onClick={handleBooking} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Confirm</button>
        <button onClick={onClose} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
