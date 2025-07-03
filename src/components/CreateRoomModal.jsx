import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiRefreshCw } from "react-icons/fi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRoomThunk } from "../redux/thunks/room.thunk";

const supportedLanguages = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "TypeScript", value: "typescript" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
];

// Generate random room code
const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // 6-char code
};

const CreateRoomModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPrivate: false,
    language: "javascript",
    roomCode: generateRoomCode(),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGenerate = () => {
    const code = generateRoomCode();
    setFormData((prev) => ({ ...prev, roomCode: code }));
    toast.success("Room code generated!");
  };

  const handleCopy = () => {
    if (!formData.roomCode) return toast.error("No code to copy");
    navigator.clipboard.writeText(formData.roomCode);
    toast.success("Copied to clipboard!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, language, isPrivate, roomCode } = formData;

    if (!name || !language) {
      toast.error("Fill in all required fields");
      return;
    }

    if (isPrivate && !roomCode.trim()) {
      toast.error("Room code is required for private rooms");
      return;
    }

    try {
      const response = await dispatch(
        createRoomThunk({
          name,
          language,
          isPrivate: isPrivate ? "true" : "false",
          description,
          ...(isPrivate ? { roomCode } : {}),
        })
      ).unwrap();

      // console.log("response : ", response);

      toast.success("Room created Successfully!");

      navigate(`/room/${response._id}`);

      setFormData({
        name: "",
        description: "",
        isPrivate: false,
        language: "javascript",
        roomCode: generateRoomCode(),
      });

      onClose();
    } catch (errors) {
      if (Array.isArray(errors))
        errors.map((err) => toast.error(err.msg || "Network Error"));
      else toast.error("Unable to Create Room");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-neutral-900 text-white w-full max-w-md mx-4 rounded-2xl shadow-xl p-6 relative"
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              🚀 Create a Room
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Room Name */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Room Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Live DSA Session"
                  className="w-full px-4 py-2 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="What’s this session about?"
                  className="w-full px-4 py-2 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Language Dropdown */}
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Language <span className="text-red-400">*</span>
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {supportedLanguages.map((lang) => (
                    <option
                      key={lang.value}
                      value={lang.value}
                      className="bg-neutral-900 text-white"
                    >
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Private Room */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handleChange}
                  id="isPrivate"
                  className="w-4 h-4 text-yellow-500 accent-yellow-500"
                />
                <label htmlFor="isPrivate" className="text-sm text-gray-300">
                  Make it private (invite only)
                </label>
              </div>

              {/* Room Code Input if Private */}
              {formData.isPrivate && (
                <div className="relative">
                  <label className="block text-sm text-gray-300 mb-1">
                    Room Code <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      name="roomCode"
                      value={formData.roomCode}
                      onChange={handleChange}
                      placeholder="Enter or generate"
                      className="flex-1 px-4 py-2 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button
                      type="button"
                      onClick={handleGenerate}
                      className="p-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black"
                      title="Generate Code"
                    >
                      <FiRefreshCw />
                    </button>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="p-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-white"
                      title="Copy Code"
                    >
                      <FiCopy />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-tr from-yellow-500 to-yellow-300 text-black font-semibold hover:from-yellow-400 hover:to-yellow-200 transition-all text-sm"
                >
                  Create Room
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateRoomModal;
