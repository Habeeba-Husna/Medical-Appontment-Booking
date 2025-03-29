import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endPoints";

console.log(ENDPOINTS,"end points..........")
// Login User
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Invalid credentials");
  }
});

// Admin Login
export const adminLogin = createAsyncThunk("auth/adminLogin", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.ADMIN_LOGIN, credentials);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Invalid credentials");
  }
});

// Register User (Patient/Doctor)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ formData, role }, { rejectWithValue }) => {
    console.log(formData, "FormData from Frontend");
    try {
      const endpoint =
        role === "Patient"
          ? ENDPOINTS.AUTH.REGISTER_PATIENT
          : ENDPOINTS.AUTH.REGISTER_DOCTOR;
      console.log(endpoint, "API Endpoint");

      const response = await axiosInstance.post(endpoint, formData);
      console.log(response, "API Response");
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

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  // reducers: {},
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("token"); // Clear token from storage
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.user = action.payload;
      // })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          ...action.payload,
          fullName: action.payload.fullName,
        };
      })
      
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      ;
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
