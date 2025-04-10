// import { EventEmitter } from 'events';
// EventEmitter.defaultMaxListeners = 20; 

// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';

// // Centralized route
// import routes from './routes/mainRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();

// // Middleware
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CORS config
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
// }));

// // All routes mounted here
// app.use('/api', routes);

// // Optional: error handler
// // app.use(errorHandler);

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// import { EventEmitter } from 'events';
// EventEmitter.defaultMaxListeners = 20; 

// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import otpRoutes from './routes/otpRoutes.js';
// import cors from 'cors';
// import adminRoutes from './routes/adminRoutes.js';
// import patientRoutes from './routes/patientRoutes.js';
// import notificationRoutes from './routes/notificationRoutes.js';
// import cookieParser from 'cookie-parser';

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // app.use(cors({
// //     origin: 'http://localhost:5173', 
// //     methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
// //     allowedHeaders: ['Content-Type', 'Authorization'],
// //     credentials: true,
// //   }));


// const corsOptions = {
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     credentials: true,
//     optionsSuccessStatus: 200
//   };
  
//   app.use(cors(corsOptions));

// app.use('/api/auth', authRoutes);
// app.use('/api/otp', otpRoutes);
// app.use('/api/admin',adminRoutes);
// app.use('/api/patient', patientRoutes);
// app.use('/api', notificationRoutes);

// // app.use('/api', doctorRoutes);


// // app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




















import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use('/api/auth', authRoutes);

app.use('/api/patient', patientRoutes);
// app.use('/api/doctor', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));