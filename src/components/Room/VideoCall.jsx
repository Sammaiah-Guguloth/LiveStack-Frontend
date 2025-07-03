// 📁 components/Room/VideoCall.jsx
import React from "react";
import ReactPlayer from "react-player";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const VideoTile = ({
  stream,
  displayId,
  isMuted,
  videoOff,
  isLocal = false,
}) => {
  return (
    <div className="relative w-64 h-48 bg-black rounded-xl overflow-hidden shadow-md">
      <ReactPlayer
        url={stream}
        playing
        muted={isLocal} // Mute local to avoid echo
        width="100%"
        height="100%"
        className="object-cover"
      />
      <div className="absolute bottom-1 left-1 flex gap-2 bg-black/60 p-1 rounded">
        {videoOff ? (
          <FaVideoSlash className="text-red-500" />
        ) : (
          <FaVideo className="text-green-400" />
        )}
        {isMuted ? (
          <FaMicrophoneSlash className="text-red-500" />
        ) : (
          <FaMicrophone className="text-green-400" />
        )}
      </div>
      <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
        {isLocal ? "You" : displayId}
      </div>
    </div>
  );
};

const VideoCall = () => {
  const { localStream, remoteStreams, isMuted, videoOff } = useSelector(
    (state) => state.videoCall
  );

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center p-4">
      {localStream && (
        <VideoTile
          stream={localStream}
          displayId="You"
          isMuted={isMuted}
          videoOff={videoOff}
          isLocal
        />
      )}

      {Object.entries(remoteStreams).map(
        ([socketId, { userId, userName, stream, isMuted, videoOff }]) => (
          <VideoTile
            key={socketId}
            stream={stream}
            // displayId={userId?.slice(0, 6) || socketId.slice(0, 6)}
            displayId={userName}
            isMuted={isMuted}
            videoOff={videoOff}
          />
        )
      )}
    </div>
  );
};

export default VideoCall;
