// import mongoose from 'mongoose';

// const MessageSchema = new mongoose.Schema({
//   senderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'Sender ID is required'],
//   },
//   receiverId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'Receiver ID is required'],
//   },
//   message: {
//     type: String,
//     required: [true, 'Message content is required'],
//     trim: true,
//     maxlength: [1000, 'Message cannot be longer than 1000 characters'],
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// }, {
//   timestamps: true,
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true }
// });

// // Indexes for faster querying
// MessageSchema.index({ senderId: 1, receiverId: 1 });
// MessageSchema.index({ createdAt: 1 });

// const Message = mongoose.model('Message', MessageSchema);

// export default Message;

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;