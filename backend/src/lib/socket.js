import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

// Configure Socket.io for production
const io = new Server(server, {
  cors: {
    origin: ENV.CLIENT_URL ? [ENV.CLIENT_URL] : ["http://localhost:5173", "https://chat-app-eight-amber.vercel.app"],
    credentials: true,
    methods: ["GET", "POST"]
  },
  transports: ['polling', 'websocket'], // Ensure both transports work
  allowEIO3: true // Allow compatibility with older clients
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// we will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// this is for storing online users
const userSocketMap = {}; // {userId:socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.user?.fullName || "Unknown User");

  const userId = socket.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    
    // io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  // Handle message events
  socket.on("sendMessage", (data) => {
    console.log("Message received:", data);
    // Handle message logic here
    io.emit("newMessage", data);
  });

  // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user?.fullName || "Unknown User");
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, app, server };
