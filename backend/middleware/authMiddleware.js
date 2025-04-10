// // import jwt from 'jsonwebtoken';
// // import Patient from '../models/patientModel.js';


// // export const authenticateAdmin = async (req, res, next) => {
// //   const token = req.header('Authorization')?.split(' ')[1];
// //   if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

// //   try {
   
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
// //     // console.log("Decoded Token:", decoded);

// //     if (decoded.role !== 'admin') {
// //       return res.status(403).json({ message: 'Access denied. Admin only.' });
// //     }

// //     req.user = decoded; 
// //     next(); 
// //   } catch (error) {
// //     console.error('JWT Verification Error:', error.message);
// //     res.status(400).json({ message: 'Token is not valid' });
// //   }
// // };

// // export const authenticatePatient = async (req, res, next) => {
// //   const token = req.header('Authorization')?.split(' ')[1];
// //   console.log("Token:", token);

// //   if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

// //   try {
    
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     console.log("Decoded Token:", decoded);

// //     req.patient = await Patient.findById(decoded.id).select('-password');
// //     console.log("Patient from DB:", req.patient);

// //     next();
// //   } catch (error) {
// //     res.status(401).json({ message: 'Invalid token' });
// //   }
// // };




// // import jwt from 'jsonwebtoken';
// // import dotenv from 'dotenv';
// // import Patient from '../models/patientModel.js';
// // import Admin from '../models/adminModel.js';
// // import Doctor from '../models/doctorModel.js';

// // dotenv.config();

// // // Generic token verifier from cookie
// // export const verifyToken = async (req, res, next) => {
// //   const token = req.cookies.accessToken;
// //   if (!token) return res.status(401).json({ message: 'Access Denied. No token.' });

// //   try {
// //     let decoded;

// //     // Try with normal user secret first
// //     try {
// //       decoded = jwt.verify(token, process.env.JWT_SECRET); // For Patient/Doctor
// //       console.log("Decoded user from token:", decoded);

// //     } catch (err) {
// //       // Try admin secret if first one fails
// //       decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET); // For Admin
// //     }

// //     req.user = decoded;
// //     next();
// //   } catch (error) {
// //     return res.status(403).json({ message: 'Invalid token' });
// //   }
// // };

// // // Admin only
// // export const authenticateAdmin = (req, res, next) => {
// //   if (req.user?.role !== 'admin') {
// //     return res.status(403).json({ message: 'Access denied. Admin only.' });
// //   }
// //   next();
// // };

// // // Patient only
// // export const authenticatePatient = async (req, res, next) => {
// //   if (req.user?.role !== 'patient') {
// //     return res.status(403).json({ message: 'Access denied. Patient only.' });
// //   }

// //   try {
// //     const patient = await Patient.findById(req.user.id).select('-password');

// //     console.log("Auth check: role =", req.user?.role);
// // console.log("Auth check: id =", req.user?.id);


// //     if (!patient) return res.status(404).json({ message: 'Patient not found' });

// //     req.patient = patient;
// //     next();
// //   } catch (error) {
// //     res.status(500).json({ message: 'Something went wrong' });
// //   }
// // };

// // // Doctor only
// // export const authenticateDoctor = async (req, res, next) => {
// //   if (req.user?.role !== 'doctor') {
// //     return res.status(403).json({ message: 'Access denied. Doctor only.' });
// //   }

// //   try {
// //     const doctor = await Doctor.findById(req.user.id).select('-password');
// //     if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

// //     req.doctor = doctor;
// //     next();
// //   } catch (error) {
// //     res.status(500).json({ message: 'Something went wrong' });
// //   }
// // };

// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import Patient from '../models/patientModel.js';
// import Doctor from '../models/doctorModel.js';
// import Admin from '../models/adminModel.js';

// dotenv.config();

// // 🔐 Token verification middleware (reads from cookies)
// // export const verifyToken = async (req, res, next) => {
// //   const token = req.cookies.token;
// //   console.log("Token received from cookie:", token);
// //   if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

// //   try {
// //     let decoded;

// //     // Try normal user token first
// //     try {
// //       decoded = jwt.verify(token, process.env.JWT_SECRET);
// //       console.log("decoding.....",decoded)

// //     } catch (err) {
// //       // If normal secret fails, try admin token
// //       decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
// //     }

// //     req.user = decoded; // Contains: { id, role }
// //     console.log("Decoded Token:", req.user);
// //     next();
// //   } catch (error) {
// //     console.error('❌ Token verification failed:', error);
// //     return res.status(403).json({ message: 'Invalid or expired token' });
// //   }
// // };



// export const verifyToken = (req, res, next) => {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ message: "No token found. Please login." });
//     }

//     console.log("Token received from cookie:", token);

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();

//   } catch (err) {
//     console.error("❌ Token verification failed:", err.message);
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };


// // 👨‍⚕️ Patient authentication middleware
// export const authenticatePatient = async (req, res, next) => {
//   // if (req.user?.role !== 'patient') {
//   //   return res.status(403).json({ message: 'Access denied. Patient only.' });
//   // }

//   const role = req.user.role; // extracted from JWT
// if (role !== 'Patient') return res.status(403).json({ message: 'Access denied' });


//   try {
//     const patient = await Patient.findById(req.user.id).select('-password');
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });

//     if (patient.isBlocked) {
//       return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
//     }

//     req.patient = patient;
//     next();
//   } catch (error) {
//     console.error('❌ Patient auth error:', error);
//     res.status(500).json({ message: 'Something went wrong.' });
//   }
// };

// // 👩‍⚕️ Doctor authentication middleware
// export const authenticateDoctor = async (req, res, next) => {
//   if (req.user?.role !== 'doctor') {
//     return res.status(403).json({ message: 'Access denied. Doctor only.' });
//   }

//   try {
//     const doctor = await Doctor.findById(req.user.id).select('-password');
//     if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

//     if (doctor.isBlocked) {
//       return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
//     }

//     req.doctor = doctor;
//     next();
//   } catch (error) {
//     console.error('❌ Doctor auth error:', error);
//     res.status(500).json({ message: 'Something went wrong.' });
//   }
// };

// // 🛡️ Admin authentication middleware
// export const authenticateAdmin = async (req, res, next) => {
//   if (req.user?.role !== 'admin') {
//     return res.status(403).json({ message: 'Access denied. Admin only.' });
//   }

//   try {
//     const admin = await Admin.findById(req.user.id).select('-password');
//     if (!admin) return res.status(404).json({ message: 'Admin not found' });

//     req.admin = admin;
//     next();
//   } catch (error) {
//     console.error('❌ Admin auth error:', error);
//     res.status(500).json({ message: 'Something went wrong.' });
//   }
// };
























import { verifyToken } from '../utils/jwt.js';
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import Admin from '../models/adminModel.js';

export const authenticate = async (req, res, next) => {
  console.log("in authenticate.....")
  try {
    const token = req.cookies.token;
    console.log(token,"token in auth")
    if (!token) {
     
      return res.status(401).json({ isAuthenticated: false, message: 'Not authenticated' });
    }
    console.log("BEFORE AUTH.....")
    const decoded = verifyToken(token);
    console.log(decoded,"decoded data")
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};






   