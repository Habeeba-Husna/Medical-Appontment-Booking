import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import appointmentReducer from '../store/slices/appointmentSlice';
import doctorReducer from '../store/slices/doctorSlice';
import patientReducer from '../store/slices/patientSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
    patient: patientReducer,
  },
});

export default store;
