import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    qualifications: { type: String, required: true },
    clinicDetails: { type: String, required: true },
    documents: { type: [String], required: true },
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false }
  }, 
   { timestamps: true });
  
  const Doctor = mongoose.model('Doctor', doctorSchema);

  export default Doctor;