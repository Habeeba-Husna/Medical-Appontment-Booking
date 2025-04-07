// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   appointments: [],
//   upcomingAppointments: [],
//   pastAppointments: [],
//   selectedAppointment: null,
//   bookingInfo: {
//     doctorId: null,
//     date: null,
//     time: null,
//   },
//   loading: false,
//   error: null,
// };

// // Mock appointments for development
// const mockAppointments = [
//   {
//     id: 'a1',
//     patientId: 'p1',
//     doctorId: '1',
//     doctorName: 'Dr. Sarah Johnson',
//     specialization: 'Cardiology',
//     date: '2023-10-20',
//     time: '10:00',
//     status: 'confirmed',
//     paymentStatus: 'completed',
//   },
//   {
//     id: 'a2',
//     patientId: 'p1',
//     doctorId: '3',
//     doctorName: 'Dr. Emily Wilson',
//     specialization: 'Pediatrics',
//     date: '2023-09-28',
//     time: '14:30',
//     status: 'completed',
//     paymentStatus: 'completed',
//     prescription: {
//       medications: [
//         {
//           name: 'Amoxicillin',
//           dosage: '250mg',
//           frequency: 'Twice daily',
//           duration: '7 days',
//         },
//       ],
//       notes: 'Take with food. Complete the full course.',
//     },
//   },
// ];

// const appointmentSlice = createSlice({
//   name: 'appointments',
//   initialState: { ...initialState, appointments: mockAppointments },
//   reducers: {
//     fetchAppointmentsStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchAppointmentsSuccess: (state, action) => {
//       state.appointments = action.payload;
//       const now = new Date().toISOString().split('T')[0];
//       state.upcomingAppointments = action.payload.filter(
//         (app) => app.date > now || (app.date === now && app.status !== 'completed')
//       );
//       state.pastAppointments = action.payload.filter(
//         (app) => app.date < now || (app.date === now && app.status === 'completed')
//       );
//       state.loading = false;
//     },
//     fetchAppointmentsFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     selectAppointment: (state, action) => {
//       state.selectedAppointment = state.appointments.find(app => app.id === action.payload) || null;
//     },
//     clearSelectedAppointment: (state) => {
//       state.selectedAppointment = null;
//     },
//     setBookingDoctor: (state, action) => {
//       state.bookingInfo.doctorId = action.payload;
//     },
//     setBookingDate: (state, action) => {
//       state.bookingInfo.date = action.payload;
//     },
//     setBookingTime: (state, action) => {
//       state.bookingInfo.time = action.payload;
//     },
//     clearBookingInfo: (state) => {
//       state.bookingInfo = { doctorId: null, date: null, time: null };
//     },
//     bookAppointmentStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     bookAppointmentSuccess: (state, action) => {
//       state.appointments.push(action.payload);
//       state.upcomingAppointments.push(action.payload);
//       state.loading = false;
//       state.bookingInfo = { doctorId: null, date: null, time: null };
//     },
//     bookAppointmentFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     cancelAppointmentStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     cancelAppointmentSuccess: (state, action) => {
//       const appointment = state.appointments.find(app => app.id === action.payload);
//       if (appointment) appointment.status = 'cancelled';
//       state.upcomingAppointments = state.upcomingAppointments.filter(app => app.id !== action.payload);
//       state.loading = false;
//     },
//     cancelAppointmentFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   fetchAppointmentsStart,
//   fetchAppointmentsSuccess,
//   fetchAppointmentsFailure,
//   selectAppointment,
//   clearSelectedAppointment,
//   setBookingDoctor,
//   setBookingDate,
//   setBookingTime,
//   clearBookingInfo,
//   bookAppointmentStart,
//   bookAppointmentSuccess,
//   bookAppointmentFailure,
//   cancelAppointmentStart,
//   cancelAppointmentSuccess,
//   cancelAppointmentFailure,
// } = appointmentSlice.actions;

// export default appointmentSlice.reducer;





import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endPoints';


// 🔁 Thunks
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PATIENT.APPOINTMENTS_LIST);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch appointments');
    }
  }
);

export const bookAppointment = createAsyncThunk(
  'appointments/bookAppointment',
  async (appointmentData, thunkAPI) => {
    try {
      console.log("Booking appointment at endpoint:", ENDPOINTS.PATIENT.BOOK_APPOINTMENT); 
      const response = await axiosInstance.post(ENDPOINTS.PATIENT.BOOK_APPOINTMENT, appointmentData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to book appointment');
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  'appointments/cancelAppointment',
  async (appointmentId, thunkAPI) => {
    try {
      await axiosInstance.delete(`${ENDPOINTS.PATIENT.CANCEL_APPOINTMENT}/${appointmentId}`);
      return appointmentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to cancel appointment');
    }
  }
);

// Initial state
const initialState = {
  appointments: [],
  upcomingAppointments: [],
  pastAppointments: [],
  selectedAppointment: null,
  bookingInfo: {
    doctorId: null,
    date: null,
    time: null,
  },
  loading: false,
  error: null,
};

//  Slice
const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    selectAppointment: (state, action) => {
      state.selectedAppointment = state.appointments.find(app => app.id === action.payload) || null;
    },
    clearSelectedAppointment: (state) => {
      state.selectedAppointment = null;
    },
    setBookingDoctor: (state, action) => {
      state.bookingInfo.doctorId = action.payload;
    },
    setBookingDate: (state, action) => {
      state.bookingInfo.date = action.payload;
    },
    setBookingTime: (state, action) => {
      state.bookingInfo.time = action.payload;
    },
    clearBookingInfo: (state) => {
      state.bookingInfo = { doctorId: null, date: null, time: null };
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH APPOINTMENTS
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;

        const now = new Date().toISOString().split('T')[0];

        state.upcomingAppointments = action.payload.filter(
          (app) => app.date > now || (app.date === now && app.status !== 'completed')
        );

        state.pastAppointments = action.payload.filter(
          (app) => app.date < now || (app.date === now && app.status === 'completed')
        );

        state.loading = false;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📦 BOOK APPOINTMENT
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
        state.upcomingAppointments.push(action.payload);
        state.bookingInfo = { doctorId: null, date: null, time: null };
        state.loading = false;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📦 CANCEL APPOINTMENT
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const cancelledId = action.payload;

        const appointment = state.appointments.find(app => app.id === cancelledId);
        if (appointment) appointment.status = 'cancelled';

        state.upcomingAppointments = state.upcomingAppointments.filter(app => app.id !== cancelledId);

        state.loading = false;
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 🧾 Export actions
export const {
  selectAppointment,
  clearSelectedAppointment,
  setBookingDoctor,
  setBookingDate,
  setBookingTime,
  clearBookingInfo,
} = appointmentSlice.actions;

// 📤 Export reducer
export default appointmentSlice.reducer;
