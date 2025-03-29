import Notification from '../models/notificationModel.js';


export const getNotifications = async (req, res) => {
  try {
    const patientId = req.patient.id;  // Assuming `req.patient` contains the authenticated patient info
    const notifications = await Notification.find({ patientId: patientId });

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Update notification status to 'read'
    const notification = await Notification.findByIdAndUpdate(notificationId, { status: 'read' }, { new: true });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

  
    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


  