import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://foodorderingapp-1-ijfl.onrender.com/api",
});

// Automatically attach JWT token if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
