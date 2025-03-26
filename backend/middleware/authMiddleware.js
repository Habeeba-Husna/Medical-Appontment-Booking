import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';  // Import the User model

// Protect Middleware
export const protect = async (req, res, next) => {
  let token;

  // Check if the request contains a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user based on decoded information
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Attach the user information to the request object
      req.user.role = decoded.role;  // Explicitly set the user role

      next();  // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Role-Based Middleware: Admin Only
export const adminProtect = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();  // Allow access to the admin-only route
  } else {
    res.status(403).json({ message: 'Access denied, Admin only' });
  }
};

// Role-Based Middleware: Doctor Only
export const doctorProtect = async (req, res, next) => {
  if (req.user && req.user.role === 'doctor') {
    next();  // Allow access to the doctor-only route
  } else {
    res.status(403).json({ message: 'Access denied, Doctor only' });
  }
};

// Role-Based Middleware: Patient Only
export const patientProtect = async (req, res, next) => {
  if (req.user && req.user.role === 'patient') {
    next();  // Allow access to the patient-only route
  } else {
    res.status(403).json({ message: 'Access denied, Patient only' });
  }
};
