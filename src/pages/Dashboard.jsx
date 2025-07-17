import React from "react";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/Dashboard/ProfileCard";
import Rooms from "../components/Dashboard/Rooms";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen bg-[#121212] text-white overflow-x-hidden">
      <Navbar />

      <main className="flex flex-col gap-5 px-4 md:px-10 max-w-screen-2xl mx-auto">
        <ProfileCard />
        <Rooms />
      </main>
    </div>
  );
};

export default Dashboard;
