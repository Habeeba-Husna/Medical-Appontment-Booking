// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   id: null,
//   name: null,
//   email: null,
//   role: null,
//   isAuthenticated: false,
//   token: null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.id = action.payload.user.id;
//       state.name = action.payload.user.name;
//       state.email = action.payload.user.email;
//       state.role = action.payload.user.role;
//       state.isAuthenticated = true;
//       state.token = action.payload.token;
//       state.loading = false;
//       state.error = null;
//     },
//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout: () => initialState,
//     registerStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     registerSuccess: (state) => {
//       state.loading = false;
//     },
//     registerFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
// });

// export const { 
//   loginStart, 
//   loginSuccess, 
//   loginFailure, 
//   logout, 
//   registerStart, 
//   registerSuccess, 
//   registerFailure,
//   clearError
// } = authSlice.actions;

// export default authSlice.reducer;





import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endPoints";

// console.log(ENDPOINTS,"end points..........")

// Login User
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials);
    // localStorage.setItem("token", response.data.token);
    // localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Invalid credentials");
  }
});

// Admin Login
export const adminLogin = createAsyncThunk("auth/adminLogin", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.ADMIN_LOGIN, credentials);
    // localStorage.setItem("token", response.data.token);
    // localStorage.setItem("user", JSON.stringify(response.data)); 
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Invalid credentials");
  }
});

// Register User (Patient/Doctor)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ formData, role }, { rejectWithValue }) => {
    // console.log(formData, "FormData from Frontend");
    try {
      const endpoint =
        role === "Patient"
          ? ENDPOINTS.AUTH.REGISTER_PATIENT
          : ENDPOINTS.AUTH.REGISTER_DOCTOR;
      // console.log(endpoint, "API Endpoint");

      const response = await axiosInstance.post(endpoint, formData);
      // console.log(response, "API Response");
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message || "Something went wrong");
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Error sending OTP");
  }
});

// Reset Password
export const resetPassword = createAsyncThunk("auth/resetPassword", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Password reset failed");
  }
});

// Initial State
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  // user: JSON.parse(localStorage.getItem("user")) || null,
  // isAuthenticated: !!JSON.parse(localStorage.getItem("user")), // ✅ Ensure boolean value
  // loading: false,
  // error: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
   
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // localStorage.removeItem("user");
      // localStorage.removeItem("token"); // Clear token from storage
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token || null;
        state.isAuthenticated = !!action.payload.token;
        // state.isAuthenticated = true; //Set authentication
        // localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
      })


      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.user = {
      //     ...action.payload,
      //     fullName: action.payload.fullName,
      //   };
      // })

      
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true; //  Set authentication
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Admin Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
       // Forgot & Reset Password
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
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
