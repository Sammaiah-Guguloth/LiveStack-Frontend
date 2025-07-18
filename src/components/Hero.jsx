import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HighlightedYellowText from "./HighlightedYellowText";
import TypeText from "./TypeText";
import CreateRoomModal from "./CreateRoomModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomThunk } from "../redux/thunks/room.thunk";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Hero = () => {
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomLoading, setRoomLoading] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    if (!roomId.trim()) return;
    setRoomLoading(true);

    try {
      await dispatch(fetchRoomThunk(roomId.trim())).unwrap();
      navigate(`/room/${roomId.trim()}`);
    } catch (error) {
      if (Array.isArray(error)) {
        error.forEach((err) => toast.error(err.msg));
      } else {
        toast.error("Room not found or an error occurred.");
      }
    } finally {
      setRoomLoading(false);
    }
  };

  return (
    <section className="mt-1.5 w-full py-10 px-5 md:px-10 lg:px-20 bg-[#0f0f0f] text-white overflow-hidden">
      {/* Headings */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0}
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <HighlightedYellowText>LiveStack</HighlightedYellowText> —
          Collaborative Code
        </h1>
        <motion.h2
          className="text-2xl md:text-4xl mt-4 font-semibold"
          variants={fadeUp}
          custom={1}
        >
          Editor Platform
        </motion.h2>
        <motion.p
          className="mt-6 max-w-2xl mx-auto text-gray-400"
          variants={fadeUp}
          custom={2}
        >
          Join live coding sessions, edit in sync, and ship ideas together —
          faster.
        </motion.p>
        <motion.div className="mt-4" variants={fadeUp} custom={3}>
          <TypeText />
        </motion.div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={4}
      >
        <div>
          <button
            onClick={() => {
              setShowCreateRoomModal(true);
              if (!isAuthenticated) navigate("/login");
            }}
            className="px-8 py-3 cursor-pointer rounded-full font-semibold text-[#181818]"
            style={{
              background: "linear-gradient(to right, #D9B346, #DABE57)",
            }}
          >
            + Create a Room
          </button>
          <CreateRoomModal
            isOpen={showCreateRoomModal}
            onClose={() => setShowCreateRoomModal(false)}
          />
        </div>

        <a
          href="#explore"
          className="px-8 py-3 border border-gray-600 rounded-full hover:bg-white hover:text-[#181818] transition-all"
        >
          Explore Features
        </a>

        <button
          onClick={() => setShowJoinInput((prev) => !prev)}
          className="px-8 py-3 border border-yellow-400 rounded-full hover:bg-yellow-200 hover:text-[#181818] transition-all"
        >
          Join Room
        </button>
      </motion.div>

      {/* Join Room Input */}
      <motion.div
        className={`flex flex-col md:flex-row justify-center items-center gap-4 mt-4 transition-all duration-300 ease-in-out ${
          showJoinInput
            ? "opacity-100 max-h-[200px]"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={showJoinInput ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
          className="px-4 py-2 rounded-md bg-[#1f1f1f] border border-gray-700 text-white w-[250px] md:w-[300px] focus:outline-none focus:ring-2 focus:ring-[#DABE57]"
        />

        <button
          onClick={handleJoinRoom}
          disabled={!roomId.trim() || roomLoading}
          className={`px-6 py-2 font-semibold rounded-full transition-all duration-300 text-[#181818] ${
            roomId.trim() && !roomLoading
              ? "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-300 hover:to-green-400"
              : "bg-gradient-to-r from-yellow-200 to-yellow-300 text-gray-700 cursor-not-allowed"
          }`}
        >
          {roomLoading ? "Loading..." : "Go"}
        </button>
      </motion.div>

      {/* Preview */}
      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-[#DABE57] bg-gradient-to-br from-[#181818] to-[#2e2e2e]">
          <video
            src="/videos/hacker_room _video.mp4"
            autoPlay
            loop
            muted
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
