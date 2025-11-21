import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import Navbar from "../components/navbar";
import { useLocation, useNavigate } from "react-router-dom";


ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function ResultsPage({ result }) {

    const { state } = useLocation();


  if (!state) {
    return (
      <div className="min-h-screen bg-[#f3efe2] flex items-center justify-center text-xl text-[#3f3a24]">
        <p>No results available. Please go back and make a prediction.</p>
      </div>
    );
  }
  
  const { nitrogen, phosphorous, potassium, fertilizer, explanation } = state;

  const chartData = {
    labels: ["Nitrogen (N)", "Phosphorous (P)", "Potassium (K)"],
    datasets: [
      {
        label: "Nutrient (mg/kg)",
        data: [nitrogen, phosphorous, potassium],
        backgroundColor: ["#7ba05b", "#8bc34a", "#5a7f39"],
        borderRadius: 8,
      },
    ],
  };
  const handleDownloadPDF = async () => {
  const res = await fetch("http://localhost:8000/download-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nitrogen,
      phosphorous,
      potassium,
      fertilizer,
      explanation,
      features: state.features,
    }),
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Soil_Report.pdf";
  a.click();
  window.URL.revokeObjectURL(url);
};


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f3efe2] px-6 py-10">
        <div className="max-w-5xl mx-auto">

          {/* Title */}
          <h1 className="text-4xl font-bold text-[#3f3a24] text-center mb-8">
            Soil Nutrient Analysis Results
          </h1>

          {/* Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Side – Nutrient Cards */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Nutrient Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Card Component */}
                {[
                  { label: "Nitrogen (N)", value: nitrogen },
                  { label: "Phosphorous (P)", value: phosphorous },
                  { label: "Potassium (K)", value: potassium },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-6 bg-white border border-[#d6d0c4] shadow-md rounded-xl hover:shadow-xl transition transform hover:-translate-y-1"
                  >
                    <p className="text-[#556b2f] text-sm">{item.label}</p>
                    <p className="text-2xl font-bold text-[#3f3a24] mt-2">
                      {item.value.toFixed(2)} mg/kg
                    </p>
                  </div>
                ))}

              </div>

              {/* Visualization */}
              <div className="bg-white border border-[#d6d0c4] p-6 rounded-xl shadow-md hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-[#3f3a24] mb-4">
                  Nutrient Distribution Chart
                </h3>
                <Bar data={chartData} height={120} />
              </div>

            </div>

            {/* Right Side – Fertilizer Card */}
            <div>
              <div className="bg-white border border-[#d6d0c4] shadow-xl rounded-xl p-8 relative overflow-hidden">
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#8bc34a50] to-transparent opacity-30 blur-xl pointer-events-none"></div>

                <h3 className="text-2xl font-bold text-[#3f3a24] mb-4">Recommended Fertilizer</h3>

                <div className="p-5 bg-[#f3efe2] rounded-lg border border-[#d6d0c4] shadow-inner">
                  <p className="text-3xl font-bold text-[#4a5f36]">{fertilizer}</p>
                </div>

                <p className="mt-4 text-[#556b2f] text-sm leading-relaxed">
                  {explanation}
                </p>

                <button onClick={handleDownloadPDF}
                 className="mt-6 px-6 py-3 bg-[#4a5f36] text-white rounded-lg hover:bg-[#3f4f2a] transition shadow-lg">
                  Download Report
                </button>

              </div>
            </div>
          </div>

          {/* Footnote */}
          <div className="mt-10 mb-4 text-center text-[#556b2f] text-sm">
            ⚠️ These values are predictions based on your input and may not fully reflect actual soil chemistry.
          </div>

          {/*Conatct US */}  
          <section className="py-8 px-6 bg-[#ffffff] mt-10 mb-5">
        <h2 className="text-3xl font-bold text-center text-[#3f3a24]">Contact Us</h2>
        <p className="text-center text-[#556b2f] mt-2 mb-10">
          We’d love to hear from you! Reach out for feedback, support, or collaboration.
        </p>

      <div className="max-w-s mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">

        {/* Email */}
        <div className="p-6 rounded-xl bg-[#f3efe2] shadow-md hover:shadow-lg transition transition border-2 border-transparent hover:border-[#8bc34a] transition duration-300">
          <div className=" flex items-center justify-center mb-3"><img src="/gmail.png" className="w-10 h-10 flex object-contain" alt="Email"></img></div>
          <h3 className="font-semibold text-lg text-[#3f3a24]">Email</h3>
          <p className="text-[#556b2f] mt-1 break-all">
            guptapratham2703@gmail.com
          </p>
        </div>

        {/* Instagram */}
        <div className="p-6 rounded-xl bg-[#f3efe2] shadow-md hover:shadow-lg transition transition border-2 border-transparent hover:border-[#8bc34a] transition duration-300">
          <div className=" flex items-center justify-center mb-3"><img src="/instagram.png" className="w-10 h-10 flex object-contain" alt="Instagram"></img></div>
          <h3 className="font-semibold text-lg text-[#3f3a24]">Instagram</h3>
          <p className="text-[#556b2f] mt-1 break-all">
            @guptathefirst
          </p>
        </div>

          {/* LinkedIn */}
          <div className="p-6 rounded-xl bg-[#f3efe2] shadow-md hover:shadow-lg transition transition border-2 border-transparent hover:border-[#8bc34a] transition duration-300">
            <div className=" flex items-center justify-center mb-3"><img src="/linkedin.png" className="w-10 h-10 flex object-contain" alt="Instagram"></img></div>
            <h3 className="font-semibold text-lg text-[#3f3a24]">LinkedIn</h3>
            <p className="text-[#556b2f] mt-1 break-all">
              linkedin.com/in/pratham-gupta-401a11331
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
            <footer className="text-center rounded-lg py-8 text-[#556b2f] bg-white">
                © {new Date().getFullYear()} SoilIQ. All Rights Reserved.
            </footer>

        </div>
      </div>
    </>
  );
}
