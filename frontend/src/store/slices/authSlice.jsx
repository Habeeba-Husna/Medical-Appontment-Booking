
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import Cookies from 'js-cookie';
import { ENDPOINTS } from '../../api/endPoints';
import { useEffect } from 'react';

// Register User (Patient or Doctor)
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ formData, role }, { rejectWithValue }) => {
    try {
      const endpoint = role === 'Patient' 
        ? ENDPOINTS.AUTH.REGISTER_PATIENT 
        : ENDPOINTS.AUTH.REGISTER_DOCTOR;

      // Handle FormData differently from regular JSON
      const config = {};
      if (formData instanceof FormData) {
        config.headers = {
          'Content-Type': 'multipart/form-data'
        };
      }

      const response = await axiosInstance.post(endpoint, formData, config);
      return response.data;
    } catch (error) {
      // Enhanced error handling
      let errorMessage = 'Registration failed';
      let errorDetails = null;

      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        errorDetails = error.response.data?.errors || null;
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Network error. Please check your connection.';
      }

      return rejectWithValue({
        message: errorMessage,
        details: errorDetails,
        code: error.response?.status || 500
      });
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


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
        role,
      });


      const { token, user } = response.data.data;
      const fullUser = { token, ...user };
      return fullUser;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.AUTH.ME, { withCredentials: true });
      console.log(response.data.user,"in auth fetch usetr")
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user');
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
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
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
        const { token, ...user } = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
        state.user = user;
        state.error = null;
        
        // Set token in cookies
        Cookies.set('token', token, { 
          expires: 1, // 1 day
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      })
      
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Login failed:", action.payload);
        state.loading = false;
        state.error = action.payload || "Login failed. Please try again.";
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

         
// .addCase(fetchCurrentUser.pending, (state) => {
//   state.loading = true;
//   // state.error = null;
// })
// .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//   state.loading = false;
//   state.user = action.payload;  // Save user data in Redux state
// })
// .addCase(fetchCurrentUser.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload  || action.error.message;
// })

.addCase(fetchCurrentUser.fulfilled, (state, action) => {
  state.loading = false;
  state.isAuthenticated = true;
  state.user = action.payload;
  state.error = null;
})
.addCase(fetchCurrentUser.rejected, (state) => {
  state.loading = false;
  state.isAuthenticated = false;
  state.user = null;
  Cookies.remove('token');
})

.addCase(logoutUser.fulfilled, (state) => {
  state.loading = false;
  state.isAuthenticated = false;
  state.user = null;
  Cookies.remove('token');
})
      // // Logout
      // .addCase(logoutUser.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(logoutUser.fulfilled, (state) => {
      //   state.loading = false;
      //   state.user = null;
      // })
      // .addCase(logoutUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
  },
});

export const { clearError,setCredentials  } = authSlice.actions;
export default authSlice.reducer;















// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../api/axiosInstance';
// import Cookies from 'js-cookie';
// import { ENDPOINTS } from '../../api/endPoints';
// import { useEffect } from 'react';

// // Register User (Patient or Doctor)
// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async ({ formData, role }, { rejectWithValue }) => {
//     try {
//       const endpoint = role === 'Patient' 
//         ? ENDPOINTS.AUTH.REGISTER_PATIENT 
//         : ENDPOINTS.AUTH.REGISTER_DOCTOR;

//       // Handle FormData differently from regular JSON
//       const config = {};
//       if (formData instanceof FormData) {
//         config.headers = {
//           'Content-Type': 'multipart/form-data'
//         };
//       }

//       const response = await axiosInstance.post(endpoint, formData, config);
//       return response.data;

//     } catch (error) {
//       // Enhanced error handling
//       let errorMessage = 'Registration failed';
//       let errorDetails = null;

//       if (error.response) {
//         errorMessage = error.response.data?.message || errorMessage;
//         errorDetails = error.response.data?.errors || null;
//       } else if (error.message.includes('Network Error')) {
//         errorMessage = 'Network error. Please check your connection.';
//       }

//       return rejectWithValue({
//         message: errorMessage,
//         details: errorDetails,
//         code: error.response?.status || 500
//       });
//     }
//   }
// );

// // Forgot Password
// export const forgotPassword = createAsyncThunk(
//   'auth/forgotPassword',
//   async (email, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Error sending OTP');
//     }
//   }
// );

// // Reset Password
// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Password reset failed');
//     }
//   }
// );


// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ email, password, role }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, {
//         email,
//         password,
//         role,
//       });


//       const { token, user } = response.data.data;
//       const fullUser = { token, ...user };
//       return fullUser;

//       // Your backend sends userData inside response.data.data
//       // return response.data.data.token; 
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Login failed. Please try again.'
//       );
//     }
//   }
// );

// export const fetchCurrentUser = createAsyncThunk(
//   'auth/fetchCurrentUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(ENDPOINTS.AUTH.ME, { withCredentials: true });
//       console.log(response.data.user,"in auth fetch usetr")
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch user');
//     }
//   }
// );

// // // Logout User
// // export const logoutUser = createAsyncThunk(
// //   'auth/logout',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT);
// //       Cookies.remove('token');
// //       Cookies.remove('refreshToken');
// //       return null;
// //     } catch (error) {
// //       return rejectWithValue('Logout failed');
// //     }
// //   }
// // );

// // Initial State
// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,
// };

// // Auth Slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       Cookies.remove('token');
//       Cookies.remove('refreshToken');
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     setCredentials: (state, action) => {
//       state.user = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       // .addCase(loginUser.fulfilled, (state, action) => {
//       //   state.loading = false;
//       //   // Normalize the user data structure
//       //   state.user = {
//       //     ...action.payload, // Spread the user object
//       //     role: action.payload.role.toLowerCase()
//       //   };
//       //   Cookies.set('token', action.payload.token, { expires: 1 });
//       //   state.error = null;
    
//       // })

//       .addCase(loginUser.fulfilled, (state, action) => {
//         console.log("Login success:", action.payload);
//         const { token, _id, fullName, email, role } = action.payload;
//         state.isLoading = false;
//         state.user = {
//           token,
//           _id,
//           fullName,
//           email,
//           role: role.toLowerCase()
//         };
//         Cookies.set('token', token, { expires: 1 });
//         state.error = null;
//       })
      
//       .addCase(loginUser.rejected, (state, action) => {
//         console.log("Login failed:", action.payload);
//         state.isLoading = false;
//         state.error = action.payload || "Login failed. Please try again.";
//       })

//       // Register
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user; // depends on backend
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Forgot Password
//       .addCase(forgotPassword.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Reset Password
//       .addCase(resetPassword.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

         
// .addCase(fetchCurrentUser.pending, (state) => {
//   state.isLoading = true;
//   // state.error = null;
// })
// .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//   state.isAuthenticated = true;
//   state.user = action.payload;

//   // Add logs to see what fetchCurrentUser returns
// console.log('fetchCurrentUser response:', payload);
// })
// .addCase(fetchCurrentUser.rejected, (state, action) => {
//   state.isLoading = false;
//         state.isAuthenticated = false;
//         state.error = action.payload;
// })
//       // // Logout
//       // .addCase(logoutUser.pending, (state) => {
//       //   state.isLoading = true;
//       //   state.error = null;
//       // })
//       // .addCase(logoutUser.fulfilled, (state) => {
//       //   state.isLoading = false;
//       //   state.user = null;
//       // })
//       // .addCase(logoutUser.rejected, (state, action) => {
//       //   state.isLoading = false;
//       //   state.error = action.payload;
//       // });
//   },
// });

// export const { logout ,clearError } = authSlice.actions;
// export default authSlice.reducer;

