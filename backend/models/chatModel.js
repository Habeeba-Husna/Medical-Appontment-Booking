
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  isGroup: {
    type: Boolean,
    default: false,
  },
  members: [
    {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'memberModel', // Dynamic reference
        required: true,
      }
  ],
  memberModel: {
    type: String,
    required: true,
    enum: ['Patient', 'Doctor'] 
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;