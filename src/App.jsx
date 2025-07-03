import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Room from "./pages/Room";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getProfileThunk } from "./redux/thunks/auth.thunk";
import UserProtected from "./components/UserProtected";

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
    // Fetch user profile when the app loads
    if (!user && !loading) {
      fetchProfile();
    }
  }, []);

  // Determine if the current route is a full-screen route (like /room/:id)
  const isRoomPage = location.pathname.startsWith("/room/");

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <main
      className={`min-h-screen w-screen ${
        isRoomPage ? "" : "max-w-7xl mx-auto"
      }`}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/room/:roomId"
          element={
            <UserProtected>
              <Room />
            </UserProtected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
