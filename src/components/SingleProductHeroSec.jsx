import React, { useState, useEffect } from 'react';
import { Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SingleProductHeroSec = ({setScreenToShow,setShowScreen, product, selectedImg, setSelectedImg, quantity, setQuantity }) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Hooks at the top
  const [inCart, setInCart] = useState(false);

  // Defensive default for product
  const safeProduct = product || { images: [], _id: null, title: "", price: 0, description: "", rating: 0, reviews: [] };

  // Fetch cart
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/getcartproducts`, { withCredentials: true });
      const items = res.data?.items || [];
      const exists = items.some((i) => i?.productId === safeProduct._id);
      setInCart(exists);
    } catch (error) {
      console.log(error);
      setInCart(false);
    }
  };

  useEffect(() => {
    if (safeProduct._id) fetchCart();
  }, [safeProduct._id]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = async () => {
    if (!safeProduct._id) return;
    try {
      await axios.post(
        `${backendUrl}/api/addtocart`,
        {
          productId: safeProduct._id,
          quantity: quantity || 1,
          name: safeProduct.title,
          price: safeProduct.price,
          img: safeProduct.images?.[0] || ""
        },
        { withCredentials: true }
      );
      setInCart(true);
      setScreenToShow("heroSec");
      setShowScreen(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Render
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start px-4 sm:px-6 md:px-12 lg:px-20 ">
  {/* Left: Images */}
  <div>
    <div className="relative w-full">
      <img
        src={selectedImg?.src || safeProduct.images?.[0]}
        alt={safeProduct.title}
        className="w-full rounded-2xl shadow-lg border border-gray-100 object-cover"
      />
    </div>

    <div className="flex gap-3 mt-4 sm:mt-6 overflow-x-auto scrollbar-hide">
      {safeProduct.images.map((item, index) => (
        <img
          key={index}
          onClick={() => setSelectedImg({ index, src: item })}
          src={item}
          alt={`Thumbnail ${index}`}
          className={`w-20 sm:w-24 h-24 sm:h-28 object-cover rounded-lg border transition cursor-pointer ${
            selectedImg?.index === index
              ? "border-yellow-500 border-4"
              : "border-gray-200 hover:border-black"
          }`}
        />
      ))}
    </div>
  </div>

  {/* Right: Details */}
  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 line-clamp-2">
      {safeProduct.title}
    </h1>

    <div className="flex items-center gap-2 mb-4 sm:mb-5 flex-wrap">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 sm:w-5 sm:h-5 ${
            i < Math.round(safeProduct.rating)
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-gray-500 text-sm">{safeProduct.reviews.length || 0} Reviews</span>
    </div>

    <p className="text-2xl sm:text-3xl font-semibold text-black mb-4 sm:mb-6">
      ${safeProduct.price}
    </p>

    <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
      {safeProduct.description}
    </p>

    {/* Quantity Selector */}
    <div className="mb-6 sm:mb-8">
      <p className="font-semibold text-gray-800 mb-2">Quantity</p>
      <div className="flex items-center gap-3">
        <button
          onClick={decreaseQty}
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-200 text-gray-700 text-lg rounded-lg hover:bg-gray-300 transition"
        >
          –
        </button>
        <span className="text-base sm:text-lg font-semibold">{quantity}</span>
        <button
          onClick={increaseQty}
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-200 text-gray-700 text-lg rounded-lg hover:bg-gray-300 transition"
        >
          +
        </button>
      </div>
    </div>

    {/* Add to Cart Button */}
    <button
      disabled={inCart}
      onClick={addToCart}
      className={`w-full py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-medium transition flex items-center justify-center ${
        inCart
          ? "bg-green-700 hover:bg-green-800 cursor-not-allowed"
          : "bg-black hover:bg-gray-800 cursor-pointer"
      } text-white`}
    >
      {inCart ? "Item Already Added to Cart" : "Add to Cart"}
    </button>
  </div>
</div>

  );
};

export default SingleProductHeroSec;

