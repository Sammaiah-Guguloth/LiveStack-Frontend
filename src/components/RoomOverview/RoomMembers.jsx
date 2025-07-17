import React from "react";
import { motion } from "framer-motion";
import { BsPeopleFill } from "react-icons/bs";

const RoomMembers = ({ members }) => {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <BsPeopleFill />
        Room Members
      </h2>

      <div className="flex flex-wrap gap-4">
        {members?.map((member) => (
          <motion.div
            key={member._id}
            whileHover={{ scale: 1.15 }}
            className="relative group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border-2 border-yellow-400 overflow-hidden shadow-lg transition-all duration-300">
              <img
                src={
                  member.profileImage ||
                  `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}&background=111&color=fff`
                }
                alt={`${member.firstName} ${member.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tooltip-style label on hover */}
            <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 bg-[#222] text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20 whitespace-nowrap">
              {member.firstName} {member.lastName}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RoomMembers;
