

// export const approveDoctor = async (req, res) => {
//     const { doctorId } = req.body;
//     try {
//       const doctor = await User.findById(doctorId);
//       if (!doctor || doctor.role !== 'doctor') return res.status(404).json({ message: 'Doctor not found' });
  
//       doctor.isApproved = true;
//       await doctor.save();
  
//       res.json({ message: 'Doctor approved successfully' });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

  
// // Get All Doctors
// export const getAllDoctors = async (req, res) => {
//     try {
//       const doctors = await User.find({ role: 'doctor' });
//       res.json(doctors);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  
//   // Get All Patients
//   export const getAllPatients = async (req, res) => {
//     try {
//       const patients = await User.find({ role: 'patient' });
//       res.json(patients);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

import Doctor from '../models/doctorModel.js';
import Patient from '../models/patientModel.js';
import Admin from '../models/adminModel.js';
import OTP from '../models/otpModel.js';

// Manage Users
export const verifyDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, { isVerified: true });
  res.status(200).json({ message: 'Doctor verified successfully', doctor });
};

export const blockUser = async (req, res) => {
  const user = await Doctor.findById(req.params.id) || await Patient.findById(req.params.id);
  if (user) {
    user.isBlocked = true;
    await user.save();
    res.status(200).json({ message: 'User blocked successfully', user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const unblockUser = async (req, res) => {
  const user = await Doctor.findById(req.params.id) || await Patient.findById(req.params.id);
  if (user) {
    user.isBlocked = false;
    await user.save();
    res.status(200).json({ message: 'User unblocked successfully', user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const viewLogs = async (req, res) => {
  res.status(200).json({ message: 'Logs feature is not implemented yet' });
};

// Manage Appointments
export const getAppointments = async (req, res) => {
  res.status(200).json({ message: 'Appointment management feature is not implemented yet' });
};

export const resolveDispute = async (req, res) => {
  res.status(200).json({ message: 'Dispute resolution feature is not implemented yet' });
};

// Reports & Analytics
export const generateReports = async (req, res) => {
  const totalDoctors = await Doctor.countDocuments();
  const totalPatients = await Patient.countDocuments();
  res.status(200).json({ totalDoctors, totalPatients });
};