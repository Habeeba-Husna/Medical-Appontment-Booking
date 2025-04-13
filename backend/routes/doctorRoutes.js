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
// import {
//   getDoctorProfile,
//   updateDoctorProfile
// } from '../controllers/doctorController.js';

import {
  // verifyToken,
  // authenticateDoctor
} from '../middleware/authMiddleware.js';

const router = express.Router();

// router.use(verifyToken, authenticateDoctor); //  Apply to all routes

// router.get('/profile', getDoctorProfile);
// router.put('/profile', updateDoctorProfile);

router.get("/profile", getCurrentDoctorProfile);

// Then dynamic one
router.get("/:id", getDoctorProfileById);


export default router;
