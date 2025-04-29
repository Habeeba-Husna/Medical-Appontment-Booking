import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    razorpayOrderId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
  },
  { timestamps: true }
);


const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
