{
  // import React, { useState, useRef, useEffect } from "react";
  // import {
  //   FaVideo,
  //   FaMicrophone,
  //   FaMicrophoneSlash,
  //   FaVideoSlash,
  //   FaShareAlt,
  // } from "react-icons/fa";
  // import socket from "../../services/SocketClient";
  // import { useDispatch, useSelector } from "react-redux";
  // import { useNavigate, useParams } from "react-router-dom";
  // import { addMessage } from "../../redux/slices/chat.slice";
  // import { toggleMute, toggleVideo } from "../../redux/slices/videoCall.slice";
  // import ShareModal from "./ShareModal";
  // import { RiSendPlaneFill } from "react-icons/ri";
  // const ChatBox = () => {
  //   const [message, setMessage] = useState("");
  //   const [showShareModal, setShowShareModal] = useState(false);
  //   const messagesEndRef = useRef(null);
  //   const { user } = useSelector((state) => state.auth);
  //   const { messages } = useSelector((state) => state.chat);
  //   const { roomId } = useParams();
  //   const { localStream, isMuted, videoOff } = useSelector(
  //     (state) => state.videoCall
  //   );
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const roomUrl = `${window.location.origin}/room/${roomId}`;
  //   const handleToggleMute = () => {
  //     const newState = !isMuted;
  //     if (localStream) {
  //       localStream.getAudioTracks().forEach((track) => {
  //         track.enabled = !newState;
  //       });
  //     }
  //     dispatch(toggleMute());
  //     socket.emit("media-toggle", { isMuted: newState, videoOff });
  //   };
  //   const handleToggleVideo = () => {
  //     const newState = !videoOff;
  //     if (localStream) {
  //       localStream.getVideoTracks().forEach((track) => {
  //         track.enabled = !newState;
  //       });
  //     }
  //     dispatch(toggleVideo());
  //     socket.emit("media-toggle", { roomId, isMuted, videoOff: newState });
  //   };
  //   useEffect(() => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, [messages]);
  //   const leaveRoomSocketHandler = () => {
  //     socket.emit("leave-room", { user, roomId });
  //     navigate("/");
  //   };
  //   const sendMessage = () => {
  //     if (!message.trim()) return;
  //     socket.emit("message", { roomId, sender: user, message });
  //     setMessage("");
  //   };
  //   const handleKeyDown = (e) => {
  //     if (e.key === "Enter") sendMessage();
  //   };
  //   const formatTime = (timestamp) => {
  //     const date = new Date(timestamp);
  //     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  //   };
  //   return (
  //     <div className="flex flex-col h-full bg-[#141414] text-white">
  //       <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-4 pt-4">
  //         {messages.map((msg, index) => {
  //           const isSender = msg.sender?._id === user?._id;
  //           return (
  //             <div
  //               key={index}
  //               className={`flex px-1 flex-col max-w-[75%] ${
  //                 isSender ? "self-end items-end" : "self-start items-start"
  //               }`}
  //             >
  //               <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
  //                 {!isSender && (
  //                   <img
  //                     src={msg.sender?.profileImage || "/default-avatar.png"}
  //                     alt="avatar"
  //                     className="w-6 h-6 rounded-full"
  //                   />
  //                 )}
  //                 <span>
  //                   {isSender ? "You" : msg.sender?.firstName || "Unknown"}
  //                 </span>
  //                 <span className="text-xs">
  //                   {formatTime(msg.time || Date.now())}
  //                 </span>
  //               </div>
  //               <div
  //                 className={`relative rounded-md px-3 py-2 ${
  //                   isSender
  //                     ? "bg-[#d9b346] text-black before:border-t-[#d9b346] before:right-3"
  //                     : "bg-[#1f1f1f] text-white before:border-t-[#1f1f1f] before:left-3"
  //                 } before:absolute before:bottom-[-8px] before:w-0 before:h-0 before:border-x-8 before:border-x-transparent before:border-t-8 before:content-['']`}
  //               >
  //                 {msg.message}
  //               </div>
  //             </div>
  //           );
  //         })}
  //         <div ref={messagesEndRef} />
  //       </div>
  //       {/* Input Box */}
  //       <div className="flex items-center gap-2 p-2 border-t border-[#2e2e2e]">
  //         <input
  //           type="text"
  //           value={message}
  //           onChange={(e) => setMessage(e.target.value)}
  //           onKeyDown={handleKeyDown}
  //           placeholder="Type a message..."
  //           className="flex-1 px-4 py-2 rounded-md bg-[#222] text-white border border-[#2e2e2e] focus:outline-none"
  //         />
  //         <button
  //           onClick={sendMessage}
  //           className="p-2 rounded-md hover:bg-[#2e2e2e] transition"
  //           aria-label="send message"
  //         >
  //           <RiSendPlaneFill className="text-[#D9B346]" />
  //         </button>
  //         <button
  //           onClick={() => setShowShareModal(true)}
  //           className="p-2 rounded-md hover:bg-[#2e2e2e] transition"
  //           aria-label="Share room"
  //           title="Share room"
  //         >
  //           <FaShareAlt className="text-[#D9B346]" />
  //         </button>
  //         <button
  //           onClick={handleToggleMute}
  //           className="p-2 rounded-md hover:bg-[#2e2e2e] transition"
  //           aria-label={`${isMuted ? "Unmute" : "Mute"} yourself`}
  //           title={`${isMuted ? "Unmute" : "Mute"} yourself`}
  //         >
  //           {isMuted ? (
  //             <FaMicrophone className="text-[#D9B346]" />
  //           ) : (
  //             <FaMicrophoneSlash className="text-[#D9B346]" />
  //           )}
  //         </button>
  //         <button
  //           onClick={handleToggleVideo}
  //           className="p-2 rounded-md hover:bg-[#2e2e2e] transition"
  //           aria-label={`${videoOff ? "Turn on" : "Turn off"} video`}
  //           title={`${videoOff ? "Turn on" : "Turn off"} video`}
  //         >
  //           {videoOff ? (
  //             <FaVideo className="text-[#D9B346]" />
  //           ) : (
  //             <FaVideoSlash className="text-[#D9B346]" />
  //           )}
  //         </button>
  //         <button
  //           onClick={leaveRoomSocketHandler}
  //           className="font-semibold px-4 py-2 rounded-md bg-red-500"
  //         >
  //           Leave
  //         </button>
  //       </div>
  //       {/* Share Modal */}
  //       {showShareModal && (
  //         <ShareModal
  //           roomUrl={roomUrl}
  //           onClose={() => setShowShareModal(false)}
  //         />
  //       )}
  //     </div>
  //   );
  // };
  // export default ChatBox;
}

import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addMessage } from "../../redux/slices/chat.slice";
import socket from "../../services/SocketClient";
import ShareModal from "./ShareModal";
import MessageBubble from "./MessageBubble";
import InputBar from "./InputBar";
import MediaControls from "./MediaControls";
import useAutoScroll from "./hooks/useAutoScroll";
import { MdCallEnd } from "react-icons/md";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const messagesEndRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.chat);
  const { roomId } = useParams();
  const { localStream, isMuted, videoOff } = useSelector(
    (state) => state.videoCall
  );
  const roomUrl = `${window.location.origin}/room/${roomId}`;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useAutoScroll(messagesEndRef, messages);

  const handleToggleMute = () => {
    const newState = !isMuted;
    localStream
      ?.getAudioTracks()
      .forEach((track) => (track.enabled = !newState));
    dispatch({ type: "videoCall/toggleMute" });
    socket.emit("media-toggle", { isMuted: newState, videoOff });
  };

  const handleToggleVideo = () => {
    const newState = !videoOff;
    localStream
      ?.getVideoTracks()
      .forEach((track) => (track.enabled = !newState));
    dispatch({ type: "videoCall/toggleVideo" });
    socket.emit("media-toggle", { roomId, isMuted, videoOff: newState });
  };

  const leaveRoomSocketHandler = () => {
    socket.emit("leave-room", { user, roomId });
    navigate("/");
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("message", { roomId, sender: user, message });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full bg-[#141414] text-white">
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-4 pt-4">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            msg={msg}
            isSender={msg.sender?._id === user?._id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full flex  justify-between">
        <InputBar
          message={message}
          setMessage={setMessage}
          onSend={sendMessage}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <div className="px-2 py-2 flex justify-between items-center border-t border-[#2e2e2e]">
          <MediaControls
            isMuted={isMuted}
            videoOff={videoOff}
            onToggleMute={handleToggleMute}
            onToggleVideo={handleToggleVideo}
            onShare={() => setShowShareModal(true)}
          />
          <button
            onClick={leaveRoomSocketHandler}
            className="font-bold text-2xl cursor-pointer ml-2 p-[6px] bg-red-300 rounded-full "
            aria-label="Leave room"
            title="Leave room"
          >
            <MdCallEnd className="text-red-700" />
          </button>
        </div>
      </div>

      {showShareModal && (
        <ShareModal
          roomUrl={roomUrl}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default ChatBox;
