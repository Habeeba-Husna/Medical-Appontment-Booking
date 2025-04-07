// // src/api/axiosInstance.js
// import axios from "axios";
// import { ENDPOINTS } from "./endPoints";

// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//   });
  
//   axiosInstance.interceptors.request.use((config) => {
//     if (config.data instanceof FormData) {
//       config.headers['Content-Type'] = 'multipart/form-data';
//     } else {
//       config.headers['Content-Type'] = 'application/json';
//     }
//     return config;
//   });
  

//  axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export { ENDPOINTS };
// export default axiosInstance;


// src/api/axiosInstance.js
// import axios from "axios";
// import { ENDPOINTS } from "./endPoints";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true, // Enable sending cookies with each request
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Automatically handled by browser if HTTP-only cookies are used
//     if (config.data instanceof FormData) {
//       config.headers['Content-Type'] = 'multipart/form-data';
//     } else {
//       config.headers['Content-Type'] = 'application/json';
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export { ENDPOINTS };
// export default axiosInstance;




// src/api/axiosInstance.js
import axios from "axios";
import { ENDPOINTS } from "./endPoints";
import store from "../redux/store"; // Import Redux store to access token

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//  Set content-type based on FormData or JSON
axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  //  Get token from Redux store instead of localStorage
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));

export { ENDPOINTS };
export default axiosInstance;



// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL, // Use the BASE_URL from .env
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

//             try {
//                 await axiosInstance.post("/refreshtoken");

//                 // Retry the original request after refreshing the token
//                 isRefreshing = false;
//                 return axiosInstance(originalRequest);
//             } catch (refreshError) {
//                 isRefreshing = false;
//                 processQueue(refreshError, null);

//                 // Redirect to login if refresh fails
//                 if (refreshError.response?.status === 401) {
//                     window.location.href = "/login";
//                 }
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;


// import axios from "axios";
// import store from "../redux/store"; // Access token from Redux store
// import { ENDPOINTS } from "./endPoints";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
//   timeout: 5000,
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// // Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = store.getState().auth.token;

//     // Dynamic Content-Type
//     if (config.data instanceof FormData) {
//       config.headers["Content-Type"] = "multipart/form-data";
//     } else {
//       config.headers["Content-Type"] = "application/json";
//     }

//     // Attach token
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor for handling 401 and refreshing tokens
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
//             originalRequest.headers["Authorization"] = `Bearer ${token}`;
//             return axiosInstance(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const response = await axiosInstance.post("/refreshtoken");
//         const newToken = response.data.token;

//         // You might want to dispatch this token to Redux store here
//         // store.dispatch({ type: "auth/setToken", payload: newToken });

//         processQueue(null, newToken);
//         isRefreshing = false;

//         originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         isRefreshing = false;
//         processQueue(refreshError, null);

//         if (refreshError.response?.status === 401) {
//           window.location.href = "/login";
//         }

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export { ENDPOINTS };
// export default axiosInstance;
