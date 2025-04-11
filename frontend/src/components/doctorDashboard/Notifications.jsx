import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get('/api/doctor/notifications');
      setNotifications(Array.isArray(data) ? data : data.notifications || []);

    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-medical-secondary" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          notifications.map((note) => (
            <div key={note._id} className="p-3 bg-medical-light rounded-md">
              <p className="font-medium text-medical-secondary">{note.type}</p>
              <p className="text-sm text-gray-600">{note.message}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Notifications;
