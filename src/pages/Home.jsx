import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Explore from "../components/Explore";
import Footer from "../components/Footer";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  // console.log(user);

  return (
    <>
      <Navbar />
      <Hero />
      <Explore />
      <Footer />
    </>
  );
};

export default Home;
