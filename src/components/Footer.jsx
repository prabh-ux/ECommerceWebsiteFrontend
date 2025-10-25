import React from 'react'
import { useNavigate } from 'react-router-dom';

const Footer = () => {

  const handleScrollToHero5 = () => {
    const HeroSection2 = document.getElementById("hero5");
  
    if (HeroSection2) {
      HeroSection2.scrollIntoView({ behavior: 'smooth' });
    }

  }

  const handleScrollToHero2 = () => {
    const HeroSection2 = document.getElementById("hero2");

    if (HeroSection2) {
      HeroSection2.scrollIntoView({ behavior: 'smooth' });
    }

  }
    const navigate = useNavigate();
  return (
    <footer className="w-full bg-gray-50 py-12 border-t border-gray-200 mt-[3rem] ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-gray-900 mb-6 md:mb-0">
          Villager
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-6 text-gray-600 mb-6 md:mb-0">
          <button onClick={()=>navigate("/")} className="hover:text-gray-900 transition-colors cursor-pointer">Home</button>
          <button onClick={handleScrollToHero2} className="hover:text-gray-900 transition-colors cursor-pointer">Shop</button>
          <button onClick={handleScrollToHero5} className="hover:text-gray-900 transition-colors cursor-pointer">About</button>
          <button  className="hover:text-gray-900 transition-colors cursor-pointer">Contact</button>
        </div>

        {/* Social Links */}
       {/* <div className="flex gap-4">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.004 3.657 9.128 8.438 9.878v-6.987H7.898v-2.891h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.987C18.343 21.128 22 17.004 22 12z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-2.352 0-2.636.01-3.561.051-1.14.048-1.915.207-2.6.443a5.075 5.075 0 0 0-1.835 1.2 5.075 5.075 0 0 0-1.2 1.835c-.236.684-.395 1.46-.443 2.6-.041.925-.051 1.209-.051 3.561s.01 2.636.051 3.561c.048 1.14.207 1.915.443 2.6.28.81.718 1.55 1.2 1.835a5.075 5.075 0 0 0 1.835 1.2c.684.236 1.46.395 2.6.443.925.041 1.209.051 3.561.051s2.636-.01 3.561-.051c1.14-.048 1.915-.207 2.6-.443a5.075 5.075 0 0 0 1.835-1.2 5.075 5.075 0 0 0 1.2-1.835c.236-.684.395-1.46.443-2.6.041-.925.051-1.209.051-3.561s-.01-2.636-.051-3.561c-.048-1.14-.207-1.915-.443-2.6a5.075 5.075 0 0 0-1.2-1.835 5.075 5.075 0 0 0-1.835-1.2c-.684-.236-1.46-.395-2.6-.443-.925-.041-1.209-.051-3.561-.051zm0 1.838c.921 0 1.162.003 1.57.023.943.038 1.457.198 1.796.33.435.161.746.355 1.075.684.329.329.523.64.684 1.075.132.339.292.853.33 1.796.02.408.023.649.023 1.57s-.003 1.162-.023 1.57c-.038.943-.198 1.457-.33 1.796a2.5 2.5 0 0 1-.684 1.075 2.5 2.5 0 0 1-1.075.684c-.339.132-.853.292-1.796.33-.408.02-.649.023-1.57.023s-1.162-.003-1.57-.023c-.943-.038-1.457-.198-1.796-.33a2.5 2.5 0 0 1-1.075-.684 2.5 2.5 0 0 1-.684-1.075c-.132-.339-.292-.853-.33-1.796-.02-.408-.023-.649-.023-1.57s.003-1.162.023-1.57c.038-.943.198-1.457.33-1.796a2.5 2.5 0 0 1 .684-1.075 2.5 2.5 0 0 1 1.075-.684c.339-.132.853-.292 1.796-.33.408-.02.649-.023 1.57-.023z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c-5.455 0-9.837 4.382-9.837 9.837 0 4.42 2.857 8.17 6.837 9.493.5.09.682-.217.682-.483 0-.237-.01-1.028-.015-1.856-2.782.604-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.071 1.533 1.031 1.533 1.031.892 1.529 2.341 1.087 2.91.832.091-.646.35-1.087.636-1.337-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.681-.104-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025a9.564 9.564 0 0 1 2.5-.336c.85.004 1.705.115 2.5.336 1.91-1.294 2.748-1.025 2.748-1.025.546 1.376.203 2.393.1 2.646.64.697 1.028 1.59 1.028 2.681 0 3.842-2.338 4.687-4.566 4.935.36.31.682.921.682 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.577.688.48 3.977-1.324 6.832-5.074 6.832-9.492 0-5.455-4.382-9.837-9.837-9.837z"/>
            </svg>
          </a>
        </div>  */}
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} BrandName. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
