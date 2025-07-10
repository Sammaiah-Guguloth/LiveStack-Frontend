import React from "react";

const MessageBubble = ({ msg, isSender }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
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
        <span>{isSender ? "You" : msg.sender?.firstName || "Unknown"}</span>
        <span className="text-xs">{formatTime(msg.time || Date.now())}</span>
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
};

export default MessageBubble;
