
import { useEffect, useState } from 'react';
import { getSocket } from '../socket/socket';

export const useSocket = (userId, doctorId) => {
    const [isConnected, setIsConnected] = useState(false);
    
    useEffect(() => {
      const socket = getSocket();
      
      const onConnect = () => {
        setIsConnected(true);
        if (userId && doctorId) {
          socket.emit("joinChat", { chatId: doctorId, userId });
        }
      };
      
      const onDisconnect = () => {
        setIsConnected(false);
        // Attempt reconnection
        setTimeout(() => socket.connect(), 2000);
      };
      
      // Add error handler
      const onError = (error) => {
        console.error("Socket error:", error);
        setIsConnected(false);
      };
  
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('connect_error', onError);
      
      // Manually connect if not connected
      if (!socket.connected) {
        socket.connect();
      }
      
      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('connect_error', onError);
      };
    }, [userId, doctorId]);
    
    return { isConnected };
  };