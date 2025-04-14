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
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//       const originalRequest = error.config;
//     console.log("in axis instance..............")
//     console.log(error.response,"error mdg in access tokren")
//       // Handle 401 errors for expired tokens
//       if (error.response && error.response.status === 401){
//           if (isRefreshing) {
//               return new Promise((resolve, reject) => {
//                   failedQueue.push({ resolve, reject });
//               });
//           }

//           originalRequest._retry = true;
//           isRefreshing = true;
//           console.log("before instance api call")
//           try {
//               await axiosInstance.post("/auth/refreshtoken");

//               // Retry the original request after refreshing the token
//               isRefreshing = false;
//               return axiosInstance(originalRequest);
//           } catch (refreshError) {
//               isRefreshing = false;
//               processQueue(refreshError, null);

//               // Redirect to login if refresh fails
//               if (refreshError.response?.status === 401) {
//                   window.location.href = "/login";
//               }
//               return Promise.reject(refreshError);
//           }
//       }

//       return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
        }
  
        isRefreshing = true;
  
        try {
          const res = await axiosInstance.post("/auth/refreshtoken");
          const newAccessToken = res.data.accessToken;
  
          // Save new token
          localStorage.setItem("accessToken", newAccessToken);
  
          // Process queued requests
          processQueue(null, newAccessToken);
  
          // Retry the failed request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          localStorage.removeItem("accessToken"); // Clear token
          window.location.href = "/login"; // Redirect to login
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
  
      return Promise.reject(error);
    }
  );

export default axiosInstance;

