import React from 'react';
const Header = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Identify' },
    { id: 2, name: 'Describe' },
    { id: 3, name: 'Trace' },
    { id: 4, name: 'Results' },
  ];

  // Renders each step circle + label
  const StepItem = ({ step, isActive, isComplete }) => {
    const circleClasses = isActive
      ? 'bg-gradient-to-br from-teal-400 to-green-500 shadow-xl shadow-teal-500/50 animate-pulse-slow'
      : isComplete
      ? 'bg-teal-600'
      : 'bg-gray-700 opacity-80';

    const textClasses = isActive
      ? 'text-teal-400 font-semibold'
      : 'text-gray-400';

    return (
      <div className="flex flex-col items-center">
        {/* Step Circle */}
        <div
          className={`relative w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold transition-all duration-500 ${circleClasses}`}
        >
          {step.id}
        </div>
        {/* Step Label */}
        <span className={`mt-3 text-sm tracking-wide ${textClasses}`}>
          {step.name}
        </span>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 from-[#121e2e] via-[#1c4054] to-[#2d7a5f] backdrop-blur-sm border-b border-gray-800 pt-6 pb-12 flex flex-col items-center shadow-lg">
      {/* Title + Description */}
      <div className="text-center mb-10">
        <h1
          className="text-5xl font-extrabold tracking-wider"
          style={{
            backgroundImage: 'linear-gradient(90deg, #4DD6C1, #7AFF8B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '3.5rem',
          }}
        >
          Lost Item Finder
        </h1>
        <p className="text-base text-gray-400 mt-2">
          AI-powered assistant to help you recover your belongings
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between w-full max-w-xl mx-auto px-4 relative">
        {/* Background Line */}
        <div
          className="absolute top-[20px] left-0 right-0 h-1 bg-gray-700/80 mx-auto"
          style={{ width: '90%' }}
        ></div>

        {/* Foreground (active progress) */}
        <div
          className="absolute top-[20px] h-1 rounded-full bg-gradient-to-r from-teal-400 to-yellow-400 transition-all duration-700 ease-out"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            left: '5%',
            maxWidth: '90%',
          }}
        ></div>

        {/* Steps */}
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isComplete = step.id < currentStep;
          return (
            <StepItem
              key={step.id}
              step={step}
              isActive={isActive}
              isComplete={isComplete}
            />
          );
        })}
      </div>
    </header>
  );
};

export default Header;
