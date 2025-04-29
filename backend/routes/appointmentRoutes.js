import express from 'express';
import {createAppointment,getAllAppointments,cancelAppointment,rescheduleAppointment} from '../controllers/appointmentController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
// const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/book',authenticate,authorizeRoles('patient'), createAppointment);
router.get('/appointments',authenticate,authorizeRoles('patient'), getAllAppointments);
router.patch('/:appointmentId/cancel',authenticate,authorizeRoles('patient'), cancelAppointment);
router.patch('/reschedule/:id',authenticate,authorizeRoles('patient'),rescheduleAppointment);

export default router;