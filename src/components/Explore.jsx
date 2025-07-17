import React from "react";
import {
  FaCode,
  FaMicrophone,
  FaUserShield,
  FaComments,
  FaTachometerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaCode size={35} />,
    title: "Live Collaborative Code Editing",
    description:
      "Work in real-time with a shared editor, user cursors, and synced code changes across languages and themes.",
    gradient: "from-yellow-400 to-yellow-200",
  },
  {
    icon: <FaMicrophone size={35} />,
    title: "Integrated Audio & Video",
    description:
      "Communicate via live mic/video streams. Admin can manage AV permissions for each member.",
    gradient: "from-pink-500 to-pink-300",
  },
  {
    icon: <FaUserShield size={35} />,
    title: "Full Room Control for Admins",
    description:
      "Manage member access, permissions, room visibility (public/private), and even destroy rooms.",
    gradient: "from-blue-500 to-blue-300",
  },
  {
    icon: <FaComments size={35} />,
    title: "Smart Chat with Snippets",
    description:
      "Chat with team using real-time panel supporting markdown, code snippets, and typing indicators.",
    gradient: "from-green-400 to-green-200",
  },
  {
    icon: <FaTachometerAlt size={35} />,
    title: "User Dashboard",
    description:
      "Access your notes, copy code , manage profile  ,  admins can edit shared code",
    gradient: "from-blue-500 to-cyan-300",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Explore = () => {
  return (
    <section
      id="explore"
      className="relative overflow-hidden py-10 px-6 md:px-16"
    >
      {/* Background */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="diagonalLines"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="20"
              stroke="#F8F8E8"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <line
              x1="10"
              y1="0"
              x2="10"
              y2="20"
              stroke="#DABE57"
              strokeWidth="0.7"
              opacity="0.15"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
      </svg>

      <motion.div
        className="flex flex-col md:flex-row gap-5 md:gap-10 relative z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left Side */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          variants={fadeUp}
          custom={0}
        >
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#D9B346] to-[#DABE57] text-transparent bg-clip-text">
            Everything You Need to Build Together
          </h3>
          <h4 className="text-white text-2xl md:text-5xl font-extrabold mt-3 leading-tight">
            Explore LiveStack’s Collaborative Features
          </h4>
        </motion.div>

        {/* Right Side */}
        <div className="flex-1 relative flex flex-col gap-12">
          <div className="absolute left-6 my-2 top-0 bottom-0 w-px border-l-2 border-dotted border-gray-600 z-0 hidden md:block" />

          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-7 relative z-10"
              variants={fadeUp}
              custom={index + 1}
            >
              <motion.div
                className={`min-w-[47px] min-h-[47px] rounded-full bg-gradient-to-br ${feature.gradient} text-black flex items-center justify-center shadow-md z-10`}
                whileHover={{ scale: 1.1 }}
              >
                {feature.icon}
              </motion.div>

              <div>
                <h5 className="text-white text-xl md:text-2xl font-semibold">
                  {feature.title}
                </h5>
                <p className="text-xs md:text-sm text-gray-400 mt-1 max-w-md">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
