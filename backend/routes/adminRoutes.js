import express from 'express';
import { verifyDoctor, blockUser, unblockUser, viewLogs, getAppointments, resolveDispute, generateReports } from '../controllers/adminController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Manage Users
router.put('/verify-doctor/:id', authenticateAdmin, verifyDoctor);
router.put('/block-user/:id', authenticateAdmin, blockUser);
router.put('/unblock-user/:id', authenticateAdmin, unblockUser);
router.get('/user-logs', authenticateAdmin, viewLogs);

// Manage Appointments
router.get('/appointments', authenticateAdmin, getAppointments);
router.put('/resolve-dispute/:id', authenticateAdmin, resolveDispute);

// Reports & Analytics
router.get('/reports', authenticateAdmin, generateReports);

export default router;