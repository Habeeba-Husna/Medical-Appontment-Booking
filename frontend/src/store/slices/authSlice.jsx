// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../api/axiosInstance";
// import { ENDPOINTS } from "../../api/endPoints";
// import Cookies from 'js-cookie';


// // console.log(ENDPOINTS,"end points..........")

// // Login User

// export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials, {
//       withCredentials: true, // ⬅️ Add this line to send cookies
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Invalid credentials");
//   }
// });

// // Admin Login
// export const adminLogin = createAsyncThunk("auth/adminLogin", async (credentials, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(ENDPOINTS.AUTH.ADMIN_LOGIN, credentials, {
//       withCredentials: true, // ⬅️ Also here
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "Invalid credentials");
//   }
// });

// // Register User (Patient/Doctor)

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async ({ formData, role }, { rejectWithValue }) => {
//     // console.log(formData, "FormData from Frontend");
//     try {
//       const endpoint =
//         role === "Patient"
//           ? ENDPOINTS.AUTH.REGISTER_PATIENT
//           : ENDPOINTS.AUTH.REGISTER_DOCTOR;
//       // console.log(endpoint, "API Endpoint");

//       const response = await axiosInstance.post(endpoint, formData);
//       // console.log(response, "API Response");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error?.message || "Something went wrong");
//     }
//   }
// );

// // Forgot Password
// export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Error sending OTP");
//   }
// });

// // Reset Password
// export const resetPassword = createAsyncThunk("auth/resetPassword", async (data, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Password reset failed");
//   }
// });

// // Initial State
// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// // Slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
   
//   reducers: {
//     logoutUser: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
      
//       //  Remove token from cookies
//       Cookies.remove('token');
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.token = action.payload.token || null;
//         state.isAuthenticated = !!action.payload.token;
      
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
        
//       })

//       // Login User
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         // state.user = action.payload;
//         state.user = action.payload.user;
//         state.token = action.payload.accessToken;
//         state.isAuthenticated = true; //  Set authentication

//           // Save token in cookies
//         Cookies.set('token', action.payload.accessToken, { expires: 7 });
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Admin Login
//       .addCase(adminLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(adminLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.accessToken;
//         state.isAuthenticated = true;
      
//         Cookies.set('token', action.payload.accessToken, { expires: 7 });
//       })
      
//       .addCase(adminLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//        // Forgot & Reset Password
//       .addCase(forgotPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logoutUser } = authSlice.actions;
// export default authSlice.reducer;






















import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import Cookies from 'js-cookie';
import { ENDPOINTS } from '../../api/endPoints';

// Register User (Patient or Doctor)
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ formData, role }, { rejectWithValue }) => {
    try {
      const endpoint =
        role === 'Patient'
          ? ENDPOINTS.AUTH.REGISTER_PATIENT
          : ENDPOINTS.AUTH.REGISTER_DOCTOR;

      const response = await axiosInstance.post(endpoint, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Something went wrong'
      );
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error sending OTP');
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Password reset failed');
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT);
      Cookies.remove('token');
      Cookies.remove('refreshToken');
      return null;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

// Initial State
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // depends on backend
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;


// // authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { loginApi, registerApi, forgotPasswordApi, resetPasswordApi } from './authApi'; // API calls
// import { setAccessToken } from '../utils/authUtils'; // Helper function to store token

// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await loginApi(credentials);
//       setAccessToken(response.data.accessToken); // Store token
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Login failed');
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await registerApi(userData);
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Registration failed');
//     }
//   }
// );

// export const forgotPassword = createAsyncThunk(
//   'auth/forgotPassword',
//   async (email, { rejectWithValue }) => {
//     try {
//       await forgotPasswordApi(email);
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to send reset OTP');
//     }
//   }
// );

// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async (resetData, { rejectWithValue }) => {
//     try {
//       await resetPasswordApi(resetData);
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Password reset failed');
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logoutUser(state) {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.error = null;
//       // Remove token from localStorage or cookies
//       localStorage.removeItem('accessToken');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.isAuthenticated = true;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.isAuthenticated = true;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(forgotPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logoutUser } = authSlice.actions;
// export default authSlice.reducer;
