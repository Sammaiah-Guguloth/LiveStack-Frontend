import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRoomThunk,
  createRoomThunk,
  getPaginatedRoomsThunk,
} from "../thunks/room.thunk";

const initialState = {
  room: null,
  admin: null,
  members: [],
  language: "javascript",
  roomLoading: false,
  rooms: [],
  userTyping: "",
  errors: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom(state, action) {
      state.room = action.payload;
    },
    setAdmin(state, action) {
      state.admin = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setMembers(state, action) {
      state.members = action.payload;
    },
    addMember(state, action) {
      const newMember = action.payload;
      const exists = state.members.some(
        (member) => member._id === newMember._id
      );

      if (!exists) {
        state.members.push(newMember);
      }
    },
    removeMember(state, action) {
      state.members = state.members.filter(
        (member) => member._id !== action.payload._id
      );
    },
    setUserTyping(state, action) {
      state.userTyping = action.payload;
    },
    setroomLoading(state, action) {
      state.roomLoading = action.payload;
    },
    setError(state, action) {
      state.errors = action.payload;
    },
    clearRoom(state) {
      state.room = null;
      state.admin = null;
      state.members = [];
      state.roomLoading = false;
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchRoomThunk
      .addCase(fetchRoomThunk.pending, (state) => {
        state.roomLoading = true;
        state.errors = null;
      })
      .addCase(fetchRoomThunk.fulfilled, (state, action) => {
        state.room = action.payload;
        state.admin = action.payload.admin;
        // state.members = action.payload.members;
        state.language = action.payload.language || "javascript";
        state.roomLoading = false;
      })
      .addCase(fetchRoomThunk.rejected, (state, action) => {
        state.errors = action.payload || action.error.message;
        state.roomLoading = false;
      })

      // createRoomThunk
      .addCase(createRoomThunk.pending, (state) => {
        state.roomLoading = true;
        state.errors = null;
      })
      .addCase(createRoomThunk.fulfilled, (state, action) => {
        state.room = action.payload;
        state.admin = action.payload.admin;
        state.members = action.payload.members;
        state.roomLoading = false;
      })
      .addCase(createRoomThunk.rejected, (state, action) => {
        state.errors = action.payload || action.error.message;
        state.roomLoading = false;
      })

      .addCase(getPaginatedRoomsThunk.pending, (state) => {
        state.roomLoading = true;
        state.errors = null;
      })
      .addCase(getPaginatedRoomsThunk.fulfilled, (state, action) => {
        const newRooms = action.payload.rooms;
        const existingRoomIds = new Set(state.rooms.map((room) => room._id));

        const filteredRooms = newRooms.filter(
          (room) => !existingRoomIds.has(room._id)
        );

        state.rooms = [...state.rooms, ...filteredRooms];
        state.roomLoading = false;
      })
      .addCase(getPaginatedRoomsThunk.rejected, (state, action) => {
        state.errors = action.payload || action.error.message;
        state.roomLoading = false;
      });
  },
});

export const {
  setRoom,
  setAdmin,
  setMembers,
  addMember,
  removeMember,
  setroomLoading,
  setError,
  clearRoom,
  setLanguage,
  setUserTyping,
} = roomSlice.actions;

export default roomSlice.reducer;
