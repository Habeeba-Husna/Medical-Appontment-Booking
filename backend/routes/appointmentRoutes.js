import express from 'express';
import {createAppointment,getAllAppointments} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/appointments/book', createAppointment);
router.get('/appointments', getAllAppointments);


export default router;