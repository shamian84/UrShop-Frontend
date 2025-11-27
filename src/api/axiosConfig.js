// frontend/src/api/axiosConfig.js
import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to automatically include JWT token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;


