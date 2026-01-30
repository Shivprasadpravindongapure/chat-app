import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "https://your-railway-app.up.railway.app/api",
  withCredentials: true,
});
