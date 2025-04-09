
// // src/api/axiosInstance.js
// import axios from "axios";
// import { ENDPOINTS } from "./endPoints";
// import store from "../redux/store"; // Import Redux store to access token

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// //  Set content-type based on FormData or JSON
// axiosInstance.interceptors.request.use((config) => {
//   if (config.data instanceof FormData) {
//     config.headers["Content-Type"] = "multipart/form-data";
//   } else {
//     config.headers["Content-Type"] = "application/json";
//   }

//   //  Get token from Redux store instead of localStorage
//   const token = store.getState().auth.token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// }, (error) => Promise.reject(error));

// export { ENDPOINTS };
// export default axiosInstance;



// import axios from "axios";
// import store from "../redux/store";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = store.getState().auth.token;
//     console.log("🔐 Sending Token:", token);
    
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     if (config.data instanceof FormData) {
//       config.headers["Content-Type"] = "multipart/form-data";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return axiosInstance(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const res = await axiosInstance.post("/auth/refresh");

//         const newToken = res.data.accessToken;

//         // Ideally dispatch Redux action to update the token globally here

//         processQueue(null, newToken);
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         if (refreshError.response?.status === 401) {
//           window.location.href = "/login";
//         }
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;




// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true, // Sends cookies (tokens)
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Adjust Content-Type for FormData
// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (config.data instanceof FormData) {
//       config.headers["Content-Type"] = "multipart/form-data";
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle 401 and refresh token
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Access token expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // Try refreshing token
//         await axiosInstance.post("/auth/refresh");

//         // Retry the original request
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // If refresh also fails, redirect to login
//         if (refreshError.response?.status === 401) {
//           localStorage.clear(); // Optional: clear local storage
//           window.location.href = "/login";
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     // Optional: user-friendly errors
//     if (error.response) {
//       console.error("Backend Error:", error.response.data?.message || "Something went wrong");
//     } else {
//       console.error("Network Error:", error.message);
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;



// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true, // 👈 Ensures cookies (access token) are sent
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Adjust header for multipart data (FormData)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (config.data instanceof FormData) {
//       config.headers["Content-Type"] = "multipart/form-data";
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Refresh access token if expired (401)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // 👇 Refresh the access token
//         await axiosInstance.post("/auth/refresh");

//         // 👇 Retry the original request after refresh
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         if (refreshError.response?.status === 401) {
//           localStorage.clear(); // Optional
//           window.location.href = "/login";
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     console.error(
//       "Backend Error:",
//       error.response?.data?.message || error.message
//     );

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;





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
//         const originalRequest = error.config;

//         // Handle 401 errors for expired tokens
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject });
//                 });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

// //             try {
// //                 // await axiosInstance.post("/refreshtoken");
// //                 await axiosInstance.post("/auth/refresh", { refreshToken: Cookies.get('refreshToken') });

// //                 // Retry the original request after refreshing the token
// //                 isRefreshing = false;
// //                 return axiosInstance(originalRequest);
// //             } catch (refreshError) {
// //                 isRefreshing = false;
// //                 processQueue(refreshError, null);

// //                 // Redirect to login if refresh fails
// //                 if (refreshError.response?.status === 401) {
// //                     window.location.href = "/login";
// //                 }
// //                 return Promise.reject(refreshError);
// //             }
// //         }

// //         return Promise.reject(error);
// //     }
// // );

// try {
//     const refreshToken = Cookies.get('refreshToken');
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
//       { refreshToken }
//     );
    
//     const { accessToken } = response.data;
//     Cookies.set('token', accessToken);
    
//     // Retry queued requests
//     processQueue(null, accessToken);
//     return axiosInstance(originalRequest);
//   } catch (refreshError) {
//     processQueue(refreshError, null);
//     Cookies.remove('token');
//     Cookies.remove('refreshToken');
//     window.location.href = '/login';
//     return Promise.reject(refreshError);
//   } finally {
//     isRefreshing = false;
//   }
// }

// return Promise.reject(error);
// }
// );

// export default axiosInstance;







// import axios from 'axios';
// import Cookies from 'js-cookie';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   withCredentials: true,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Request interceptor to add token
// axiosInstance.interceptors.request.use(config => {
//   const token = Cookies.get('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => Promise.reject(error));

// // Response interceptor to handle token refresh
// let isRefreshing = false;
// let failedRequests = [];

// const processFailedRequests = (error, token = null) => {
//   failedRequests.forEach(prom => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedRequests = [];
// };

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedRequests.push({ resolve, reject });
//         });
//       }
      
//       originalRequest._retry = true;
//       isRefreshing = true;
      
//       try {
//         const refreshToken = Cookies.get('refreshToken');
//         const response = await axios.post(
//           `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/refresh`, 
//           { refreshToken },
//           { withCredentials: true }
//         );
        
//         const { accessToken } = response.data;
//         Cookies.set('token', accessToken, { 
//           secure: process.env.NODE_ENV === 'production',
//           sameSite: 'strict'
//         });
        
//         processFailedRequests(null, accessToken);
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         processFailedRequests(err);
//         Cookies.remove('token');
//         Cookies.remove('refreshToken');
//         window.location.href = '/login';
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;














import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = Cookies.get('refreshToken');
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );
        
        const { accessToken } = response.data;
        Cookies.set('token', accessToken);
        return axiosInstance(originalRequest);
      } catch (err) {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;