import React from 'react';
import useNotifications from '../hooks/useNotifications';
import axios from 'axios';

const NotificationsPage = () => {
  const { notifications, loading, error } = useNotifications();

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.put(`/api/notifications/${notificationId}`);
      // Update the status in the local state to reflect the change
      const updatedNotifications = notifications.map((notif) =>
        notif._id === notificationId ? { ...notif, status: 'read' } : notif
      );
      setNotifications(updatedNotifications);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li key={notif._id} style={{ backgroundColor: notif.status === 'read' ? 'lightgray' : 'white' }}>
              <p>{notif.message}</p>
              <button onClick={() => handleMarkAsRead(notif._id)}>Mark as Read</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
