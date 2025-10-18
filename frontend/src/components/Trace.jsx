import React, { useState } from "react";
import Header from "./Header";
import { FiPlus, FiChevronLeft } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();
  const itemDescription = location.state?.description || {};

  const [locations, setLocations] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const addLocation = () => {
    if (inputValue.trim() && locations.length < 5) {
      setLocations((prev) => [...prev, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleAnalyze = async () => {
    if (locations.length < 2) {
      alert("Please add at least 2 locations.");
      return;
    }

    const payload = {
      description: itemDescription,
      locations,
    };

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Backend response:", data);

      // ✅ Match backend field names
      const suggestions =
        data.results || data.suggestedLocations || data.suggestions || [];

      if (Array.isArray(suggestions) && suggestions.length > 0) {
        console.log("➡️ Navigating to results page...");
        navigate("/results", { state: { suggestedLocations: suggestions } });
      } else {
        console.error("❌ Invalid or empty response:", data);
        alert("⚠️ Failed to get valid suggestions from backend.");
      }
    } catch (error) {
      console.error("❌ Error during analyze:", error);
      alert("⚠️ Failed to reach backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#04090e] via-[#112d2d] to-[#04090e] text-[#E4E6EB] flex flex-col font-sans">
      <div className="relative z-20">
        <Header currentStep={3} />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow px-6 md:px-10 pb-16">
        <div className="bg-[#161B22]/80 backdrop-blur-lg rounded-2xl p-8 w-full max-w-5xl shadow-2xl border border-gray-800 mt-6">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="text-teal-400 hover:text-teal-300 mr-4 transition"
            >
              <FiChevronLeft className="text-2xl" />
            </button>
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
              Trace your steps
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
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

              <div className="min-h-[150px] border-l-2 border-gray-700 pl-4 py-2">
                {locations.length === 0 ? (
                  <p className="text-gray-500 italic mt-2">
                    No locations added yet
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {locations.map((loc, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <FaMapMarkerAlt className="text-teal-500 mr-2 flex-shrink-0" />
                        <span className="font-medium">{loc}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="min-h-[300px]">
              <MapPlaceholder />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={locations.length < 2 || loading}
            className={`w-full py-4 mt-10 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg ${
              locations.length >= 2 && !loading
                ? "bg-gradient-to-r from-[#07c965] to-[#05b198] text-white shadow-teal-800/50 hover:from-[#00FFD1] hover:to-[#00BFA6]"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Analyzing..." : "Analyze Locations →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trace;
