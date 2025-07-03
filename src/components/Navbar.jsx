import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className=" mx-auto w-full px-6 py-3 shadow bg-[#1818188e] text-white flex items-center justify-between border-b border-gray-500 z-100 ">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
        <FaLaptopCode className="text-yellow-400" size={35} />
        <span className="text-white">LiveStack</span>
      </Link>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Show login/signup only when not auth page and not logged in */}
        {!isAuthenticated && !isAuthPage && (
          <>
            <Link
              to="/login"
              className="text-sm font-semibold border border-[#DABE57] px-8 py-2.5 rounded-md hover:bg-[#DABE57] hover:text-[#181818] transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm font-semibold px-8 py-2.5 rounded-md text-[#181818]"
              style={{
                background: "linear-gradient(to right, #D9B346, #DABE57)",
              }}
            >
              Signup
            </Link>
          </>
        )}

        {/* Show user dropdown only when authenticated and not on login/signup pages */}
        {isAuthenticated && !isAuthPage && <UserDropdown user={user} />}
      </div>
    </nav>
  );
};

export default Navbar;
