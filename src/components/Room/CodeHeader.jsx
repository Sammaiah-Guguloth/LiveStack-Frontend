import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaDoorOpen } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { MdAdminPanelSettings, MdOutlineStickyNote2 } from "react-icons/md";
import { setLanguage } from "../../redux/slices/room.slice";
import socket from "../../services/SocketClient";
import NotesWindow from "./NotesWindow";

const LANGUAGES = [
  "java",
  "python",
  "c",
  "cpp",
  "go",
  "ruby",
  "rust",
  "plaintext",
  "javascript",
  "typescript",
];

const CodeHeader = () => {
  const dispatch = useDispatch();
  const { room, admin, language } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);

  const [roomDropdown, setRoomDropdown] = useState(false);
  const [adminDropdown, setAdminDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const toggleNotesWindow = () => setShowNotes((prev) => !prev);

  const isAdmin = admin?._id === user?._id;

  const toggle = (type) => {
    if (type === "room") setRoomDropdown((prev) => !prev);
    if (type === "admin") setAdminDropdown((prev) => !prev);
    if (type === "lang") setLangDropdown((prev) => !prev);
  };

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
    socket.emit("language-change", { roomId: room._id, language: lang });
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
  };

  return (
    <div className="flex justify-between items-center border-b border-[#2e2e2e] bg-[#181818] px-4 py-2 relative z-10">
      {/* Room Info */}
      <div
        className="relative flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => toggle("room")}
        onMouseLeave={() => toggle("room")}
      >
        <FaDoorOpen size={18} className="text-yellow-300 drop-shadow-sm" />
        <h3 className="text-white font-semibold text-base">{room?.name}</h3>
        <FiChevronDown className="text-white text-sm" />
        <AnimatePresence>
          {roomDropdown && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              className="absolute top-10 left-0 bg-[#1f1f1f] text-white p-3 rounded-md shadow-xl border border-[#2e2e2e] w-64"
            >
              <h4 className="text-sm font-medium text-yellow-300 mb-1">
                Room Description
              </h4>
              <p className="text-xs text-gray-300">
                {room?.description || "No description provided."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Language Selector */}
      <div
        className="relative text-white cursor-pointer"
        onMouseEnter={() => toggle("lang")}
        onMouseLeave={() => toggle("lang")}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium bg-gradient-to-r from-[#d9b346] to-[#dabd57] text-transparent bg-clip-text uppercase">
            {language}
          </span>
          <FiChevronDown size={14} className="text-white" />
        </div>
        <AnimatePresence>
          {langDropdown && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              className="absolute top-8 right-0 bg-[#1f1f1f] text-white p-2 rounded-md shadow-md border border-[#2e2e2e] w-40"
            >
              {LANGUAGES.map((lang) => (
                <div
                  key={lang}
                  onClick={() => {
                    if (isAdmin) handleLanguageChange(lang);
                  }}
                  title={!isAdmin ? "Only admin can change the language" : ""}
                  className={`py-1 px-3 rounded-md hover:bg-[#2c2c2c] transition-all text-sm capitalize ${
                    language === lang
                      ? "text-yellow-300 font-semibold"
                      : "text-gray-300"
                  }`}
                  style={{ cursor: isAdmin ? "pointer" : "default" }}
                >
                  {lang}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Notes Button */}
      <div
        className="relative flex items-center gap-2 cursor-pointer"
        onClick={toggleNotesWindow}
        title="Take Markdown Notes (Saved per Room)"
      >
        <MdOutlineStickyNote2
          size={20}
          className="text-green-300 hover:scale-105 transition"
        />
        <p className="text-sm text-white hidden md:block">Notes</p>
      </div>

      {/* Admin Info */}
      <div
        className="relative flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => toggle("admin")}
        onMouseLeave={() => toggle("admin")}
      >
        <MdAdminPanelSettings size={20} className="text-blue-300 drop-shadow" />
        <p className="text-sm text-white">{admin?.firstName}</p>
        <AnimatePresence>
          {adminDropdown && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              className="absolute top-10 right-0 bg-[#1f1f1f] text-white p-3 rounded-md shadow-lg border border-[#2e2e2e] w-64"
            >
              <h4 className="text-sm font-medium text-blue-300 mb-1">
                Admin Details
              </h4>
              <p className="text-sm">{admin?.firstName}</p>
              <p className="text-xs text-gray-400">{admin?.email}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showNotes && <NotesWindow onClose={toggleNotesWindow} />}
    </div>
  );
};

export default CodeHeader;
