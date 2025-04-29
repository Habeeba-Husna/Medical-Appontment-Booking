import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import { handleError } from '../utils/errorHandler.js';
import { sendNotification } from '../config/emailConfig.js';
import { computeNextAvailableSlot } from '../../frontend/src/utils/slotUtils.js';


// // Helper to compute next available slot
// const computeNextAvailableSlot = (slots) => {
//   if (!Array.isArray(slots) || slots.length === 0) return 'Not Available';
//   const sorted = slots.sort((a, b) => a.day.localeCompare(b.day));
//   const next = sorted[0];
//   return `${next.day} at ${next.startTime}`;
// };

// Get Patient Profile
export const getPatientProfile = async (req, res) => {
  try {
    // req.user is set by the authenticate middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const patient = await Patient.findById(req.user.id)
      .select('-password -__v -createdAt -updatedAt');

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    res.status(500).json({ 
      message: 'Failed to fetch patient profile',
      error: error.message 
    });
  }
};

// Update Patient Profile
export const updatePatientProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { fullName, email, phoneNumber, age, gender, medicalHistory } = req.body;

    // Basic validation
    if (!fullName || !email || !phoneNumber) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const updateData = {
      fullName,
      email,
      phoneNumber,
      age,
      gender,
      medicalHistory
    };

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      patient: updatedPatient
    });
  } catch (error) {
    console.error('Error updating patient profile:', error);
    
    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ 
        message: 'Email already exists',
        error: 'Duplicate email' 
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation failed',
        error: error.message 
      });
    }

    res.status(500).json({ 
      message: 'Failed to update profile',
      error: error.message 
    });
  }
};
// controllers/patientController.js

export const uploadProfilePhoto = async (req, res) => {
  try {
    const patientId = req.user.id;
    const updates = req.body; // Other fields like name, age, etc.

    // If image uploaded, add profilePhoto field to updates
    if (req.file && req.file.path) {
      updates.profilePhoto = req.file.path;
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      { $set: updates },
      { new: true }
    ).select('-password');

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      data: updatedPatient,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all patients (Admin)
export const getAllPatients = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query = search ? { fullName: { $regex: search, $options: 'i' } } : {};

    const patients = await Patient.find(query, '-password')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Patient.countDocuments(query);

    res.status(200).json({ total, page, limit, patients });
  } catch (error) {
    console.error('Error in getAllPatients:', error);
    handleError(res, error);
  }
};

// Block patient
export const blockPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    patient.isBlocked = true;
    await patient.save();

    await sendNotification(patient.email, 'Account Blocked', 'Your account has been blocked by the admin.');
    res.status(200).json({ message: 'Patient blocked successfully' });
  } catch (error) {
    console.error('Error in blockPatient:', error);
    handleError(res, error);
  }
};

// Unblock patient
export const unblockPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    patient.isBlocked = false;
    await patient.save();

    await sendNotification(patient.email, 'Account Unblocked', 'Your account has been unblocked by the admin.');
    res.status(200).json({ message: 'Patient unblocked successfully' });
  } catch (error) {
    console.error('Error in unblockPatient:', error);
    handleError(res, error);
  }
};

// Get notifications
export const getNotifications = async (req, res) => {
  try {
    res.status(200).json({ message: 'Notifications feature coming soon' });
  } catch (error) {
    console.error('Error in getNotifications:', error);
    handleError(res, error);
  }
};

//Get All Consultations by Logged-In Patient
export const getConsultations = async (req, res) => {
  try {
    // Fetch consultations for a specific patient and populate their profilePhoto
    const consultations = await Consultation.find({ userId: req.params.userId })
      .populate('userId', 'profilePhoto'); // Populate only the profilePhoto field

    if (!consultations) {
      return res.status(404).json({ message: 'No consultations found for this patient' });
    }

    res.status(200).json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({
      message: 'Failed to fetch consultations',
      error: error.message
    });
  }
};

// Cancel a Consultation (by Patient)
export const cancelConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    if (consultation.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not allowed to cancel this consultation' });
    }

    await Consultation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Consultation cancelled' });
  } catch (err) {
    console.error('Error cancelling consultation:', err);
    res.status(500).json({ error: err.message });
  }
};