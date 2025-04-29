import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/paymentModel.js";
import Appointment from "../models/appointmentModel.js";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createPaymentOrder = async (req, res) => {
  try {
    const { amount, appointmentId } = req.body;

    if (!amount || !appointmentId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify appointment exists and is in pending state
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      status: 'pending'
    });
    
    if (!appointment) {
      return res.status(404).json({ 
        message: "Appointment not found or already confirmed" 
      });
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: appointmentId.toString(),
    });

    // Save payment details
    const newPayment = new Payment({
      appointment: appointmentId,
      razorpayOrderId: razorpayOrder.id,
      amount,
      status: "created",
    });
    await newPayment.save();

    res.status(200).json({
      orderId: razorpayOrder.id,
      amount: amount,
      currency: "INR"
    });
  } catch (error) {
    console.error("Error creating payment order:", error);
    res.status(500).json({ 
      message: "Error creating payment order", 
      error: error.message 
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { paymentId, orderId, signature, appointmentId } = req.body;

    if (!paymentId || !orderId || !signature || !appointmentId) {
      return res.status(400).json({ 
        message: "Missing required fields" ,
        required: ["paymentId", "orderId", "signature", "appointmentId"]
      });
    }

    // Verify signature

     // Verify signature
     const secret = process.env.RAZORPAY_KEY_SECRET;
     if (!secret) {
       throw new Error("Razorpay key secret not configured");
     }

    const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

    console.log('Signature Verification:', {
      generated: generatedSignature,
      received: signature,
      match: generatedSignature === signature
    });

    if (generatedSignature !== signature) {
      console.error("Signature mismatch:", {
        generated: generatedSignature,
        received: signature,
        secret: secret ? "set" : "not set"
      });
      return res.status(400).json({ 
        message: "Payment verification failed - invalid signature",
        debug: { generatedSignature, signature }
      });
    }
    
    // Find and update payment
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: orderId, appointment: appointmentId },
      { 
        status: "paid",
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
        paidAt: new Date()
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ 
        message: "Payment record not found",
        orderId,
        appointmentId
      });
    }

    // Update appointment status
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { 
        _id: appointmentId,
        status: "pending" // Ensure only pending appointments can be confirmed
      },
      { status: "confirmed" },
      { new: true }
    )

    if (!updatedAppointment) {
      return res.status(400).json({ 
        message: "Appointment not found or already processed",
        appointmentId,
        currentStatus: (await Appointment.findById(appointmentId))?.status
      });
    }

   res.status(200).json({ 
      success: true,
      message: "Payment verified successfully",
      appointment: updatedAppointment,
      paymentId: payment._id
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ 
      message: "Error verifying payment",
      error: error.message
    });
  }
};