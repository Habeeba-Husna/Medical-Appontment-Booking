import express from 'express';
import { registerPatient, 
         registerDoctor, 
         loginUser ,
         refreshToken ,
         forgotPassword, 
         resetPassword,
         adminLogin,
         adminForgotPassword,
         adminResetPassword
         } from '../controllers/authController.js';

const router = express.Router();

// Patient and Doctor 
router.post('/register/patient', registerPatient);
router.post('/register/doctor', registerDoctor);
router.post('/login', loginUser);
router.post('/refresh', refreshToken);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Admin
router.post('/admin/login', adminLogin);
router.post('/admin/forgot-password', adminForgotPassword);
router.post('/admin/reset-password', adminResetPassword);

export default router;

