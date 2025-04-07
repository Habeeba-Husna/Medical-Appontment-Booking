
// import { createSlice } from '@reduxjs/toolkit';

// // Mock data for initial rendering
// const mockDoctors = [
//   {
//     id: '1',
//     name: 'Dr. Sarah Johnson',
//     specialization: 'Cardiology',
//     experience: 10,
//     rating: 4.8,
//     clinicDetails: {
//       name: 'Heart Care Center',
//       address: '123 Medical Ave',
//       location: 'New York',
//     },
//     availableSlots: [
//       {
//         date: '2023-10-15',
//         times: ['09:00', '10:00', '11:00', '14:00', '15:00'],
//       },
//       {
//         date: '2023-10-16',
//         times: ['09:00', '10:00', '14:00', '15:00', '16:00'],
//       },
//     ],
//     imageUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
//   },
//   {
//     id: '2',
//     name: 'Dr. Michael Chen',
//     specialization: 'Dermatology',
//     experience: 8,
//     rating: 4.7,
//     clinicDetails: {
//       name: 'Skin Wellness Clinic',
//       address: '456 Health St',
//       location: 'San Francisco',
//     },
//     availableSlots: [
//       {
//         date: '2023-10-15',
//         times: ['10:00', '11:00', '13:00', '14:00'],
//       },
//       {
//         date: '2023-10-16',
//         times: ['09:00', '11:00', '13:00', '15:00'],
//       },
//     ],
//     imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
//   },
//   {
//     id: '3',
//     name: 'Dr. Emily Wilson',
//     specialization: 'Pediatrics',
//     experience: 12,
//     rating: 4.9,
//     clinicDetails: {
//       name: 'Children\'s Health Clinic',
//       address: '789 Pediatric Ln',
//       location: 'Boston',
//     },
//     availableSlots: [
//       {
//         date: '2023-10-15',
//         times: ['09:00', '10:00', '11:00', '14:00'],
//       },
//       {
//         date: '2023-10-16',
//         times: ['09:00', '10:00', '14:00', '15:00'],
//       },
//     ],
//     imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
//   },
//   {
//     id: '4',
//     name: 'Dr. Robert Lee',
//     specialization: 'Orthopedics',
//     experience: 15,
//     rating: 4.6,
//     clinicDetails: {
//       name: 'Joint & Bone Specialists',
//       address: '567 Ortho Blvd',
//       location: 'Chicago',
//     },
//     availableSlots: [
//       {
//         date: '2023-10-15',
//         times: ['11:00', '13:00', '15:00', '16:00'],
//       },
//       {
//         date: '2023-10-16',
//         times: ['10:00', '11:00', '14:00', '16:00'],
//       },
//     ],
//     imageUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
//   },
// ];

// const initialState = {
//   doctors: mockDoctors,
//   selectedDoctor: null,
//   loading: false,
//   error: null,
// };

// export const doctorSlice = createSlice({
//   name: 'doctors',
//   initialState,
//   reducers: {
//     fetchDoctorsStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchDoctorsSuccess: (state, action) => {
//       state.doctors = action.payload;
//       state.loading = false;
//     },
//     fetchDoctorsFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     selectDoctor: (state, action) => {
//       state.selectedDoctor = state.doctors.find(doctor => doctor.id === action.payload) || null;
//     },
//     clearSelectedDoctor: (state) => {
//       state.selectedDoctor = null;
//     },
//   },
// });

// export const {
//   fetchDoctorsStart,
//   fetchDoctorsSuccess,
//   fetchDoctorsFailure,
//   selectDoctor,
//   clearSelectedDoctor,
// } = doctorSlice.actions;

// export default doctorSlice.reducer;




// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   doctors: [],
//   selectedDoctor: null,
//   loading: false,
//   error: null,
// };

// Redux Slice
// const doctorSlice = createSlice({
//   name: 'doctors',
//   initialState,
//   reducers: {
//     fetchDoctorsStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchDoctorsSuccess: (state, action) => {
//       state.doctors = action.payload;
//       state.loading = false;
//     },
//     fetchDoctorsFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     selectDoctor: (state, action) => {
//       const doctorId = action.payload;
//       state.selectedDoctor = state.doctors.find(doctor => doctor._id === doctorId) || null;
//     },
//     clearSelectedDoctor: (state) => {
//       state.selectedDoctor = null;
//     },
//   },
// });

// // Async Thunk to fetch doctors from MongoDB backend
// export const fetchDoctors = (search = '', page = 1, limit = 10) => async (dispatch) => {
//   console.log("doctor list in slice......")
//   try {
//     dispatch(fetchDoctorsStart());
//     const response = await axios.get(`/api/doctor?search=${search}&page=${page}&limit=${limit}`);
//     console.log(response.data)
//     dispatch(fetchDoctorsSuccess(response.data.doctors));
//   } catch (error) {
//     dispatch(fetchDoctorsFailure(error.response?.data?.message || 'Something went wrong'));
//   }
// };

// export const {
//   fetchDoctorsStart,
//   fetchDoctorsSuccess,
//   fetchDoctorsFailure,
//   selectDoctor,
//   clearSelectedDoctor,
// } = doctorSlice.actions;

// export default doctorSlice.reducer;



// === src/features/doctor/doctorSlice.js ===

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endPoints';

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PATIENT.DOCTORS_LIST);
      console.log("Doctors API Response:", response.data);
      console.log("DOCTORS_LIST URL:", ENDPOINTS.PATIENT.DOCTORS_LIST);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default doctorSlice.reducer;