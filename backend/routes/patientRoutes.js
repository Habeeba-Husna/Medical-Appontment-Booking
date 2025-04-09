// import express from 'express';
// import { createAppointment ,getAppointmentsByPatient,deleteAppointment,} from '../controllers/appointmentController.js';
// import { getAllDoctors, getDoctorById } from '../controllers/doctorController.js';
// import { authenticatePatient } from '../middleware/authMiddleware.js';
// import { getPatientProfile,updatePatientProfile, rateDoctor,getNotifications,getSingleDoctorWithDetails  } from '../controllers/patientController.js';

// const router = express.Router();

// // ✅ Profile Routes
// router.get('/patients/profile', authenticatePatient, getPatientProfile);
// router.put('/patients/profile/update', authenticatePatient, updatePatientProfile);

// // ✅ Doctor Routes
// router.get('/doctors', authenticatePatient, getAllDoctors);
// router.get('/doctors/:id', authenticatePatient, getDoctorById);
// router.post('/doctors/:id/rate', authenticatePatient, rateDoctor);
// router.get('/doctor/:id',authenticatePatient, getSingleDoctorWithDetails);

// // ✅ Appointment Routes
// router.post('/book-appointment', authenticatePatient, createAppointment); // BOOK_APPOINTMENT
// router.get('/get-appointments', authenticatePatient, getAppointmentsByPatient); // APPOINTMENTS
// router.post('/appointments/cancel', authenticatePatient, deleteAppointment); // CANCEL_APPOINTMENT

// // ✅ Notifications
// router.get('/notifications', authenticatePatient, getNotifications); 
// router.get('/patients/appointments', authenticatePatient, getAppointmentsByPatient);


// // router.post('/appointments', authenticatePatient, createAppointment);
// // router.get('/get-appointments', authenticatePatient, getAppointmentsByPatient);
// // router.get('/doctors', authenticatePatient, getAllDoctors);
// // router.get('/doctors/:id', authenticatePatient, getDoctorById);
// // router.post('/doctors/:id/rate', authenticatePatient, rateDoctor);
// export default router;




// import express from 'express';
// import {
//   createAppointment,
//   getAppointmentsByPatient,
//   deleteAppointment
// } from '../controllers/appointmentController.js';

// import {
//   getAllDoctors,
//   getDoctorById
// } from '../controllers/doctorController.js';

// import {
//   getPatientProfile,
//   updatePatientProfile,
//   rateDoctor,
//   getNotifications,
//   getSingleDoctorWithDetails
// } from '../controllers/patientController.js';

// import {
//   verifyToken,
//   authenticatePatient
// } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.use(verifyToken, authenticatePatient); // ✅ Apply to all routes

// // Profile
// router.get('/patients/profile', getPatientProfile);
// router.put('/patients/profile/update', updatePatientProfile);

// // Doctors
// router.get('/doctors', getAllDoctors);
// router.get('/doctors/:id', getDoctorById);
// router.get('/doctor/:id', getSingleDoctorWithDetails);
// router.post('/doctors/:id/rate', rateDoctor);

// // Appointments
// router.post('/book-appointment', createAppointment);
// router.get('/get-appointments', getAppointmentsByPatient);
// router.post('/appointments/cancel', deleteAppointment);
// router.get('/patients/appointments', getAppointmentsByPatient);

// // Notifications
// router.get('/notifications', getNotifications);

// export default router;


// import express from 'express';
// import {
//   createAppointment,
//   getAppointmentsByPatient,
//   deleteAppointment
// } from '../controllers/appointmentController.js';

// import {
//   getAllDoctors,
//   getDoctorById
// } from '../controllers/doctorController.js';

// import {
//   getPatientProfile,
//   updatePatientProfile,
//   rateDoctor,
//   getNotifications,
//   getSingleDoctorWithDetails
// } from '../controllers/patientController.js';

// import {
//   verifyToken,
//   authenticatePatient
// } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Apply JWT auth to all patient routes
// router.use(verifyToken, authenticatePatient);

// // Profile
// router.get('/patients/profile', getPatientProfile);
// router.put('/patients/profile/update', updatePatientProfile);

// // Doctors
// router.get('/doctors', getAllDoctors);
// router.get('/doctors/:id', getDoctorById);
// router.get('/doctors/:id/details', getSingleDoctorWithDetails); // Updated for route consistency
// router.post('/doctors/:id/rate', rateDoctor);

// // Appointments
// router.post('/appointments/book', createAppointment); // Renamed to be consistent
// router.get('/appointments', getAppointmentsByPatient);
// router.delete('/appointments/:id', deleteAppointment); // Changed to DELETE with param

// // Notifications
// router.get('/notifications', getNotifications);

// export default router;


// import express from 'express';
// import {
//   createAppointment,
//   getAppointmentsByPatient,
//   deleteAppointment
// } from '../controllers/appointmentController.js';

// import {
//   getAllDoctors,
//   getDoctorById,
//   rateDoctor,
//   getSingleDoctorWithDetails
// } from '../controllers/doctorController.js';

// import {
//   getPatientProfile,
//   updatePatientProfile,
//   getNotifications
// } from '../controllers/patientController.js';

// import {
//   verifyToken,
//   authenticatePatient
// } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Apply JWT auth to all patient routes
// router.use(verifyToken, authenticatePatient);

// // ✅ Profile Routes
// router.get('/profile', getPatientProfile);
// router.put('/profile/update', updatePatientProfile);

// // ✅ Doctor Routes
// router.get('/doctors', getAllDoctors);
// router.get('/:id', getDoctorById);
// router.get('/:id/details', getSingleDoctorWithDetails); // Endpoint for doctor details
// router.post('/:id/rate', rateDoctor);

// // ✅ Appointment Routes
// router.post('/appointments/book', createAppointment); // Endpoint to book appointment
// router.get('/appointments', getAppointmentsByPatient); // Get all appointments for the patient
// router.delete('/appointments/:id', deleteAppointment); // Delete an appointment (use DELETE method)

// // ✅ Notifications
// router.get('/notifications', getNotifications);

// export default router;







import express from 'express';
import {getAllDoctors,getDoctorById,getSingleDoctorWithDetails} from '../controllers/doctorController.js';

const router = express.Router();

router.get('/doctors', getAllDoctors);
router.get('/:id', getDoctorById);
router.get('/:id/details', getSingleDoctorWithDetails);

export default router;