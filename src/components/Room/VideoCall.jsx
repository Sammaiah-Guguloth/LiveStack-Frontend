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

const getRandomBg = (name) => {
  // Generate color from name for consistency
  const colors = [
    "bg-pink-300",
    "bg-purple-300",
    "bg-yellow-300",
    "bg-green-300",
    "bg-blue-300",
    "bg-red-300",
    "bg-indigo-300",
    "bg-rose-300",
  ];
  let index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
};

const getInitials = (name) => {
  return name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const VideoTile = ({
  stream,
  displayId,
  isMuted,
  videoOff,
  isLocal = false,
}) => {
  const showVideo = stream && !videoOff;

  return (
    <div className="relative w-64 h-48 rounded-xl overflow-hidden shadow-md bg-black">
      {showVideo ? (
        <ReactPlayer
          url={stream}
          playing
          muted={isLocal}
          width="100%"
          height="100%"
          className="object-cover"
        />
      ) : (
        <div
          className={`flex items-center justify-center h-full w-full ${getRandomBg(
            displayId
          )} text-black font-bold text-2xl`}
        >
          {getInitials(displayId)}
        </div>
      )}

      {/* Media status icons */}
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

      {/* Display Name */}
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
