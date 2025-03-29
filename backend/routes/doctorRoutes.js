import express from 'express';
import { protect,doctorProtect  } from '../middleware/authMiddleware.js';
import { getDoctorProfile ,updateDoctorProfile} from '../controllers/doctorController.js';

const router = express.Router();

// Protected Route for Doctor Profile
// router.get('/profile', protect, getDoctorProfile);
// router.put('/profile', protect, updateDoctorProfile);


// Protected Routes for Doctor Profile (only accessible by doctors)
router.get('/profile', protect, doctorProtect, getDoctorProfile);
router.put('/profile', protect, doctorProtect, updateDoctorProfile);
export default router;
