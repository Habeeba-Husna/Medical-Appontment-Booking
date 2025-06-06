// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   withCredentials: true,
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//     failedQueue.forEach((prom) => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });
//     failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
  
//       if (error.response && error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
  
//         if (isRefreshing) {
//           return new Promise((resolve, reject) => {
//             failedQueue.push({ resolve, reject });
//           });
//         }
  
//         isRefreshing = true;
  
//         try {
//           const res = await axiosInstance.post("/auth/refreshtoken");
//           const newAccessToken = res.data.accessToken;
  
//           // Save new token
//           localStorage.setItem("accessToken", newAccessToken);
  
//           // Process queued requests
//           processQueue(null, newAccessToken);
  
//           // Retry the failed request with new token
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return axiosInstance(originalRequest);
//         } catch (refreshError) {
//           processQueue(refreshError, null);
//           // localStorage.removeItem("accessToken"); // Clear token
//           window.location.href = "/login"; // Redirect to login
//           return Promise.reject(refreshError);
//         } finally {
//           isRefreshing = false;
//         }
//       }
  
//       return Promise.reject(error);
//     }
//   );



import axios from "axios";
import { logoutUser } from "../store/slices/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Skip retrying if already retried once
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(() => axiosInstance(originalRequest))
//           .catch(err => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const res = await axiosInstance.post("/auth/refreshtoken");

//         // Optionally update your auth store with the new token
//         // e.g. dispatch(updateAccessToken(res.data.accessToken));

//         isRefreshing = false;
//         processQueue(null, res.data.accessToken);

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         isRefreshing = false;
//         processQueue(refreshError, null);

//         // Optional: use router or state-based redirect
//         // Avoid hard reload to prevent rerenders
//         router.push("/login"); // if using React Router
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // If 401 and not a retry attempt
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const { data } = await axiosInstance.post('/auth/refreshtoken');
        // const refreshToken = Cookies.get('refreshToken');
        // if (!refreshToken) throw new Error('No refresh token');
        
        // const response = await axios.post('/api/auth/refresh-token', { refreshToken });
        // const { accessToken } = response.data;
        
        // Cookies.set('token', accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout user
        store.dispatch(logoutUser());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

