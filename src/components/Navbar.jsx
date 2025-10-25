import { ShoppingBag, User, X, Menu } from 'lucide-react';
import React, { useState } from 'react';
import Search from './Search';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setIsLoggedIn, isLoggedIn, selected, setSelected }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Men's", key: "men's" },
    { label: "Women's", key: "women's" },
    { label: "Kids", key: "kids" },
    { label: "Accessories", key: "accessories" },
    { label: "Gifts", key: "gifts" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-white shadow-md fixed top-0 z-50">
        {/* Logo */}
        <div onClick={() => navigate('/')} className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-gray-800 cursor-pointer">
          Villager
        </div>


        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center justify-start gap-4 lg:gap-6 font-medium text-gray-600 flex-shrink">
          {menuItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => {
                  setSelected(item.key)
                  navigate('/')
                }}
                className={`transition-all cursor-pointer hover:text-black hover:scale-105
          ${selected === item.key ? 'text-gray-900 font-semibold' : 'text-gray-500'}
          text-sm sm:text-base md:text-sm lg:text-md
        `}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>




        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <button onClick={() => navigate('/cart')} className="bg-black cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                <ShoppingBag />
              </button>
              <button onClick={() => navigate('/profile')} className="bg-black cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                <User />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="bg-black font-semibold text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer">
                Login
              </button>
              <button onClick={() => navigate('/signup')} className="bg-black font-semibold text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer">
                Signup
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden z-50">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-800 cursor-pointer focus:outline-none">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>


      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setMobileMenuOpen(false)}></div>
      )}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform z-50 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col mt-20 px-6 space-y-4">
          {menuItems.map(item => (
            <button
              key={item.key}
              onClick={() => { setSelected(item.key); navigate('/'); setMobileMenuOpen(false); }}
              className={` cursor-pointer text-left font-medium text-lg ${selected === item.key ? 'text-gray-900' : 'text-gray-600'} hover:text-black`}
            >
              {item.label}
            </button>
          ))}

          {isLoggedIn ? (
            <>
              <button onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black mt-4">
                <ShoppingBag /> Cart
              </button>
              <button onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black">
                <User /> Profile
              </button>
            </>
          ) : (
            <>
              <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="bg-black cursor-pointer text-white px-4 py-2 rounded-md w-full text-center hover:bg-gray-800 mt-4">
                Login
              </button>
              <button onClick={() => { navigate('/signup'); setMobileMenuOpen(false); }} className="bg-black cursor-pointer text-white px-4 py-2 rounded-md w-full text-center hover:bg-gray-800">
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
