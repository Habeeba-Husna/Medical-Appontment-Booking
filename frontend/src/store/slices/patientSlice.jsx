// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../api/axiosInstance';
// import { ENDPOINTS } from '../../api/endPoints';

// // 🌀 Fetch Patient Profile
// export const fetchPatientProfile = createAsyncThunk(
//   'patient/fetchProfile',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get(ENDPOINTS.PATIENT.PROFILE);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch patient profile');
//     }
//   }
// );

// // ✏️ Update Patient Profile
// export const updatePatientProfile = createAsyncThunk(
//   'patient/updateProfile',
//   async (updatedData, thunkAPI) => {
//     try {
//       const response = await axiosInstance.put(ENDPOINTS.PATIENT.UPDATE_PROFILE, updatedData);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update patient profile');
//     }
//   }
// );
// // 🔁 Thunk to rate a doctor
// export const rateDoctor = createAsyncThunk(
//     'patient/rateDoctor',
//     async ({ doctorId, ratingData }, thunkAPI) => {
//       try {
//         const response = await axiosInstance.post(
//           ENDPOINTS.PATIENT.SINGLE_DOCTOR(doctorId) + '/rate',
//           ratingData
//         );
//         return response.data;
//       } catch (error) {
//         return thunkAPI.rejectWithValue(error.response?.data || 'Rating failed');
//       }
//     }
//   );
  

// // Initial State
// const initialState = {
//   profile: {
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     age: '',
//     gender: '',
//     medicalHistory: '',
//   },
//   ratingStatus: {
//     loading: false,
//     success: null,
//     error: null,
//   },
//   loading: false,
//   error: null,
// };

// // Slice
// const patientSlice = createSlice({
//   name: 'patient',
//   initialState,
//   reducers: {
//     clearPatientProfile: (state) => {
//       state.profile = initialState.profile;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       // 📥 FETCH PROFILE
//       .addCase(fetchPatientProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPatientProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.profile = action.payload;
//       })
//       .addCase(fetchPatientProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✏️ UPDATE PROFILE
//       .addCase(updatePatientProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updatePatientProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.profile = action.payload;
//       })
//       .addCase(updatePatientProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       //Handle Doctor Rating
// .addCase(rateDoctor.pending, (state) => {
//     state.ratingStatus.loading = true;
//     state.ratingStatus.success = null;
//     state.ratingStatus.error = null;
//   })
//   .addCase(rateDoctor.fulfilled, (state, action) => {
//     state.ratingStatus.loading = false;
//     state.ratingStatus.success = action.payload.message || 'Doctor rated successfully';
//   })
//   .addCase(rateDoctor.rejected, (state, action) => {
//     state.ratingStatus.loading = false;
//     state.ratingStatus.error = action.payload || 'Rating failed';
//   });
  
//   },
// });

// // 📤 Export actions & reducer
// export const { clearPatientProfile } = patientSlice.actions;
// export default patientSlice.reducer;






// patientSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPatientProfileApi, updatePatientProfileApi, rateDoctorApi } from './patientApi'; // API calls
import { loadingErrorState } from '../utils/loadingErrorState';

const initialState = {
  patientProfile: null,
  ...loadingErrorState,
};

// Thunks
export const fetchPatientProfile = createAsyncThunk(
  'patient/fetchPatientProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPatientProfileApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch profile');
    }
  }
);

export const updatePatientProfile = createAsyncThunk(
  'patient/updatePatientProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await updatePatientProfileApi(profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update profile');
    }
  }
);

export const rateDoctor = createAsyncThunk(
  'patient/rateDoctor',
  async (ratingData, { rejectWithValue }) => {
    try {
      const response = await rateDoctorApi(ratingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to rate doctor');
    }
  }
);

// Slice
const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    clearPatientProfile(state) {
      state.patientProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.patientProfile = action.payload;
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPatientProfile } = patientSlice.actions;
export default patientSlice.reducer;
