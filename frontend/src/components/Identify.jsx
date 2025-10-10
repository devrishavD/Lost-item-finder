import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Smartphone,
  Key,
  Briefcase,
  Wallet,
  Headphones,
  Watch,
} from "lucide-react";

const Identify = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { name: "Phone", icon: <Smartphone size={28} /> },
    { name: "Keys", icon: <Key size={28} /> },
    { name: "Bag", icon: <Briefcase size={28} /> },
    { name: "Wallet", icon: <Wallet size={28} /> },
    { name: "Headphones", icon: <Headphones size={28} /> },
    { name: "Watch", icon: <Watch size={28} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Richer Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#04090e] via-[#112d2d] to-[#04090e]" />

      {/* Sticky Header */}
      <div className="relative z-20">
        <Header currentStep={1} />
      </div>

      {/* Soft gradient overlay for header blending */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0D1117] via-[#111827]/80 to-transparent z-10" />

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 py-8">
        <div className="bg-[#161B22]/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 w-full max-w-4xl shadow-2xl border border-gray-700">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-3 text-white">
            Let's find your lost item
          </h2>
          <p className="text-center text-gray-400 mb-8 sm:mb-10">
            Tell us what you've lost — we'll help you get it back.
          </p>

          {/* Grid of items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8 sm:mb-10">
            {items.map((item) => (
              <button
                key={item.name}
                onClick={() => setSelectedItem(item.name)}
                className={`flex flex-col items-center justify-center border rounded-2xl py-6 transition-all duration-300 transform ${
                  selectedItem === item.name
                    ? "border-[#00BFA6] bg-[#00BFA6]/10 scale-105"
                    : "border-gray-700 hover:border-[#00BFA6]/60 hover:scale-105"
                }`}
              >
                <div className="mb-3 text-[#00BFA6]">{item.icon}</div>
                <span className="text-sm font-medium text-white">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Upload section */}
          <div className="border-2 border-dashed border-gray-700 rounded-2xl p-8 sm:p-10 text-center mb-8 sm:mb-10 hover:border-[#00BFA6]/50 transition duration-300 cursor-pointer">
            <Upload className="mx-auto text-[#00BFA6] mb-4" size={32} />
            <p className="font-medium text-white mb-1">Or upload an image of your item</p>
            <p className="text-sm text-gray-400">
              Drag & drop or click to browse • JPG, PNG, WEBP (max 5 MB)
            </p>
          </div>

          {/* Next button */}
          <button
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#07c965] to-[#05b198] text-black font-semibold hover:from-[#00FFD1] hover:to-[#00BFA6] transition duration-300"
            onClick={() => navigate("/describe")}
          >
            Next →
          </button>
        </div>
      </main>
    </div>
  );
};

export default Identify;
