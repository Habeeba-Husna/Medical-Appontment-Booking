import axios from "axios";

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
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;
    console.log("in axis instance..............")
    console.log(error.response,"error mdg in access tokren")
      // Handle 401 errors for expired tokens
      if (error.response && error.response.status === 401){
          if (isRefreshing) {
              return new Promise((resolve, reject) => {
                  failedQueue.push({ resolve, reject });
              });
          }

          originalRequest._retry = true;
          isRefreshing = true;
          console.log("before instance api call")
          try {
              await axiosInstance.post("/auth/refreshtoken");

              // Retry the original request after refreshing the token
              isRefreshing = false;
              return axiosInstance(originalRequest);
          } catch (refreshError) {
              isRefreshing = false;
              processQueue(refreshError, null);

              // Redirect to login if refresh fails
              if (refreshError.response?.status === 401) {
                  window.location.href = "/login";
              }
              return Promise.reject(refreshError);
          }
      }

      return Promise.reject(error);
  }
);

export default axiosInstance;


// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
      
//       // Log error for debugging
//       console.error("API Error:", {
//         url: originalRequest.url,
//         status: error.response?.status,
//         message: error.response?.data?.message || error.message
//       });
  
//       // Handle 404 specifically
//       if (error.response?.status === 404) {
//         return Promise.reject({
//           message: 'Requested resource not found. Please check the URL.',
//           code: 'RESOURCE_NOT_FOUND'
//         });
//       }
  
//       // Handle 401 errors for expired tokens
//       if (error.response?.status === 401 && !originalRequest._retry) {
//         if (isRefreshing) {
//           return new Promise((resolve, reject) => {
//             failedQueue.push({ resolve, reject });
//           });
//         }
  
//         originalRequest._retry = true;
//         isRefreshing = true;
  
//         try {
//           await axiosInstance.post("/auth/refresh-token");
//           isRefreshing = false;
//           processQueue(null, originalRequest);
//           return axiosInstance(originalRequest);
//         } catch (refreshError) {
//           isRefreshing = false;
//           processQueue(refreshError, null);
          
//           if (refreshError.response?.status === 401) {
//             window.location.href = "/login";
//           }
//           return Promise.reject(refreshError);
//         }
//       }
  
//       // Format all other errors consistently
//       return Promise.reject({
//         message: error.response?.data?.message || 
//                 'An unexpected error occurred. Please try again.',
//         code: error.response?.status || 'UNKNOWN_ERROR',
//         details: error.response?.data?.errors || undefined
//       });
//     }
//   );
//   export default axiosInstance;

  

