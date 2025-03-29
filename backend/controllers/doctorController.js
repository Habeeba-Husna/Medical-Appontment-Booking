import Doctor from '../models/doctorModel.js';
import { handleError } from '../utils/errorHandler.js';



export const getAllDoctors = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query = search ? { fullName: { $regex: search, $options: 'i' } } : {};

    const doctors = await Doctor.find(query, '-password')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Doctor.countDocuments(query);

    res.status(200).json({ total, page, limit, doctors });
  } catch (error) {
    handleError(res, error);
  }
};



// export const getDoctorProfile = async (req, res) => {
//     try {
//       const doctor = await User.findById(req.userId);
//       if (!doctor || doctor.role !== 'doctor') return res.status(404).json({ message: 'Doctor not found' });
//       res.json(doctor);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

  
// // Update Doctor Profile
// export const updateDoctorProfile = async (req, res) => {
//     const {
//       fullName,
//       phoneNumber,
//       specialization,
//       experience,
//       qualifications,
//       clinicDetails,
//       documents,
//     } = req.body;
  
//     try {
//       const doctor = await User.findById(req.userId);
//       if (!doctor || doctor.role !== 'doctor') {
//         return res.status(404).json({ message: 'Doctor not found' });
//       }
  
//       // Update only the provided fields
//       doctor.fullName = fullName || doctor.fullName;
//       doctor.phoneNumber = phoneNumber || doctor.phoneNumber;
//       doctor.specialization = specialization || doctor.specialization;
//       doctor.experience = experience || doctor.experience;
//       doctor.qualifications = qualifications || doctor.qualifications;
//       doctor.clinicDetails = clinicDetails || doctor.clinicDetails;
//       doctor.documents = documents || doctor.documents;
  
//       const updatedDoctor = await doctor.save();
//       res.json({ message: 'Doctor profile updated successfully', updatedDoctor });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };