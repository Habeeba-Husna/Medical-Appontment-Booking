// import Doctor from '../models/doctorModel.js';
// import generateToken from '../utils/generateToken.js';
// import { generateOTP } from '../utils/generateOTP.js';
// import OTP from '../models/otpModel.js';
// import transporter from '../utils/emailTransporter.js';

// //Doctor Registration
// export const registerDoctor = async (req, res) => {
//   const { fullName, email, phoneNumber, password, specialization, experience, qualifications, clinicDetails, documents } = req.body;

//   try {
//     const doctorExists = await Doctor.findOne({ email });

//     if (doctorExists) {
//       return res.status(400).json({ message: 'Doctor already exists' });
//     }

//     const doctor = await Doctor.create({
//       fullName,
//       email,
//       phoneNumber,
//       password,
//       specialization,
//       experience,
//       qualifications,
//       clinicDetails,
//       documents,
//     });

//     // Generate OTP
//     const otpCode = generateOTP();
//     await OTP.create({ email, otpCode });

//     // Send Verification Email
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Email Verification - Medical Appointment System',
//       text: `Your verification OTP is: ${otpCode}`,
//     });

//     res.status(201).json({ message: 'Doctor registered successfully. Please verify your email using the OTP sent.' });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //Verify Email using OTP
// export const verifyDoctorEmail = async (req, res) => {
//   const { email, otpCode } = req.body;

//   try {
//     const validOTP = await OTP.findOne({ email, otpCode });

//     if (!validOTP) {
//       return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
//     }

//     await Doctor.findOneAndUpdate({ email }, { isVerified: true });

//     await OTP.deleteOne({ email });

//     res.json({ message: 'Doctor email verification successful' });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //Doctor Login
// export const loginDoctor = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const doctor = await Doctor.findOne({ email });

//     if (!doctor) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     if (!(await doctor.matchPassword(password))) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     if (!doctor.isVerified) {
//       return res.status(403).json({ message: 'Please verify your email before logging in' });
//     }

//     if (!doctor.isApproved) {
//       return res.status(403).json({ message: 'Your account is pending admin approval' });
//     }

//     res.json({
//       _id: doctor._id,
//       name: doctor.fullName,
//       email: doctor.email,
//       token: generateToken(doctor._id),
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// import Doctor from '../models/doctorModel.js';

// // Get Doctor Profile
// export const getDoctorProfile = async (req, res) => {
//   try {
//     const doctor = await Doctor.findById(req.user._id).select('-password');

//     if (!doctor) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }

//     res.json(doctor);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Doctor Profile
// export const updateDoctorProfile = async (req, res) => {
//   try {
//     const doctor = await Doctor.findById(req.user._id);

//     if (!doctor) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }

//     // Update profile details
//     doctor.fullName = req.body.fullName || doctor.fullName;
//     doctor.email = req.body.email || doctor.email;
//     doctor.phoneNumber = req.body.phoneNumber || doctor.phoneNumber;
//     doctor.specialization = req.body.specialization || doctor.specialization;
//     doctor.experience = req.body.experience || doctor.experience;
//     doctor.qualifications = req.body.qualifications || doctor.qualifications;
//     doctor.clinicDetails = req.body.clinicDetails || doctor.clinicDetails;

//     if (req.body.password) {
//       doctor.password = req.body.password;
//     }

//     const updatedDoctor = await doctor.save();
//     res.json(updatedDoctor);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



export const getDoctorProfile = async (req, res) => {
    try {
      const doctor = await User.findById(req.userId);
      if (!doctor || doctor.role !== 'doctor') return res.status(404).json({ message: 'Doctor not found' });
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
// Update Doctor Profile
export const updateDoctorProfile = async (req, res) => {
    const {
      fullName,
      phoneNumber,
      specialization,
      experience,
      qualifications,
      clinicDetails,
      documents,
    } = req.body;
  
    try {
      const doctor = await User.findById(req.userId);
      if (!doctor || doctor.role !== 'doctor') {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Update only the provided fields
      doctor.fullName = fullName || doctor.fullName;
      doctor.phoneNumber = phoneNumber || doctor.phoneNumber;
      doctor.specialization = specialization || doctor.specialization;
      doctor.experience = experience || doctor.experience;
      doctor.qualifications = qualifications || doctor.qualifications;
      doctor.clinicDetails = clinicDetails || doctor.clinicDetails;
      doctor.documents = documents || doctor.documents;
  
      const updatedDoctor = await doctor.save();
      res.json({ message: 'Doctor profile updated successfully', updatedDoctor });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };