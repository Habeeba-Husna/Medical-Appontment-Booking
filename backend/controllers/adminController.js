import Doctor from '../models/doctorModel.js';
import Patient from '../models/patientModel.js';
import Appointment from '../models/appointmentModel.js';
import Dispute from '../models/disputeModel.js';
import { handleError } from '../utils/errorHandler.js';
import { sendNotification } from '../config/emailConfig.js';


// Manage Doctors
export const verifyDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    await sendNotification(doctor.email, 'Doctor Verified', 'Your account has been verified.');
    res.status(200).json({ message: 'Doctor verified successfully', doctor });
  } catch (error) {
    handleError(res, error);
  }
};

export const approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    await sendNotification(doctor.email, 'Doctor Approved', 'Your account has been approved.');
    res.status(200).json({ message: 'Doctor approved successfully', doctor });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

// Reports & Analytics
export const generateReports = async (req, res) => {
  try {
    const [totalDoctors, totalPatients, totalAppointments] = await Promise.all([
      Doctor.countDocuments(),
      Patient.countDocuments(),
      Appointment.countDocuments()
    ]);

    res.status(200).json({ totalDoctors, totalPatients, totalAppointments });
  } catch (error) {
    handleError(res, error);
  }
};





