import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import toast from "react-hot-toast";

const ShareModal = ({ roomUrl, onClose }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomUrl);
    toast.success("Room link copied to clipboard!");
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-[#1f1f1f] p-6 rounded-lg  relative text-white shadow-lg"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 cursor-pointer right-2 text-white hover:text-gray-300 text-xl"
          >
            ✖
          </button>

          <h2 className="text-lg font-semibold mb-4">Share this room</h2>

          <div className="flex flex-col gap-4">
            {/* Copy URL Section */}
            <div className="mb-4">
              <input
                type="text"
                readOnly
                value={roomUrl}
                className="w-full p-2 mt-2 rounded bg-[#222] text-white border border-[#444]"
              />
              <button
                onClick={copyToClipboard}
                className="bg-[#D9B346] mt-3 text-black font-semibold px-4 py-2 rounded-md w-full"
              >
                Copy Link
              </button>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-4 justify-between flex-wrap">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=Join%20the%20room:%20${encodeURIComponent(
                  roomUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-medium"
              >
                <FaWhatsapp size={20} /> WhatsApp
              </a>

              {/* Gmail */}
              <a
                href={`mailto:?subject=Join%20My%20Room&body=Join%20the%20room%20here:%20${encodeURIComponent(
                  roomUrl
                )}`}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white font-medium"
              >
                <SiGmail size={20} /> Gmail
              </a>

              {/* Telegram */}
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(
                  roomUrl
                )}&text=Join%20this%20room`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-medium"
              >
                <FaTelegramPlane size={20} /> Telegram
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ShareModal;
