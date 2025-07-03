import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypeText = () => {
  return (
    <TypeAnimation
      sequence={[
        "Code Together.",
        1500,
        "Build Projects Live.",
        1500,
        "Share Ideas Instantly.",
        1500,
        "Debug in Real-Time.",
        1500,
      ]}
      wrapper="span"
      speed={50}
      className="text-lg md:text-xl font-medium text-gray-300"
      repeat={Infinity}
    />
  );
};

export default TypeText;
