// import Patient from '../models/patientModel.js';
// import Doctor from '../models/doctorModel.js';
// import { handleError } from '../utils/errorHandler.js';
// import { sendNotification } from '../config/emailConfig.js';

// // Helper to compute next available slot
// const computeNextAvailableSlot = (slots) => {
//   if (!Array.isArray(slots) || slots.length === 0) return 'Not Available';
//   const sorted = slots.sort((a, b) => a.day.localeCompare(b.day));
//   const next = sorted[0];
//   return `${next.day} at ${next.startTime}`;
// };


// // Get logged-in patient profile
// export const getPatientProfile = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.patient._id).select('-password');
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });
//     res.status(200).json(patient);
//   } catch (error) {
//     console.error('Error in getPatientProfile:', error);
//     handleError(res, error);
//   }
// };

// // Update patient profile
// export const updatePatientProfile = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.patient._id);
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });

//     const fields = ['fullName', 'email', 'phoneNumber', 'age', 'gender', 'medicalHistory'];
//     fields.forEach(field => {
//       if (req.body[field]) patient[field] = req.body[field];
//     });

//     await patient.save();
//     res.status(200).json({ message: 'Profile updated successfully', patient });
//   } catch (error) {
//     console.error('Error in updatePatientProfile:', error);
//     handleError(res, error);
//   }
// };

// // Get all patients (Admin)
// export const getAllPatients = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search = '' } = req.query;
//     const query = search ? { fullName: { $regex: search, $options: 'i' } } : {};

//     const patients = await Patient.find(query, '-password')
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     const total = await Patient.countDocuments(query);

//     res.status(200).json({ total, page, limit, patients });
//   } catch (error) {
//     console.error('Error in getAllPatients:', error);
//     handleError(res, error);
//   }
// };

// // Block patient
// export const blockPatient = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });

//     patient.isBlocked = true;
//     await patient.save();

//     await sendNotification(patient.email, 'Account Blocked', 'Your account has been blocked by the admin.');
//     res.status(200).json({ message: 'Patient blocked successfully' });
//   } catch (error) {
//     console.error('Error in blockPatient:', error);
//     handleError(res, error);
//   }
// };

// // Unblock patient
// export const unblockPatient = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });

//     patient.isBlocked = false;
//     await patient.save();

//     await sendNotification(patient.email, 'Account Unblocked', 'Your account has been unblocked by the admin.');
//     res.status(200).json({ message: 'Patient unblocked successfully' });
//   } catch (error) {
//     console.error('Error in unblockPatient:', error);
//     handleError(res, error);
//   }
// };

// // Dummy: Get notifications
// export const getNotifications = async (req, res) => {
//   try {
//     res.status(200).json({ message: 'Notifications feature coming soon' });
//   } catch (error) {
//     console.error('Error in getNotifications:', error);
//     handleError(res, error);
//   }
// };






import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';

import { uploadToCloudinary } from '../utils/cloudinary';
import { handleError } from '../utils/errorHandler.js';
import { sendNotification } from '../config/emailConfig.js';

// Helper to compute next available slot
const computeNextAvailableSlot = (slots) => {
  if (!Array.isArray(slots) || slots.length === 0) return 'Not Available';
  const sorted = slots.sort((a, b) => a.day.localeCompare(b.day));
  const next = sorted[0];
  return `${next.day} at ${next.startTime}`;
};


// Get logged-in patient profile
export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id).select('-password -refreshToken');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    handleError(res, error);
  }
};

// Update patient profile
export const updatePatientProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, age, gender, address, bloodGroup, emergencyContact, medicalHistory } = req.body;
    
    const updateData = {
      fullName,
      email,
      phoneNumber,
      age,
      gender,
      address,
      bloodGroup,
      emergencyContact,
      medicalHistory
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const patient = await Patient.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    res.status(200).json({
      message: 'Profile updated successfully',
      patient
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Update patient photo
export const updatePatientPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.path, 'patient-photos');
    
    // Update patient record
    const patient = await Patient.findByIdAndUpdate(
      req.user._id,
      { photoUrl: result.secure_url },
      { new: true }
    ).select('-password -refreshToken');

    res.status(200).json({
      message: 'Profile photo updated successfully',
      patient
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Change password
export const changePatientPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const patient = await Patient.findById(req.user._id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Verify current password
    const isMatch = await patient.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    patient.password = newPassword;
    await patient.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    handleError(res, error);
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

// Dummy: Get notifications
export const getNotifications = async (req, res) => {
  try {
    res.status(200).json({ message: 'Notifications feature coming soon' });
  } catch (error) {
    console.error('Error in getNotifications:', error);
    handleError(res, error);
  }
};


