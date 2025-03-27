// src/api/axiosInstance.js
import axios from "axios";
import { ENDPOINTS } from "./endPoints";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     // "Content-Type": "application/json",
//     'Content-Type': 'multipart/form-data',
//   },
// });


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  
  axiosInstance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  });
  

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { ENDPOINTS };
export default axiosInstance;


