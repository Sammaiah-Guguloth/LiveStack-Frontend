import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import axiosInstance from "../../api/axios/axiosInstance";
import { UPDATE_CODE_ADMIN } from "../../api/apis";
import { useState } from "react";
import { FiCopy, FiEdit } from "react-icons/fi";
import { BsSave } from "react-icons/bs";
import { TiTimesOutline } from "react-icons/ti";

const CodeSection = ({ code, setCode, isAdmin, language, roomId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCode, setEditedCode] = useState(code);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const handleCancel = () => {
    setEditedCode(code); // reset to original
    setIsEditing(false);
    toast.success("Edit cancelled");
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(UPDATE_CODE_ADMIN, { roomId, code: editedCode });
      setCode(editedCode);
      setIsEditing(false);
      toast.success("Code updated successfully!");
    } catch (error) {
      console.error("Error saving code:", error);
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error("Failed to update code.");
      }
    }
  };

  return (
    <motion.div
      className="relative mb-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-xl font-bold text-white mb-3">Room Code</h2>

      <div className="relative rounded-lg bg-[#0f0f0f] border border-gray-700 overflow-hidden">
        {/* Top right action buttons */}
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            onClick={handleCopy}
            title="Copy"
            className="text-white p-2 rounded-full text-lg cursor-pointer"
          >
            <FiCopy />
          </button>

          {isAdmin && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              title="Edit"
              className="text-yellow-100 p-2 rounded-full text-lg cursor-pointer"
            >
              <FiEdit />
            </button>
          )}

          {isAdmin && isEditing && (
            <button
              onClick={handleCancel}
              title="Cancel"
              className="text-red-300  text-2xl cursor-pointer"
            >
              <TiTimesOutline />
            </button>
          )}
        </div>

        {/* Code Editor / Viewer */}
        <div className="max-h-[300px] overflow-y-auto scrollbar-none">
          {isAdmin && isEditing ? (
            <div className="relative">
              <textarea
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
                className="w-full h-64 max-h-[300px] p-4 bg-transparent text-white font-mono resize-none focus:outline-none"
                style={{
                  fontSize: "0.9rem",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              />
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
          ) : (
            <SyntaxHighlighter
              language={language || "javascript"}
              style={dracula}
              wrapLongLines
              customStyle={{
                padding: "1rem",
                fontSize: "0.9rem",
                margin: 0,
                background: "transparent",
              }}
            >
              {code}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CodeSection;
