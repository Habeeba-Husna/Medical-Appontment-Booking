// import express from 'express';
// import { protect,doctorProtect  } from '../middleware/authMiddleware.js';
// import { getDoctorProfile ,updateDoctorProfile} from '../controllers/doctorController.js';

// const router = express.Router();

// // Protected Route for Doctor Profile
// // router.get('/profile', protect, getDoctorProfile);
// // router.put('/profile', protect, updateDoctorProfile);


// // Protected Routes for Doctor Profile (only accessible by doctors)
// router.get('/profile', protect, doctorProtect, getDoctorProfile);
// router.put('/profile', protect, doctorProtect, updateDoctorProfile);
// export default router;



import express from 'express';
import {getDoctorById} from '../controllers/doctorController.js';
import { authenticate } from '../middleware/authMiddleware.js';
// import { authorizeRoles } from '../middleware/authorizeRoles.js';


const router = express.Router();
router.get('/:id',authenticate, getDoctorById);
// router.get('/:id/details',authenticate, getSingleDoctorWithDetails);
// router.get("/:id", getDoctorProfileById);


export default router;
