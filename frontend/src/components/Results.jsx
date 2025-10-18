import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  FiChevronLeft,
  FiCheckCircle,
  FiRefreshCw,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const LocationCard = ({ location }) => {
  const { name, reason, probability } = location;

  const getColorClass = (prob) => {
    if (prob >= 80) return "from-[#00FFD1] via-[#00BFA6] to-[#007F73]";
    if (prob >= 60) return "from-[#A6E22E] via-[#00BFA6] to-[#00FFD1]";
    return "from-[#FFB347] via-[#FFD166] to-[#F4A261]";
  };

  return (
    <div className="p-6 bg-[#0E1A14]/70 backdrop-blur-lg rounded-2xl border border-[#1F3B2E] shadow-[0_0_20px_#00BFA620] transition-all duration-300 hover:scale-[1.02] hover:border-[#00BFA6]">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-[#00BFA6] text-xl mr-3" />
          <span className="text-lg font-semibold text-white">{name}</span>
        </div>
        <span className="text-2xl font-bold text-[#00FFD1]">
          {probability}%
        </span>
      </div>

      <p className="text-sm text-gray-400 ml-8 mb-4">{reason}</p>

      <div className="w-full bg-gray-900/40 rounded-full h-2 ml-8 overflow-hidden">
        <div
          className={`h-2 rounded-full bg-gradient-to-r ${getColorClass(
            probability
          )}`}
          style={{ width: `${probability}%` }}
        ></div>
      </div>
    </div>
  );
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Get suggestedLocations from navigation state
    const passedData = location.state?.suggestedLocations;

    if (Array.isArray(passedData) && passedData.length > 0) {
      setLocations(passedData);
    } else {
      setError("⚠️ No results received. Please analyze again.");
    }
  }, [location.state]);

  const handleReanalyze = () => navigate(-1);
  const handleViewOnMap = () => alert("🗺️ Map view coming soon!");
  const handleReportLost = () => alert("📝 Report feature coming soon!");

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden text-[#E4E6EB]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#04090e] via-[#112d2d] to-[#04090e]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,191,166,0.15),transparent_60%)]" />

      <div className="relative z-20">
        <Header currentStep={4} />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 py-12">
        <div className="bg-[#0E1A14]/80 backdrop-blur-md rounded-3xl p-8 md:p-10 w-full max-w-4xl shadow-2xl border border-[#1F3B2E]">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center">
              <button
                className="text-[#00BFA6] hover:text-[#00FFD1] mr-4 transition"
                onClick={() => navigate(-1)}
              >
                <FiChevronLeft className="text-2xl" />
              </button>
              <h2 className="text-3xl md:text-4xl font-semibold text-white">
                Suggested Locations
              </h2>
            </div>
            <div className="flex items-center text-[#00FFD1] font-medium">
              <FiCheckCircle className="text-xl mr-2" />
              Analysis Complete
            </div>
          </div>

          <p className="text-lg text-gray-400 mb-6">
            Based on your item’s description and possible last-seen locations
          </p>

          {error ? (
            <div className="text-center py-10 text-red-400">{error}</div>
          ) : (
            <div className="space-y-5 mb-10">
              {locations.map((loc, index) => (
                <LocationCard key={index} location={loc} />
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={handleReanalyze}
              className="flex-1 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg"
            >
              <FiRefreshCw className="inline-block mr-2" />
              Re-analyze
            </button>

            <button
              onClick={handleViewOnMap}
              className="flex-1 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#07c965] to-[#05b198] text-black hover:from-[#00FFD1] hover:to-[#00BFA6] transition-all duration-300 shadow-[0_0_10px_#00FFD180]"
            >
              <FiMapPin className="inline-block mr-2" />
              View on Map
            </button>

            <button
              onClick={handleReportLost}
              className="flex-1 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#FFD54F] via-[#FFB300] to-[#FF8C00] text-black hover:from-[#FFEA70] hover:to-[#FFEA70] transition-all duration-200 shadow-[0_0_10px_#FFB30080]"
            >
              <FiClock className="inline-block mr-2 text-xl" />
              Report Lost
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
