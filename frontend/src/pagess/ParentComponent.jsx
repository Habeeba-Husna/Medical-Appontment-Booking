import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate ,useParams } from 'react-router-dom';
import { startPrivateChat, fetchDoctorById, setActiveChat, setOnlineUsers, updateUserStatus } from '../store/slices/chatSlice.js'
import { getSocket } from '../socket/socket';
import { useSocket } from '../hooks/useSocket.js';
import ChatUI from './ChatUI';
import { toast } from 'react-toastify';

const ParentComponent = ({ user, doctorId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [doctorData, setDoctorData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [onlineUsers, setOnlineUsersState] = useState([]);

  const { isConnected } = useSocket(user?._id, doctorId);
  const socket = getSocket();


  // Early return if no user
  if (!user || !user._id) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Please login to access the chat</p>
      </div>
    );
  }


  // Fetch doctor data if not available
  useEffect(() => {
    const fetchDoctor = async () => {
      if (doctorId && !doctorData) {
        try {
          setMessagesLoading(true);
          const result = await dispatch(fetchDoctorById(doctorId));
          setDoctorData(result.payload);
        } catch (err) {
          toast.error(err.message);
        } finally {
          setMessagesLoading(false);
        }
      }
    };
    fetchDoctor();
  }, [doctorId, doctorData, dispatch]);

 // Socket connection for online status and user updates
 useEffect(() => {
  if (!socket || !doctorId || !user?._id) return;
  
  if (user?._id) {
    socket.emit("userOnline", user._id);
  }
  
  socket.on("onlineUsers", (users) => {
    setOnlineUsersState(users);
    dispatch(setOnlineUsers(users));
  });
  
  socket.on("userStatusUpdate", ({ userId, isOnline }) => {
    dispatch(updateUserStatus({ userId, isOnline }));
  });

  socket.on("newMessage", (message) => {
    if (message.chatId === doctorId) {
      setMessages(prev => [...prev, message]);
    }
  });

  return () => {
    socket.off("userStatusUpdate");
    socket.off("onlineUsers");
    socket.off("newMessage");
  };
}, [dispatch, user?._id, doctorId, socket]);


  // Handle start chat logic
  const startChat = async () => {
    if (isCreatingChat || !user || !doctorId) return;
    setIsCreatingChat(true);

    try {
      const result = await dispatch(startPrivateChat({ 
        userId1: user._id, 
        userId2: doctorId 
      }));
      const chat = unwrapResult(result);
      
      if (chat?._id) {
        dispatch(setActiveChat(chat));
        navigate(`/chat/${doctorId}`, {
          state: { chatId: chat._id },
          replace: true,
        });
      }
    } catch (error) {
      toast.error("Failed to start chat");
    } finally {
      setIsCreatingChat(false);
    }
  };

  return (
    <ChatUI
      doctorId={doctorId}
      doctorData={doctorData}
      messages={messages}
      messagesLoading={messagesLoading}
      onlineUsers={onlineUsers}
      startChat={startChat}
      isConnected={isConnected}
    />
  );
};

export default ParentComponent;