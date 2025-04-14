// import Appointment from '../models/appointmentModel.js';
// import Doctor from '../models/doctorModel.js';
// import Patient from '../models/patientModel.js';
// import { handleError } from '../utils/errorHandler.js';
// import { sendNotification } from '../config/emailConfig.js';

// export const createAppointment = async (req, res) => {
//     try {
//       const { doctorId, date: newDate, time: newTime, status } = req.body;
//       // const patientId = req.user._id;                        // Direct fetch frm authntictd user
//       console.log("req.patient:", req.patient);
//       console.log("doctorId:", doctorId);
// console.log("date:", newDate);
// console.log("time:", newTime);
       
//       const patientId = req.patient._id;

//       if (!doctorId || !newDate || !newTime) {
//         return res.status(400).json({ message: 'DoctorId, date, and time are required' });
//       }
  
//       const doctor = await Doctor.findById(doctorId);
      

//       if (!doctor) {
//         return res.status(404).json({ message: 'Doctor not found' });
//       }
  
//       const newAppointment = new Appointment({
//         doctorId,
//         patientId,
//         date: newDate, 
//         time: newTime,
//         status: status || 'Pending',
//       });
  
//       await newAppointment.save();
//       res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  

// export const getAllAppointments = async (req, res) => {
//   console.log("xcvbnm   ...........")
//   try {
//     // Assuming you have patient info from auth middleware
//     console.log(req.user,"rewsted user")
//     console.log(req.patient,"reqsted pat........")
//     const patientId = req.user?.id;
//     console.log(patientId)
//     if (!patientId) {
//       return res.status(400).json({ message: 'Patient ID required' });
//     }

//     const appointments = await Appointment.find({ patientId })
//       .populate('doctorId', 'fullName specialization')
//       .populate('patientId', 'fullName');

//     res.status(200).json({ appointments });
//   } catch (error) {
//     console.error('Error fetching appointments:', error);
//     res.status(500).json({ message: 'Server error fetching appointments' });
//   }
// };

// export const updateAppointmentStatus = async (req, res) => {
//     try {
//       const { status } = req.body;
//       const { id } = req.params;
//       if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
//         return res.status(400).json({ message: 'Invalid status' });
//       }
//     //   const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
//       const appointment = await Appointment.findById(id).populate('patientId', 'email');
//       if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
  
//       await sendNotification(appointment.patientId.email, 'Appointment Status Update', `Your appointment status is now: ${status}`);
//       res.status(200).json({ message: 'Appointment status updated successfully', appointment });
//     } catch (error) {
//       handleError(res, error);
//     }
//   };

// // Cancel Appointment
// export const cancelAppointment = async (req, res) => {
//   try {
//     const { appointmentId } = req.params;

//     const appointment = await Appointment.findById(appointmentId);

//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }

//     // Optionally, check if already cancelled
//     if (appointment.status === 'cancelled') {
//       return res.status(400).json({ message: 'Appointment already cancelled' });
//     }

//     appointment.status = 'cancelled';
//     await appointment.save();

//     res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
//   } catch (error) {
//     console.error('Cancel Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const rescheduleAppointment = async (req, res) => {
//   console.log('Rescheduling appointment:', req.params.id, req.body);

//   try {
//     const appointmentId = req.params.id;
//     const { newDate, newTime } = req.body;

//     // Check for missing fields
//     if (!newDate || !newTime) {
//       return res.status(400).json({ message: 'New date and time are required.' });
//     }

//     // Find appointment by ID
//     const appointment = await Appointment.findById(appointmentId);
//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found.' });
//     }

//     // Check if new date/time is in the future
// const newDateTime = new Date(`${newDate}T${newTime}`);
// if (newDateTime < new Date()) {
//   return res.status(400).json({ message: 'New appointment time must be in the future' });
// }

//     // Update fields
//     appointment.date = newDate;
//     appointment.time = newTime;
//     appointment.status = 'rescheduled';

//     // Save updated appointment
//     await appointment.save();

//     res.status(200).json({
//       message: 'Appointment rescheduled successfully',
//       appointment,
//     });

//   } catch (error) {
//     console.error('Error in rescheduleAppointment:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
 
//   export const getAppointmentsByPatient = async (req, res) => {
//     try {
//       console.log(" Reached getAppointmentsByPatient controller");
//       console.log("req...",req.id)
//       const patientId = req.patient._id;
  
//       const rawAppointments = await Appointment.find({ patientId });
//       console.log("🔍 Raw appointments:", rawAppointments); 
  
//       const appointments = await Appointment.find({ patientId })
//         .populate("doctorId", "fullName email specialization experience");
//   console.log(appointments,"asdfghjkl..........................");
//       res.status(200).json(appointments);
//     } catch (error) {
//       console.error(" Full error fetching appointments:", error);
//       res.status(500).json({ message: "Failed to fetch appointments" });
//     }
//   };



import Appointment from '../models/appointmentModel.js';
import Doctor from '../models/doctorModel.js';
import Patient from '../models/patientModel.js';
import { handleError } from '../utils/errorHandler.js';
import { sendNotification } from '../config/emailConfig.js';
import {checkDoctorAvailability} from '../utils/availabilityChecker.js';

// Helper function to validate date/time
const isValidAppointmentTime = (date, time) => {
  const appointmentDateTime = new Date(`${date}T${time}`);
  return appointmentDateTime > new Date();
};

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patientId = req.patient?._id || req.user?.id;


// Check doctor availability
const isAvailable = await checkDoctorAvailability(doctorId, date, time);
if (!isAvailable) {
  console.log(`Checking availability for doctor ${doctorId} at ${date} ${time}`);
  
  


  return res.status(409).json({ message: 'Doctor not available at this time' });
}

    // Validate inputs
    if (!doctorId || !date || !time || !patientId) {
      return res.status(400).json({ 
        message: 'Doctor ID, date, time, and patient ID are required' 
      });
    }

    // Validate appointment time is in the future
    if (!isValidAppointmentTime(date, time)) {
      return res.status(400).json({ 
        message: 'Appointment time must be in the future' 
      });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check for existing appointment at same time
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      time,
      status: { $in: ['Pending', 'Confirmed'] }
    });
    console.log("Conflicting appointment found:", existingAppointment);
    if (existingAppointment) {
      
      return res.status(409).json({ 
        message: 'Time slot already booked' 
      });
    }

    // Create and save appointment
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date,
      time,
      status: 'Confirmed' // Default to confirmed
    });

    await newAppointment.save();

    // Populate doctor details for response
    const populatedAppointment = await Appointment.findById(newAppointment._id)
      .populate('doctorId', 'fullName specialization')
      .populate('patientId', 'fullName');

    // Send confirmation email

    const patientEmail = req.patient?.email || req.user?.email;

await sendNotification(
  patientEmail,
  'Appointment Confirmation',
  `Your appointment with Dr. ${doctor.fullName} is confirmed for ${date} at ${time}`
);

    // await sendNotification(
    //   req.patient.email,
    //   'Appointment Confirmation',
    //   `Your appointment with Dr. ${doctor.fullName} is confirmed for ${date} at ${time}`
    // );

    res.status(201).json({
      _id: populatedAppointment._id,
      doctor: {
        _id: populatedAppointment.doctorId._id,
        fullName: populatedAppointment.doctorId.fullName,
        specialization: populatedAppointment.doctorId.specialization
      },
      patientId: populatedAppointment.patientId,
      date: populatedAppointment.date,
      time: populatedAppointment.time,
      status: populatedAppointment.status
    });

  } catch (error) {
    console.error('Appointment creation error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to create appointment' 
    });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const patientId = req.user?.id || req.patient?._id;
    
    if (!patientId) {
      return res.status(400).json({ message: 'Patient ID required' });
    }

    const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

    const appointments = await Appointment.find({ patientId })
    .skip(skip)
  .limit(limit)
      .populate('doctorId', 'fullName specialization')
      .populate('patientId', 'fullName')
      .sort({ date: 1, time: 1 }); // Sort by date and time

    // Categorize appointments
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const categorized = appointments.reduce((acc, app) => {
      if (app.status === 'Completed' || app.status === 'Cancelled') {
        acc.past.push(app);
      } else if (app.date < today || (app.date === today && app.time < currentTime)) {
        acc.past.push({ ...app.toObject(), status: 'Missed' });
      } else {
        acc.upcoming.push(app);
      }
      return acc;
    }, { upcoming: [], past: [] });

    res.status(200).json({
      all: appointments,
      ...categorized
    });

  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ 
      message: 'Server error fetching appointments' 
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    
    const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const appointment = await Appointment.findById(id)
      .populate('patientId', 'email')
      .populate('doctorId', 'fullName');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Prevent invalid status transitions
    if (appointment.status === 'Completed' && status !== 'Completed') {
      return res.status(400).json({ 
        message: 'Completed appointments cannot be modified' 
      });
    }

    appointment.status = status;
    await appointment.save();

    // Send notification
    await sendNotification(
      appointment.patientId.email,
      'Appointment Status Update',
      `Your appointment with Dr. ${appointment.doctorId.fullName} is now ${status}`
    );

    res.status(200).json({ 
      message: 'Appointment status updated successfully',
      appointment 
    });

  } catch (error) {
    handleError(res, error);
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const patientId = req.user._id;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      patientId
    }).populate('doctorId', 'fullName');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.status === 'Cancelled') {
      return res.status(400).json({ message: 'Appointment already cancelled' });
    }

    // Validate cancellation time (e.g., at least 24 hours in advance)
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
    const hoursUntilAppointment = (appointmentDateTime - new Date()) / (1000 * 60 * 60);
    
    if (hoursUntilAppointment < 24) {
      return res.status(400).json({ 
        message: 'Appointments can only be cancelled at least 24 hours in advance' 
      });
    }

    appointment.status = 'Cancelled';
    const updatedAppointment = await appointment.save();

    // Send cancellation email
    await sendNotification(
      req.user.email,
      'Appointment Cancelled',
      `Your appointment with Dr. ${appointment.doctorId.fullName} has been cancelled`
    );

    res.status(200).json({ 
      message: 'Appointment cancelled successfully',
      appointment: updatedAppointment 
    });

  } catch (error) {
    console.error('Cancel Error:', error);
    res.status(500).json({ 
      message: error.message || 'Internal server error' 
    });
  }
};

export const rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { newDate, newTime } = req.body;
    const patientId = req.user?.id;

    console.log("Patient:", req.user);
console.log("User:", req.user);


    console.log("Incoming data:", { id, newDate, newTime, patientId });

    if (!newDate || !newTime) {
      return res.status(400).json({
        message: 'New date and time are required',
      });
    }

    // Validate that the new time is in the future
    const selectedDateTime = new Date(`${newDate}T${newTime}`);
    const now = new Date();
    
    if (selectedDateTime <= now) {
      return res.status(400).json({
        message: 'New appointment time must be in the future',
      });
    }

    // Find and validate the appointment
    const appointment = await Appointment.findOne({
      _id: id,
      patientId,
    }).populate('doctorId', 'fullName');

    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found',
      });
    }

    console.log("Fetched appointment:", appointment);

    // Check if the new slot is available
    const conflictingAppointment = await Appointment.findOne({
      doctorId: appointment.doctorId,
      date: newDate,
      time: newTime,
      status: { $in: ['Pending', 'Confirmed'] },
      _id: { $ne: id }, // Ensure we're not checking the same appointment
    });

    if (conflictingAppointment) {
      return res.status(409).json({
        message: 'New time slot is already booked',
      });
    }

    // Update the appointment with new date and time
    appointment.date = newDate;
    appointment.time = newTime;
    appointment.status = 'Confirmed'; // Reset to confirmed
    await appointment.save();

    console.log("Updated appointment successfully");

    // const email = req.user?.email || req.patient?.email;

    // Send notification to the patient
    await sendNotification(
      // email,
      req.user?.email || req.patient?.email,
      'Appointment Rescheduled',
      `Your appointment with Dr. ${appointment.doctorId.fullName} has been rescheduled to ${newDate} at ${newTime}`
    );

    // Send response back to client
    res.status(200).json({
      message: 'Appointment rescheduled successfully',
      appointment,
    });
  } catch (error) {
    // Log error with more details
    console.error('Reschedule Appointment Error:', error.message, error.stack);

    // Send generic error message to client
    res.status(500).json({
      message: 'Internal server error. Please try again later.',
    });
  }
};


export const getAppointmentsByPatient = async (req, res) => {
  try {
    const patientId = req.patient?._id || req.user?.id;

    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "fullName email specialization experience")
      .sort({ date: 1, time: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ 
      message: error.message || "Failed to fetch appointments" 
    });
  }
};