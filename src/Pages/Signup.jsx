import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); // <-- error state
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/auth/signup`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );

      // Signup successful, redirect to home
      navigate('/');
      window.location.reload();
    } catch (err) {
      // Handle backend error messages
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 bg-gray-50">
      <div className="w-full max-w-lg sm:max-w-xl bg-white shadow-2xl rounded-3xl p-8 sm:p-10">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2 sm:mb-4">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-6 sm:mb-8">
          Join us and start exploring
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black/20 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black/20 outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create password"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black/20 outline-none pr-12 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black/20 outline-none transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-sm"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-center text-gray-600 text-sm mt-6 sm:mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
