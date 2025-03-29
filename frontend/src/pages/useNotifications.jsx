import { useState, useEffect } from 'react';
import axios from 'axios';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications');
        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return { notifications, loading, error };
};

export default useNotifications;
