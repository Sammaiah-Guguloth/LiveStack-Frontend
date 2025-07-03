import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { loginUserThunk } from "../redux/thunks/auth.thunk";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { GOOGLE_AUTH_USER } from "../api/apis";
import { setIsAuthenticated, setUser } from "../redux/slices/auth.slice";
import axiosInstance from "../api/axios/axiosInstance";
import Navbar from "../components/Navbar";

const Login = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in both fields.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    // console.log("Login form submitted:", formData);

    try {
      const response = await dispatch(
        loginUserThunk({
          email,
          password,
        })
      ).unwrap();

      toast.success("Login successful!");
      navigate("/");
    } catch (errors) {
      errors.map((error) => toast.error(error.msg));
    }
  };

  const googleLogin = useGoogleLogin({
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

        toast.success("Google login successful");
        navigate("/");
      } catch (error) {
        console.log(error);
        error.response?.data?.errors?.map((er) => toast.error(er.msg));
      }
    },
    onError: () => toast.error("Google Sign In Failed"),
  });

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center px-4 py-10 min-h-screen">
        {/* Headings */}
        <div className="text-center mb-8 px-2">
          <h2 className="text-3xl md:text-5xl text-white font-semibold">
            Welcome Back to LiveStack
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Log in to join your team in real-time collaborative coding sessions.
          </p>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-24 w-full max-w-6xl">
          {/* Left: Form */}
          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-lg shadow-lg"
            >
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  onChange={handleInputChange}
                  className="bg-transparent px-4 py-3 border border-[#2e2e2e] focus:outline-none focus:border-white rounded-md"
                />
              </div>

              {/* Password */}
              <div className="relative flex flex-col gap-1">
                <label htmlFor="password" className="text-sm">
                  Password <span className="text-red-400">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleInputChange}
                  className="bg-transparent px-4 py-3 border border-[#2e2e2e] focus:outline-none focus:border-white rounded-md pr-10"
                />
                <span
                  className="absolute text-xl right-3 top-1/2  cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="text-[#181818] py-3 rounded-md mt-2 font-semibold cursor-pointer"
                style={{
                  background: "linear-gradient(to right, #D9B346, #DABE57)",
                }}
              >
                Log In
              </button>

              <Link
                to={"/signup"}
                className="text-blue-400 text-xs -mt-3 ml-2 hover:underline"
              >
                Don’t have an account? Sign up here
              </Link>
            </form>

            {/* OR Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-600" />
              <span className="mx-3 text-gray-400">OR</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            {/* Google Login */}
            <button
              onClick={googleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-700 py-3 rounded-md hover:bg-[#F8F8F8] font-semibold hover:text-[#181818] transition-all cursor-pointer"
            >
              <FcGoogle size={22} />
              <span>Log In with Google</span>
            </button>
          </div>

          {/* Right: Image */}
          <div className="hidden md:flex relative max-w-md">
            <div className="relative">
              <div className="absolute w-[200px] right-10 top-2 h-[200px] diagonal-lines opacity-70 rounded-lg -z-10" />
              <img
                src="/images/portrait-photo-of-smiling-man-with-his-arms-crossed-standing-2379004 1.png"
                alt="login visual"
                className="w-full h-auto z-20 rounded-xl"
              />
              <div className="absolute w-[200px] left-0 bottom-0 h-[200px] diagonal-lines opacity-70 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
