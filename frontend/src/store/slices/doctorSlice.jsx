import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endPoints';
import Cookies from 'js-cookie';

// 🔁 Thunks

// Fetch all doctors

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, thunkAPI) => {
    try {
      // const response = await axiosInstance.get('/patient/doctors');
      const token = Cookies.get('token');
if (!token) return thunkAPI.rejectWithValue('No token found in cookies');

const response = await axiosInstance.get(ENDPOINTS.PATIENT.DOCTORS, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          await thunkAPI.dispatch(refreshToken());
          const retryResponse = await axiosInstance.get('/patient/doctors');
          return retryResponse.data;
        } catch (refreshError) {
          return thunkAPI.rejectWithValue('Session expired. Please login again.');
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// ✅ Fetch a single doctor by ID
export const fetchDoctorById = createAsyncThunk(
  'doctors/fetchDoctorById',
  async (doctorId, thunkAPI) => {
    try {
      const token = Cookies.get('token');
      console.log(token)
      if (!token) {
        return thunkAPI.rejectWithValue('Access token is missing');
      }

      const response = await axiosInstance.get(ENDPOINTS.PATIENT.SINGLE_DOCTOR(doctorId),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      // const response = await axiosInstance.get('/api/patient/:id');

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'An unexpected error occurred');
    }
  }
);


export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    try {
      // Get the refresh token from cookies
      const refreshToken = Cookies.get('refreshToken');
      if (!refreshToken) {
        return thunkAPI.rejectWithValue('Refresh token is missing');
      }

      // Make API call to refresh access token
      // const response = await axiosInstance.post('/auth/refresh', { refreshToken });
      const response = await axiosInstance.post('/auth/refresh', { refreshToken: Cookies.get('refreshToken') });
      // Set the new access token in cookies
      const { accessToken } = response.data;
      Cookies.set('token', accessToken, { expires: 1, secure: true, sameSite: 'Strict' });

      return accessToken;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to refresh token');
    }
  }
);




// Initial State
const initialState = {
  list: [],              // All doctors
  singleDoctor: null,    // Selected doctor
  isSingleDoctorLoading: false, // Flag for single doctor loading
  loading: false,
  error: null,
};
// Slice
const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    clearDoctorDetails: (state) => {
      state.singleDoctor = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 📥 Fetch All Doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔍 Fetch Single Doctor
      .addCase(fetchDoctorById.pending, (state) => {
        state.isSingleDoctorLoading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.isSingleDoctorLoading = false;
        state.singleDoctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.isSingleDoctorLoading = false;
        state.error = action.payload;
      })
      
      // 🔁 Refresh Token
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, update state or notify the user of successful token refresh
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Exports
export const { clearDoctorDetails } = doctorSlice.actions;
export default doctorSlice.reducer;



// export const fetchDoctors = createAsyncThunk(
//   'doctors/fetchDoctors',
//   async (_, thunkAPI) => {
//     try {
//       console.log(" fetch doctors...........");

//       // Check all available cookies for debugging
//       console.log("All cookies:", document.cookie);

//       // Retrieve the access token from cookies
//       const token = Cookies.get('token');
//       console.log("Token retrieved",token)
//       // Check if the token exists
//       if (!token) {
//         console.error("No token found in cookies. Available cookies:", document.cookie);
//         return thunkAPI.rejectWithValue('Authentication required');
//       }
//       console.log("Token before API call:", token);
//       // const response = await axiosInstance.get('/patient/doctors', {
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //   },
//       // });
     
//       const response = await axiosInstance.get('/patient/doctors');
//       return response.data;
//     }  catch (error) {
//       console.error("Detailed error:", {
//         message: error.message,
//         response: error.response,
//         stack: error.stack
//       });
      
//       // If token is expired, try to refresh it
//       if (error.response?.status === 401) {
//         try {
//           const refreshed = await thunkAPI.dispatch(refreshToken());
//           if (refreshToken.fulfilled.match(refreshed)) {
//             // Retry with new token
//             // const newToken = Cookies.get('token');
//             // const retryResponse = await axiosInstance.get('/patient/doctors', {
//             //   headers: {
//             //     Authorization: `Bearer ${newToken}`,
//             //   },
//             // });

//             const retryResponse = await axiosInstance.get('/patient/doctors');
//             return retryResponse.data;
//           }
//         } catch (refreshError) {
//           return thunkAPI.rejectWithValue('Session expired. Please login again.');
//         }
//       }
      
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );




// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../api/axiosInstance';
// import { ENDPOINTS } from '../../api/endPoints';
// import Cookies from 'js-cookie';

// // 🔁 Thunks

// // Fetch all doctors
// export const fetchDoctors = createAsyncThunk(
//   'doctors/fetchDoctors',
//   async (_, thunkAPI) => {
//     try {
//       console.log("Fetching doctors...");

//       // Check all available cookies for debugging
//       console.log("All cookies:", document.cookie);

//       // Retrieve the access token from cookies
//       const token = Cookies.get('token');
//       console.log("Token retrieved", token);
      
//       // Check if the token exists
//       if (!token) {
//         console.error("No token found in cookies. Available cookies:", document.cookie);
//         return thunkAPI.rejectWithValue('Authentication required');
//       }

//       console.log("Token before API call:", token);
      
//       // API call to fetch doctors with token in header
//       // const response = await axiosInstance.get(ENDPOINTS.FETCH_DOCTORS, {
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //   },
//       // });
//       // const response = await axiosInstance.get('/patient/doctors');
//       const response = await axiosInstance.get(ENDPOINTS.PATIENT.DOCTORS);
//       return response.data;  // Return the fetched data
//     } catch (error) {
//       // console.error("Detailed error:", {
//       //   message: error.message,
//       //   response: error.response,
//       //   stack: error.stack
//       // });
//       console.error("Detailed error:", error);

//       if (error.response?.status === 401) {
//         try {
//           const refreshed = await thunkAPI.dispatch(refreshToken());
//           if (refreshToken.fulfilled.match(refreshed)) {
//             const retryResponse = await axiosInstance.get('/patient/doctors');
//             return retryResponse.data;
//           }
//         } catch (refreshError) {
//           return thunkAPI.rejectWithValue('Session expired. Please login again.');
//         }
//       }
//       return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching doctors');
//     }
//   }
// );



// export const fetchDoctorById = createAsyncThunk(
//   'doctors/fetchDoctorById',
//   async (doctorId, thunkAPI) => {
//     try {
//       const token = Cookies.get('token'); // Changed from 'accessToken' to 'token'
//       if (!token) {
//         return thunkAPI.rejectWithValue('Access token is missing');
//       }
//       const response = await axiosInstance.get(ENDPOINTS.PATIENT.SINGLE_DOCTOR(doctorId));
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'An unexpected error occurred');
//     }
//   }
// );

// // Slice definition
// const doctorSlice = createSlice({
//   name: 'doctors',
//   initialState: {
//     doctors: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDoctors.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchDoctors.fulfilled, (state, action) => {
//         state.loading = false;
//         state.doctors = action.payload;
//       })
//       .addCase(fetchDoctors.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default doctorSlice.reducer;

