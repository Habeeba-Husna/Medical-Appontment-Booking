export const setupChatSocket = (io) => {
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Handle user coming online
    socket.on("userOnline", (userId) => {
      if (!userId) return;

      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
        io.emit("userStatusUpdate", { userId, isOnline: true });
      }
      onlineUsers.get(userId).add(socket.id);
    });

    // Join chat room with validation
    socket.on("joinChat", async ({ chatId, userId }) => {
      try {
        // Verify user is part of this chat
        const chat = await Chat.findById(chatId);
        if (chat && chat.members.includes(userId)) {
          socket.join(chatId);
          console.log(`User ${userId} joined chat ${chatId}`);
        }
      } catch (err) {
        console.error("Join chat error:", err);
      }
    });
  
      // Handle disconnect
      socket.on("disconnect", () => {
        let userId = null;
  
        for (const [id, sockets] of onlineUsers.entries()) {
          if (sockets.has(socket.id)) {
            sockets.delete(socket.id);
            if (sockets.size === 0) {
              userId = id;
              onlineUsers.delete(id);
            }
            break;
          }
        }
  
        if (userId) {
          io.emit("userStatusUpdate", { userId, isOnline: false });
        }
      });
    });
  };
  
