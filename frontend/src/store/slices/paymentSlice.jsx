import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endPoints';


export const createPaymentOrder = createAsyncThunk(
  'payment/createOrder',
  async ({ amount, appointmentId }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.PAYMENT.CREATE_ORDER,
        { amount, appointmentId }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to create payment order'
      );
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'payment/verify',
  async ({ paymentId, orderId, signature, appointmentId }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.PAYMENT.VERIFY,
        { paymentId, orderId, signature, appointmentId }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Payment verification failed'
      );
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    order: null,
    history: [],
    upcomingPayment: null,
    status: 'idle', // 'idle', 'processing', 'success', 'failed'
    error: null,
  },
  reducers: {
    clearPaymentOrder: (state) => {
      state.order = null;
      state.status = 'idle';
      state.error = null;
    },
    setUpcomingPayment: (state, action) => { // Added this reducer
      state.upcomingPayment = action.payload;
    },
    clearUpcomingPayment: (state) => { // Added this reducer
      state.upcomingPayment = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentOrder.pending, (state) => {
        state.status = 'processing';
        state.error = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.status = 'success';
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.status = 'processing';
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.history.unshift(action.payload);
        state.order = null;
        state.status = 'success';
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearPaymentOrder, setUpcomingPayment,clearUpcomingPayment } = paymentSlice.actions;
export default paymentSlice.reducer;

