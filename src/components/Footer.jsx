import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Footer = () => {
  return (
    <footer className="bg-[#252525] text-gray-200 pt-10 pb-6 px-6 md:px-20">
      {/* Top Footer Section */}
      <motion.div
        className="flex gap-10 border-b border-gray-700 pb-10 flex-wrap"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Logo & Description */}
        <motion.div
          className="md:max-w-1/2"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">LiveStack</h2>
          <p className="text-xs leading-relaxed text-gray-400">
            LiveStack is a collaborative coding platform that enables real-time
            coding, debugging, and learning. Developers can collaborate live,
            share ideas, and enhance their skills together.
          </p>
        </motion.div>

        {/* Pages */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-3 text-white">Pages</h3>
          <ul className="space-y-2 text-gray-400 text-sm ">
            <li>
              <Link className="hover:underline" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/signup">
                Signup
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Company */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-3 text-white">Company</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link className="hover:underline" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/contact">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/privacy">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-3 text-white">Contact Us</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-400" />{" "}
              gugulothsammaiah5@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-yellow-400" /> Jangaon, Telangana
              506167
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-yellow-400" /> +91 86883 38315
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom Footer Info */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 pt-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p>&copy; {new Date().getFullYear()} LiveStack. All rights reserved.</p>
        <div className="flex gap-3 items-center mt-2 md:mt-0">
          <a href="/privacy" className="hover:text-gray-300">
            Privacy Policy
          </a>
          <span>|</span>
          <span>Made by Sammaiah</span>
          <span className="flex items-center gap-1">
            | Made with <FaHeart className="text-red-500" />
          </span>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
