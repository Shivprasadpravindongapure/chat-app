import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "./env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    console.log("Socket connection attempt from:", socket.handshake.headers.origin);
    console.log("Socket cookies:", socket.handshake.headers.cookie);
    
    // extract token from http-only cookies
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      console.log("Available cookies:", socket.handshake.headers.cookie);
      return next(new Error("Unauthorized - No Token Provided"));
    }

    console.log("Token found, verifying...");

    // verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    console.log("Token verified, finding user:", decoded.userId);

    // find the user fromdb
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    // attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);

    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    console.log("JWT_SECRET used:", ENV.JWT_SECRET ? "Set" : "Not set");
    next(new Error("Unauthorized - Authentication failed"));
  }
};
