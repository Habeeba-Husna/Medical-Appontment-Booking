import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import { handleError } from '../utils/errorHandler.js';
import { sendNotification } from '../config/emailConfig.js';

// Helper to compute next available slot
const computeNextAvailableSlot = (slots) => {
  if (!Array.isArray(slots) || slots.length === 0) return 'Not Available';
  const sorted = slots.sort((a, b) => a.day.localeCompare(b.day));
  const next = sorted[0];
  return `${next.day} at ${next.startTime}`;
};


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


export const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No file uploaded or invalid file' });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.patient._id,
      { profilePhoto: req.file.path },
      { new: true }
    ).select('-password');

    res.status(200).json({
      message: 'Profile photo uploaded successfully',
      profilePhoto: updatedPatient.profilePhoto,
    });
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    res.status(500).json({ message: 'Something went wrong during upload' });
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




// export const getPatientProfile = async (req, res) => {
//   try {
//     const patient = await User.findById(req.userId);
//     if (!patient || patient.role !== 'patient') return res.status(404).json({ message: 'Patient not found' });
//     res.json(patient);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // Update Patient Profile
// export const updatePatientProfile = async (req, res) => {
//   const { fullName, phoneNumber, age, gender, medicalHistory } = req.body;

//   try {
//     const patient = await User.findById(req.userId);
//     if (!patient || patient.role !== 'patient') {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     patient.fullName = fullName || patient.fullName;
//     patient.phoneNumber = phoneNumber || patient.phoneNumber;
//     patient.age = age || patient.age;
//     patient.gender = gender || patient.gender;
//     patient.medicalHistory = medicalHistory || patient.medicalHistory;

//     const updatedPatient = await patient.save();
//     res.json({ message: 'Profile updated successfully', updatedPatient });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




// // Get appointments by doctor or patient
// export const getAppointmentsByUser = async (req, res) => {
//   try {
//     const { doctorId, patientId } = req.query;

//     const filter = {};
//     if (doctorId) filter.doctorId = doctorId;
//     if (patientId) filter.patientId = patientId;

//     const appointments = await Appointment.find(filter).populate('doctorId', 'fullName specialization').populate('patientId', 'fullName');

//     res.status(200).json({ message: 'Appointments fetched successfully', appointments });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
