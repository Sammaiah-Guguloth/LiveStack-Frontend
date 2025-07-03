import React, { useState, useRef, useEffect } from "react";
import { FaVideo, FaMicrophone } from "react-icons/fa";
import socket from "../../services/SocketClient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addMessage } from "../../redux/slices/chat.slice";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // const [messages, setMessages] = useState([]);
  const { messages } = useSelector((state) => state.chat);
  const { roomId } = useParams();

  const requestAudio = () => {
    console.log("Socket emit: requested-audio");
  };

  const requestVideo = () => {
    console.log("Socket emit: requested-video");
  };

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const leaveRoomSocketHandler = () => {
    socket.emit("leave-room", { user, roomId });
    navigate("/");
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("message", { roomId, sender: user, message });
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // useEffect(() => {
  //   socket.on("message", (data) => {
  //     console.log("received : ", data);
  //     // setMessages((prev) => [...prev, data]);
  //     dispatch(addMessage(data));
  //   });

  //   return () => {
  //     socket.off("message");
  //   };
  // }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full bg-[#141414] text-white">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-4 pt-4">
        {messages.map((msg, index) => {
          const isSender = msg.sender?._id === user?._id;

          return (
            <div
              key={index}
              className={`flex px-1 flex-col max-w-[75%] ${
                isSender ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                {!isSender && (
                  <img
                    src={msg.sender?.profileImage || "/default-avatar.png"}
                    alt="avatar"
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span>
                  {isSender ? "You" : msg.sender?.firstName || "Unknown"}
                </span>
                <span className="text-xs">
                  {formatTime(msg.time || Date.now())}
                </span>
              </div>

              <div
                className={`relative rounded-md px-3 py-2 ${
                  isSender
                    ? "bg-[#d9b346] text-black before:border-t-[#d9b346] before:right-3"
                    : "bg-[#1f1f1f] text-white before:border-t-[#1f1f1f] before:left-3"
                } before:absolute before:bottom-[-8px] before:w-0 before:h-0 before:border-x-8 before:border-x-transparent before:border-t-8 before:content-['']`}
              >
                {msg.message}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 p-2 border-t border-[#2e2e2e]">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-md bg-[#222] text-white border border-[#2e2e2e] focus:outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-[#D9B346] to-[#DABE57] text-[#181818] font-semibold px-4 py-2 rounded-md"
        >
          Send
        </button>

        <button
          onClick={requestAudio}
          className="p-2 rounded-md hover:bg-[#2e2e2e] transition"
          aria-label="Request audio"
          title="Request audio"
        >
          <FaMicrophone className="text-[#D9B346]" />
        </button>

        <button
          onClick={requestVideo}
          className="p-2 rounded-md hover:bg-[#2e2e2e] transition"
          aria-label="Request video"
          title="Request video"
        >
          <FaVideo className="text-[#D9B346]" />
        </button>

        <button
          onClick={leaveRoomSocketHandler}
          className="font-semibold px-4 py-2 rounded-md bg-red-500"
        >
          Leave
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
