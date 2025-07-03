import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localStream: null,
  remoteStreams: {
    // [socketId]: { userId, userName , stream, isMuted, videoOff }
  },
  isMuted: false,
  videoOff: false,
};

const videoCallSlice = createSlice({
  name: "videoCall",
  initialState,
  reducers: {
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    addRemoteStream: (state, action) => {
      const { socketId, userName, userId, stream, isMuted, videoOff } =
        action.payload;
      state.remoteStreams[socketId] = {
        userId,
        userName,
        stream,
        isMuted,
        videoOff,
      };
    },
    removeRemoteStream: (state, action) => {
      delete state.remoteStreams[action.payload]; // socketId
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
      if (state.localStream) {
        state.localStream.getAudioTracks().forEach((track) => {
          track.enabled = !state.isMuted;
        });
      }
    },
    toggleVideo: (state) => {
      state.videoOff = !state.videoOff;
      if (state.localStream) {
        state.localStream.getVideoTracks().forEach((track) => {
          track.enabled = !state.videoOff;
        });
      }
    },
    resetVideoState: () => initialState,
  },
});

export const {
  setLocalStream,
  addRemoteStream,
  removeRemoteStream,
  toggleMute,
  toggleVideo,
  resetVideoState,
} = videoCallSlice.actions;

export default videoCallSlice.reducer;
