
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endPoints';


// 
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PATIENT.GET_APPOINTMENTS);
      console.log('Fetched Appointments:', response.data);
      const appointments = response.data.appointments || response.data;
      console.log('Fetched Appointments:', appointments);
      return appointments;
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
      const response = await axiosInstance.patch(
         `${ENDPOINTS.PATIENT.CANCEL_APPOINTMENT(appointmentId)}`
      );
      return { appointmentId, status: 'cancelled' };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to cancel appointment');
    }
  }
);


export const rescheduleAppointment = createAsyncThunk(
  'appointments/rescheduleAppointment',
  async ({ newDate, newTime, appointmentId }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `${ENDPOINTS.PATIENT.RESCHEDULE_APPOINTMENT(appointmentId)}`,
        { newDate, newTime }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);



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

// Helper to match appointment ID 
const matchesId = (app, id) => app._id === id || app.id === id;



const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    selectAppointment: (state, action) => {
      state.selectedAppointment =
        state.appointments.find(app => matchesId(app, action.payload)) || null;
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
      
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        // console.log(action.payload)
        // console.log(action.payload.appointments)
        const appointmentsArray = action.payload; // extract the array
        state.appointments = appointmentsArray;

        const now = new Date().toISOString().split('T')[0];

        state.upcomingAppointments = appointmentsArray.filter(
          (app) => app.date > now || (app.date === now && app.status !== 'completed')
        );

        state.pastAppointments = appointmentsArray.filter(
          (app) => app.date < now || (app.date === now && app.status === 'completed')
        );

        state.loading = false;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //BOOK APPOINTMENT
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        console.log("Appointment booked successfully:", action.payload);
        state.appointments.push(action.payload);
        state.upcomingAppointments.push(action.payload);
        state.bookingInfo = { doctorId: null, date: null, time: null };
        state.loading = false;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CANCEL APPOINTMENT
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const { appointmentId } = action.payload;
        const appointment = state.appointments.find((a) => a._id === appointmentId);
        if (appointment) {
          appointment.status = 'cancelled';
        }
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(rescheduleAppointment.fulfilled, (state, action) => {
        const updatedAppointment = action.payload;
        const index = state.appointments.findIndex(app => app._id === updatedAppointment._id);
        if (index !== -1) {
          state.appointments[index] = updatedAppointment;
        }
      });
      
  },
});

//Export actions
export const {
  selectAppointment,
  clearSelectedAppointment,
  setBookingDoctor,
  setBookingDate,
  setBookingTime,
  clearBookingInfo,
} = appointmentSlice.actions;

//Export reducer
export default appointmentSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../api/axiosInstance';
// import { ENDPOINTS } from '../../api/endPoints';

// // Thunks
// export const fetchAppointments = createAsyncThunk(
//   'appointments/fetchAppointments',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get(ENDPOINTS.PATIENT.GET_APPOINTMENTS);
//       return response.data.appointments;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch appointments');
//     }
//   }
// );

// export const bookAppointment = createAsyncThunk(
//   'appointments/bookAppointment',
//   async (appointmentData, thunkAPI) => {
//     try {
//       const response = await axiosInstance.post(ENDPOINTS.PATIENT.BOOK_APPOINTMENT, appointmentData);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to book appointment');
//     }
//   }
// );

// export const cancelAppointment = createAsyncThunk(
//   'appointments/cancelAppointment',
//   async (appointmentId, thunkAPI) => {
//     try {
//       await axiosInstance.delete(`${ENDPOINTS.PATIENT.CANCEL_APPOINTMENT}/${appointmentId}`);
//       return appointmentId;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to cancel appointment');
//     }
//   }
// );

// export const rescheduleAppointment = createAsyncThunk(
//   'appointments/rescheduleAppointment',
//   async ({ appointmentId, newDate, newTime }, thunkAPI) => {
//     try {
//       const response = await axiosInstance.put(`${ENDPOINTS.PATIENT.RESCHEDULE_APPOINTMENT}/${appointmentId}`, {
//         date: newDate,
//         time: newTime,
//       });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to reschedule appointment');
//     }
//   }
// );

// // Initial state
// const initialState = {
//   appointments: [],
//   loading: false,
//   error: null,
//   selectedAppointmentId: null, // Add this
// };

// // Slice
// const appointmentSlice = createSlice({
//   name: 'appointments',
//   initialState,
//   reducers: {
//     // Add reducer to select an appointment
//     selectAppointment: (state, action) => {
//       state.selectedAppointmentId = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAppointments.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAppointments.fulfilled, (state, action) => {
//         state.appointments = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchAppointments.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(bookAppointment.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(bookAppointment.fulfilled, (state, action) => {
//         state.appointments.push(action.payload);
//         state.loading = false;
//       })
//       .addCase(bookAppointment.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(cancelAppointment.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(cancelAppointment.fulfilled, (state, action) => {
//         const cancelledId = action.payload;
//         const appointment = state.appointments.find(app => app._id === cancelledId);
//         if (appointment) {
//           appointment.status = 'cancelled';
//         }
//         state.loading = false;
//       })
//       .addCase(cancelAppointment.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(rescheduleAppointment.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(rescheduleAppointment.fulfilled, (state, action) => {
//         const updatedAppointment = action.payload;
//         const index = state.appointments.findIndex(app => app._id === updatedAppointment._id);
//         if (index !== -1) {
//           state.appointments[index] = updatedAppointment;
//         }
//         state.loading = false;
//       })
//       .addCase(rescheduleAppointment.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // Export selectAppointment
// export const { selectAppointment } = appointmentSlice.actions;

// export default appointmentSlice.reducer;
