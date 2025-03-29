import express from 'express';
import { createAppointment ,getAppointmentsByPatient} from '../controllers/appointmentController.js';
import { getAllDoctors } from '../controllers/doctorController.js';
import { authenticatePatient } from '../middleware/authMiddleware.js';
// import { protect,patientProtect  } from '../middleware/authMiddleware.js';
// import { getPatientProfile,updatePatientProfile } from '../controllers/patientController.js';

const router = express.Router();

router.post('/appointments', authenticatePatient, createAppointment);
router.get('/get-appointments', authenticatePatient, getAppointmentsByPatient);
router.get('/doctors', authenticatePatient, getAllDoctors);


// router.get('/profile', protect, patientProtect, getPatientProfile);
// router.put('/profile', protect, patientProtect, updatePatientProfile);

export default router;

