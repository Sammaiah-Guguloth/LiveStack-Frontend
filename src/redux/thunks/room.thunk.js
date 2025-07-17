import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CREATE_ROOM,
  GET_PAGINATED_ROOMS,
  GET_ROOM_BY_ID,
  GET_ROOMS_BY_ROOM_NAME,
} from "../../api/apis";
import axiosInstance from "../../api/axios/axiosInstance";

// Fetch room info
export const fetchRoomThunk = createAsyncThunk(
  "room/fetchRoom",
  async (roomId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${GET_ROOM_BY_ID}/${roomId}`);
      // console.log(res);
      return res.data.room;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.errors || [{ msg: error.message }]
      );
    }
  }
);

// Create room
export const createRoomThunk = createAsyncThunk(
  "room/createRoom",
  async (roomData, { rejectWithValue }) => {
    // console.log("roomData : ", roomData);
    try {
      const res = await axiosInstance.post(CREATE_ROOM, roomData);
      // console.log(res);
      return res.data.room;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.errors || [{ msg: error.message }]
      );
    }
  }
);

// get paginated rooms
export const getPaginatedRoomsThunk = createAsyncThunk(
  "room/getPaginatedRooms",
  async ({ page = 1, limit = 6 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${GET_PAGINATED_ROOMS}?page=${page}&limit=${limit}`
      );
      // console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.errors || [{ msg: error.message }]
      );
    }
  }
);

// get Rooms by room name
export const getRoomsByRoomNameThunk = createAsyncThunk(
  "room/getRoomsByRoomName",
  async (roomName, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${GET_ROOMS_BY_ROOM_NAME}/${roomName}`
      );
      // console.log(res);
      return res.data.rooms;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.errors || [{ msg: error.message }]
      );
    }
  }
);
