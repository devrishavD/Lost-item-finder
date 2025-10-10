import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

const Describe = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const chatEndRef = useRef(null);

  const questions = [
    { id: "color", text: "What color is your item?" },
    { id: "brand", text: "What brand or model is it?" },
    { id: "distinctive", text: "Any distinctive marks, stickers, or scratches?" },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSubmit = () => {
    if (currentAnswer.trim()) {
      const updatedAnswers = { ...answers, [currentQuestion.id]: currentAnswer };
      setAnswers(updatedAnswers);
      setCurrentAnswer("");

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        navigate("/trace", { state: { description: updatedAnswers } });
      }
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answers, currentQuestion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#04090e] via-[#112d2d] to-[#04090e] text-[#E4E6EB] flex flex-col items-center px-4 py-6">
      {/* Scrollable container including header */}
      <div className="w-full max-w-4xl flex flex-col space-y-4">
        {/* Header part */}
        <div className="relative z-20">
          <Header currentStep={2} />
        </div>

        {/* Chat container */}
        <div className="bg-[#161B22]/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-800 flex flex-col min-h-[550px]">
          {/* Back button */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-400 hover:text-[#00BFA6] transition"
            >
              <ChevronLeft className="w-6 h-6 mr-2" />
              Back
            </button>
            <h2 className="text-xl font-semibold text-center w-full -ml-6 text-white">
              Describe your item
            </h2>
          </div>

          {/* Chat bubbles */}
          <div className="flex-1 overflow-y-auto space-y-6 mb-6 px-2">
            {Object.entries(answers).map(([questionId, answer]) => {
              const question = questions.find((q) => q.id === questionId);
              return (
                <motion.div
                  key={questionId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {/* Question bubble */}
                  <div className="flex justify-start">
                    <div className="bg-gray-800/60 border border-gray-700 px-5 py-3 rounded-2xl rounded-tl-none max-w-md shadow-sm">
                      <p>{question.text}</p>
                    </div>
                  </div>

                  {/* Answer bubble */}
                  <div className="flex justify-end">
                    <div className="bg-[#00BFA6]/20 border border-[#00BFA6]/40 px-5 py-3 rounded-2xl rounded-tr-none max-w-md shadow-[0_0_12px_#00BFA6]/20">
                      <p>{answer}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Current question */}
            <motion.div
              key={currentQuestion.text}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex justify-start"
            >
              <div className="bg-gray-800/60 border border-gray-700 px-5 py-3 rounded-2xl rounded-tl-none max-w-md shadow-sm">
                <p>{currentQuestion.text}</p>
              </div>
            </motion.div>
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="flex gap-3">
            <input
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAnswerSubmit()}
              placeholder="Type your answer..."
              className="flex-1 bg-[#0D1117] border border-gray-700 rounded-xl px-4 py-3 text-base focus:border-[#00BFA6] focus:ring-0 outline-none text-[#E4E6EB] placeholder-gray-400"
            />
            <button
              onClick={handleAnswerSubmit}
              disabled={!currentAnswer.trim()}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                currentAnswer.trim()
                  ? "bg-gradient-to-r from-[#07c965] to-[#05b198] text-black hover:from-[#00FFD1] hover:to-[#00BFA6]"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next →" : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Describe;
