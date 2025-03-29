import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 20; 


import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api', notificationRoutes);


// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

