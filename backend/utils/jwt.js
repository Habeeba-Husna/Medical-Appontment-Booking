

// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import Admin from '../models/adminModel.js';
// import Patient from '../models/patientModel.js';
// import Doctor from '../models/doctorModel.js';

// dotenv.config();

// // const getUserRole = (user) => {
// //   if (user instanceof Admin) return 'admin';
// //   if (user instanceof Patient) return 'patient';
// //   return 'doctor';
// // };

// const getUserRole = (user) => {
//   if (user?.__t === 'Admin' || user?.role === 'admin') return 'admin';
//   if (user?.__t === 'Patient' || user?.role === 'patient') return 'patient';
//   return 'doctor';
// };


// // export const generateAccessToken = (user) => {
// //   const role = getUserRole(user);
// //   return jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '15m' });
// // };

// // export const generateRefreshToken = (user) => {
// //   const role = getUserRole(user);
// //   return jwt.sign({ id: user._id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
// // };



// export const generateAccessToken = (user) => {
//   const role = getUserRole(user);

//   const payload = { id: user._id, role };

//   if (role === 'admin') {
//     return jwt.sign(payload, process.env.JWT_ADMIN_SECRET, { expiresIn: '30m' }); // Admin access token
//   }

//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' }); // User access token
// };

// export const generateRefreshToken = (user) => {
//   const role = getUserRole(user);

//   const payload = { id: user._id, role };

//   if (role === 'admin') {
//     return jwt.sign(payload, process.env.JWT_ADMIN_REFRESH_SECRET, { expiresIn: '14d' }); // Admin refresh token
//   }

//   return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }); // User refresh token
// };



// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import Admin from '../models/adminModel.js';
// import Patient from '../models/patientModel.js';
// import Doctor from '../models/doctorModel.js';

// dotenv.config();

// // Get role of the user
// export const getUserRole = (user) => {
//   console.log("User Role:", user?.role); // Log user role
//   if (user?.__t === 'Admin' || user?.role === 'admin') return 'admin';
//   if (user?.__t === 'Patient' || user?.role === 'patient') return 'patient';
//   return 'doctor'; // Defaulting to doctor
// };


// // Utility to get correct secret and expiry
// const getTokenConfig = (role, type) => {
//   const config = {
//     access: {
//       admin: {
//         secret: process.env.JWT_ADMIN_SECRET,
//         expiresIn: '30m'
//       },
//       user: {
//         secret: process.env.JWT_SECRET,
//         expiresIn: '15m'
//       }
//     },
//     refresh: {
//       admin: {
//         secret: process.env.JWT_ADMIN_REFRESH_SECRET,
//         expiresIn: '14d'
//       },
//       user: {
//         secret: process.env.JWT_REFRESH_SECRET,
//         expiresIn: '7d'
//       }
//     }
//   };

//   const isAdmin = role === 'admin';
//   return type === 'access'
//     ? isAdmin ? config.access.admin : config.access.user
//     : isAdmin ? config.refresh.admin : config.refresh.user;
// };

// Generate Access Token
// export const generateAccessToken = (user) => {
//   const role = getUserRole(user);
//   const { secret, expiresIn } = getTokenConfig(role, 'access');
//   const payload = { id: user._id, role };

//   // return jwt.sign(payload, secret, { expiresIn });
//   return jwt.sign(
//     { id: user._id, role: user.role }, // payload
//     process.env.JWT_SECRET,            // secret key from .env
//     { expiresIn: "15m" }               // token expiry time
//   );
// };

// // Generate Refresh Token
// export const generateRefreshToken = (user) => {
//   const role = getUserRole(user);
//   const { secret, expiresIn } = getTokenConfig(role, 'refresh');
//   const payload = { id: user._id, role };

//   return jwt.sign(payload, secret, { expiresIn });
// };




// export const generateAccessToken = (user) => {
//   const secret = user.role === 'admin' 
//     ? process.env.JWT_ADMIN_SECRET 
//     : process.env.JWT_SECRET;

//   return jwt.sign(
//     { id: user._id, role: user.role },
//     secret,
//     { expiresIn: '15m' }
//   );
// };

// export const generateRefreshToken = (user) => {
//   const secret = user.role === 'admin' 
//     ? process.env.JWT_ADMIN_REFRESH_SECRET 
//     : process.env.JWT_REFRESH_SECRET;

//   return jwt.sign(
//     { id: user._id, role: user.role },
//     secret,
//     { expiresIn: '7d' }
//   );
// };
















import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role ,email:user.email},
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role,email:user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token) => {
  console.log("verify the token.....")
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};