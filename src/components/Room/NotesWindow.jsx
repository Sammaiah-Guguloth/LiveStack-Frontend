import React, { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../api/axios/axiosInstance";
import { CREATE_OR_UPDATE_NOTE, GET_NOTES } from "../../api/apis";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const NotesWindow = ({ onClose }) => {
  const { room } = useSelector((state) => state.room);
  const { roomId } = useParams();
  const [note, setNote] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);

  const notesWindowRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notesWindowRef.current &&
        !notesWindowRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const fetchNote = async () => {
    setNoteLoading(true);
    try {
      const response = await axiosInstance.get(`${GET_NOTES}/${roomId}`);
      if (response.status === 200) {
        setNote(response.data.content || "");
      }
    } catch (err) {
      console.log(err);
      err.response?.data?.errors?.map((err) => toast.error(err.msg));
    } finally {
      setNoteLoading(false);
    }
  };

  const saveNote = async () => {
    setNoteLoading(true);
    try {
      const response = await axiosInstance.post(CREATE_OR_UPDATE_NOTE, {
        roomId,
        content: note,
      });
      if (response.status === 201) {
        toast.success("Note saved successfully!");
        onClose();
      }
    } catch (err) {
      console.error("Failed to save note", err);
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach((error) => toast.error(error.msg));
      } else {
        toast.error("Failed to save note. Please try again.");
      }
    } finally {
      setNoteLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [room]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-screen h-screen z-40 flex items-center justify-center"
      >
        <Rnd
          default={{
            x: window.innerWidth > 500 ? 100 : 0,
            y: window.innerHeight > 400 ? 100 : 0,
            width: window.innerWidth > 500 ? 420 : "95%",
            height: 350,
          }}
          minWidth={300}
          minHeight={250}
          bounds="window"
          className="z-50"
          enableResizing={{
            bottomRight: true,
            bottom: true,
            right: true,
            left: true,
          }}
        >
          <div
            ref={notesWindowRef}
            className="w-full h-full rounded-xl border border-[#333] shadow-lg flex flex-col p-4"
            style={{
              background: "linear-gradient(135deg, #1a1a1a, #232323, #2d2d2d)",
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-yellow-300 to-green-400 bg-clip-text text-transparent">
                Notes for {room?.name}
              </h2>
              <button onClick={onClose}>
                <MdClose
                  size={20}
                  className="text-white hover:text-red-400 transition"
                />
              </button>
            </div>

            {/* Textarea */}
            <textarea
              value={noteLoading ? "Loading..." : note}
              contentEditable={!noteLoading}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 text-sm text-white p-3 bg-[#1e1e1e] rounded-md border border-[#3e3e3e] resize-none focus:outline-none"
              placeholder="Write your notes here..."
            />

            {/* Save Button */}
            <button
              onClick={saveNote}
              disabled={noteLoading}
              className="mt-3 py-1.5 px-4 self-end bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white rounded-md text-sm font-medium transition"
            >
              {noteLoading ? "saving..." : "Save Note"}
            </button>
          </div>
        </Rnd>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotesWindow;
