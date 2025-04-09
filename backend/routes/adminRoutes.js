// import express from 'express';
// import { verifyDoctor, approveDoctor, deleteDoctor, deletePatient, generateReports } from '../controllers/adminController.js';
// import { raiseDispute, resolveDispute, getAllDisputes } from '../controllers/disputeController.js';
// import { getAllDoctors } from '../controllers/doctorController.js';
// import { getAllPatients, blockPatient, unblockPatient } from '../controllers/patientController.js';
// import { getAllAppointments,updateAppointmentStatus,deleteAppointment} from '../controllers/appointmentController.js';
// import { authenticateAdmin } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Manage Users
// router.put('/verify-doctor/:id', authenticateAdmin, verifyDoctor);
// router.put('/approve-doctor/:id', authenticateAdmin, approveDoctor);
// router.delete('/delete-doctor/:id', authenticateAdmin, deleteDoctor);
// router.delete('/delete-patients/:id', authenticateAdmin, deletePatient);

// // Doctor Management
// router.get('/doctors', authenticateAdmin, getAllDoctors);

// // Patient Management
// router.get('/patients', authenticateAdmin, getAllPatients);
// router.put('/block-patient/:id', authenticateAdmin, blockPatient);
// router.put('/unblock-patient/:id', authenticateAdmin, unblockPatient);

// // Manage Appointments
// router.get('/appointments', authenticateAdmin, getAllAppointments);
// router.put('/appointments/:id', authenticateAdmin, updateAppointmentStatus);
// router.delete('/appointments/:id', authenticateAdmin, deleteAppointment); 


// // Reports & Analytics
// router.get('/reports', authenticateAdmin, generateReports);

// //dispute
// router.post('/dispute', authenticateAdmin, raiseDispute);
// router.put('/dispute/:id', authenticateAdmin, resolveDispute);
// router.get('/disputes', authenticateAdmin, getAllDisputes);


// export default router;




import express from 'express';
import {
  verifyDoctor,
  approveDoctor,
  deleteDoctor,
  deletePatient,
  generateReports
} from '../controllers/adminController.js';

import {
  raiseDispute,
  resolveDispute,
  getAllDisputes
} from '../controllers/disputeController.js';

import { getAllDoctors } from '../controllers/doctorController.js';
import {
  getAllPatients,
  blockPatient,
  unblockPatient
} from '../controllers/patientController.js';

import {
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment
} from '../controllers/appointmentController.js';

import {
  verifyToken,
  authenticateAdmin
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken, authenticateAdmin); // ✅ Apply to all routes below

router.put('/verify-doctor/:id', verifyDoctor);
router.put('/approve-doctor/:id', approveDoctor);
router.delete('/delete-doctor/:id', deleteDoctor);
router.delete('/delete-patients/:id', deletePatient);

router.get('/doctors', getAllDoctors);
router.get('/patients', getAllPatients);
router.put('/block-patient/:id', blockPatient);
router.put('/unblock-patient/:id', unblockPatient);

router.get('/appointments', getAllAppointments);
router.put('/appointments/:id', updateAppointmentStatus);
router.delete('/appointments/:id', deleteAppointment);

router.get('/reports', generateReports);

router.post('/dispute', raiseDispute);
router.put('/dispute/:id', resolveDispute);
router.get('/disputes', getAllDisputes);

export default router;
