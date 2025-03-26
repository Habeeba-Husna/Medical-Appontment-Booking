import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otpCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now},
  expiresAt: { type: Date, required: true }
},
{ timestamps: true }
);

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;