
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    });
  }
  return socket;
};
// VITE_API_URL=http://localhost:5000/api