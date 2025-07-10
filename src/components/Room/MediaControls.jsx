import React, { useState } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaShareAlt,
  FaEllipsisV,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MediaControls = ({
  isMuted,
  videoOff,
  onToggleMute,
  onToggleVideo,
  onShare,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <div className="relative flex items-center gap-2">
      {/* Desktop Controls */}
      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={onToggleMute}
          className="p-2 rounded-md hover:bg-[#2e2e2e]"
          aria-label={isMuted ? "Unmute" : "Mute"}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <FaMicrophone className="text-[#D9B346]" />
          ) : (
            <FaMicrophoneSlash className="text-[#D9B346]" />
          )}
        </button>

        <button
          onClick={onToggleVideo}
          className="p-2 rounded-md hover:bg-[#2e2e2e]"
          aria-label={videoOff ? "Turn on Video" : "Turn off Video"}
          title={videoOff ? "Turn on Video" : "Turn off Video"}
        >
          {videoOff ? (
            <FaVideo className="text-[#D9B346]" />
          ) : (
            <FaVideoSlash className="text-[#D9B346]" />
          )}
        </button>

        <button
          onClick={onShare}
          className="p-2 rounded-md hover:bg-[#2e2e2e]"
          aria-label="Share room"
          title="Share room"
        >
          <FaShareAlt className="text-[#D9B346]" />
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden relative">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md hover:bg-[#2e2e2e]"
          aria-label="More options"
          title="More options"
        >
          <FaEllipsisV className="text-[#D9B346]" />
        </button>

        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 right-0 bottom-12 w-40 bg-[#1f1f1f] border border-[#333] rounded-lg shadow-lg py-2"
            >
              <button
                onClick={() => {
                  onToggleMute();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#2e2e2e]"
              >
                {isMuted ? (
                  <FaMicrophone className="text-[#D9B346]" />
                ) : (
                  <FaMicrophoneSlash className="text-[#D9B346]" />
                )}
                <span>{isMuted ? "Unmute" : "Mute"}</span>
              </button>

              <button
                onClick={() => {
                  onToggleVideo();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#2e2e2e]"
              >
                {videoOff ? (
                  <FaVideo className="text-[#D9B346]" />
                ) : (
                  <FaVideoSlash className="text-[#D9B346]" />
                )}
                <span>{videoOff ? "Video On" : "Video Off"}</span>
              </button>

              <button
                onClick={() => {
                  onShare();
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[#2e2e2e]"
              >
                <FaShareAlt className="text-[#D9B346]" />
                <span>Share</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MediaControls;
