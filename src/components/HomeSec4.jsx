import React from "react";
import seasonImage from "../assets/season.png"; // add any campaign / lifestyle image
import { useNavigate } from "react-router-dom";

const HomeSec4 = ({selected}) => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Autumn / Winter 2025
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8">
            Discover the latest trends in our new season drop.  
            Cozy textures, bold silhouettes, and timeless elegance await.
          </p>
          {/* <button
            onClick={() => navigate(`/result?query=winter`)}
            className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-200 transition font-medium cursor-pointer"
          >
            Explore Collection
          </button> */}
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={seasonImage}
            alt="Seasonal Campaign"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSec4;
