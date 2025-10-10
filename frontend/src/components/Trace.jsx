import React, { useState } from "react";
import Header from "./Header";
import { FiPlus, FiChevronLeft } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";

// 🔹 Map placeholder with glowing animation
const MapPlaceholder = () => (
  <div className="w-full h-full bg-[#161B22]/80 rounded-lg flex flex-col items-center justify-center p-4 shadow-inner backdrop-blur-md border border-gray-800">
    <div className="relative p-3 bg-teal-600 rounded-full">
      <FaMapMarkerAlt className="text-white text-3xl" />
      <div className="absolute inset-0 border-4 border-teal-600 rounded-full animate-ping opacity-75"></div>
    </div>
    <p className="mt-6 text-gray-400 text-center font-medium">
      Map will show your locations
    </p>
  </div>
);

const Trace = () => {
  const [locations, setLocations] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Add a location
  const addLocation = () => {
    if (inputValue.trim() && locations.length < 5) {
      setLocations([...locations, inputValue.trim()]);
      setInputValue("");
    }
  };

  // Analyze (dummy action)
  const handleAnalyze = () => {
    if (locations.length >= 2) {
      alert("Analyzing locations...");
    } else {
      alert("Please add at least 2 locations.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#04090e] via-[#112d2d] to-[#04090e] text-[#E4E6EB] flex flex-col font-sans">
      
      {/*  Header (scrolls naturally with page) */}
      <div className="relative z-20">
          <Header currentStep={3} />
        </div>

      {/*  Trace Section */}
      <div className="flex flex-col items-center justify-center flex-grow px-6 md:px-10 pb-16">
        <div className="bg-[#161B22]/80 backdrop-blur-lg rounded-2xl p-8 w-full max-w-5xl shadow-2xl border border-gray-800 mt-6">
          
          {/* Title and back button */}
          <div className="flex items-center mb-8">
            <button className="text-teal-400 hover:text-teal-300 mr-4 transition">
              <FiChevronLeft className="text-2xl" />
            </button>
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
              Trace your steps
            </h2>
          </div>

          {/* Grid: Input + Map */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left: Location Input */}
            <div>
              <h3 className="text-xl font-semibold text-teal-400 mb-2">
                Places you visited
              </h3>
              <p className="text-gray-400 mb-4 text-sm">
                Add 2–5 locations where you might have lost your item
              </p>

              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addLocation()}
                  placeholder="e.g., Café Aroma, Metro Station"
                  className="flex-grow p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-gray-500 transition-all"
                  disabled={locations.length >= 5}
                />
                <button
                  onClick={addLocation}
                  className={`p-3 rounded-lg transition-colors duration-200 shadow-lg ${
                    locations.length < 5
                      ? "bg-teal-500 hover:bg-teal-400"
                      : "bg-gray-700 cursor-not-allowed"
                  }`}
                >
                  <FiPlus className="text-2xl text-white" />
                </button>
              </div>

              {/* Location List */}
              <div className="min-h-[150px] border-l-2 border-gray-700 pl-4 py-2">
                {locations.length === 0 ? (
                  <p className="text-gray-500 italic mt-2">
                    No locations added yet
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {locations.map((loc, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-300"
                      >
                        <FaMapMarkerAlt className="text-teal-500 mr-2 flex-shrink-0" />
                        <span className="font-medium">{loc}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Right: Map Placeholder */}
            <div className="min-h-[300px]">
              <MapPlaceholder />
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            className={`w-full py-4 mt-10 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg ${
              locations.length >= 2
                ? "bg-gradient-to-r from-[#07c965] to-[#05b198] text-white shadow-teal-800/50 hover:from-[#00FFD1] hover:to-[#00BFA6] transition duration-300"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
            disabled={locations.length < 2}
          >
            Analyze Locations →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trace;
