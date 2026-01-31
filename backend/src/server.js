import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();

const PORT = ENV.PORT || 3001;

app.use(express.json({ limit: "5mb" })); // req.body
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Health check endpoint
app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK", message: "Chatify Backend is running" });
});

// Socket connection test endpoint
app.get("/socket-test", (_, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Socket endpoint is available",
    socketUrl: "/socket.io/",
    timestamp: new Date().toISOString()
  });
});

// Socket status endpoint
app.get("/socket-status", (_, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Socket.io server is running",
    activeConnections: "Check server logs for connection count"
  });
});

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});
