import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
  withCredentials: true, // enables sending cookies and auth headers
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
