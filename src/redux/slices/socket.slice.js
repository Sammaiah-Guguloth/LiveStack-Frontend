import { createSlice } from "@reduxjs/toolkit";
import {
  connectSocketThunk,
  disconnectSocketThunk,
  joinRoomThunk,
} from "../thunks/socket.thunk";

const initialState = {
  isConnected: false,
  error: null,
  currentRoomId: null,
  joinRoomError: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    leaveRoom: (state) => {
      state.currentRoomId = null;
      state.joinRoomError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // connect socket
      .addCase(connectSocketThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(connectSocketThunk.fulfilled, (state) => {
        state.isConnected = true;
        state.error = null;
      })
      .addCase(connectSocketThunk.rejected, (state, action) => {
        state.isConnected = false;
        state.error = action.payload || action.error.message;
      })

      // disconnect socket
      .addCase(disconnectSocketThunk.fulfilled, (state) => {
        state.isConnected = false;
        state.currentRoomId = null;
      })

      // join room
      .addCase(joinRoomThunk.pending, (state) => {
        state.joinRoomError = null;
      })
      .addCase(joinRoomThunk.fulfilled, (state, action) => {
        state.currentRoomId = action.payload;
        state.joinRoomError = null;
      })
      .addCase(joinRoomThunk.rejected, (state, action) => {
        state.joinRoomError = action.payload || action.error.message;
      });
  },
});

export const { leaveRoom } = socketSlice.actions;

export default socketSlice.reducer;
