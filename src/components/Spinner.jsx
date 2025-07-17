import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f]">
      <div className="grid grid-cols-2 grid-rows-2 gap-6 perspective-1000">
        {[0, 0.2, 0.4, 0.6].map((delay, i) => (
          <div
            key={i}
            className="w-[30px] h-[30px] sm:w-[40px] sm:h-[30px]  bg-[#ffc01d] rounded-md animate-rotate-cube"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Spinner;
