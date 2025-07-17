import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import roomReducer from "./slices/room.slice";
import chatReducer from "./slices/chat.slice";
import codeReducer from "./slices/code.slice";
import videoCallReducer from "./slices/videoCall.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    chat: chatReducer,
    code: codeReducer,
    videoCall: videoCallReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disables MediaStream warning
    }),
});
