import React from "react";
import {
  FaCode,
  FaMicrophone,
  FaUserShield,
  FaComments,
  FaRecordVinyl,
} from "react-icons/fa";

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
    icon: <FaRecordVinyl size={35} />,
    title: "Recording & Export",
    description:
      "Record sessions, export to selected users, and generate subtitles with timestamps using AI.",
    gradient: "from-purple-500 to-purple-300",
  },
];

const Explore = () => {
  return (
    <section
      id="explore"
      className="relative overflow-hidden py-10 px-6 md:px-16"
    >
      {/* Diagonal Mesh Background */}
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

      <div className="flex flex-col md:flex-row gap-5 md:gap-10 relative z-20">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#D9B346] to-[#DABE57] text-transparent bg-clip-text">
            Everything You Need to Build Together
          </h3>
          <h4 className="text-white text-2xl md:text-5xl font-extrabold mt-3 leading-tight">
            Explore LiveStack’s Collaborative Features
          </h4>
        </div>

        {/* Right Side */}
        <div className="flex-1 relative flex flex-col gap-12">
          {/* Dotted Line */}
          <div className="absolute left-6 my-2 top-0 bottom-0 w-px border-l-2 border-dotted border-gray-600 z-0 hidden md:block" />

          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-7 relative z-10">
              {/* Icon with custom gradient */}
              <div
                className={`min-w-[47px] min-h-[47px] rounded-full bg-gradient-to-br ${feature.gradient} text-black flex items-center justify-center shadow-md z-10`}
              >
                {feature.icon}
              </div>

              {/* Text Content */}
              <div>
                <h5 className="text-white text-xl md:text-2xl font-semibold">
                  {feature.title}
                </h5>
                <p className=" text-xs md:text-sm text-gray-400 mt-1 max-w-md">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
