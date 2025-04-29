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




















// import express from 'express';
// import http from 'http';
// import mongoose from 'mongoose';
// import { Server } from 'socket.io';
// import dotenv from 'dotenv';
// import path from 'path';
// import connectDB from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import patientRoutes from './routes/patientRoutes.js';
// // import profileRoutes from './routes/profileRoutes.js';
// // import doctorRoutes from './routes/doctorRoutes.js';
// import appointmentRoutes from './routes/appointmentRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import messageRoutes from './routes/messageRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });
 


// app.use(cookieParser());
// app.use(express.json());
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true,
// }));

// app.use('/api/auth', authRoutes);

// app.use('/api/patient', patientRoutes);
// // app.use('/api/patient', profileRoutes);
// // app.use('/api/doctor', doctorRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/messages', messageRoutes);

// // Socket.IO for real-time messaging
// let users = {};  // To track connected users and their sockets

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Listening for a message from a user and emitting it to the receiver
//   socket.on('send_message', (data) => {
//     console.log('Message received:', data);
//     io.emit('receive_message', data);  // Broadcast the message to all users
//   });

//   // Handle user disconnection
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });


// // Connect to MongoDB and start server
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/med-appointments', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   const PORT = process.env.PORT || 5000;

//   // const PORT = process.env.PORT || 5000;
//   // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//   server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }).catch((err) => {
//   console.error('Error connecting to MongoDB:', err);
// });



import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import { setupChatSocket } from './utils/chatSocket.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import chatRoutes from './routes/chatRoutes.js'

dotenv.config();
connectDB();
// Initialize Express app
const app = express();
const server = http.createServer(app);

// Configure Socket.io
// const io = socketio(server, {
  const io = new Server(server, {

  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Attach io to app for use in controllers
app.set('io', io);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/chat', chatRoutes(io));
app.use('/api/payments', paymentRoutes);


// app.use((req, res, next) => {
//   req.io = io;  
//   next();
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Setup Socket.io chat functionality
setupChatSocket(io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});