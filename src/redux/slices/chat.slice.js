// chat.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  typingUsers: [], // List of users currently typing
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    addTypingUser: (state, action) => {
      if (!state.typingUsers.includes(action.payload)) {
        state.typingUsers.push(action.payload);
      }
    },
    removeTypingUser: (state, action) => {
      state.typingUsers = state.typingUsers.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { addMessage, clearMessages, addTypingUser, removeTypingUser } =
  chatSlice.actions;
export default chatSlice.reducer;
