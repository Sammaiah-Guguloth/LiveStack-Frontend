import React, { useState, useEffect } from "react";
import { FaUserEdit, FaSave, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios/axiosInstance";
import { UPDATE_PROFILE } from "../../api/apis";
import { setUser } from "../../redux/slices/auth.slice";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);

  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Detect changes
  useEffect(() => {
    const isChanged =
      firstName.trim() !== user?.firstName ||
      lastName.trim() !== user?.lastName;
    setHasChanges(isChanged);
  }, [firstName, lastName, user]);

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Both fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.put(UPDATE_PROFILE, {
        firstName,
        lastName,
      });

      if (response.status === 200) {
        const user = response.data.user;
        dispatch(setUser(user));
        toast.success("Profile updated!");
      }

      setEditMode(false);
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response?.data?.errors?.map((err) => toast.error(err.msg));
      } else toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-[#1f1f1f] to-[#2e2e2e] text-white border border-[#333] shadow-xl rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 w-full max-w-4xl mx-auto mt-3"
    >
      {/* Profile Image */}
      <div className="w-20 h-20 rounded-full border-2 border-[#DABE57] shrink-0">
        <img
          src={user?.profileImage || "/images/default-avatar.png"}
          alt="User avatar"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 w-full break-words">
        {editMode ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="px-4 py-2 rounded-md bg-[#1f1f1f] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#DABE57] w-full"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="px-4 py-2 rounded-md bg-[#1f1f1f] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#DABE57] w-full"
            />
          </div>
        ) : (
          <>
            <h2 className="text-center text-xl sm:text-2xl font-semibold mb-1 break-words">
              {user?.firstName + " " + user?.lastName || "John Doe"}
            </h2>
            <p className="text-center text-sm sm:text-lg text-gray-400 break-words">
              {user?.email || "johndoe@example.com"}
            </p>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center sm:justify-end gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-full font-medium text-[#181818] bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-200 hover:to-yellow-300"
          >
            <FaUserEdit />
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              disabled={!hasChanges || loading}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full font-medium ${
                hasChanges
                  ? "text-[#181818] bg-gradient-to-r from-green-400 to-green-500 hover:from-green-300 hover:to-green-400"
                  : "bg-gray-500 text-white cursor-not-allowed"
              }`}
            >
              <FaSave />
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-full font-medium bg-red-500 hover:bg-red-600 text-white"
            >
              <FaTimes />
              Cancel
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;
