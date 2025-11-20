import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage() {
      return (
      <div className="min-h-screen bg-[#f3efe2] flex flex-col font-sans">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-10 py-6">
      <div className="text-2xl font-bold text-[#3f3a24]">SoilIQ</div>
      <div className="space-x-6 text-lg">
      <button className="text-[#3f3a24] hover:text-[#556b2f] transition">Login</button>
      <button className="px-4 py-2 bg-[#4a5f36] text-white rounded-lg hover:bg-[#3f3a24] transition">
      Sign Up
      </button>
      </div>
      </nav>


      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between flex-1 px-10 mt-10 gap-10">
      {/* Left Content */}
      <div className="flex flex-col items-start text-left max-w-xl animate-fadeIn">
      <h1 className="text-5xl font-bold text-[#3f3a24] leading-tight">
      Smarter Soil Insights for Better Farming.
      </h1>


      <p className="mt-4 text-lg text-[#556b2f]">
      Get NPK predictions powered by AI and make informed decisions
      for healthier crops and sustainable farming.
      </p>

      <Link to="/predict">
      <button className="mt-8 px-8 py-3 text-lg bg-[#4a5f36] text-white rounded-xl border-2 border-transparent hover:border-[#3f3a24] transition duration-300 shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105">
      Get Started
      </button>
      </Link>

      </div>


      {/* Right Slider + Decorative Layers */}
      <div className="relative w-full lg:w-1/2 h-80">
      {/* Decorative Green Glow */}
      <div className="absolute -inset-4 bg-[#8bc34a] opacity-50 blur-2xl rounded-xl"></div>


      {/* Image Slider */}
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 border-[#d6d0c4] animate-fadeInSlow transform transition duration-300 hover:scale-105">
      <div className="absolute inset-0 animate-slide ">
      <img src="/hero_image.jpg" alt="Slide 1" className="w-full h-full object-cover absolute opacity-100 slide-image" />
      <img src="/hero_image2.jpg" alt="Slide 2" className="w-full h-full object-cover absolute opacity-0 slide-image" />
      <img src="/hero_image4.webp" alt="Slide 3" className="w-full h-full object-cover absolute opacity-0 slide-image" />
      </div>
      </div>
      </div>
      </section>

            {/* How It Works Section */}
      <section className="mt-20 py-16 px-6 bg-[#ffffff] relative">
      <div className="relative max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-[#3f3a24] mb-2">How It Works</h2>
      <p className="text-[#556b2f] mb-12">A simple 3-step process to get accurate soil insights</p>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-10">


      {/* Step 1 */}
      <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
      <div className="absolute -inset-2 bg-[#8bc34a] opacity-10 blur-xl rounded-xl"></div>
      <div className="relative">
      <div className="text-4xl mb-3">🧪</div>
      <h3 className="text-xl font-semibold text-[#3f3a24] mb-2">Enter Soil Data</h3>
      <p className="text-[#556b2f]">Provide basic parameters like temperature, moisture, humidity, soil type & crop type.</p>
      </div>
      </div>


      {/* Step 2 */}
      <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
      <div className="absolute -inset-2 bg-[#8bc34a] opacity-10 blur-xl rounded-xl"></div>
      <div className="relative">
      <div className="text-4xl mb-3">🤖</div>
      <h3 className="text-xl font-semibold text-[#3f3a24] mb-2">AI Prediction</h3>
      <p className="text-[#556b2f]">Our ML model analyzes the inputs to estimate Nitrogen, Phosphorous & Potassium levels.</p>
      </div>
      </div>


      {/* Step 3 */}
      <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
      <div className="absolute -inset-2 bg-[#8bc34a] opacity-10 blur-xl rounded-xl"></div>
      <div className="relative">
      <div className="text-4xl mb-3">🌱</div>
      <h3 className="text-xl font-semibold text-[#3f3a24] mb-2">Get Recommendations</h3>
      <p className="text-[#556b2f]">Receive suggested fertilizers and steps to improve soil health & productivity.</p>
      </div>
      </div>
      </div>
      </div>
      </section>

      {/* Owners Section */}

      
      <section className=" relative mt-24 bg-#8bc34a py-16 px-6">


        
        <h2 className="text-3xl font-bold text-center text-[#3f3a24]">Meet the Team</h2>
        <p className="text-center text-[#556b2f] mt-2 mb-10">The creators behind SoilIQ</p>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
          { name: "Pratham Gupta", role: "ML Engineer",image:"/prathamphoto.jpg" },
          { name: "Sanat Singh", role: "Frontend Developer",image:"/sanatphoto.jpg" },
          { name: "Nandana S", role: "Backend Developer",image:"/nanduphoto.jpg" }
        ].map((member, index) => (
            
            <div key={index} className="flex flex-col items-center transform transition duration-300 hover:scale-105 ">
            <div className="absolute -inset-2 bg-[#8bc34a] opacity-20 blur-3xl rounded-xl"></div>
            <img 
            src={member.image}
            alt={member.name}
            className="w-32 h-32 rounded-full object-cover shadow-md mb-4 transition border-2 border-transparent hover:border-[#8bc34a] transition duration-300"
            />
            <p className="font-semibold text-lg text-[#3f3a24]">{member.name}</p>
            
            </div>
        ))}
        
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mt-10 py-16 px-6 bg-[#e5ecd9]">
        
        <h2 className="text-3xl font-bold text-center text-[#3f3a24]">What People Say</h2>
        <p className="text-center text-[#556b2f] mt-2 mb-10">Early testers sharing their experience</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
          {
            text: "Great thinking , this tool is actually useful",
            user: "Mustafa Khan"
          },
          {
            text: "Very easy to use and beautifully designed. Loved the overall experience!",
            user: "Priya Sharma"
          },
          {
            text: "It is useful for me in landscape architecture where i need to know the nutrients of the soil.",
            user: "Aditi Keswani"
          }
        ].map((t, i) => (
          <div key={i} className="bg-white shadow-md p-6 rounded-xl">
            <p className="text-[#556b2f] italic">"{t.text}"</p>
            <p className="mt-4 font-semibold text-[#3f3a24]">{t.user}</p>
          </div>
        ))}
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 px-6 bg-[#f3efe2] mt-10">
      <h2 className="text-3xl font-bold text-center text-[#3f3a24]">Frequently Asked Questions</h2>
      <p className="text-center text-[#556b2f] mt-2 mb-10">Quick answers to common questions</p>


      <div className="max-w-4xl mx-auto space-y-6">
      {[
      {
      q: "How accurate are the soil nutrient predictions?",
      a: "Our model provides estimations based on environmental and soil parameters. Accuracy depends on the data provided but remains consistent for general use."
      },
      {
      q: "Is this tool suitable for all types of crops?",
      a: "Yes, the system supports a wide range of crop types and adapts predictions accordingly."
      },
      {
      q: "Do I need any device to use this app?",
      a: "No additional device is needed. Just enter values like temperature, humidity, and moisture to get predictions."
      }
      ].map((faq, i) => (
      <div key={i} className="bg-white shadow-md p-6 rounded-xl border border-[#d6d0c4] hover:border-[#8bc34a] transition duration-300 hover:shadow-lg transition">
      <p className="font-semibold text-lg text-[#3f3a24] mb-2">{faq.q}</p>
      <p className="text-[#556b2f]">{faq.a}</p>
      </div>
      ))}
      </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 px-6 bg-[#ffffff] mt-10">
        <h2 className="text-3xl font-bold text-center text-[#3f3a24]">Contact Us</h2>
        <p className="text-center text-[#556b2f] mt-2 mb-10">
          We’d love to hear from you! Reach out for feedback, support, or collaboration.
        </p>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">

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
      <footer className="text-center py-6 text-[#556b2f] bg-white">
        © {new Date().getFullYear()} SoilIQ. All Rights Reserved.
      </footer>
    </div>
  );
}
