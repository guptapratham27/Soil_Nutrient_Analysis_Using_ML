import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8e3d5] via-[#f7f5ed] to-[#d3dbc5] relative overflow-hidden">

      {/* Glow Orbs */}
      <div className="absolute w-80 h-80 bg-[#8bc34a40] blur-3xl rounded-full top-0 left-5"></div>
      <div className="absolute w-96 h-96 bg-[#4a5f3640] blur-3xl rounded-full bottom-0 right-0"></div>

      {/* Glass Box */}
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-10 w-[90%] max-w-md">

        <h1 className="text-4xl font-bold text-[#3f3a24] text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-[#556b2f] mb-8">
          Join SoilIQ and start predicting soil nutrients
        </p>

        <form className="space-y-6">

          {/* Name */}
          <div className="flex flex-col">
            <label className="text-[#3f3a24] mb-1 text-sm">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="p-3 rounded-xl bg-white/40 border border-[#d6d0c4] focus:border-[#8bc34a] focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-[#3f3a24] mb-1 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-xl bg-white/40 border border-[#d6d0c4] focus:border-[#8bc34a] focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-[#3f3a24] mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="p-3 w-full rounded-xl bg-white/40 border border-[#d6d0c4] focus:border-[#8bc34a] focus:outline-none"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-[#4a5f36]"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#4a5f36] text-white rounded-xl shadow-md hover:shadow-lg hover:bg-[#3f4f2a] transition transform hover:-translate-y-0.5"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-[#556b2f] text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#4a5f36] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
