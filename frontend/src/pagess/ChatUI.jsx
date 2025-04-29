import React, { useState, useEffect, useRef } from 'react';
import { BiSend } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { getSocket } from '../socket/socket'; 
import { useSelector } from 'react-redux';

const ChatUI = ({ 
  doctorId, 
  doctorData, 
  messages: propMessages, 
  messagesLoading, 
  onlineUsers, 
  startChat,
  isConnected 
}) => {
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState(propMessages || []);
  const messageEndRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  // Sync messages with props
  useEffect(() => {
    setMessages(propMessages || []);
  }, [propMessages]);

 // Auto-scroll
 useEffect(() => {
  messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

const handleSendMessage = () => {
  if (!user?._id) {
    toast.error("Please login to send messages");
    return;
  }

  if (!messageContent.trim()) return;

  const socket = getSocket();
  
  if (!socket.connected) {
    socket.connect();
    toast.error("Reconnecting to chat server...");
    setTimeout(() => {
      socket.connected ? handleSendMessage() : toast.error("Connection failed");
    }, 1000);
    return;
  }

  const newMessage = {
    chatId: doctorId,
    senderId: user._id,
    content: messageContent,
    createdAt: new Date().toISOString(),
    tempId: Date.now()
  };

     // Optimistic update
    setMessages(prev => [...prev, {
      ...newMessage,
      sender: { _id: user._id, avatar: user.avatar }
    }]);

    socket.emit("sendMessage", newMessage, (ack) => {
      if (ack?.error) {
        toast.error(ack.error);
        setMessages(prev => prev.filter(m => m.tempId !== newMessage.tempId));
      }
    });

    setMessageContent("");
  };

  return (
   <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-3 border-b flex items-center justify-between">
        {doctorData && (
          <div className="flex items-center">
            <img 
              src={doctorData.avatar || "/avatar.png"} 
              alt="Doctor" 
              className="w-10 h-10 rounded-full mr-3" 
            />
            <div>
              <h3 className="font-medium">{doctorData.name}</h3>
              <p className="text-xs text-gray-500">
                {onlineUsers.includes(doctorId) ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        )}

       {/* Connection status indicator */}
       <div className="flex items-center text-xs text-gray-500">
          {isConnected ? (
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Connected
            </span>
          ) : (
            <span className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
              Disconnected
            </span>
          )}
        </div>
      </div>
  

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        {messagesLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : messages?.length > 0 ? (
          messages.map((msg) => (
            <MessageItem 
              key={msg._id || msg.tempId} 
              msg={msg} 
              user={user} 
              doctorData={doctorData} 
            />
          ))
        ) : (
          <EmptyState startChat={startChat} />
        )}
        <div ref={messageEndRef} />
      </div>
      {/* Message input */}
      <MessageInput 
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

// Extracted components for better readability
const MessageItem = ({ msg, user, doctorData }) => {
  const isSentByUser = msg.senderId === user._id;
  
  return (
    <div className={`flex ${isSentByUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isSentByUser && (
        <img 
          src={doctorData?.avatar || "/avatar.png"} 
          alt="Doctor" 
          className="w-8 h-8 rounded-full mr-2" 
        />
      )}
      <div>
        <div className={`px-3 py-2 rounded-lg ${
          isSentByUser ? "bg-blue-500 text-white rounded-br-none" 
          : "bg-gray-200 rounded-bl-none"
        }`}>
          <p>{msg.content}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
      {isSentByUser && (
        <img 
          src={user.avatar || "/avatar.png"} 
          alt="You" 
          className="w-8 h-8 rounded-full ml-2" 
        />
      )}
    </div>
  );
};

const EmptyState = ({ startChat }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <p className="text-gray-500 mb-4">No messages yet</p>
    <button 
      onClick={startChat}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
    >
      Start Conversation
    </button>
  </div>
);

const MessageInput = ({ messageContent, setMessageContent, handleSendMessage }) => (
  <div className="p-3 border-t flex gap-2">
    <input
      type="text"
      value={messageContent}
      onChange={(e) => setMessageContent(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
      placeholder="Type a message..."
      className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={handleSendMessage}
      className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      disabled={!messageContent.trim()}
    >
      <BiSend size={20} />
    </button>
  </div>
);


export default ChatUI;

