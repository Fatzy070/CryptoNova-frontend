import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Nova from "../assets/Nova.png";
import Background from "../assets/bit.jpg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email signup
  const handleSignUp = async (e) => {
    e.preventDefault(); // prevent refresh
    try {
      const res = await axios.post("https://cryptonova-backend.onrender.com/api/signup", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      console.log("Email signup success:", res.data);
      navigate("/");
    } catch (err) {
      console.error(
        "Email signup error:",
        err.response?.data?.message || err.message
      );
    }
  };

  // Google signup/login
  const handleGoogleSignUp = async (credentialResponse) => {
    try {
      const res = await axios.post("https://cryptonova-backend.onrender.com/api/google-login", {
        tokenId: credentialResponse.credential,
      });
      localStorage.setItem("token", res.data.token);
      console.log("Google signup/login success:", res.data);
      navigate("/");
    } catch (err) {
      console.error(
        "Google signup/login error:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <>
      <section className="flex h-screen">
        {/* Left image (desktop only) */}
        <div className="w-[55%] hidden md:block">
          <img src={Background} alt="Background" className="w-full h-full" />
        </div>

        {/* Right form */}
        <section className="md:py-7 bg-[#131212] px-5 w-full md:w-[45%] flex justify-center items-center">
          <div className="lg:h-full w-full pb-10 bg-gradient-to-r from-[#1F1F1F] via-[#2C2C2C] to-[#3B2F2F] px-6 rounded-[10px] shadow">
            
            {/* Logo + title */}
            <div className="flex justify-center mb-">
              <div>
                <img src={Nova} alt="Nova" className="w-[250px]" />
                <div className="top-[-15px] relative text-center">
                  <h1 className="font-bold text-white text-[1.2rem] md:text-[1.6rem]">
                    Create an Account
                  </h1>
                  <p className="text-green-400">Welcome to CryptoNova</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="w-full">
              {/* Name */}
              <div>
                <label className="text-gray-400 block mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 rounded-[5px] bg-[#272727] text-white mb-3.5"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-400 block mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-[5px] bg-[#272727] text-white mb-3.5"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-400 block mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded-[5px] bg-[#272727] text-white mb-3.5"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 font-bold text-white p-2 rounded mb-4"
              >
                Sign Up
              </button>
            </form>
          
            {/* Google Signup */}
            <GoogleLogin
              onSuccess={handleGoogleSignUp}
              onError={() => console.log("Google signup/login failed")}
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default Register;
