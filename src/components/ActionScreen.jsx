import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const ActionScreen = ({
  heading = "Well Done!",
  subheading = "You just did something awesome.",showScreen,setShowScreen
}) => {
 

  if (!showScreen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 animate-fadeIn">
      <div className="bg-white text-black px-10 py-8 rounded-2xl shadow-2xl flex flex-col justify-center items-center w-[90%] sm:w-[400px] relative animate-scaleIn">
        
        {/* ✅ Success Icon */}
        <CheckCircle className="text-green-500 w-16 h-16 mb-4" />

        {/* ✅ Heading + Subheading */}
        <h2 className="text-2xl font-bold text-gray-800">{heading}</h2>
        <p className="mt-2 text-gray-600 text-center">{subheading}</p>

        {/* ✅ Divider */}
        <div className="w-16 h-[2px] bg-green-500 my-4 rounded-full"></div>

        {/* ✅ Close Button */}
        <button
          onClick={() => setShowScreen(false)}
          className="mt-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 cursor-pointer transition-all duration-200 ease-in-out shadow-md"
        >
          Close
        </button>
      </div>

      {/* ✅ Optional simple fade + scale animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out;
          }
          .animate-scaleIn {
            animation: scaleIn 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default ActionScreen;
