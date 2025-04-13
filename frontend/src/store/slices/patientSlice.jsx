import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endPoints';

// Fetch Patient Profile
export const fetchPatientProfile = createAsyncThunk(
  'patient/fetchProfile',
  async (_, thunkAPI) => {
    try {
      // const response = await axiosInstance.get(ENDPOINTS.PATIENT.PROFILE);
      const response = await axiosInstance.get(`/api/patient/${user._id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch patient profile');
    }
  }
);

// Update Patient Profile
export const updatePatientProfile = createAsyncThunk(
  'patient/updateProfile',
  async (updatedData, thunkAPI) => {
    try {
      const response = await axiosInstance.put(ENDPOINTS.PATIENT.UPDATE_PROFILE, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update patient profile');
    }
  }
);
//hunk to rate a doctor
export const rateDoctor = createAsyncThunk(
    'patient/rateDoctor',
    async ({ doctorId, ratingData }, thunkAPI) => {
      try {
        const response = await axiosInstance.post(
          ENDPOINTS.PATIENT.SINGLE_DOCTOR(doctorId) + '/rate',
          ratingData
        );
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Rating failed');
      }
    }
  );
  

// Initial State
const initialState = {
  profile: {
    fullName: '',
    email: '',
    phoneNumber: '',
    age: '',
    gender: '',
    medicalHistory: '',
  },
  ratingStatus: {
    loading: false,
    success: null,
    error: null,
  },
  loading: false,
  error: null,
};

// Slice
const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    clearPatientProfile: (state) => {
      state.profile = initialState.profile;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH PROFILE
      .addCase(fetchPatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updatePatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updatePatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Handle Doctor Rating
.addCase(rateDoctor.pending, (state) => {
    state.ratingStatus.loading = true;
    state.ratingStatus.success = null;
    state.ratingStatus.error = null;
  })
  .addCase(rateDoctor.fulfilled, (state, action) => {
    state.ratingStatus.loading = false;
    state.ratingStatus.success = action.payload.message || 'Doctor rated successfully';
  })
  .addCase(rateDoctor.rejected, (state, action) => {
    state.ratingStatus.loading = false;
    state.ratingStatus.error = action.payload || 'Rating failed';
  });
  },
});

// Export actions & reducer
export const { clearPatientProfile } = patientSlice.actions;
export default patientSlice.reducer;





