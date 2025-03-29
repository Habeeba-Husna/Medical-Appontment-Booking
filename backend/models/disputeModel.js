import mongoose from 'mongoose';

const disputeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  raisedBy: { type: mongoose.Schema.Types.ObjectId, refPath: 'userType', required: true },
  userType: {
    type: String,
    required: true,
    enum: ['Patient', 'Doctor'],
  },
  resolution: { type: String },
  resolvedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Admin' 
},
  status: { 
    type: String, 
    enum: ['Pending', 'Resolved'], 
    default: 'Pending' 
},

}, { timestamps: true });

const Dispute = mongoose.model('Dispute', disputeSchema);
export default Dispute;

