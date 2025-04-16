// import express from 'express';
// import { upload } from '../config/cloudinaryConfig.js';
// // import errorHandler from '../middleware/errorMiddleware.js';
// import { registerPatient, 
//          registerDoctor, 
//          loginUser ,
//          refreshToken ,
//          forgotPassword, 
//          resetPassword,
//          adminLogin,
//          } from '../controllers/authController.js';



// const router = express.Router();

// // Patient and Doctor 

// router.post('/patient-register', registerPatient);

// router.post('/doctor-register',upload.array('documents'),(req, res, next) => {
//       // console.log("Files after multer:", req.files);
//       next();
//  }, registerDoctor);
 
// router.post('/login', loginUser);
// // router.post('/refreshtoken', refreshToken);
// router.post('/auth/refresh', refreshToken);

// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);

// // Admin

// router.post('/admin-login', adminLogin);
// export default router;













import express from 'express';
import {
  registerPatient,
  registerDoctor,
  loginUser,
  refreshToken,
  logoutUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
  getCurrentUser,
  // adminLogin
} from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';


import upload from '../middleware/uploadMulter.js';
const router = express.Router();


// Registration Routes
router.post('/register/patient', registerPatient);
// router.post('/register/doctor', upload.array('documents'), registerDoctor);
// router.post('/register/doctor', upload.array('documents', 5), registerDoctor);
router.post(
  '/register/doctor',
  (req, res, next) => {
      const uploadMiddleware = upload("doctors");
      uploadMiddleware.array("documents")(req, res, next);
  },
  registerDoctor
);

// Login Route
router.post('/login', loginUser);
// Password Reset Routes
router.post('/forgot-password', forgotPassword );
router.post('/verify-otp', verifyOTP); 
router.post('/reset-password', resetPassword );

// Token Route
router.post('/refreshtoken', refreshToken);

// Logout Route
router.post('/logout', logoutUser);
router.get('/current-user',authenticate,getCurrentUser)

// router.post('/admin-login', adminLogin);

export default router;