import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserThunk } from "../redux/thunks/auth.thunk";
import toast from "react-hot-toast";

const UserDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap();

      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (errors) {
      if (Array.isArray(errors))
        errors.map((error) => console.error(error.msg));
      else toast.error("Logout failed");
    } finally {
      setIsOpen(false);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        src={user.profileImage || "/default-avatar.png"}
        alt="Profile"
        className="w-10 h-10 rounded-full border-2 border-yellow-400 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-[#1f1f1f] text-white shadow-lg rounded-md z-10 py-2">
          <p className="px-4 text-sm mb-2">
            {user.firstName} {user.lastName}
          </p>
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-sm hover:bg-[#2c2c2c]"
          >
            Dashboard
          </Link>
          <Link
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-red-400 hover:bg-[#2c2c2c]"
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
