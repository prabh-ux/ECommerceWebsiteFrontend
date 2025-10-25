import React, { useEffect, useMemo, useState } from 'react'
import product1 from '../assets/product1.png'
import product2 from '../assets/product2.png'
import product3 from '../assets/product3.png'
import product4 from '../assets/product4.png'
import { useNavigate } from 'react-router-dom'
import femaleprod1 from '../assets/femaleprod1.png'
import femaleprod2 from '../assets/femaleprod2.png'
import femaleprod3 from '../assets/femaleprod3.png'
import femaleprod4 from '../assets/femaleprod4.png'
import kidsprod1 from '../assets/kidsprod1.png'
import kidsprod2 from '../assets/kidsprod2.png'
import kidsprod3 from '../assets/kidsprod3.png'
import kidsprod4 from '../assets/kidsprod4.png'
import giftprod1 from '../assets/giftprod1.png'
import giftprod2 from '../assets/giftprod2.png'
import giftprod3 from '../assets/giftprod3.png'
import giftprod4 from '../assets/giftprod4.png'
import accessoriesprod1 from '../assets/accessoriesprod1.png'
import accessoriesprod2 from '../assets/accessoriesprod2.png'
import axios from 'axios'



const HomeSec1 = ({ selected }) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const catergoryData = {
    "men's": {
      images: [product1, product2, product3, product4],
      names: ["Men's UpperWare", "Men's BottomWare", "Accessories", "Premium Jacket's"],
    },
    "women's": {
      images: [femaleprod1, femaleprod2, femaleprod3, femaleprod4],
      names: ["Women's UpperWare", "Women's BottomWare", "Accessories", "Premium Jacket's"],
    },
    "kids": {
      images: [kidsprod1, kidsprod2, kidsprod3, kidsprod4],
      names: ["kid's UpperWare", "kid's BottomWare", "Accessories", "Premium Jacket's"],
    },
    "accessories": {
      images: [accessoriesprod1, accessoriesprod2, null, null],
      names: ["Wearables", "Bags", "", ""],
    },
    "gifts": {
      images: [giftprod1, giftprod2, giftprod3, giftprod4],
      names: ["Storage", "Phone Cases", "Keychain's", "Poster's and Card's"],
    }
  }



  const { images, names } = catergoryData[selected] || catergoryData["men's"];
  const checkLoginStatus = async () => {
    try {
      const res = await axios.get(`${backendURL}/auth/check`, {
        withCredentials: true,
      })
      setLoggedIn(res.data.loggedIn);


    } catch (error) {
      setLoggedIn(false);

    }
  }

  const products = useMemo(() =>

    names.map((name, index) => (
      {
        id: index + 1,
        name,
        image: images[index]
      }
    ))

    , [images, names]);

  const handleSearch = (p) => {
    if (!loggedIn) {
      navigate('/signup');
      return;
    }
    navigate(`/result?query=${encodeURIComponent(p.name)}`);
  

  }

  useEffect(() => {
    checkLoginStatus();
  }, [])


  

  const navigate = useNavigate();
  return (
    <section id="hero2" className="w-full py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10 sm:mb-12">
          Popular Sections
        </h2>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {products.map((p) =>
            p.image && (
              <div
                key={p.id}
                onClick={() => handleSearch(p)}
                className="group relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer w-full sm:w-64 md:w-72"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">{p.name}</h3>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>

  )
}

export default HomeSec1
