
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import axiosInstance from '../api/axiosInstance';
// import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';

// const socket = io.connect("http://localhost:5000");

// const MessagePage = () => {
//   const { doctorId } = useParams(); // assuming doctorId is passed as a parameter
//   const [messages, setMessages] = useState([]);
//   const [messageText, setMessageText] = useState("");
//   const [userId] = useState(localStorage.getItem('userId')); // Get the userId from local storage or state

//   useEffect(() => {
//     // Fetch chat history
//     axiosInstance.get(`http://localhost:5000/api/messages/${doctorId}/${userId}`)
//       .then(res => {
//         setMessages(res.data);
//       })
//       .catch(err => {
//         console.error(err);
//       });

//     // Listen for new messages
//     socket.on("receive_message", (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });
//   }, [doctorId, userId]);

//   const handleSendMessage = () => {
//     if (messageText.trim()) {
//       const messageData = {
//         senderId: userId,
//         receiverId: doctorId,
//         message: messageText,
//         timestamp: new Date(),
//       };

//       // Send message to the backend
//       axiosInstance.post("http://localhost:5000/api/messages", messageData)
//         .then(res => {
//           setMessageText(""); // clear input field
//           socket.emit("send_message", messageData); // send message via socket
//         })
//         .catch(err => {
//           console.error(err);
//         });
//     }
//   };

//   return (
//     <div>
//       <h2>Message Doctor</h2>
//       <div className="chat-box">
//         <div className="messages">
//           {messages.map((msg, index) => (
//             <div key={index} className={msg.senderId === userId ? "sent" : "received"}>
//               <p>{msg.message}</p>
//               <span>{new Date(msg.timestamp).toLocaleString()}</span>
//             </div>
//           ))}
//         </div>
//         <div className="message-input">
//           <input
//             type="text"
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//             placeholder="Type your message..."
//           />
//           <button onClick={handleSendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessagePage;




// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from '../components/ui/Button';
// import { Input } from '../components/ui/Input';
// import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
// import { Send, ArrowLeft } from "lucide-react";
// import ScrollArea from "../components/ui/ScrollArea";
// import LoadingSpinner from "../components/ui/LoadingSpinner";
// import { Badge } from '../components/ui/Badge';
// import axiosInstance from "../api/axiosInstance";
// import io from "socket.io-client";
// import { toast } from 'react-toastify';
// // import { useCookies } from "react-cookie";


// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// const SOCKET_BASE_URL = API_BASE_URL.replace('/api', '');


// export default function ChatPage() {
//   const { doctorId } = useParams();
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [doctor, setDoctor] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const scrollAreaRef = useRef(null);

//   const fetchCurrentUser = async () => {
//     try {
//       const response = await axiosInstance.get("/auth/current-user");
//       setCurrentUser(response.data.user);
//     } catch (error) {
//         console.error("Error fetching current user:", error);
//         setError("Failed to load user data. Please login again.");
//         navigate('/login');
//     }
//   };

//   const fetchDoctor = async () => {
//     try {
//       // Ensure doctorId is a string
//       const id = typeof doctorId === 'object' ? doctorId._id : doctorId;
//       const response = await axiosInstance.get(`/doctor/${id}/details`);
      
//       if (response.data.success) {
//         setDoctor(response.data.data);
//       } else {
//         console.error("Doctor not found:", response.data.message);
//         setError("Doctor not found");
//         navigate('/patient/doctors');
//       }
//     } catch (error) {
//       console.error("Error fetching doctor:", error);
//       setError("Failed to load doctor information");
//       navigate('/patient/doctors');
//     }
//   };
  
//   const fetchMessages = async (userId) => {
//     try {
//       // Ensure doctorId is a string
//       const id = typeof doctorId === 'object' ? doctorId._id : doctorId;
//       const response = await axiosInstance.get(`/messages/${id}/${userId}`);
      
//       if (response.data.success) {
//         setMessages(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       setError("Failed to load messages");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatMessageTime = (timestamp) => {
//     try{
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
// } catch (e) {
//     return "";
//   }
//   };

//   useEffect(() => {
//     fetchCurrentUser();
//   }, []);

//   useEffect(() => {
//     if (!currentUser || !doctorId) return;

//     const newSocket = io(SOCKET_BASE_URL, {
//         withCredentials: true,
//         reconnectionAttempts: 5,
//         reconnectionDelay: 1000,
//     });

//     newSocket.on('connect', () => {
//         console.log('Socket connected');
//         const conversationId = [currentUser._id, doctorId].sort().join('_');
//         newSocket.emit('joinConversation', { conversationId });
//     });

//     newSocket.on('connect_error', (err) => {
//         console.error('Socket connection error:', err);
//         setError("Connection error. Trying to reconnect...");
//     });

//     newSocket.on('newMessage', (newMsg) => {
//         setMessages(prev => [...prev, newMsg]);
//     });

//     newSocket.on('disconnect', (reason) => {
//         if (reason === 'io server disconnect') {
//             newSocket.connect();
//         }
//     });

//     setSocket(newSocket);

//     fetchDoctor();
//     fetchMessages(currentUser._id);

//     return () => {
//         newSocket.disconnect();
//     };
// }, [currentUser, doctorId]);

  

//   // Fixed: Using scrollAreaRef instead of scrollRef
//   useEffect(() => {
//     if (scrollAreaRef.current && messages.length > 0) {
//       scrollAreaRef.current.scrollTo({
//         top: scrollAreaRef.current.scrollHeight,
//         behavior: "smooth"
//       });
//     }
//   }, [messages]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim() || !currentUser) return;

//     const tempMessage = {
//       senderId: currentUser._id,
//       receiverId: doctorId,
//       message,
//       createdAt: new Date().toISOString()
//     };

//     setMessages(prev => [...prev, tempMessage]);

//     try {
//       await axiosInstance.post("/messages", {
//         receiverId: doctorId,
//         message
//       });
//       setMessage("");
//     } catch (error) {
//         console.error("Error sending message:", error);
//         toast.error("Failed to send message. Please try again.");
//       }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen p-4">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//         <Button onClick={() => navigate(-1)}>Go Back</Button>
//       </div>
//     );
//   }

//   if (!doctor || !currentUser) {
//     return null; // Error state already handled above
//   }

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Header */}
//       <header className="bg-background border-b border-border px-6 py-4">
//         <div className="flex items-center gap-4">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => navigate(-1)}
//             className="mr-2"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <Avatar className="h-10 w-10">
//             <AvatarImage src={doctor.profilePhoto} />
//             <AvatarFallback>{doctor.fullName.charAt(0)}</AvatarFallback>
//           </Avatar>
//           <div>
//             <div className="flex items-center gap-2">
//               <h2 className="font-semibold text-lg">{doctor.fullName}</h2>
//               <Badge variant="secondary" className="text-xs">
//                 {doctor.specialization || "Doctor"}
//               </Badge>
//             </div>
//             <p className="text-sm text-muted-foreground">
//               {doctor.department || "Medical Professional"}
//             </p>
//           </div>
//         </div>
//       </header>

//       {/* Chat Messages */}
//       <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
//         <div className="space-y-4">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 msg.senderId._id === currentUser._id ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`flex gap-2 max-w-[80%] ${
//                   msg.senderId._id === currentUser._id ? "flex-row-reverse" : ""
//                 }`}
//               >
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage
//                     src={
//                       msg.senderId._id === currentUser._id
//                         ? currentUser.profilePhoto
//                         : msg.senderId.profilePhoto
//                     }
//                   />
//                   <AvatarFallback>
//                     {msg.senderId._id === currentUser._id
//                       ? currentUser.fullName.charAt(0)
//                       : msg.senderId.fullName.charAt(0)}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div
//                   className={`rounded-lg p-3 ${
//                     msg.senderId._id === currentUser._id
//                       ? "bg-primary text-primary-foreground"
//                       : "bg-muted"
//                   }`}
//                 >
//                   <p className="text-sm">{msg.message}</p>
//                   <span className="text-xs opacity-70 mt-1 block">
//                     {formatMessageTime(msg.timestamp)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </ScrollArea>

//       {/* Message Input */}
//       <div className="border-t border-border p-4">
//         <form onSubmit={handleSendMessage} className="flex gap-2">
//           <Input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1"
//           />
//           <Button type="submit" disabled={!message.trim()}>
//             <Send className="h-4 w-4" />
//             <span className="ml-2">Send</span>
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }