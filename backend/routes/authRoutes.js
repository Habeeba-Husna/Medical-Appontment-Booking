import express from 'express';
import { upload } from '../config/cloudinaryConfig.js';
// import errorHandler from '../middleware/errorMiddleware.js';
import Admin from '../models/adminModel.js';
import { registerPatient, 
         registerDoctor, 
         loginUser ,
         refreshToken ,
         forgotPassword, 
         resetPassword,
         adminLogin,
        //  adminForgotPassword,
        //  adminResetPassword
         } from '../controllers/authController.js';

const router = express.Router();

// Patient and Doctor 
router.post('/patient-register', registerPatient);

// router.post('/doctor-register', upload.single('documents'), registerDoctor);
  router.post('/doctor-register', 
    upload.array('documents'), // Must match frontend field name
    (req, res, next) => {
      console.log("Files after multer:", req.files);
      next();
 }, registerDoctor);
router.post('/login', loginUser);
router.post('/refresh', refreshToken);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Admin

router.post('/admin-login', adminLogin);
// router.post('/admin/forgot-password', adminForgotPassword);
// router.post('/admin/reset-password', adminResetPassword);

export default router;






// router.post('/register/patient', registerPatient);
// router.post('/register/doctor', registerDoctor);
// router.post('/login', loginUser);
// router.post('/refresh', refreshToken);

// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);

// // Admin
// router.post('/admin/login', adminLogin);
// router.post('/admin/forgot-password', adminForgotPassword);
// router.post('/admin/reset-password', adminResetPassword);