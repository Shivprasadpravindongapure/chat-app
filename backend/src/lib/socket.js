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
    origin: function (origin, callback) {
      // Allow no origin (mobile apps) and specific origins
      const allowedOrigins = [
        "http://localhost:5173",
        "https://chat-app-eight-amber.vercel.app",
        ENV.CLIENT_URL
      ].filter(Boolean);
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  },
  transports: ['polling', 'websocket'],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000
});

// Apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// Store for online users
const userSocketMap = {}; // {userId:socketId}

// Function to get receiver socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.user?.fullName || "Unknown User");

  const userId = socket.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    
    // Emit online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    
    console.log(`User ${socket.user?.fullName} connected with socket ID: ${socket.id}`);
  }

  // Handle message events
  socket.on("sendMessage", (data) => {
    console.log("Message received via socket:", data);
    // This is handled by the API endpoint, but we keep it for compatibility
  });

  // Handle disconnection
  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.user?.fullName || "Unknown User"}, Reason: ${reason}`);
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });

  // Handle errors
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

// Export io instance for use in other modules
export { io, app, server };
