import React from 'react'
import brandImage from '../assets/brand.png'

const HeroSec3 = () => {
  return (
    <section id='hero5' className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={brandImage}
            alt="Brand Story"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Story
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-6">
            We believe in minimalist fashion with maximum impact.
            Our collections are designed for those who value elegance, quality, 
            and timeless style. Each piece tells a story of craftsmanship and passion.
          </p>
          {/* <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
            Explore Collection
          </button> */}
        </div>
      </div>
    </section>
  )
}

export default HeroSec3
