import Appointment from '../models/appointmentModel.js';
import Doctor from '../models/doctorModel.js';
import Patient from '../models/patientModel.js';
import { handleError } from '../utils/errorHandler.js';
import { sendNotification } from '../config/emailConfig.js';



export const createAppointment = async (req, res) => {
    try {
      const { doctorId, date, time, status } = req.body;
      // const patientId = req.user._id;                        // Direct fetch frm authntictd user
      console.log("req.patient:", req.patient);
      console.log("doctorId:", doctorId);
console.log("date:", date);
console.log("time:", time);
       
      const patientId = req.patient._id;

      if (!doctorId || !date || !time) {
        return res.status(400).json({ message: 'DoctorId, date, and time are required' });
      }
  
      const doctor = await Doctor.findById(doctorId);
      

      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      const newAppointment = new Appointment({
        doctorId,
        patientId,
        date,
        time,
        status: status || 'Pending',
      });
  
      await newAppointment.save();
      res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

//  All Appointments with Filters

export const getAllAppointments = async (req, res) => {
    try {
      const { page = 1, limit = 10, status, doctorId, patientId } = req.query;
      const filter = {};
  
      if (status) filter.status = status;
      if (doctorId) filter.doctorId = doctorId;
      if (patientId) filter.patientId = patientId;
  
      const appointments = await Appointment.find(filter)
        .populate('doctorId', 'fullName specialization')
        .populate('patientId', 'fullName')
        .limit(limit * 1)
        .skip((page - 1) * limit);
  
      const total = await Appointment.countDocuments(filter);
  
      res.status(200).json({
        message: 'Appointments fetched successfully',
        appointments,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
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


  export const deleteAppointment = async (req, res) => {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByIdAndDelete(id);
      if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  };


  // export const getAppointmentsByPatient = async (req, res) => {
  //   try {
  //     const userId = req.user._id; // Use req.user._id instead of req.user.id
  //     const appointments = await Appointment.find({ patientId: userId })
  //     .populate("doctorId", "fullName email specialization experience");
  //     res.status(200).json(appointments);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };
  

  
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