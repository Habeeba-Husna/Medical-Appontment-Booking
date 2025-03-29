import Dispute from '../models/disputeModel.js';
import { handleError } from '../utils/errorHandler.js';

// Raise a Dispute
export const raiseDispute = async (req, res) => {
  try {
    const { title, description, raisedBy } = req.body;
    const dispute = await Dispute.create({ title, description, raisedBy });
    res.status(201).json({ message: 'Dispute raised successfully', dispute });
  } catch (error) {
    handleError(res, error);
  }
};

// Resolve a Dispute
export const resolveDispute = async (req, res) => {
  try {
    const { id } = req.params;
    const { resolution, resolvedBy } = req.body;

    const dispute = await Dispute.findByIdAndUpdate(
      id,
      { resolution, resolvedBy, status: 'Resolved' },
      { new: true }
    );

    if (!dispute) return res.status(404).json({ message: 'Dispute not found' });

    res.status(200).json({ message: 'Dispute resolved successfully', dispute });
  } catch (error) {
    handleError(res, error);
  }
};

// Get All Disputes
export const getAllDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find().populate('raisedBy', 'fullName email');
    res.status(200).json({ disputes });
  } catch (error) {
    handleError(res, error);
  }
};

