import express from 'express';
import  { createPaymentOrder, verifyPayment } from '../controllers/paymentController.js'
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

// Route to create a Razorpay payment order
router.post("/create-order", authenticate, authorizeRoles("patient"), createPaymentOrder);

// Route to verify Razorpay payment success (can be used as webhook for Razorpay to notify)
router.post("/verify-payment", verifyPayment);

export default router;

