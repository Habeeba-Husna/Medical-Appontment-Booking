import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { startPrivateChat, fetchDoctorById, setActiveChat, setOnlineUsers, updateUserStatus } from '../store/slices/chatSlice.js'
import { getSocket } from '../socket/socket';
import ChatUI from './ChatUI';
import { toast } from 'react-toastify';

const ParentComponent = ({ user, doctorId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [onlineUsers, setOnlineUsersState] = useState([]);

  // Fetch doctor data if not available
  useEffect(() => {
    const fetchDoctor = async () => {
      if (doctorId && !doctorData) {
        try {
          setMessagesLoading(true);
          const result = await dispatch(fetchDoctorById(doctorId));
          setDoctorData(result.payload);
          setMessagesLoading(false);
        } catch (err) {
          toast.error(err.message);
          setMessagesLoading(false);
        }
      }
    };
    fetchDoctor();
  }, [doctorId, doctorData, dispatch]);

  // Socket connection for online status and user updates
  useEffect(() => {
    const socket = getSocket();
    // if (!socket) return;
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

    socket.on("connect", () => {
      if (doctorId) {
        socket.emit("joinChat", { chatId: doctorId, userId: user._id });
      }
    });

    return () => {
      socket.off("userStatusUpdate");
      socket.off("onlineUsers");
      socket.off("newMessage");
      socket.off("connect");
    };
  }, [dispatch, user?._id, doctorId]);

  // Handle start chat logic
  const startChat = async () => {
    if (isCreatingChat || !user || !doctorId) return;
    setIsCreatingChat(true);

    try {
      const result = await dispatch(startPrivateChat({ userId1: user._id, userId2: doctorId }));
      const chat = unwrapResult(result);
      if (chat?._id) {
        dispatch(setActiveChat(chat));
        navigate(`/chat/${doctorId}`, {
          state: { chatId: chat._id },
          replace: true,
        });
      } else {
        throw new Error("Chat creation failed");
      }
    } catch (error) {
      toast.error("Failed to start chat");
    } finally {
      setIsCreatingChat(false);
    }
  };

  return (
    <div>
      <ChatUI
        user={user}
        doctorId={doctorId}
        doctorData={doctorData}
        messages={messages}
        messagesLoading={messagesLoading}
        onlineUsers={onlineUsers}
        startChat={startChat}
      />
    </div>
  );
};

export default ParentComponent;