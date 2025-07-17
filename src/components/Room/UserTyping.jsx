import { motion } from "framer-motion";

const UserTyping = ({ userName }) => {
  // console.log("user typing in usertping : ", userName);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="absolute top-2 left-2 z-50 bg-white/80 dark:bg-black/60 backdrop-blur-sm text-sm text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full shadow-lg flex items-center space-x-2"
    >
      <div className="font-medium">{userName}</div>
      <div className="flex space-x-1">
        <span className="animate-bounce delay-0 w-1.5 h-1.5 bg-gray-500 dark:bg-gray-300 rounded-full" />
        <span className="animate-bounce delay-100 w-1.5 h-1.5 bg-gray-500 dark:bg-gray-300 rounded-full" />
        <span className="animate-bounce delay-200 w-1.5 h-1.5 bg-gray-500 dark:bg-gray-300 rounded-full" />
      </div>
    </motion.div>
  );
};

export default UserTyping;
