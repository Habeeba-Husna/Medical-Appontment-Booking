

import express from 'express';
import { protect,patientProtect  } from '../middleware/authMiddleware.js';
import { getPatientProfile,updatePatientProfile } from '../controllers/patientController.js';

const router = express.Router();

// Protected Route for Patient Profile
// router.get('/profile', protect, getPatientProfile);
// router.put('/profile', protect, updatePatientProfile);


// Protected Routes for Patient Profile (only accessible by patients)
router.get('/profile', protect, patientProtect, getPatientProfile);
router.put('/profile', protect, patientProtect, updatePatientProfile);
export default router;
