import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e8e3d5] via-[#f7f5ed] to-[#d3dbc5] relative overflow-hidden text-center px-6">

      {/* Glow Orbs */}
      <div className="absolute w-72 h-72 bg-[#8bc34a40] blur-3xl rounded-full -top-10 -left-10"></div>
      <div className="absolute w-96 h-96 bg-[#4a5f3640] blur-3xl rounded-full bottom-0 right-0"></div>


      {/* Title */}
      <h1 className="text-5xl font-extrabold text-[#3f3a24] drop-shadow-md">
        Oops! This Page is Lost in the Soil :(
      </h1>

      {/* Subtext */}
      <p className="mt-4 text-lg text-[#556b2f] max-w-lg"> 
        <br />This page doesn’t exist.
      </p>

      {/* Buttons */}
      <Link
        to="/"
        className="mt-8 px-8 py-3 rounded-xl bg-[#4a5f36] text-white text-lg shadow-lg hover:shadow-xl transition hover:-translate-y-1"
      >
        Go Back Home 🌍
      </Link>

      <p className="mt-4 text-sm text-[#6b7c50]">
        Error 404 — Page not found.
      </p>
    </div>
  );
}
