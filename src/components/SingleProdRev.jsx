import React, { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import axios from 'axios';

const SingleProdRev = ({setScreenToShow, reviews, product, setShowScreen }) => {
    const [reviewList, setReviewList] = useState(product?.reviews || []);
    const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
    const [selectedRatingOpt, setSelectedRatingOpt] = useState("all");
    const [reviewToShow, setReviewToShow] = useState(5);
    const [hideCommentForm, setHideCommentForm] = useState(false);
    const [name, setName] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;


    useEffect(() => {
        if (product?.reviews) {
            setReviewList(product.reviews);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!newReview.comment) return

        // add new review to list
        setReviewList([...reviewList, newReview])
        // reset form
        setNewReview({ rating: 0, comment: "" })
        try {
            const res = await axios.post(`${backendUrl}/api/submitcomment`, {
                rating: newReview.rating,
                comment: newReview.comment,
                productId: product._id
            }, { withCredentials: true });
            setReviewList(res.data.updatedproduct.reviews);
            setNewReview({ rating: 0, comment: "" });
                  setScreenToShow("");

            setShowScreen(true)
        } catch (error) {
            console.log(error);

        }


    }


    const fetchUserDetails = async () => {
        try {
            const res = await axios.get(`${backendUrl}/auth/fetchuser`, { withCredentials: true });

            setName(res.data.user.name);

        } catch (error) {
            console.log("an error occure while fetching user details ", error);

        }
    }

    const filterArray = reviewList
        .filter((review) => {
            if (selectedRatingOpt === "all")
                return true;

            return Math.floor(review.rating) === parseInt(selectedRatingOpt - 1);

        }).slice(0, reviewToShow);

    // Fetch recent orders from backend
    const RecentOrders = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/fetchrecentorders`, { withCredentials: true });

            const exists = res.data.recentOrders.some((p) => p.productId === product._id);
            setHideCommentForm(!exists);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (!product) return;
        RecentOrders();
        fetchUserDetails();
    }, [product]);


    return (
      <div className="mt-16 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

  {/* Overall Rating */}
  <div className="mb-10 bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100 text-center">
    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Overall Rating</h3>

    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2">
        <span className="text-3xl sm:text-4xl font-bold text-gray-900">
          {reviewList.length > 0
            ? (reviewList.reduce((acc, r) => acc + r.rating, 0) / reviewList.length).toFixed(1)
            : "0.0"}
        </span>
        <span className="text-gray-500 text-sm sm:text-base">/ 5</span>
      </div>

      {/* Stars */}
      <div className="flex justify-center mt-2 gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 sm:w-6 sm:h-6 ${i < Math.round(product?.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
      </div>

      <p className="text-sm sm:text-base text-gray-600 mt-2">
        Based on <span className="font-semibold">{reviewList.length}</span>{" "}
        {reviewList.length === 1 ? "review" : "reviews"}
      </p>
    </div>
  </div>

  {/* Reviews List */}
  <div className="space-y-6 mb-10 relative">
    {/* Filter Dropdown */}
    <div className="w-full flex justify-end items-center mb-2">
      <select
        onChange={(e) => { setSelectedRatingOpt(e.target.value); setReviewToShow(5) }}
        className="outline-none text-sm sm:text-base px-2 py-1 border border-gray-300 rounded-md"
      >
        <option value="all">All</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n} {Array(n).fill('⭐').join('')}</option>
        ))}
      </select>
    </div>

    {reviewList.length > 0 ? (
      filterArray.map((review, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2 sm:gap-0">
            <p className="font-semibold text-gray-900">{review.username}</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed italic text-sm sm:text-base">
            “{review.comment}”
          </p>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center text-sm sm:text-base">
        No reviews yet. <span className="font-semibold">Be the first to review!</span>
      </p>
    )}

    {/* View More Button */}
    {filterArray.length > 0 && reviewToShow < reviewList.length && (
      <div className="absolute bottom-0 w-full h-20 sm:h-24 bg-gradient-to-t from-gray-100 to-transparent flex justify-center items-end pb-4 sm:pb-6">
        <button
          onClick={() => setReviewToShow(Math.min(reviewToShow + 5, reviewList.length))}
          className="bg-white px-4 sm:px-6 py-2 rounded-2xl shadow hover:bg-gray-200 text-black/85 font-semibold transition"
        >
          View More
        </button>
      </div>
    )}
  </div>

  {/* Add Review Form */}
  {!hideCommentForm && (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100"
    >
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Share Your Experience ✍️</h3>

      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Your Name</label>
        <input
          type="text"
          readOnly
          placeholder={name}
          value={name}
          className="w-full border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none transition text-sm sm:text-base"
        />
      </div>

      {/* Comment Field */}
      <div className="mb-4">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Your Comment</label>
        <textarea
          placeholder="Write your thoughts..."
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          className="w-full border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-black focus:outline-none transition text-sm sm:text-base"
          rows="4"
        />
      </div>

      {/* Rating */}
      <div className="mb-6">
        <span className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Your Rating</span>
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
              className={`w-6 h-6 sm:w-7 sm:h-7 cursor-pointer transition-transform ${i < newReview.rating ? "text-yellow-500 fill-yellow-500 scale-110" : "text-gray-300 hover:text-yellow-400"}`}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 sm:py-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition text-sm sm:text-base"
      >
        Submit Review
      </button>
    </form>
  )}
</div>

    )
}

export default SingleProdRev
