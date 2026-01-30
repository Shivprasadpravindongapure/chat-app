import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../.env") });

// Temporary hardcoded values for testing
export const ENV = {
  PORT: process.env.PORT || 3001,
  MONGO_URI: process.env.MONGO_URI || "mongodb+srv://prasaddongapure7660_db_user:heW0aNcTON7pWicP@cluster0.scueswm.mongodb.net/chatify_db?appName=Cluster0",
  JWT_SECRET: process.env.JWT_SECRET || "myjwtsecret",
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  RESEND_API_KEY: process.env.RESEND_API_KEY || "re_j8J4NXot_84EpxHvjaN6Mkh1cJ7ApqzmA",
  EMAIL_FROM: process.env.EMAIL_FROM || "onboarding@resend.dev",
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "prasaddongapure7660@gmail.com",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "dqs4k3ivy",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "656759621628856",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "GI5WzIe6IsKGUdNB4U3ND7UG4cE",
  ARCJET_KEY: process.env.ARCJET_KEY,
  ARCJET_ENV: process.env.ARCJET_ENV,
};
