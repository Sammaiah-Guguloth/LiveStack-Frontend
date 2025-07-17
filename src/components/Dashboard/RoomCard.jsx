import React from "react";
import { motion } from "framer-motion";

const gradients = [
  "from-pink-100 via-pink-200 to-pink-300",
  "from-green-100 via-green-200 to-green-300",
  "from-blue-100 via-blue-200 to-blue-300",
  "from-yellow-100 via-yellow-200 to-yellow-300",
  "from-purple-100 via-purple-200 to-purple-300",
  "from-rose-100 via-rose-200 to-rose-300",
  "from-indigo-100 via-indigo-200 to-indigo-300",
];

const RoomCard = ({ room }) => {
  const gradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-xl p-4 shadow-md bg-gradient-to-br ${gradient} hover:shadow-lg transition-shadow duration-300 w-full break-words`}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
        {room.name}
      </h3>
      <p className="text-sm text-gray-700 mb-1 truncate">
        <strong>Admin:</strong> {room.admin?.firstName} {room.admin?.lastName}
      </p>
      <p className="text-sm text-gray-600 truncate">
        <strong>Language:</strong> {room.language}
      </p>
    </motion.div>
  );
};

export default RoomCard;
