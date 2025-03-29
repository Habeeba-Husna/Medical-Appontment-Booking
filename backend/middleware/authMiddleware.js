import jwt from 'jsonwebtoken';
import Patient from '../models/patientModel.js';


export const authenticateAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    // console.log("Decoded Token:", decoded);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    res.status(400).json({ message: 'Token is not valid' });
  }
};

export const authenticatePatient = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.patient = await Patient.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};






