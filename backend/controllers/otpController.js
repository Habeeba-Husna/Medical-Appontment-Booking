import OTP from '../models/otpModel.js';
import { sendNotification } from '../config/emailConfig.js';
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import crypto from 'crypto';

// Generate OTP Function
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP for Email Verification
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await OTP.create({ email, otpCode, expiresAt });

    const subject = 'Your OTP for Verification';
    const text = `<p>Your OTP for verification is: <strong>${otpCode}</strong>. It is valid for 10 minutes.</p>`;

    await sendNotification(email, subject, text);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otpCode } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email, otpCode });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Check if the user is a Patient or Doctor
    const patient = await Patient.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      await Patient.updateOne({ email }, { isVerified: true });
      await OTP.deleteOne({ email, otpCode });
      return res.status(200).json({ message: 'Patient email verified successfully' });
    }

    if (doctor) {
      await Doctor.updateOne({ email }, { isVerified: true });
      await OTP.deleteOne({ email, otpCode });
      return res.status(200).json({ message: 'Doctor email verified successfully' });
    }

    return res.status(404).json({ message: 'Email not found' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
