import Patient from '../models/patientModel.js';
import { handleError } from '../utils/errorHandler.js';
import { sendNotification } from '../config/emailConfig.js';

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
    handleError(res, error);
  }
};

export const blockPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    patient.isBlocked = true;
    await patient.save();

    await sendNotification(patient.email, 'Account Blocked', 'Your account has been blocked by the admin.');
    res.status(200).json({ message: 'Patient blocked successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

export const unblockPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    patient.isBlocked = false;
    await patient.save();

    await sendNotification(patient.email, 'Account Unblocked', 'Your account has been unblocked by the admin.');
    res.status(200).json({ message: 'Patient unblocked successfully' });
  } catch (error) {
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
