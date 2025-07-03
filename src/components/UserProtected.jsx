import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProtected = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");

    return;
  }

  return <>{children}</>; // <> {children} ; </> this will be never fogetted .. ch
};

export default UserProtected;
