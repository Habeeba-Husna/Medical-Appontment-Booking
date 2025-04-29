import mongoose from "mongoose";
import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import Patient from "../models/patientModel.js";
import Doctor from "../models/doctorModel.js";


export const startPrivateChat = async (req, res,io) => {
    try {
      const { userId1, userId2 } = req.body;
      
      // Validate input
      if (!mongoose.Types.ObjectId.isValid(userId1) || !mongoose.Types.ObjectId.isValid(userId2)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }

  // Find both users with their types
    let patient, doctor;
    
    // Try patient first, then doctor second
    const patientFirst = await Patient.findById(userId1);
    const doctorSecond = await Doctor.findById(userId2);

    if (patientFirst && doctorSecond) {
      patient = patientFirst;
      doctor = doctorSecond;
    } else {
      // Try the reverse order if first attempt failed
      const doctorFirst = await Doctor.findById(userId1);
      const patientSecond = await Patient.findById(userId2);

      if (!doctorFirst || !patientSecond) {
        return res.status(404).json({ message: "A patient and doctor must be specified" });
      }
      
      patient = patientSecond;
      doctor = doctorFirst;
    }

   // Find or create chat
   let chat = await Chat.findOne({
    isGroup: false,
    members: { $all: [patient._id, doctor._id] },
  }).populate({
    path: 'members',
    select: 'fullName email role',
    model: ['Patient', 'Doctor']
  });

  if (!chat) {
    chat = await Chat.create({
      isGroup: false,
      members: [patient._id, doctor._id],
      memberModel: [patient.constructor.modelName, doctor.constructor.modelName]
    });
    
    chat = await Chat.findById(chat._id).populate({
      path: 'members',
      select: 'fullName email role',
      model: ['Patient', 'Doctor']
    });
  }


    // Emit to both users' rooms and the chat room
    io.to(patient._id.toString())
      .to(doctor._id.toString())
      .to(chat._id.toString())
      .emit("chatCreated", chat);

    res.status(200).json(chat);
  } catch (error) {
    console.error("Chat creation error:", error);
    res.status(500).json({ 
      message: "Failed to create chat",
      error: error.message 
    });
  }
};

  export const sendMessage = async (req, res) => {
    try {
      const { chatId, senderId, content } = req.body;
  
      // Validate chat exists
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
  
      // Validate sender is in chat
      if (!chat.members.includes(senderId)) {
        return res.status(403).json({ message: "Not a chat member" });
      }
  
      const message = await Message.create({
        chatId,
        sender: senderId,
        content,
      });
  
      const populatedMessage = await Message.populate(message, {
        path: "sender",
        select: "firstName lastName avatar"
      });
  
      // Update chat's last message timestamp
      await Chat.findByIdAndUpdate(chatId, { 
        lastMessageAt: new Date() 
      });
  
      // Emit to all members and the chat room
      io.to(chatId).emit("newMessage", populatedMessage);
  
      res.status(201).json(populatedMessage);
    } catch (error) {
      console.error("Message send error:", error);
      res.status(500).json({ 
        message: "Failed to send message",
        error: error.message 
      });
    }
  };

  export const getChatMessages = async (req, res) => {
    try {
      const { chatId } = req.params;
      const messages = await Message.find({ chatId })
        .populate("sender", "firstName lastName avatar")
        .sort({ createdAt: 1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };