
// import { verifyToken } from '../utils/jwt.js';
// import Patient from '../models/patientModel.js';
// import Doctor from '../models/doctorModel.js';
// import Admin from '../models/adminModel.js';

// export const authenticate = async (req, res, next) => {
//   console.log("in authenticate.....")
//   try {
//     const token = req.cookies.token;
//     console.log(token,"token in auth")
//     if (!token) {
     
//       return res.status(401).json({ isAuthenticated: false, message: 'Not authenticated- no token provided' });
//     }
// //     console.log("BEFORE AUTH.....")
// //     const decoded = verifyToken(token);
// //     console.log(decoded,"decoded data")
// //     req.user = decoded;
// //     next();
// //   } catch (error) {
// //     res.status(403).json({ message: 'Invalid or expired token' });
// //   }
// // };


// console.log("BEFORE AUTH.....");
//     const decoded = verifyToken(token);
//     console.log(decoded, "decoded data");
    
//     // Find the patient and attach to request
//     const patient = await Patient.findById(decoded.id).select('-password');
//     if (!patient) {
//       return res.status(401).json({ message: 'Patient not found' });
//     }
    
//     req.patient = patient; // Use req.patient for consistency
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     res.status(401).json({ 
//       message: 'Invalid or expired token',
//       error: error.message 
//     });
//   }
// };




import { verifyToken } from '../utils/jwt.js';
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import Admin from '../models/adminModel.js';

export const authenticate = async (req, res, next) => {
  console.log('Authenticating...');
  try {
    const token = req.cookies.token;
    console.log(token, "token in auth");

    if (!token) {
      return res.status(401).json({ isAuthenticated: false, message: 'Not authenticated - no token provided' });
    }

    console.log("BEFORE AUTH.....");
    const decoded = verifyToken(token);
    console.log(decoded, "decoded data");

    let user;

    // Use role to decide which model to query
    if (decoded.role === 'patient') {
      user = await Patient.findById(decoded.id).select('-password');
    } else if (decoded.role === 'doctor') {
      user = await Doctor.findById(decoded.id).select('-password');
    } else if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.id).select('-password');
    }

    if (!user) {
      return res.status(401).json({ message: `${decoded.role} not found` });
    }

    req.user = user;  // Unified field for all roles
    console.log('User authenticated:', req.user);

    next();

  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ 
      message: 'Invalid or expired token',
      error: error.message 
    });
  }
};


   