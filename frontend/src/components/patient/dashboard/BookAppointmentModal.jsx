import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endPoints";
import { toast } from "react-toastify";

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
      toast.success("Appointment booked successfully!");
      onBookingSuccess();
      onClose();
    } catch (error) {
      console.error("Error booking appointment:", error);
  //     alert("Failed to book appointment.");
  //   }
  // };

  // Check if the error response status is 409 (Conflict)
  if (error.response && error.response.status === 409) {
    // Show user-friendly error message if the doctor is not available
    toast.error("Doctor not available at this time. Please choose another slot.");
  } else {
    // Handle any other types of errors
    toast.error("Failed to book appointment. Please try again.");
  }
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
