
// import React, { useEffect, useState, useRef } from "react";
// import { unwrapResult } from '@reduxjs/toolkit';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getSocket } from "../socket/socket";
// import { BiSend } from "react-icons/bi";
// import Loader from "../components/Loader";
// import { toast } from "react-toastify";
// import {
//   startPrivateChat,
//   fetchMessages,
//   addNewMessage,
//   setActiveChat,
//   updateUserStatus,
//   setOnlineUsers,
// } from '../store/slices/chatSlice'
// import { useAppSelector } from "../hooks";
// import { fetchDoctorById } from "../store/slices/doctorSlice";

// // const ChatUI = ({ doctorId, doctorData }) => {
// const ChatUI = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [messageContent, setMessageContent] = useState("");
//   const [loadingDoctor, setLoadingDoctor] = useState(false);
//   const [error, setError] = useState(null);
//   const messageEndRef = useRef(null);

//   const { user } = useAppSelector((state) => state.auth);
//   const { doctorId } = useParams();
//   const { doctorData } = useAppSelector((state) => state.doctors);
//   const chatState = useAppSelector((state) => state.chat) || {};
  
// const {
//     messagesByChat = {},
//     activeChat = null,
//     loading: messagesLoading = false,
//     onlineUsers = {},
//   } = chatState;

//   const messages = activeChat ? messagesByChat[activeChat._id] || [] : [];

//   // Fetch doctor data if not available
//   useEffect(() => {
//     const fetchDoctor = async () => {
//       if (doctorId && !doctorData) {
//         try {
//           setLoadingDoctor(true);
//           await dispatch(fetchDoctorById(doctorId)); // Make sure this action exists
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoadingDoctor(false);
//         }
//       }
//     };
    
//     fetchDoctor();
//   }, [doctorId, doctorData, dispatch]);



//   useEffect(() => {
//     const socket = getSocket();

//     if (user?._id) {
//       socket.emit("userOnline", user._id);
//     }

//     socket.on("onlineUsers", (users) => {
//       dispatch(setOnlineUsers(users));
//     });

//     socket.on("userStatusUpdate", ({ userId, isOnline }) => {
//       dispatch(updateUserStatus({ userId, isOnline }));
//     });

//     return () => {
//       socket.off("userStatusUpdate");
//       socket.off("onlineUsers");
//     };
//   }, [dispatch, user?._id]);

//   useEffect(() => {
//     const socket = getSocket();

//     const handleNewMessage = (message) => {
//       dispatch(addNewMessage(message));
//     };

//     socket.off("newMessage").on("newMessage", handleNewMessage);

//     socket.on("connect", () => {
//       if (activeChat) {
//         socket.emit("joinChat", { chatId: activeChat._id, userId: user?._id });
//       }
//     });

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//       socket.off("connect");
//     };
//   }, [dispatch, activeChat, user?._id]);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   console.log("User:", user);

//   console.log("User ID:", user._id);
// console.log("Doctor ID:", doctorId);


// const openChat = async () => {
//     try {
//       // Log button click
//       console.log("Chat button clicked");
  
//       if (!user?._id || !doctorId) {
//         throw new Error("Missing user or doctor information");
//       }
  
//       // Start chat creation
//       const resultAction = await dispatch(
//         startPrivateChat({
//           userId1: user._id,
//           userId2: doctorId,
//         })
//       );
  
//       const chat = unwrapResult(resultAction);
  
//       // Log chat creation result
//       console.log("Chat creation result:", chat);
  
//       if (!chat?._id) {
//         throw new Error("Chat creation failed - no chat ID returned");
//       }
  
//       // Join socket rooms
//       const socket = getSocket();
//       if (socket) {
//         console.log("Socket connected, joining chat room...");
//         socket.emit("joinChat", {
//           chatId: chat._id,
//           userId: user._id,
//         });
//       } else {
//         console.error("Socket connection not established");
//       }
  
//       // Set as active chat and fetch messages
//       dispatch(setActiveChat(chat));
//       await dispatch(fetchMessages(chat._id));
  
//       // Update URL without navigation if already on chat page
//       console.log(`Navigating to /chat/${doctorId} with chatId: ${chat._id}`);
//       navigate(`/chat/${doctorId}`, {
//         state: { chatId: chat._id },
//         replace: true,
//       });
//     } catch (error) {
//       console.error("Chat error:", error);
//       toast.error(error.message || "Failed to start chat");
//     }
//   };

//   const handleSendMessage = () => {
//     if (messageContent.trim() && activeChat) {
//       const newMessage = {
//         chatId: activeChat._id,
//         senderId: user._id,
//         content: messageContent,
//       };
  
//       console.log("Sending message:", newMessage);
  
//       getSocket().emit("sendMessage", newMessage);
//       setMessageContent("");
//     } else {
//       console.log("Message content is empty or no active chat");
//     }
//   };
  
//   const closeModal = () => {
//     if (activeChat) {
//       console.log("Leaving chat with chatId:", activeChat._id);
//       getSocket().emit("leaveChat", { chatId: activeChat._id });
//     }
//     setIsModalOpen(false);
//     dispatch(setActiveChat(null));
//   };

//  // Loading and error states
//  if (loadingDoctor) return <Loader />;
//  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
//  if (!doctorId) return <div className="p-4">No doctor specified</div>;
//  if (!user) return <p className="p-4">Please login to chat</p>;


//   return (
//     <>
//       <button
//         onClick={openChat}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Chat with Doctor
//       </button>

//       {/* {isModalOpen && activeChat && ( */}
//       {isModalOpen && activeChat && doctorData && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="w-full max-w-md bg-white rounded-lg shadow-lg max-h-[90vh] overflow-hidden">
//             <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <img
//                   src={doctorData.avatar || "/avatar.png"}
//                   alt="Doctor"
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <div>
//                   <p className="font-semibold">
//                     Dr. {doctorData.firstName} {doctorData.lastName}
//                   </p>
//                   <p className="text-sm">
//                     {onlineUsers[doctorId] ? "Online" : "Offline"}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={closeModal}
//                 className="text-white bg-blue-700 rounded-full w-6 h-6 flex items-center justify-center"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="p-4 h-96 overflow-auto bg-gray-50">
//               {messagesLoading ? (
//                 <Loader />
//               ) : messages?.length > 0 ? (
//                 messages.map((msg) => {
//                   const isSentByUser = msg.sender._id === user._id;
//                   return (
//                     <div
//                       key={msg._id}
//                       className={`flex ${isSentByUser ? "justify-end" : "justify-start"} mb-4`}
//                     >
//                       {!isSentByUser && (
//                         <img
//                           src={msg.sender.avatar || "/avatar.png"}
//                           alt="Doctor"
//                           className="w-8 h-8 rounded-full mr-2"
//                         />
//                       )}
//                       <div>
//                         <div
//                           className={`px-3 py-2 rounded-lg ${
//                             isSentByUser
//                               ? "bg-blue-100 rounded-br-none"
//                               : "bg-gray-200 rounded-bl-none"
//                           }`}
//                         >
//                           <p>{msg.content}</p>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">
//                           {new Date(msg.createdAt).toLocaleTimeString([], {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </p>
//                       </div>
//                       {isSentByUser && (
//                         <img
//                           src={user.avatar || "/avatar.png"}
//                           alt="You"
//                           className="w-8 h-8 rounded-full ml-2"
//                         />
//                       )}
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p className="text-center text-gray-500">No messages yet</p>
//               )}
//               <div ref={messageEndRef} />
//             </div>

//             <div className="p-3 border-t flex gap-2">
//               <input
//                 type="text"
//                 value={messageContent}
//                 onChange={(e) => setMessageContent(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 placeholder="Type a message..."
//             //     className="flex-1 border rounded-lg px-3 py-2"
//             //   />
//             className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//               <button
//                 onClick={handleSendMessage}
//                 // className="bg-blue-500 text-white p-2 rounded-lg"
//                 className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
//                 disabled={!messageContent.trim()}
//               >
//                 <BiSend size={20} />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatUI;

import React, { useState, useEffect, useRef } from 'react';
import { BiSend } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { getSocket } from '../socket/socket';  // Important import

const ChatUI = ({ 
  user, 
  doctorId, 
  doctorData, 
  messages, 
  messagesLoading, 
  onlineUsers, 
  startChat 
}) => {
  const [messageContent, setMessageContent] = useState('');
  const messageEndRef = useRef(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sending a message
  const handleSendMessage = () => {
    if (!messageContent.trim()) return;

    const socket = getSocket();
    if (!socket || !socket.connected) {
      toast.error("Not connected to chat server");
      return;
    }

    const newMessage = {
      chatId: doctorId,
      senderId: user._id,
      content: messageContent,
      createdAt: new Date().toISOString(),
      tempId: Date.now() // For local UI update
    };

    // Optimistic UI update
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
      <div className="p-3 border-b flex items-center">
        {doctorData && (
          <>
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
          </>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        {messagesLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : messages?.length > 0 ? (
          messages.map((msg) => {
            const isSentByUser = msg.senderId === user._id;
            return (
              <div key={msg._id || msg.tempId} className={`flex ${isSentByUser ? "justify-end" : "justify-start"} mb-4`}>
                {!isSentByUser && (
                  <img 
                    src={doctorData?.avatar || "/avatar.png"} 
                    alt="Doctor" 
                    className="w-8 h-8 rounded-full mr-2" 
                  />
                )}
                <div>
                  <div className={`px-3 py-2 rounded-lg ${isSentByUser ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 rounded-bl-none"}`}>
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
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500 mb-4">No messages yet</p>
            <button 
              onClick={startChat}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Conversation
            </button>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input and Send Message Section */}
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
    </div>
  );
};

export default ChatUI;