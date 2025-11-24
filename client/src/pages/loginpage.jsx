import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8e3d5] via-[#f7f5ed] to-[#d3dbc5] relative overflow-hidden">

      {/* Soft Glow Background ORBs */}
      <div className="absolute w-72 h-72 bg-[#8bc34a40] blur-3xl rounded-full -top-10 -left-10"></div>
      <div className="absolute w-96 h-96 bg-[#4a5f3640] blur-3xl rounded-full bottom-0 right-0"></div>

      {/* Glassmorphic Card */}
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-10 w-[90%] max-w-md">

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#3f3a24] text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-[#556b2f] mb-8">
          Log in to access your SoilIQ dashboard
        </p>

        {/* Form */}
        <form className="space-y-6">

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
                placeholder="Enter your password"
                className="p-3 w-full rounded-xl bg-white/40 border border-[#d6d0c4] focus:border-[#8bc34a] focus:outline-none"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#4a5f36] cursor-pointer"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#4a5f36] text-white rounded-xl shadow-md hover:shadow-lg hover:bg-[#3f4f2a] transition transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <p className="mt-6 text-center text-[#556b2f] text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#4a5f36] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
