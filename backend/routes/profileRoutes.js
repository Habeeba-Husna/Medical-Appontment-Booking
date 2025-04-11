import express from 'express';
import { upload } from '../config/cloudinaryConfig.js';
import { verifyToken } from '../utils/jwt.js';
import Patient from '../models/patientModel.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { uploadProfilePhoto  } from '../controllers/patientController.js';

const router = express.Router();

router.post('/upload-profile-photo',authenticate,authorizeRoles('patient'),upload.single('profilePhoto'),uploadProfilePhoto );