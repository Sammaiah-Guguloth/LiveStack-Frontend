import React from "react";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
const ResponsiveEditorLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#121212] text-white">

      
      {/* 💻 Desktop / Laptop layout */}
      <div className="hidden lg:block h-full w-full">
        <DesktopLayout />
      </div>

      {/* 📱 Mobile / Tablet layout */}
      <div className="block lg:hidden h-full w-full">
        <MobileLayout />
      </div>
    </div>
  );
};

export default ResponsiveEditorLayout;
