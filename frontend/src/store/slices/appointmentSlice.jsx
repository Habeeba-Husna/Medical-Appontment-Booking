
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../api/axiosInstance';
// import { ENDPOINTS } from '../../api/endPoints';

// // Helper to match appointment ID 
// const matchesId = (app, id) => app._id === id || app.id === id;

// export const fetchAppointments = createAsyncThunk(
//   'appointments/fetchAppointments',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get(ENDPOINTS.PATIENT.GET_APPOINTMENTS);
//       console.log('Fetched Appointments:', response.data);
//       const appointments = response.data.appointments || response.data;
//       console.log('Fetched Appointments:', appointments);
//       return appointments;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch appointments');
//     }
//   }
// );

// export const bookAppointment = createAsyncThunk(
//   'appointments/bookAppointment',
//   async (appointmentData, thunkAPI) => {
//     try {
//       console.log("Booking appointment at endpoint:", ENDPOINTS.PATIENT.BOOK_APPOINTMENT); 
//       const response = await axiosInstance.post(ENDPOINTS.PATIENT.BOOK_APPOINTMENT, appointmentData);
//       console.log('Appointment Booked:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Booking Error:', error.response?.data || error.message);
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to book appointment');
//     }
//   }
// );


// export const cancelAppointment = createAsyncThunk(
//   'appointments/cancelAppointment',
//   async (appointmentId, thunkAPI) => {
//     console.log("appointmentId.......",appointmentId)
//     try {
//       const response = await axiosInstance.patch(
//          `${ENDPOINTS.PATIENT.CANCEL_APPOINTMENT(appointmentId)}`
//       );
//       console.log("appo...........",{ appointmentId, status: 'cancelled' })
//       return { appointmentId, status: 'cancelled' };
//     } catch (error) {
//       console.log(error.response?.data)
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to cancel appointment');
//     }
//   }
// );


// // export const rescheduleAppointment = createAsyncThunk(
// //   'appointments/rescheduleAppointment',
// //   async ({ newDate, newTime, appointmentId }, thunkAPI) => {
// //     try {
// //       const response = await axiosInstance.patch(
// //         `${ENDPOINTS.PATIENT.RESCHEDULE_APPOINTMENT(appointmentId)}`,
// //         { newDate, newTime },
// //         {
// //           withCredentials: true // This sends the auth cookie
// //         }
// //       );
// //       return response.data;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response?.data);
// //     }
// //   }
// // );

// export const rescheduleAppointment = createAsyncThunk(
//   'appointments/rescheduleAppointment',
//   async ({ newDate, newTime, appointmentId }, thunkAPI) => {
//     try {
//       const response = await axiosInstance.patch(
//         `${ENDPOINTS.PATIENT.RESCHEDULE_APPOINTMENT(appointmentId)}`,
//         { newDate, newTime }
//       );
//       return response.data; // Make sure this returns the updated appointment
//     } catch (error) {
//       let errorMessage = 'Failed to reschedule appointment';
//       if (error.response) {
//         // Handle 409 specifically
//         if (error.response.status === 409) {
//           errorMessage = error.response.data.message || 'Time slot not available';
//         } else {
//           errorMessage = error.response.data.message || errorMessage;
//         }
//       }
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );



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
//   tempAppointmentId: null, // For optimistic updates
// };


// const appointmentSlice = createSlice({
//   name: 'appointments',
//   initialState,
//   reducers: {
//     selectAppointment: (state, action) => {
//       state.selectedAppointment =
//         state.appointments.find(app => matchesId(app, action.payload)) || null;
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
//   },
//   extraReducers: (builder) => {
//     builder
      
//       .addCase(fetchAppointments.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })


// // .addCase(fetchAppointments.fulfilled, (state, action) => {
// //   const appointmentsArray = action.payload.all || action.payload;
  
// //   state.appointments = appointmentsArray;
  
// //   const now = new Date();
// //   const today = now.toISOString().split('T')[0];
  
// //   state.upcomingAppointments = appointmentsArray.filter(app => {
// //     const appDate = new Date(app.date).toISOString().split('T')[0];
// //     const isFutureDate = appDate > today;
// //     const isToday = appDate === today;
    
// //     return (
// //       ['pending', 'confirmed'].includes(app.status.toLowerCase()) && 
// //       (isFutureDate || (isToday && app.time >= now.toLocaleTimeString('en-US', { hour12: false })))
// //     );
// //   });

// //   state.pastAppointments = appointmentsArray.filter(app => {
// //     const appDate = new Date(app.date).toISOString().split('T')[0];
// //     const isPastDate = appDate < today;
// //     const isToday = appDate === today;
    
// //     return (
// //       ['completed', 'cancelled'].includes(app.status.toLowerCase()) ||
// //       isPastDate ||
// //       (isToday && app.time < now.toLocaleTimeString('en-US', { hour12: false }))
// //     );
// //   });

// //   state.loading = false;
// // })

// .addCase(fetchAppointments.fulfilled, (state, action) => {
//   state.loading = false;
  
//   if (!action.payload || typeof action.payload !== 'object') {
//     state.error = 'Invalid appointments data';
//     return;
//   }

//   // Use the structure from API
//   state.appointments = Array.isArray(action.payload.all) ? action.payload.all : [];
//   state.upcomingAppointments = Array.isArray(action.payload.upcoming) ? action.payload.upcoming : [];
//   state.pastAppointments = Array.isArray(action.payload.past) ? action.payload.past : [];

//   // If for some reason the API changes, fall back to client-side filtering
//   if (state.appointments.length === 0 && 
//       (state.upcomingAppointments.length > 0 || state.pastAppointments.length > 0)) {
//     state.appointments = [...state.upcomingAppointments, ...state.pastAppointments];
//   }
// })


//       .addCase(fetchAppointments.rejected, (state, action) => {
//         state.loading = false;
//         // state.error = action.payload;
//         state.error = action.payload || 'Failed to fetch appointments';

//       })

//       //BOOK APPOINTMENT
//       .addCase(bookAppointment.pending, (state) => {
//         state.loading = true;
//         state.error = null;

//           // Optimistic update
//       state.tempAppointmentId = `temp-${Date.now()}`;
//     })
      
//       .addCase(bookAppointment.fulfilled, (state, action) => {
//         console.log("Appointment booked successfully:", action.payload);
//         // state.appointments.push(action.payload);
//         // state.upcomingAppointments.push(action.payload);
//         // state.bookingInfo = { doctorId: null, date: null, time: null };
//         // state.loading = false;

//         const newAppointment = action.payload;
//       console.log(newAppointment,"new { appointmentId, status: 'cancelled' }")
//       // Remove temp appointment if exists
//       state.appointments = state.appointments.filter(
//         app => app._id !== state.tempAppointmentId
//       );
      
//       // Add new appointment to beginning
//       state.appointments.unshift(newAppointment);
//       state.upcomingAppointments.unshift(newAppointment);
      
//       // Reset state
//       state.bookingInfo = { doctorId: null, date: null, time: null };
//       state.tempAppointmentId = null;
//       state.loading = false;
//     })
//       .addCase(bookAppointment.rejected, (state, action) => {
//          // Remove temp appointment on failure
//          state.appointments = state.appointments.filter(
//           app => app._id !== state.tempAppointmentId
//         );

//         state.loading = false;
//         state.error = action.payload;
//         state.tempAppointmentId = null;
//       })

//       // CANCEL APPOINTMENT
//       .addCase(cancelAppointment.pending, (state, action) => {
//         state.loading = true;
//         state.error = null;
      
//         // Optimistically mark the appointment as 'cancelling'
//         const appointment = state.appointments.find(
//           (app) => app._id === action.meta.arg
//         );
      
//         if (appointment) {
//           appointment.status = 'cancelling'; // You can use this to show a loading spinner in the UI
//         }
//       })
//     // Add this case to your extraReducers
// // .addCase(cancelAppointment.fulfilled, (state, action) => {
// //   const { appointmentId ,status} = action.payload; // Assuming backend returns the updated appointment
  
// //   // Update the main appointments array
// //   state.appointments = state.appointments.map(app => 
// //     app._id === appointmentId ? appointmentId : app
// //   );

// //   // Filter out canceled appointments from upcoming
// //   state.upcomingAppointments = state.upcomingAppointments.filter(
// //     app => app._id !== appointmentId
// //   );

// //   // Add to past appointments if needed
// //   if (status.toLowerCase() === 'cancelled') {
// //     state.pastAppointments.unshift(appointmentId);
// //   }

// //   state.loading = false;
// // })

// .addCase(cancelAppointment.fulfilled, (state, action) => {
//   const { appointmentId, status } = action.payload;
  
//   // Update the appointment status in all arrays
//   state.appointments = state.appointments.map(app => 
//     app._id === appointmentId ? { ...app, status } : app
//   );
  
//   state.upcomingAppointments = state.upcomingAppointments
//     .filter(app => app._id !== appointmentId);
    
//   // Add to past appointments if cancelled
//   if (status.toLowerCase() === 'cancelled') {
//     const cancelledApp = state.appointments.find(app => app._id === appointmentId);
//     if (cancelledApp) {
//       state.pastAppointments.unshift(cancelledApp);
//     }
//   }

//   state.loading = false;
// })

// .addCase(cancelAppointment.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload || 'Failed to cancel appointment';
// })

//       // Reschedule Appointment
//       .addCase(rescheduleAppointment.pending, (state, action) => {
//         state.loading = true;
//         state.error = null;
        
//         // Optimistic update
//         const { appointmentId } = action.meta.arg;
//         const appointment = state.appointments.find(app => app._id === appointmentId);
//         if (appointment) {
//           appointment.isRescheduling = true;
//         }
//       })

       
//   //     .addCase(rescheduleAppointment.fulfilled, (state, action) => {
//   //       const updatedAppointment = action.payload;

//   //     state.appointments = state.appointments.map(app => 
//   //       app._id === updatedAppointment._id 
//   // ? { ...app, ...updatedAppointment, isRescheduling: false } 
//   // : app

//   //     );
      
//   //     state.upcomingAppointments = state.upcomingAppointments.map(app =>
//   //       app._id === updatedAppointment._id ? updatedAppointment : app
//   //     );
      
//   //     state.loading = false;
// // })

//   .addCase(rescheduleAppointment.fulfilled, (state, action) => {
//     const updatedAppointment = action.payload;
    
//     // Update appointments array
//     state.appointments = state.appointments.map(app => 
//       app._id === updatedAppointment._id ? updatedAppointment : app
//     );
  
//     // Update upcoming appointments
//     state.upcomingAppointments = state.upcomingAppointments.map(app =>
//       app._id === updatedAppointment._id ? updatedAppointment : app
//     );
  
//     // If the new date is in the past, move to past appointments
//     const now = new Date();
//     const appointmentDate = new Date(updatedAppointment.date);
//     if (appointmentDate < now) {
//       state.upcomingAppointments = state.upcomingAppointments.filter(
//         app => app._id !== updatedAppointment._id
//       );
//       state.pastAppointments.unshift(updatedAppointment);
//     }
  
//     state.loading = false;
//   })
     
//       .addCase(rescheduleAppointment.rejected, (state, action) => {
//         // Revert optimistic update
//         const { appointmentId } = action.meta.arg;
//         const appointment = state.appointments.find(app => app._id === appointmentId);
//         if (appointment) {
//           appointment.isRescheduling = false;
//         }
        
//         state.loading = false;
//         state.error = action.payload;
//       });
      
//   },
// });

// //Export actions
// export const {
//   selectAppointment,
//   clearSelectedAppointment,
//   setBookingDoctor,
//   setBookingDate,
//   setBookingTime,
//   clearBookingInfo,
// } = appointmentSlice.actions;

// //Export reducer
// export default appointmentSlice.reducer;





import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endPoints';

// Helper function to match appointment IDs
const matchesId = (app, id) => app._id === id || app.id === id;

// Async Thunks
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, thunkAPI) => {
    try {
      console.log("fetch appointment.....")
      const response = await axiosInstance.get(ENDPOINTS.PATIENT.GET_APPOINTMENTS);
      return response.data;
    } catch (error) {
      console.error('Fetch appointments error:', error);
      if (error.response?.status === 401) {
        // The interceptor will handle the redirect
        return thunkAPI.rejectWithValue('Session expired. Please login again.');
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch appointments'
      );
    }
  }
);

export const bookAppointment = createAsyncThunk(
  'appointments/bookAppointment',
  async (appointmentData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.PATIENT.BOOK_APPOINTMENT, 
        appointmentData
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue('Session expired. Please login again.');
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to book appointment'
      );
    }
  }
);


export const confirmAppointmentPayment = createAsyncThunk(
  'appointments/confirmPayment',
  async ({ appointmentId, paymentData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        ENDPOINTS.PATIENT.CONFIRM_APPOINTMENT(appointmentId),
        { paymentData }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue('Session expired. Please login again.');
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to confirm payment'
      );
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  'appointments/cancelAppointment',
  async (appointmentId, thunkAPI) => {
    try {
      await axiosInstance.patch(
        ENDPOINTS.PATIENT.CANCEL_APPOINTMENT(appointmentId)
      );
      return { appointmentId, status: 'cancelled' };
    } catch (error) {
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue('Session expired. Please login again.');
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to cancel appointment'
      );
    }
  }
);

export const rescheduleAppointment = createAsyncThunk(
  'appointments/rescheduleAppointment',
  async ({ newDate, newTime, appointmentId }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        ENDPOINTS.PATIENT.RESCHEDULE_APPOINTMENT(appointmentId),
        { newDate, newTime }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue('Session expired. Please login again.');
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to reschedule appointment'
      );
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
  tempAppointmentId: null,
  paymentStatus: 'idle', // 'idle', 'processing', 'success', 'failed'
};

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
    clearAppointments: (state) => {
      state.appointments = [];
      state.upcomingAppointments = [];
      state.pastAppointments = [];
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    resetPaymentStatus: (state) => {
      state.paymentStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Appointments
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        
        // Handle API response structure
        if (action.payload?.upcoming && action.payload?.past) {
          state.upcomingAppointments = action.payload.upcoming;
          state.pastAppointments = action.payload.past;
          state.appointments = [...action.payload.upcoming, ...action.payload.past];
        } else if (Array.isArray(action.payload)) {
          state.appointments = action.payload;
          
          // Client-side filtering if needed
          const now = new Date();
          state.upcomingAppointments = action.payload.filter(app => {
            const appDate = new Date(app.date);
            return appDate >= now || app.status === 'pending' || app.status === 'confirmed';
          });
          
          state.pastAppointments = action.payload.filter(app => {
            const appDate = new Date(app.date);
            return appDate < now || app.status === 'completed' || app.status === 'cancelled';
          });
        }
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Book Appointment
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.tempAppointmentId = `temp-${Date.now()}`;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        const newAppointment = action.payload;
        
        // Remove temp appointment if exists
        state.appointments = state.appointments.filter(
          app => app._id !== state.tempAppointmentId
        );
        
        // Add new appointment
        state.appointments.unshift(newAppointment);
        state.upcomingAppointments.unshift(newAppointment);
        
        // Reset state
        state.bookingInfo = { doctorId: null, date: null, time: null };
        state.tempAppointmentId = null;
        state.loading = false;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.appointments = state.appointments.filter(
          app => app._id !== state.tempAppointmentId
        );
        state.loading = false;
        state.error = action.payload;
        state.tempAppointmentId = null;
      })

      // Confirm Payment
      .addCase(confirmAppointmentPayment.pending, (state) => {
        state.paymentStatus = 'processing';
        state.error = null;
      })
      .addCase(confirmAppointmentPayment.fulfilled, (state, action) => {
        const updatedAppointment = action.payload;
        
        // Update the appointment status to 'confirmed'
        state.appointments = state.appointments.map(app => 
          app._id === updatedAppointment._id ? updatedAppointment : app
        );
        
        // Update in upcoming appointments if needed
        state.upcomingAppointments = state.upcomingAppointments.map(app =>
          app._id === updatedAppointment._id ? updatedAppointment : app
        );
        
        state.paymentStatus = 'success';
      })

      .addCase(confirmAppointmentPayment.rejected, (state, action) => {
        state.paymentStatus = 'failed';
        state.error = action.payload;
      })

      // Cancel Appointment
      .addCase(cancelAppointment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        
        // Optimistic update
        const appointment = state.appointments.find(
          app => app._id === action.meta.arg
        );
        if (appointment) {
          appointment.status = 'cancelling';
        }
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const { appointmentId, status } = action.payload;
        
        // Update appointments
        state.appointments = state.appointments.map(app => 
          app._id === appointmentId ? { ...app, status } : app
        );
        
        // Update filtered lists
        state.upcomingAppointments = state.upcomingAppointments
          .filter(app => app._id !== appointmentId);
          
        if (status.toLowerCase() === 'cancelled') {
          const cancelledApp = state.appointments.find(app => app._id === appointmentId);
          if (cancelledApp) {
            state.pastAppointments.unshift(cancelledApp);
          }
        }

        state.loading = false;
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
        // Revert optimistic update
        const appointmentId = action.meta.arg;
        state.appointments = state.appointments.map(app => 
          app._id === appointmentId ? { ...app, status: 'confirmed' } : app
        );
      })

      // Reschedule Appointment
      .addCase(rescheduleAppointment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        
        // Optimistic update
        const { appointmentId } = action.meta.arg;
        const appointment = state.appointments.find(app => app._id === appointmentId);
        if (appointment) {
          appointment.isRescheduling = true;
        }
      })
      .addCase(rescheduleAppointment.fulfilled, (state, action) => {
        const updatedAppointment = action.payload;
        const now = new Date();
        const appointmentDate = new Date(updatedAppointment.date);
        
        // Update appointments
        state.appointments = state.appointments.map(app => 
          app._id === updatedAppointment._id ? updatedAppointment : app
        );
      
        // Update upcoming appointments
        state.upcomingAppointments = state.upcomingAppointments.map(app =>
          app._id === updatedAppointment._id ? updatedAppointment : app
        );
      
        // Move to past if date has passed
        if (appointmentDate < now) {
          state.upcomingAppointments = state.upcomingAppointments.filter(
            app => app._id !== updatedAppointment._id
          );
          state.pastAppointments.unshift(updatedAppointment);
        }
      
        state.loading = false;
      })
      .addCase(rescheduleAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
        // Revert optimistic update
        const { appointmentId } = action.meta.arg;
        state.appointments = state.appointments.map(app => 
          app._id === appointmentId ? { ...app, isRescheduling: false } : app
        );
      });
  },
});

// Export actions and reducer
export const {
  selectAppointment,
  clearSelectedAppointment,
  setBookingDoctor,
  setBookingDate,
  setBookingTime,
  clearBookingInfo,
  clearAppointments,
  setPaymentStatus,
  resetPaymentStatus,

} = appointmentSlice.actions;

export default appointmentSlice.reducer;





























//direct login...................//
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
