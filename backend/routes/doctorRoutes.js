
import express from 'express';
import {getDoctorById} from '../controllers/doctorController.js';

import { authenticate } from '../middleware/authMiddleware.js';
// import { authorizeRoles } from '../middleware/authorizeRoles.js';


const router = express.Router();
router.get('/:id',authenticate, getDoctorById);
// router.get('/:id/details',authenticate, getSingleDoctorWithDetails);
// router.get("/:id", getDoctorProfileById);


export default router;
