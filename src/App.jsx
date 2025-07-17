import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Room from "./pages/Room";
import Dashboard from "./pages/Dashboard";

// Redux Thunk & Route Protection
import { getProfileThunk } from "./redux/thunks/auth.thunk";
import UserProtected from "./components/UserProtected";
import RoomOverview from "./pages/RoomOverview";
import HowItWorks from "./pages/HowItWorks";
import Spinner from "./components/Spinner";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.auth);

  const fetchProfile = async () => {
    try {
      await dispatch(getProfileThunk()).unwrap();
    } catch (errors) {
      if (Array.isArray(errors)) {
        errors.forEach((error) => toast.error(error.msg));
      } else {
        toast.error("An error occurred while fetching profile.");
      }
    }
  };

  useEffect(() => {
    if (!user && !loading) {
      fetchProfile();
    }
  }, []);

  // Detect if current route is a full-screen layout (like Room)
  const isRoomPage = location.pathname.startsWith("/room/");

  if (loading) {
    {
      // <div className="flex items-center justify-center h-screen bg-[#111] text-white text-xl">
      // </div>
    }
    return <Spinner />;
  }

  return (
    <main
      className={`min-h-screen ${
        isRoomPage ? "w-full" : "max-w-7xl mx-auto px-2 sm:px-6"
      }`}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <UserProtected>
              <Dashboard />
            </UserProtected>
          }
        />
        <Route
          path="/room/:roomId"
          element={
            <UserProtected>
              <Room />
            </UserProtected>
          }
        />
        <Route path="*" element={<NotFound />} />

        <Route path="/dashboard/room-info/:roomId" element={<RoomOverview />} />

        <Route path="/howItWorks" element={<HowItWorks />} />
      </Routes>
    </main>
  );
};

export default App;
