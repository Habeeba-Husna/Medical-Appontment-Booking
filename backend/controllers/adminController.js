// import Admin from '../models/adminModel.js';
// import Doctor from '../models/doctorModel.js';
// import generateToken from '../utils/generateToken.js';


// // Register Admin
// export const registerAdmin = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const adminExists = await Admin.findOne({ email });
  
//       if (adminExists) {
//         return res.status(400).json({ message: 'Admin already exists' });
//       }
  
//       const admin = new Admin({ email, password });
  
//       await admin.save();
  
//       res.status(201).json({
//         _id: admin._id,
//         email: admin.email,
//         token: generateToken(admin._id),
//       });
  
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  
// // Admin Login
// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });

//     if (!admin) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }
  
//       const isMatch = await admin.matchPassword(password);
//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }

//     // if (!admin || !(await admin.matchPassword(password))) {
//     //   return res.status(401).json({ message: 'Invalid email or password' });
//     // }

//     res.json({
//       _id: admin._id,
//       email: admin.email,
//       token: generateToken(admin._id),
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Approve Doctor
// export const approveDoctor = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const doctor = await Doctor.findById(id);

//     if (!doctor) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }

//     if (doctor.isApproved) {
//       return res.status(400).json({ message: 'Doctor is already approved' });
//     }

//     doctor.isApproved = true;
//     await doctor.save();

//     res.status(200).json({ message: 'Doctor approved successfully' });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// import Doctor from '../models/doctorModel.js';

// export const approveDoctor = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const doctor = await Doctor.findById(id);

//     if (!doctor) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }

//     if (doctor.isApproved) {
//       return res.status(400).json({ message: 'Doctor is already approved' });
//     }

//     doctor.isApproved = true;
//     await doctor.save();

//     res.status(200).json({ message: 'Doctor approved successfully' });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



export const approveDoctor = async (req, res) => {
    const { doctorId } = req.body;
    try {
      const doctor = await User.findById(doctorId);
      if (!doctor || doctor.role !== 'doctor') return res.status(404).json({ message: 'Doctor not found' });
  
      doctor.isApproved = true;
      await doctor.save();
  
      res.json({ message: 'Doctor approved successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
// Get All Doctors
export const getAllDoctors = async (req, res) => {
    try {
      const doctors = await User.find({ role: 'doctor' });
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get All Patients
  export const getAllPatients = async (req, res) => {
    try {
      const patients = await User.find({ role: 'patient' });
      res.json(patients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };