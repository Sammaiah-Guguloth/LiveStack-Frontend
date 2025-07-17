import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTelegramPlane, FaLink, FaHashtag } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { TbShare3 } from "react-icons/tb";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

const ShareModal = ({ roomUrl, onClose }) => {
  const roomId = roomUrl.split("/").pop(); // assuming room ID is last part of URL

  const copyToClipboard = (text, label = "Copied") => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#2b2b2b71] w-full max-w-md p-6 rounded-2xl shadow-2xl text-white relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-xl hover:text-yellow-400 transition"
          >
            ✖
          </button>

          {/* Title */}
          <div className="flex items-center gap-2 mb-6 justify-center">
            <TbShare3 className="text-yellow-400" size={28} />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#D9B346] to-[#DABE57] text-transparent bg-clip-text">
              Share Room
            </h2>
          </div>

          {/* Room Link */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 font-medium mb-1 block flex items-center gap-2">
              <FaLink className="text-yellow-400" />
              Room Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={roomUrl}
                className="flex-1 p-2 rounded-md bg-[#111] text-sm text-white border border-[#333] outline-none"
              />
              <button
                onClick={() => copyToClipboard(roomUrl, "Link")}
                title="Copy"
                className="text-white p-2 rounded-full text-lg cursor-pointer"
              >
                <FiCopy />
              </button>
            </div>
          </div>

          {/* Room ID */}
          <div className="mb-6">
            <label className="text-sm text-gray-400 font-medium mb-1 block flex items-center gap-2">
              <FaHashtag className="text-yellow-400" />
              Room ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={roomId}
                className="flex-1 p-2 rounded-md bg-[#111] text-sm text-white border border-[#333] outline-none"
              />
              <button
                onClick={() => copyToClipboard(roomId, "Room ID")}
                title="Copy"
                className="text-white p-2 rounded-full text-lg cursor-pointer"
              >
                <FiCopy />
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={`https://wa.me/?text=Join%20the%20room:%20${encodeURIComponent(
                roomUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-3 rounded-md text-sm font-semibold transition"
            >
              <FaWhatsapp size={18} /> WhatsApp
            </a>

            <a
              href={`mailto:?subject=Join%20My%20Room&body=Join%20the%20room%20here:%20${encodeURIComponent(
                roomUrl
              )}`}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-md text-sm font-semibold transition"
            >
              <SiGmail size={18} /> Gmail
            </a>

            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                roomUrl
              )}&text=Join%20this%20room`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-md text-sm font-semibold transition"
            >
              <FaTelegramPlane size={18} /> Telegram
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ShareModal;
