import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { howItWorksSteps } from "../data/howItWorksFeatures";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" },
  }),
};

const ImageModal = ({ isOpen, onClose, imageSrc, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* <motion.img
            src={imageSrc}
            alt={title}
            className="max-w-4xl max-h-[90vh] rounded-xl shadow-lg"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          /> */}

          <motion.img
            src={imageSrc}
            alt={title}
            className="w-[90vw] max-w-4xl h-auto max-h-[80vh] sm:w-auto sm:max-h-[90vh] rounded-xl shadow-lg object-contain"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TimelineItem = ({ step, index, onImageClick }) => {
  const isRight = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex flex-col md:flex-row items-center md:items-start gap-8 mb-20 md:mb-32 ${
        isRight ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={index}
      variants={fadeInUp}
    >
      {/* Dot */}
      <div className="hidden md:block absolute left-1/2 top-4 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-200 border-4 border-[#0f0f0f] z-20" />

      {/* Line */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-yellow-700 opacity-30 -z-10" />

      <div className="w-full md:w-1/2 px-4 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-semibold mb-2">{step.title}</h3>
        <p className="text-gray-400 text-sm md:text-base">{step.description}</p>
      </div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        className="w-full md:w-1/2 px-4 cursor-pointer"
        onClick={() => onImageClick(step.image, step.title)}
      >
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-auto rounded-xl border border-[#333] hover:border-yellow-400 shadow-lg"
          loading="lazy"
        />
      </motion.div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);

  const handleImageClick = (image, title) => {
    setModalImage(image);
    setModalTitle(title);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />

      <section className="relative py-16 px-4 sm:px-6 md:px-20 bg-[#0f0f0f] text-white overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gradient bg-gradient-to-r from-[#D9B346] to-[#DABE57] text-transparent bg-clip-text">
            How It Works
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Explore the powerful features that make LiveStack the ultimate
            platform for real-time collaboration.
          </p>
        </div>

        <div className="relative z-10 before:hidden md:before:block md:before:absolute md:before:top-0 md:before:bottom-0 md:before:left-1/2 md:before:w-px md:before:bg-yellow-700 md:before:opacity-20 md:before:-z-10">
          {howItWorksSteps.map((step, i) => (
            <TimelineItem
              key={i}
              step={step}
              index={i}
              onImageClick={handleImageClick}
            />
          ))}
        </div>

        {/* Modal */}
        <ImageModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          imageSrc={modalImage}
          title={modalTitle}
        />

        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 opacity-5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-400 opacity-10 rounded-full blur-2xl -z-10" />
      </section>

      <Footer />
    </>
  );
};

export default HowItWorks;
