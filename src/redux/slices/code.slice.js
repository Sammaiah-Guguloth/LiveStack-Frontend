// redux/slices/code.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "", // shared code
  language: "javascript", // default language
  remoteCursors: {}, // other users' cursors
};

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    updateRemoteCursor: (state, action) => {
      const { userId, userName, position } = action.payload;
      state.remoteCursors[userId] = { userName, position };
    },
    clearRemoteCursors: (state) => {
      state.remoteCursors = {};
    },
  },
});

export const { setCode, setLanguage, updateRemoteCursor, clearRemoteCursors } =
  codeSlice.actions;

export default codeSlice.reducer;
