import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 20; // Increase limit to 20


import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import cors from 'cors';
// const upload = multer({ dest: 'uploads/' });

// import patientRoutes from './routes/patientRoutes.js';
// import doctorRoutes from './routes/doctorRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
// import { notFound,errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);

// app.use('/api/patients', patientRoutes);
// app.use('/api/doctors',doctorRoutes);
app.use('/api/admin',adminRoutes);


// Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

