import React, { useEffect, useState } from 'react'
import hero1 from '../assets/hero1.png'
import femaleHero from '../assets/femaleHero.png'
import kidsHero from '../assets/kidsHero.png'
import accessories from '../assets/accessories.png'
import gifts from '../assets/gifts.png'
import { Search } from 'lucide-react'
const Hero = ({ selected }) => {

  const [src, setSrc] = useState("");

  useEffect(() => {

    switch (selected) {
      case "men's":
        setSrc(hero1);
        break;
      case "women's":
        setSrc(femaleHero);
        break;
      case "kids":
        setSrc(kidsHero);
        break;
      case "accessories":
        setSrc(accessories);
        break;
      case "gifts":
        setSrc(gifts);
        break;

      default:
        break;
    }


  }, [selected]);


  const handleScrollToHero2 = () => {
    const HeroSection2 = document.getElementById("hero2");

    if (HeroSection2) {
      HeroSection2.scrollIntoView({ behavior: 'smooth' });
    }

  }

  return (
  <section className="w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden">

  {/* Background image */}
  <div
    className="absolute inset-0 bg-cover bg-center sm:bg-top m-4 sm:m-12 rounded-md"
    style={{ backgroundImage: `url(${src})` }}
  ></div>

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/20 m-4 sm:m-12 rounded-md"></div>

  {/* Overlay content */}
  <div className="relative z-10 text-center px-4 py-8 sm:px-8 sm:py-16 bg-gray-100/80 rounded-lg max-w-xl">
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 mb-4">
      Elevate Your Style
    </h1>
    <p className="text-base sm:text-lg md:text-2xl text-gray-800 mb-6 sm:mb-8">
      Minimalist fashion, maximum impact.
    </p>
    <button 
      onClick={handleScrollToHero2} 
      className="bg-black text-white cursor-pointer px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base"
    >
      Shop Now
    </button>
  </div>
</section>

  )
}

export default Hero
