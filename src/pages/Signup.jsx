import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../redux/thunks/auth.thunk";
import { useGoogleLogin } from "@react-oauth/google";
import { GOOGLE_AUTH_USER } from "../api/apis";
import axiosInstance from "../api/axios/axiosInstance";
import { setIsAuthenticated, setUser } from "../redux/slices/auth.slice";
import Navbar from "../components/Navbar";

const Signup = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await dispatch(
        registerUserThunk({
          firstName,
          lastName,
          email,
          password,
        })
      ).unwrap();

      toast.success("Registration successful!");
      navigate("/");
    } catch (errors) {
      errors.map((error) => toast.error(error.msg));
    }
  };

  const googleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axiosInstance.post(GOOGLE_AUTH_USER, {
          access_token: tokenResponse.access_token,
        });

        if (response.status === 200) {
          const data = response.data;

          // dispatch to redux if needed
          dispatch(setUser(data.user));
          dispatch(setIsAuthenticated(true));
        }

        toast.success("Google Auth successful");
        navigate("/");
      } catch (error) {
        console.log(error);
        error.response?.data?.errors?.map((er) => toast.error(er.msg));
      }
    },
    onError: () => toast.error("Google Google Failed"),
  });

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-10 md:px-8">
        {/* headings */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl text-white font-semibold mb-4">
            Sign Up & Start Building Together
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto">
            Create or join collaborative coding rooms with live editing,
            mic/video permissions, and more...
          </p>
        </div>

        {/* Main form container */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-24 w-full max-w-6xl">
          {/* form */}
          <div className="w-full md:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-lg shadow-lg"
            >
              {/* First name and last name */}
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="firstName" className="text-sm">
                    First name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    name="firstName"
                    onChange={handleInputChange}
                    className="bg-transparent px-4 py-3 border border-[#2e2e2e] focus:outline-none focus:border-white rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="lastName" className="text-sm">
                    Last name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    name="lastName"
                    onChange={handleInputChange}
                    className="bg-transparent px-4 py-3 border border-[#2e2e2e] focus:outline-none focus:border-white rounded-md"
                  />
                </div>
              </div>

              {/* email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  name="email"
                  onChange={handleInputChange}
                  className="bg-transparent px-4 py-3 border border-[#2e2e2e] focus:outline-none focus:border-white rounded-md"
                />
              </div>

              {/* password */}
              <div className="relative flex flex-col gap-1">
                <label htmlFor="password" className="text-sm">
                  Password <span className="text-red-400">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  name="password"
                  onChange={handleInputChange}
                  className="bg-transparent px-4 py-3 border border-[#2e2e2e] focus:outline-none focus:border-white rounded-md pr-10"
                />
                <span
                  className="absolute text-xl right-3 top-10 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              {/* confirm password */}
              <div className="relative flex flex-col gap-1">
                <label htmlFor="confirmPassword" className="text-sm">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  name="confirmPassword"
                  onChange={handleInputChange}
                  className="bg-transparent px-4 py-3 border border-[#2e2e2e] focus:outline-none focus:border-white rounded-md pr-10"
                />
                <span
                  className="absolute text-xl right-3 top-10 cursor-pointer text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>

              {/* submit button */}
              <button
                type="submit"
                className="text-[#181818] py-3 rounded-md mt-2 font-semibold cursor-pointer"
                style={{
                  background: "linear-gradient(to right, #D9B346, #DABE57)",
                }}
              >
                Sign Up
              </button>

              <Link
                to={"/login"}
                className="text-blue-400 text-xs -mt-3 ml-2 hover:underline"
              >
                Already have an account? Log in here
              </Link>
            </form>

            {/* horizontal line */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-600" />
              <span className="mx-3 text-gray-400 text-sm">OR</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            {/* Google Sign Up */}
            <button
              onClick={googleAuth}
              className="w-full flex items-center justify-center gap-3 border border-gray-700 py-3 rounded-md hover:bg-[#F8F8F8] font-semibold hover:text-[#181818] transition-all cursor-pointer"
            >
              <FcGoogle size={22} />
              <span>Sign Up with Google</span>
            </button>
          </div>

          {/* image */}
          <div className="w-full md:w-1/2 hidden md:flex justify-center relative">
            <div className="relative">
              <div className="absolute w-[200px] right-10 top-2 h-[200px] diagonal-lines opacity-70 rounded-lg -z-10" />
              <img
                src="/images/portrait-photo-of-smiling-man-with-his-arms-crossed-standing-2379004 1.png"
                alt="signup visual"
                className="max-w-full z-20"
              />
              <div className="absolute w-[200px] left-0 bottom-0 h-[200px] diagonal-lines opacity-70 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
