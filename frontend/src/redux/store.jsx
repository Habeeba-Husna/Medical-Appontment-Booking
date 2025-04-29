import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import appointmentReducer from '../store/slices/appointmentSlice';
import doctorReducer from '../store/slices/doctorSlice';
import patientReducer from '../store/slices/patientSlice';
import paymentReducer from '../store/slices/paymentSlice';
import chatReducer from '../store/slices/chatSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
    patient: patientReducer,
    payment: paymentReducer,
    chat: chatReducer,
  },
});

export default store;
