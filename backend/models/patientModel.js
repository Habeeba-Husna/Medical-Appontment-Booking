import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  medicalHistory: { type: String },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: 'patient' } 
},
 { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;