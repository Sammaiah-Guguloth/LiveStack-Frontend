// src/redux/slices/auth.slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
  googleAuthThunk,
  getProfileThunk,
} from "../thunks/auth.thunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  errors: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })

      // LOGIN
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })

      //GET USER PROFILE
      .addCase(getProfileThunk.pending, (state) => {
        state.loading = true;
        state.errors = null;
        state.user = null;
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
        state.user = null;
      })

      // LOGOUT
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.errors = null;
      })
      .addCase(logoutUserThunk.pending, (state, action) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export const { setUser, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
