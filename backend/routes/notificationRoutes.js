// import express from 'express';
// import { getNotifications, markNotificationAsRead } from '../controllers/notificationController.js';
// import { authenticatePatient } from '../middleware/authMiddleware.js'; 

// const router = express.Router();

// router.get('/notifications', authenticatePatient, getNotifications);
// router.put('/notifications/:notificationId', authenticatePatient, markNotificationAsRead);

// export default router;



import express from 'express';
import {
  getNotifications,
  markNotificationAsRead
} from '../controllers/notificationController.js';

import {
  verifyToken,
  authenticatePatient
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken, authenticatePatient); // Secure the whole file

router.get('/notifications', getNotifications);
router.put('/notifications/:notificationId', markNotificationAsRead);

export default router;
