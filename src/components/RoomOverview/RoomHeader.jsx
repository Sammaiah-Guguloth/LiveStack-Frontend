import { motion } from "framer-motion";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

const RoomHeader = ({ room }) => {
  const handleCopyEmail = () => {
    if (room.admin?.email) {
      navigator.clipboard.writeText(room.admin.email);
      toast.success("Email copied to clipboard!");
    }
  };

  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Room Name */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent tracking-tight mb-4"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {room.name}
      </motion.h1>

      {/* Admin Card */}
      <motion.div
        className="bg-[#1f1f1f] md:p-6 p-3 rounded-xl shadow-lg border border-[#333] text-gray-300 w-full  "
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex flex-col items-center md:flex-row justify-between  lg:items-center gap-2">
          {/* Admin Name */}
          <p className="text-base sm:text-lg font-medium">
            Admin :{" "}
            <span className="text-white font-semibold">
              {room.admin?.firstName} {room.admin?.lastName}
            </span>
          </p>

          {/* Email + Copy Button */}
          <div className="flex items-center gap-2">
            <p className="text-yellow-400 text-sm break-all">
              {room.admin?.email}
            </p>
            <button
              onClick={handleCopyEmail}
              title="Copy Email"
              className="text-white text-sm cursor-pointer"
            >
              <FiCopy />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RoomHeader;
