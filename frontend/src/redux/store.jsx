import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import appointmentReducer from '../store/slices/appointmentSlice';
import doctorReducer from '../store/slices/doctorSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
  },
});

export default store;
