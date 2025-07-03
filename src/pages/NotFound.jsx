import React from "react";
import { Link } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#181818] text-white flex flex-col items-center justify-center px-6">
      {/* App Logo */}
      <div className="flex items-center gap-2 mb-6">
        <FaLaptopCode className="text-yellow-400" size={36} />
        <span className="text-2xl font-bold">LiveStack</span>
      </div>

      {/* 404 Icon */}
      <MdErrorOutline size={80} className="text-[#DABE57] mb-4" />

      {/* 404 Text */}
      <h1 className="text-5xl font-extrabold text-[#DABE57] mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 max-w-md text-center mb-8">
        Oops! The page you’re looking for doesn't exist or has been moved.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="px-6 py-3 rounded-md text-[#181818] font-semibold"
        style={{
          background: "linear-gradient(to right, #D9B346, #DABE57)",
        }}
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
