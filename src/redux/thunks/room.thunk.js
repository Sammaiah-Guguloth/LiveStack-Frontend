import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_ROOM, GET_ROOM_BY_ID } from "../../api/apis";
import axiosInstance from "../../api/axios/axiosInstance";

// Fetch room info
export const fetchRoomThunk = createAsyncThunk(
  "room/fetchRoom",
  async (roomId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${GET_ROOM_BY_ID}/${roomId}`);
      console.log(res);
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
