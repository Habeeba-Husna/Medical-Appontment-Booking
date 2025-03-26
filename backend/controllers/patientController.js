// import Patient from '../models/patientModel.js';
// import generateToken from '../utils/generateToken.js';
// import { generateOTP } from '../utils/generateOTP.js';
// import transporter from '../utils/emailTransporter.js';
// import OTP from '../models/otpModel.js';

// // Patient Registration
// export const registerPatient = async (req, res) => {
//   const { fullName, email, phoneNumber, password, age, gender, medicalHistory } = req.body;

//   try {
//     const userExists = await Patient.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists.Please log in' });
//     }

//     const patient = await Patient.create({ fullName, email, phoneNumber, password, age, gender, medicalHistory });

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

//     res.status(201).json({ message: 'Registration successful. Please verify your email using the OTP sent.' });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Verify Email using OTP
// export const verifyEmail = async (req, res) => {
//   const { email, otpCode } = req.body;

//   try {
//     const validOTP = await OTP.findOne({ email, otpCode });

//     if (!validOTP) {
//       return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
//     }

//     // Update patient verification status
//     await Patient.findOneAndUpdate({ email }, { isVerified: true });

//     // Delete OTP after successful verification
//     await OTP.deleteOne({ email });

//     res.json({ message: 'Email verification successful' });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //Patient Login
// export const loginPatient = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const patient = await Patient.findOne({ email });

//     if (!patient) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     if (!(await patient.matchPassword(password))) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     if (!patient.isVerified) {
//       return res.status(403).json({ message: 'Please verify your email before logging in' });
//     }

//     res.json({
//       _id: patient._id,
//       name: patient.fullName,
//       email: patient.email,
//       token: generateToken(patient._id),
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// import Patient from '../models/patientModel.js';

// // Get Patient Profile
// export const getPatientProfile = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.user._id).select('-password');

//     if (!patient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     res.json(patient);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Patient Profile
// export const updatePatientProfile = async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.user._id);

//     if (!patient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     // Update profile details
//     patient.fullName = req.body.fullName || patient.fullName;
//     patient.email = req.body.email || patient.email;
//     patient.phoneNumber = req.body.phoneNumber || patient.phoneNumber;
//     patient.age = req.body.age || patient.age;
//     patient.gender = req.body.gender || patient.gender;
//     patient.medicalHistory = req.body.medicalHistory || patient.medicalHistory;

//     if (req.body.password) {
//       patient.password = req.body.password;
//     }

//     const updatedPatient = await patient.save();
//     res.json(updatedPatient);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




export const getPatientProfile = async (req, res) => {
  try {
    const patient = await User.findById(req.userId);
    if (!patient || patient.role !== 'patient') return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Patient Profile
export const updatePatientProfile = async (req, res) => {
  const { fullName, phoneNumber, age, gender, medicalHistory } = req.body;

  try {
    const patient = await User.findById(req.userId);
    if (!patient || patient.role !== 'patient') {
      return res.status(404).json({ message: 'Patient not found' });
    }

    patient.fullName = fullName || patient.fullName;
    patient.phoneNumber = phoneNumber || patient.phoneNumber;
    patient.age = age || patient.age;
    patient.gender = gender || patient.gender;
    patient.medicalHistory = medicalHistory || patient.medicalHistory;

    const updatedPatient = await patient.save();
    res.json({ message: 'Profile updated successfully', updatedPatient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};