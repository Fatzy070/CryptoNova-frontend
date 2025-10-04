import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Background from "../assets/bit.jpg";
import Nova from "../assets/Nova.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent refresh
    try {
      const res = await axios.post("https://cryptonova-backend.onrender.com/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("storage"));
      console.log("Email login success:", res.data);

      setMessage(res.data.message);
      navigate("/");
    } catch (err) {
      console.error(
        "Email login error:",
        err.response?.data?.message || err.message
      );
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  // Google login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post("https://cryptonova-backend.onrender.com/api/google-login", {
        tokenId: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("storage"));
      console.log("Google login success:", res.data);

      navigate("/");
    } catch (err) {
      console.error(
        "Google login error:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <>
      <section className="flex h-screen">
        {/* Left background image */}
        <div className="w-[55%] hidden md:block">
          <img src={Background} alt="" className="w-full h-full" />
        </div>

        {/* Right login form */}
        <section className="md:py-7 bg-[#131212] px-5 w-full md:w-[45%] flex justify-center items-center">
          <div className="lg:h-full w-full pb-10 bg-gradient-to-r from-[#1F1F1F] via-[#2C2C2C] to-[#3B2F2F] px-6 rounded-[10px] shadow">
            {/* Logo + Title */}
            <div className="flex justify-center">
              <div>
                <img src={Nova} alt="CryptoNova" className="w-[250px]" />
                <div className="top-[-15px] relative text-center">
                  <h1 className="font-bold capitalize text-white text-[1.2rem] md:text-[1.6rem]">
                    Welcome back
                  </h1>
                  <p className="text-green-400">
                    Please enter your credentials to login
                  </p>
                </div>
              </div>
            </div>

            {/* Email/Password login form */}
            <form onSubmit={handleLogin} className="w-full text-white mt-6">
              <div>
                <label className="text-gray-400 block mb-3">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-[5px] bg-[#272727] mb-4"
                  required
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-3">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded-[5px] bg-[#272727] mb-4"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 font-bold text-white p-2 rounded mb-4"
              >
                Login
              </button>

              {/* Message feedback */}
              {message && (
                <p className="text-center text-sm text-red-400">{message}</p>
              )}
            </form>

            {/* Google Login */}
            
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => console.log("Google login failed")}
                className="w-full flex justify-center"
              />
            </div>
          
        </section>
      </section>
    </>
  );
};

export default Login;
