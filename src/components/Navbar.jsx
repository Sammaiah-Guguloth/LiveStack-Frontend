import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="relative w-full px-4 py-3 shadow bg-[#181818e0] text-white border-b border-gray-500 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-bold"
        >
          <FaLaptopCode className="text-yellow-400" size={30} />
          <span className="text-white">LiveStack</span>
        </Link>

        {/* Desktop Right Section */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            to="/howItWorks"
            className="text-sm font-semibold border border-[#DABE57] px-5 py-2 rounded hover:bg-[#DABE57] hover:text-[#181818] transition"
          >
            How It Works
          </Link>

          {!isAuthenticated && !isAuthPage && (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold border border-[#DABE57] px-5 py-2 rounded hover:bg-[#DABE57] hover:text-[#181818] transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-semibold px-5 py-2 rounded text-[#181818]"
                style={{
                  background: "linear-gradient(to right, #D9B346, #DABE57)",
                }}
              >
                Signup
              </Link>
            </>
          )}

          {isAuthenticated && !isAuthPage && <UserDropdown user={user} />}
        </div>

        {/* Hamburger for tablet & below */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="sm:hidden flex flex-col items-start gap-3 mt-3 px-4 pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/howItWorks"
              onClick={toggleMobileMenu}
              className="text-sm w-full text-center font-semibold border border-[#DABE57] px-5 py-2 rounded hover:bg-[#DABE57] hover:text-[#181818] transition"
            >
              How It Works
            </Link>

            {!isAuthenticated && !isAuthPage && (
              <>
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="w-full text-sm font-semibold border border-[#DABE57] px-5 py-2 rounded hover:bg-[#DABE57] hover:text-[#181818] transition text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMobileMenu}
                  className="w-full text-center text-sm font-semibold px-5 py-2 rounded text-[#181818]"
                  style={{
                    background: "linear-gradient(to right, #D9B346, #DABE57)",
                  }}
                >
                  Signup
                </Link>
              </>
            )}

            {isAuthenticated && !isAuthPage && (
              <div onClick={toggleMobileMenu}>
                <UserDropdown user={user} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
