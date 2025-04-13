import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    index: true //index for faster lookups
  },
  otpCode: { 
    type: String, 
    required: true 
  },
  expiresAt: { 
    type: Date, 
    required: true,
    index: { expires: '1m' } // Auto-delete 1min after expiry
  }
}, { timestamps: true });

//compound index for faster queries
otpSchema.index({ email: 1, otpCode: 1 }, { unique: true });

const OTP = mongoose.model('OTP', otpSchema);
export default OTP;