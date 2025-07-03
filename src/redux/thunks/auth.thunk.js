// src/redux/thunks/auth.thunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios/axiosInstance";
import {
  GET_PROFILE,
  GOOGLE_AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "../../api/apis";

// REGISTER
export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(REGISTER_USER, formData);

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || "Registration failed"
      );
    }
  }
);

// LOGIN
export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(LOGIN_USER, formData);
      return data.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.errors || "Network Error");
    }
  }
);

// LOGOUT
export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(LOGOUT_USER);
      return true;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.errors || [{ msg: "Logout failed" }]
      );
    }
  }
);

// GOOGLE AUTH
export const googleAuthThunk = createAsyncThunk(
  "auth/googleAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(GOOGLE_AUTH_USER, data);

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || ["Goolge Auth Failed"]
      );
    }
  }
);

// GET_PROFILE
export const getProfileThunk = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(GET_PROFILE);
      // console.log(response);
      return response.data.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.errors || [{ msg: "Failed to fetch profile" }]
      );
    }
  }
);
