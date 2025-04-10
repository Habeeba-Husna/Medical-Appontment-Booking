
// // patientSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchPatientProfileApi, updatePatientProfileApi, rateDoctorApi } from './patientApi'; // API calls
// import { loadingErrorState } from '../utils/loadingErrorState';

// const initialState = {
//   patientProfile: null,
//   ...loadingErrorState,
// };

// // Thunks
// export const fetchPatientProfile = createAsyncThunk(
//   'patient/fetchPatientProfile',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchPatientProfileApi();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch profile');
//     }
//   }
// );

// export const updatePatientProfile = createAsyncThunk(
//   'patient/updatePatientProfile',
//   async (profileData, { rejectWithValue }) => {
//     try {
//       const response = await updatePatientProfileApi(profileData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to update profile');
//     }
//   }
// );

// export const rateDoctor = createAsyncThunk(
//   'patient/rateDoctor',
//   async (ratingData, { rejectWithValue }) => {
//     try {
//       const response = await rateDoctorApi(ratingData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to rate doctor');
//     }
//   }
// );

// // Slice
// const patientSlice = createSlice({
//   name: 'patient',
//   initialState,
//   reducers: {
//     clearPatientProfile(state) {
//       state.patientProfile = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPatientProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPatientProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.patientProfile = action.payload;
//       })
//       .addCase(fetchPatientProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

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
