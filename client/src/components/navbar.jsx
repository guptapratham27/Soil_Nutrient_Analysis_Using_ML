import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-10 py-6 bg-[#f3efe2] shadow-sm">
      
      {/* Brand */}
      <Link to="/" className="text-2xl font-bold text-[#3f3a24] hover:text-[#556b2f] transition">
        SoilIQ
      </Link>

      {/* Navigation Buttons */}
      <div className="space-x-6 text-lg flex items-center">
        <Link 
          to="/login" 
          className="text-[#3f3a24] hover:text-[#556b2f] transition"
        >
          Login
        </Link>

        <Link to="/signup">
          <button className="px-4 py-2 bg-[#4a5f36] text-white rounded-lg hover:bg-[#3f4f2a] transition">
            Sign Up
          </button>
        </Link>
      </div>

    </nav>
  );
}
