import Appointment from '../models/appointmentModel.js';
import Doctor from '../models/doctorModel.js';
import Patient from '../models/patientModel.js';
import { handleError } from '../utils/errorHandler.js';
import { sendNotification } from '../config/emailConfig.js';

export const createAppointment = async (req, res) => {
    try {
      const { doctorId, date: newDate, time: newTime, status } = req.body;
      // const patientId = req.user._id;                        // Direct fetch frm authntictd user
      console.log("req.patient:", req.patient);
      console.log("doctorId:", doctorId);
console.log("date:", newDate);
console.log("time:", newTime);
       
      const patientId = req.patient._id;

      if (!doctorId || !newDate || !newTime) {
        return res.status(400).json({ message: 'DoctorId, date, and time are required' });
      }
  
      const doctor = await Doctor.findById(doctorId);
      

      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      const newAppointment = new Appointment({
        doctorId,
        patientId,
        date: newDate, 
        time: newTime,
        status: status || 'Pending',
      });
  
      await newAppointment.save();
      res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const getAllAppointments = async (req, res) => {
  console.log("xcvbnm   ...........")
  try {
    // Assuming you have patient info from auth middleware
    console.log(req.user,"rewsted user")
    console.log(req.patient,"reqsted pat........")
    const patientId = req.user?.id;
    console.log(patientId)
    if (!patientId) {
      return res.status(400).json({ message: 'Patient ID required' });
    }

    const appointments = await Appointment.find({ patientId })
      .populate('doctorId', 'fullName specialization')
      .populate('patientId', 'fullName');

    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error fetching appointments' });
  }
};


export const updateAppointmentStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const { id } = req.params;
      if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
    //   const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
      const appointment = await Appointment.findById(id).populate('patientId', 'email');
      if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
  
      await sendNotification(appointment.patientId.email, 'Appointment Status Update', `Your appointment status is now: ${status}`);
      res.status(200).json({ message: 'Appointment status updated successfully', appointment });
    } catch (error) {
      handleError(res, error);
    }
  };

// Cancel Appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Optionally, check if already cancelled
    if (appointment.status === 'cancelled') {
      return res.status(400).json({ message: 'Appointment already cancelled' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
    console.error('Cancel Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const rescheduleAppointment = async (req, res) => {
  console.log('Rescheduling appointment:', req.params.id, req.body);

  try {
    const appointmentId = req.params.id;
    const { newDate, newTime } = req.body;

    // Check for missing fields
    if (!newDate || !newTime) {
      return res.status(400).json({ message: 'New date and time are required.' });
    }

    // Find appointment by ID
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    // Check if new date/time is in the future
const newDateTime = new Date(`${newDate}T${newTime}`);
if (newDateTime < new Date()) {
  return res.status(400).json({ message: 'New appointment time must be in the future' });
}

    // Update fields
    appointment.date = newDate;
    appointment.time = newTime;
    appointment.status = 'rescheduled';

    // Save updated appointment
    await appointment.save();

    res.status(200).json({
      message: 'Appointment rescheduled successfully',
      appointment,
    });

  } catch (error) {
    console.error('Error in rescheduleAppointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
 
  export const getAppointmentsByPatient = async (req, res) => {
    try {
      console.log(" Reached getAppointmentsByPatient controller");
      console.log("req...",req.id)
      const patientId = req.patient._id;
  
      const rawAppointments = await Appointment.find({ patientId });
      console.log("🔍 Raw appointments:", rawAppointments); 
  
      const appointments = await Appointment.find({ patientId })
        .populate("doctorId", "fullName email specialization experience");
  console.log(appointments,"asdfghjkl..........................");
      res.status(200).json(appointments);
    } catch (error) {
      console.error(" Full error fetching appointments:", error);
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  };