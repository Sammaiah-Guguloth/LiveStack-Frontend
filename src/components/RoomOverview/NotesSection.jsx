import { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy } from "react-icons/fi";
import { BsSave } from "react-icons/bs";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios/axiosInstance";
import { CREATE_OR_UPDATE_NOTE } from "../../api/apis";

const NotesSection = ({ notes, setNotes, roomId }) => {
  // console.log(notes);
  const [localNotes, setLocalNotes] = useState(notes || "");

  const handleCopy = () => {
    navigator.clipboard.writeText(localNotes);
    toast.success("Notes copied!");
  };

  const handleSave = async () => {
    try {
      await axiosInstance.post(CREATE_OR_UPDATE_NOTE, {
        roomId,
        content: localNotes,
      });
      setNotes(localNotes);
      toast.success("Notes saved!");
    } catch (error) {
      console.log("Error while saving notes:", error);
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error("Failed to save notes.");
      }
    }
  };

  return (
    <motion.div
      className="relative mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-xl font-bold text-white mb-3">Room Notes</h2>

      <div className="relative rounded-lg bg-[#0f0f0f] border border-gray-700 overflow-hidden">
        {/* Top Right Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            onClick={handleCopy}
            title="Copy"
            className="text-white p-2 rounded-full text-lg cursor-pointer"
          >
            <FiCopy />
          </button>
        </div>

        {/* Notes Editor */}
        <div className="relative">
          <textarea
            value={localNotes}
            onChange={(e) => setLocalNotes(e.target.value)}
            className="w-full h-60 max-h-[300px] p-4 bg-transparent text-white font-mono resize-none focus:outline-none"
            style={{
              fontSize: "0.9rem",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          />

          {/* Bottom Right Save Button */}
          <div className="absolute bottom-3 right-3">
            <button
              onClick={handleSave}
              title="Save"
              className="text-white px-4 py-2 cursor-pointer gap-2 text-lg"
            >
              <BsSave />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotesSection;
