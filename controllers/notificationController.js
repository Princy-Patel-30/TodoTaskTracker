import Notification from '../models/Notification.js';

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications', error });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update notification', error });
  }
};
