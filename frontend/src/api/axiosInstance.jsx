

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

// // Request interceptor
// axiosInstance.interceptors.request.use(config => {
//   const token = Cookies.get('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         const refreshToken = Cookies.get('refreshToken');
//         const response = await axios.post(
//           `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
//           { refreshToken },
//           { withCredentials: true }
//         );
        
//         const { accessToken } = response.data;
//         Cookies.set('token', accessToken);
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         Cookies.remove('token');
//         Cookies.remove('refreshToken');
//         window.location.href = '/login';
//         return Promise.reject(err);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;







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