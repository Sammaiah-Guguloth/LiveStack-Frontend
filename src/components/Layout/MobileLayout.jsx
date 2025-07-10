// components/Layout/MobileLayout.jsx
import React, { useState } from "react";
import CodeHeader from "../Room/CodeHeader";
import CodeEditor from "../Room/CodeEditor";
import VideoCall from "../Room/VideoCall";
import ChatBox from "../Room/ChatBox";
import { AnimatePresence, motion } from "framer-motion";

const tabVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const MobileLayout = () => {
  const [activeTab, setActiveTab] = useState("video");

  return (
    <div className="flex flex-col h-full w-full">
      {/* Top: Code */}
      <div className="flex flex-col h-[55%]">
        <CodeHeader />
        <div className="flex-1 overflow-hidden">
          <CodeEditor />
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex items-center justify-around bg-[#1e1e1e] border-t border-[#333]">
        {["video", "chat"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 font-semibold transition ${
              activeTab === tab
                ? "bg-[#D9B346] text-black"
                : "bg-transparent text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Animated Content */}
      <div className="flex-1 overflow-auto relative">
        <AnimatePresence mode="wait">
          {activeTab === "video" ? (
            <motion.div
              key="video"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <VideoCall />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ChatBox />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileLayout;
