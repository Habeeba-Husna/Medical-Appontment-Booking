import express from 'express';
import { getNotifications, markNotificationAsRead } from '../controllers/notificationController.js';
import { authenticatePatient } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.get('/notifications', authenticatePatient, getNotifications);
router.put('/notifications/:notificationId', authenticatePatient, markNotificationAsRead);

export default router;
