
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  chats: [],
  messagesByChat: {},
  activeChat: null,
  loading: false,
  error: null,
  onlineUsers: {},
};

export const startPrivateChat = createAsyncThunk(
  "chat/startPrivateChat",
  async ({ userId1, userId2 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/chat/start-private", {
        userId1,
        userId2,
       
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chat/${chatId}/messages`);
      return { chatId, messages: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // addNewMessage: (state, action) => {
    //   const message = action.payload;
    //   const chatId = message.chatId;

    //   if (!state.messagesByChat[chatId]) {
    //     state.messagesByChat[chatId] = [];
    //   }

    //   state.messagesByChat[chatId].push(message);
    // },
    addNewMessage: (state, action) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find(c => c._id === chatId);
      if (chat) {
        chat.messages.push(message);
      }
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    updateUserStatus: (state, action) => {
      state.onlineUsers[action.payload.userId] = action.payload.isOnline;
    },
    setOnlineUsers: (state, action) => {
      action.payload.forEach((userId) => {
        state.onlineUsers[userId] = true;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startPrivateChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startPrivateChat.fulfilled, (state, action) => {
        state.loading = false;
        state.activeChat = action.payload;
      })
      .addCase(startPrivateChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messagesByChat[action.payload.chatId] = action.payload.messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addNewMessage, setActiveChat, updateUserStatus, setOnlineUsers } =
  chatSlice.actions;
export default chatSlice.reducer;