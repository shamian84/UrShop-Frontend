/* eslint-disable no-undef */
// frontend/src/api/axiosConfig.js
import axios from "axios";

// Use environment variable for backend URL, fallback to localhost for dev
const baseURL = import.meta.env.REACT_PUBLIC_API_URL;

// Create Axios instance
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to include JWT token automatically
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user")); // assuming you store token here
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
