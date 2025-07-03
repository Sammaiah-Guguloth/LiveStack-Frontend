import React from "react";

const HighlightedYellowText = ({ children }) => {
  return (
    <span
      className="font-bold"
      style={{
        background: "linear-gradient(to right, #D9B346, #DABE57)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
};

export default HighlightedYellowText;
