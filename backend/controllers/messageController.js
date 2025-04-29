// import Message from "../models/messageModel.js";

// // Send message
// export const sendMessage = async (req, res) => {
//     const { senderId, receiverId, message, timestamp } = req.body;
  
//     // Create new message
//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//       timestamp,
//     });
  
//     try {
//       // Save message to database
//       const savedMessage = await newMessage.save();
//       res.status(200).json(savedMessage);
//     } catch (err) {
//       res.status(500).json({ error: 'Error sending message', details: err });
//     }
//   };
  
//   // Get messages between doctor and patient
//   export const getMessages = async (req, res) => {
//     const { doctorId, patientId } = req.params;
  
//     try {
//       // Fetch all messages between the doctor and the patient, ordered by timestamp
//       const messages = await Message.find({
//         $or: [
//           { senderId: doctorId, receiverId: patientId },
//           { senderId: patientId, receiverId: doctorId },
//         ],
//       }).sort({ timestamp: 1 });
  
//       res.status(200).json(messages);
//     } catch (err) {
//       res.status(500).json({ error: 'Error fetching messages', details: err });
//     }
//   };





// import asyncHandler from "../utils/asyncHandler.js";
// import Message from "../models/messageModel.js";
// import { handleError } from "../utils/errorHandler.js";


// export const getMessages = asyncHandler(async (req, res) => {
//   try {
//       const { doctorId, patientId } = req.params;

//       // Validate IDs
//       if (!mongoose.Types.ObjectId.isValid(doctorId) || !mongoose.Types.ObjectId.isValid(patientId)) {
//           return res.status(400).json({
//               success: false,
//               message: 'Invalid ID format'
//           });
//       }

//       const messages = await Message.find({
//           $or: [
//               { senderId: doctorId, receiverId: patientId },
//               { senderId: patientId, receiverId: doctorId }
//           ]
//       })
//       .sort({ createdAt: 1 })
//       .populate('senderId', 'fullName profilePhoto')
//       .populate('receiverId', 'fullName profilePhoto');

//       res.status(200).json({ 
//           success: true, 
//           data: messages 
//       });
//   } catch (error) {
//       console.error('Error fetching messages:', error);
//       res.status(500).json({
//           success: false,
//           message: 'Server error while fetching messages'
//       });
//   }
// });


// export const sendMessage = asyncHandler(async (req, res) => {
//   const { receiverId, message } = req.body;
//   const senderId = req.user._id;

//   // Validate input
//   if (!receiverId || !message) {
//       return res.status(400).json({
//           success: false,
//           message: 'Receiver ID and message content are required'
//       });
//   }

//   if (!mongoose.Types.ObjectId.isValid(receiverId)) {
//       return res.status(400).json({
//           success: false,
//           message: 'Invalid receiver ID format'
//       });
//   }

//   if (typeof message !== 'string' || message.trim().length === 0) {
//       return res.status(400).json({
//           success: false,
//           message: 'Message content must be a non-empty string'
//       });
//   }

//   if (message.length > 1000) {
//       return res.status(400).json({
//           success: false,
//           message: 'Message cannot be longer than 1000 characters'
//       });
//   }

//   try {
//       const newMessage = await Message.create({
//           senderId,
//           receiverId,
//           message: message.trim()
//       });

//       // Populate sender/receiver info
//       const populatedMessage = await Message.findById(newMessage._id)
//           .populate('senderId', 'fullName profilePhoto role')
//           .populate('receiverId', 'fullName profilePhoto role');

//       // Emit socket event to the conversation room
//       const conversationId = [senderId, receiverId].sort().join('_');
//       req.app.get('io').to(conversationId).emit('newMessage', populatedMessage);

//       res.status(201).json({
//           success: true,
//           data: populatedMessage
//       });
//   } catch (error) {
//       console.error('Error sending message:', error);
//       res.status(500).json({
//           success: false,
//           message: 'Server error while sending message'
//       });
//   }
// });
