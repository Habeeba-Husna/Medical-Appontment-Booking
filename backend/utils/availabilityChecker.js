// utils/availabilityChecker.js
import Appointment from '../models/appointmentModel.js';

// Function to check if a doctor is available at a specific date and time
export const checkDoctorAvailability = async (doctorId, date, time) => {
    console.log(`Checking availability for doctor ${doctorId} at ${date} ${time}`);
  // Search for existing appointments for the doctor on the same date and time that are not cancelled
  const appointment  = await Appointment.findOne({
    doctorId,
    date,
    time,
    status: { $in: ['pending', 'confirmed'] } // ignore cancelled appointments
  });

  // If found, doctor is not available
  return !appointment;
};
