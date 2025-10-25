import React, { useEffect, useRef, useState } from "react";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import { Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import ActionScreen from "../components/ActionScreen";



const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const syncTimeOut = useRef(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [showScreen, setShowScreen] = useState(false);
  const [user, setUser] = useState("");
  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/getcartproducts`, { withCredentials: true });
      setCartItems(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  // Fetch recent orders from backend
  const RecentOrders = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/fetchrecentorders`, { withCredentials: true });
      setRecentOrders(res.data.recentOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      await axios.post(`${backendUrl}/api/payment`, { cartItems: cartItems }, { withCredentials: true });
      setCartItems([]);
      setShowScreen(true);

    } catch (error) {
      console.log(error);
    }
  };
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${backendUrl}/auth/fetchuser`, { withCredentials: true });
      console.log(res.data);
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUser();
    fetchCart();
    RecentOrders();
  }, []);

  const scheduleCart = (updatedcart) => {
    if (syncTimeOut.current) clearTimeout(syncTimeOut.current);

    syncTimeOut.current = setTimeout(async () => {
      try {
        await axios.patch(`${backendUrl}/api/updatecart`, { cart: updatedcart }, { withCredentials: true });
        console.log("🟢 Cart synced with backend");
      } catch (error) {
        console.error("❌ Failed to sync cart:", error);
      }
    }, 100);
  };

  const handleQtyChange = (id, delta) => {
    setCartItems((prevItems) => {
      const updated = prevItems.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      );
      scheduleCart(updated);
      return updated;
    });
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => {
      const updated = prevItems.filter(item => item._id !== id);
      scheduleCart(updated);
      return updated;
    });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 pt-10 max-w-6xl mx-auto">
  <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Your Cart</h1>

  {showScreen && (
    <ActionScreen
      subheading="Items bought successfully. Soon they will be delivered to your doorstep."
      showScreen={showScreen}
      setShowScreen={setShowScreen}
    />
  )}

  {/* Main Cart */}
  {cartItems.length === 0 ? (
    <p className="text-gray-600 text-lg">Your cart is empty.</p>
  ) : (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Cart Items */}
      <div className="flex-1 space-y-4 md:space-y-6 max-h-[35rem] overflow-y-auto pr-2">
        {[...cartItems].reverse().map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-4 rounded-2xl shadow hover:shadow-lg transition gap-4 sm:gap-6"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full sm:w-24 h-40 sm:h-28 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 w-full">
              <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
              <p className="text-gray-800 font-medium mt-1">${item.price}</p>

              {/* Quantity Selector */}
              <div className="flex items-center mt-2 gap-2 flex-wrap">
                <button
                  onClick={() => handleQtyChange(item._id, -1)}
                  className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="text-gray-900 font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleQtyChange(item._id, 1)}
                  className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="ml-auto sm:ml-0 text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow h-fit flex-shrink-0 w-full md:w-80">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-gray-900 text-lg mb-6">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          disabled={!user.address || user.address.length === 0}
          onClick={handlePayment}
          className="w-full py-3 sm:py-4 rounded-xl font-medium transition bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-white"
        >
          Proceed to Checkout
        </button>

        {/* Recent Orders */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Recent Orders</h2>
          <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
            {recentOrders.slice(2).map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition flex flex-col justify-center items-center gap-2"
              >
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                <p className="text-gray-800 font-medium mt-1">${item.price}</p>
                <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default Cart;
