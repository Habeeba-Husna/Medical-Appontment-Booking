
// import { verifyToken } from '../utils/jwt.js';
// import Patient from '../models/patientModel.js';
// import Doctor from '../models/doctorModel.js';
// import Admin from '../models/adminModel.js';

// export const authenticate = async (req, res, next) => {
//   console.log('Authenticating...');
//   console.log("All cookies:", req.cookies);

//   try {
//     const token = req.cookies.accessToken;
//     console.log("Token to verify:", token);

//     if (!token) {
//       return res.status(401).json({ isAuthenticated: false, message: 'Not authenticated - no token provided' });
//     }

//     console.log("BEFORE AUTH.....");
//     const decoded = verifyToken(token);
//     console.log(decoded, "decoded data");

//     let user;

//     // Use role to decide which model to query
//     if (decoded.role === 'patient') {
//       console.log("Role in decoded token:", decoded.role);

//       user = await Patient.findById(decoded.id).select('-password');
//     } else if (decoded.role === 'doctor') {
//       user = await Doctor.findById(decoded.id).select('-password');
//     } else if (decoded.role === 'admin') {
//       user = await Admin.findById(decoded.id).select('-password');
//     }

//     if (!user) {
//       return res.status(401).json({ message: `${decoded.role} not found` });
//     }

//     req.user = user;  // Unified field for all roles
//     console.log('User authenticated:', req.user);

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
  try {
    // Check for token in cookies first, then headers
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        isAuthenticated: false, 
        message: 'Not authenticated - no token provided' 
      });
    }

    const decoded = verifyToken(token);
    let user;

    // Find user based on role
    switch (decoded.role) {
      case 'patient':
        user = await Patient.findById(decoded.id).select('-password');
        break;
      case 'doctor':
        user = await Doctor.findById(decoded.id).select('-password');
        break;
      case 'admin':
        user = await Admin.findById(decoded.id).select('-password');
        break;
      default:
        return res.status(401).json({ message: 'Invalid user role' });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Session expired, please login again',
        isTokenExpired: true
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid token' 
      });
    }
    
    res.status(500).json({ 
      message: 'Authentication failed',
      error: error.message 
    });
  }
};