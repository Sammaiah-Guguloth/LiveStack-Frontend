import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";

const InputBar = ({ message, setMessage, onSend, onKeyDown }) => {
  return (
    <div className="w-full flex items-center gap-2 p-2 border-t border-[#2e2e2e]">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-md bg-[#222] text-white border border-[#2e2e2e] focus:outline-none"
      />
      <button
        onClick={onSend}
        className="p-2 rounded-md hover:bg-[#2e2e2e] transition"
        aria-label="Send message"
      >
        <RiSendPlaneFill className="text-[#D9B346]" />
      </button>
    </div>
  );
};

export default InputBar;
