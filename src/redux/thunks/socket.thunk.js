import { createAsyncThunk } from "@reduxjs/toolkit";
import socket from "../../services/SocketClient"; // Singleton instance

export const connectSocketThunk = createAsyncThunk(
  "socket/connect",
  async (_, { rejectWithValue }) => {
    try {
      await socket.connect();
      return true;
    } catch (err) {
      return rejectWithValue(err.message || "Socket connection failed.");
    }
  }
);

export const disconnectSocketThunk = createAsyncThunk(
  "socket/disconnect",
  async () => {
    await socket.disconnect();
    return true;
  }
);

// Thunk to join a room via socket
export const joinRoomThunk = createAsyncThunk(
  "socket/joinRoom",
  async (data, { rejectWithValue }) => {
    try {
      //   console.log("came");
      if (!socket.socket) {
        // If socket not connected, connect first
        await socket.connect();
      }
      // Emit join-room event to backend with roomId
      await socket.emit("join-room", data);
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err || "Failed to join room.");
    }
  }
);
