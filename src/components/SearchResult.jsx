import React, { useEffect, useState } from "react";
import { Star, ShoppingCart, Eye, Forward, ClipboardCheck, RecycleIcon } from "lucide-react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ActionScreen from "./ActionScreen";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const SearchResult = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [pageNo, setPageNo] = useState(2);
  const [hideMore, setHideMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMoreLoading, setViewMoreLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showScreen, setShowScreen] = useState(false);
  // Fetch search results
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        `${backendURL}/api/search`,
        { query },
        { withCredentials: true }
      );
      setProducts(res.data.data || []);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/getcartproducts`, {
        withCredentials: true,
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      console.log(err);
      setCartItems([]);
    }
  };

  // Add item to cart
  const addToCart = async (product) => {
    try {
      await axios.post(
        `${backendURL}/api/addtocart`,
        {
          productId: product._id,
          quantity: 1,
          name: product.title,
          price: product.price,
          img: product.images[0],
        },
        { withCredentials: true }
      );
      fetchCart();
      setShowScreen(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle cart button click
  const handleCart = (product) => {
    setCartItems((prev) => [...prev, { productId: product._id }]);

    addToCart(product);
  };

  // Load more products
  const moveToNextPage = async () => {
    setViewMoreLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/api/search`,
        { query, pageNo },
        { withCredentials: true }
      );
      const newProducts = res.data.data || [];
      setProducts((prev) => [...prev, ...newProducts]);
      setPageNo((prev) => prev + 1);
      if (newProducts.length === 0) setHideMore(true);
    } catch (err) {
      console.log(err);
      setHideMore(true);
    } finally {
      setViewMoreLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [query]);

  return (
 <div className="px-4 sm:px-6 md:px-12 lg:px-20 pt-10 max-w-7xl mx-auto">
  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
    Search results for "{query}"
  </h1>

  {showScreen && (
    <ActionScreen
      subheading="Item successfully added to the cart"
      showScreen={showScreen}
      setShowScreen={setShowScreen}
    />
  )}

  {loading ? (
    <p className="text-gray-500 text-base sm:text-lg">Loading...</p>
  ) : error ? (<div>
    <p className="text-red-500 text-base sm:text-lg">{error}</p>
      <button
          
          onClick={()=>window.location.reload()}
          className={`mt-4 sm:mt-6 px-4 py-2 sm:px-6 sm:py-3 bg-black text-white hover:bg-gray-800 cursor-pointer   rounded-lg  transition flex items-center justify-center gap-2 font-medium mx-auto col-span-full text-sm sm:text-base`}
        >
          <RecycleIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Relode
        </button>
    </div>
    
  ) : products.length === 0 ? (
    <p className="text-gray-500 text-base sm:text-lg">No products found.</p>
    
  ) : (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => {
        const isInCart = cartItems?.some((p) => p.productId === product._id);
        return (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-transform transform hover:scale-[1.03] flex flex-col overflow-hidden relative group"
          >
            <div className="relative">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 sm:h-48 md:h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  disabled={isInCart}
                  onClick={() => handleCart(product)}
                  className={`p-1 sm:p-2 rounded-full shadow transition-all duration-200 ease-in-out  ${
                    isInCart ? "bg-green-500 hover:bg-green-600 cursor-not-allowed" : "bg-white hover:bg-gray-300 cursor-pointer"
                  }`}
                >
                  {isInCart ? (
                    <ClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                  ) : (
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 line-clamp-1">
                {product.title}
              </h2>

              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      i < Math.round(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-800 font-semibold mt-1 text-sm sm:text-base md:text-lg">
                ${product.price}
              </p>

              <button
                onClick={() => navigate(`/product`, { state: { product } })}
                className="mt-3 sm:mt-4 bg-black cursor-pointer text-white py-1.5 sm:py-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" /> View
              </button>
            </div>
          </div>
        );
      })}

      {!hideMore && (
        <button
          disabled={viewMoreLoading}
          onClick={moveToNextPage}
          className={`mt-4 sm:mt-6 px-4 py-2 sm:px-6 sm:py-3  ${viewMoreLoading?"bg-gray-500 text-white cursor-not-allowed":"bg-black text-white hover:bg-gray-800 cursor-pointer "}  rounded-lg  transition flex items-center justify-center gap-2 font-medium mx-auto col-span-full text-sm sm:text-base`}
        >
          <Forward className="w-4 h-4 sm:w-5 sm:h-5" /> View More
        </button>
      )}
    </div>
  )}
</div>


  );
};

export default SearchResult;
