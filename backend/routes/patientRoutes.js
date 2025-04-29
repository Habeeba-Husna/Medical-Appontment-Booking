
import upload from '../middleware/uploadMulter.js';
import express from 'express';
import {getAllDoctors,getDoctorById,
  getSingleDoctorWithDetails
} from '../controllers/doctorController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import {getNotifications} from '../controllers/patientController.js';
import { getPatientProfile,updatePatientProfile,uploadProfilePhoto ,getConsultations,
  cancelConsultation } from '../controllers/patientController.js';

const router = express.Router();

router.get('/doctors',authenticate,authorizeRoles('patient'), getAllDoctors);
router.get('/profile', authenticate, authorizeRoles('patient'), getPatientProfile);
router.put('/profile/update', authenticate, authorizeRoles('patient'), updatePatientProfile);
router.patch('/upload-profile-photo',authenticate,(req, res, next) => {
      const uploadMiddleware = upload("patients");
      uploadMiddleware.single("profilePhoto")(req, res, next);
  },
  uploadProfilePhoto
);
router.get('/notifications',authenticate,authorizeRoles('patient'), getNotifications);

router.get('/consultations/:userId', authenticate, authorizeRoles('patient'), getConsultations);
router.delete('/consultations/:id', authenticate, authorizeRoles('patient'), cancelConsultation);

router.get('/:id/details',authenticate, getSingleDoctorWithDetails);

// router.get('/:id',authenticate,authorizeRoles('patient'), getDoctorById);


export default router;



// router.patch('/upload-profile-photo', 
//   authenticate, 
//   authorizeRoles('patient'),
//   localUpload.single('profilePhoto'), 
//   uploadProfilePhoto
// );
// router.route('/profile/photo').put(authenticate, upload.single('photo'), updatePatientPhoto);
// import cloudinaryUpload from '../middlewares/cloudinaryMulter.js';
// router.patch(
//   '/update-profile',
//   authenticate,
//   authorizeRoles('patient'),
//   cloudinaryUpload.single('profilePhoto'), // handle optional image upload
//   updatePatientProfile
// );



// import { authenticate, authorizeRoles } from './middleware/authMiddleware.js';

// app.get('/admin-dashboard', authenticate, authorizeRoles('admin'), (req, res) => {
//   res.send('Welcome Admin');
// });

// app.get('/doctor-dashboard', authenticate, authorizeRoles('doctor', 'admin'), (req, res) => {
//   res.send('Welcome Doctor');
// });

// app.get('/patient-dashboard', authenticate, authorizeRoles('patient', 'admin'), (req, res) => {
//   res.send('Welcome Patient');
// });
