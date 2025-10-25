import { SearchCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKEND_URL

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [products, setProducts] = useState([])
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate()

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
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/getproducts`, {
        withCredentials: true,
      })
      setProducts(res.data.data || [])
    } catch (error) {
    }
  }

  const handleSearch = () => {
    if (!loggedIn) {
      navigate('/signup');
      return;
    }

    if (!searchInput.trim()) return;

    navigate(`/result?query=${encodeURIComponent(searchInput)}`);
    setSuggestions([]);

  }

  useEffect(() => {
    fetchProducts();
    checkLoginStatus();
  }, [])

 


  useEffect(() => {
    if (!searchInput.trim()) {
      setSuggestions([])
      return
    }

    const delayDebounce = setTimeout(() => {
      const filtered = products.filter((p) =>
        p.title?.toLowerCase().includes(searchInput.toLowerCase())
      )
      setSuggestions(filtered)
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [searchInput, products])

  return (
    <div className="relative w-full max-w-2xl mx-auto px-2">
      {/* Input + Button Inline */}
      <div className="flex items-center w-full border border-gray-300 rounded-full overflow-hidden shadow-sm bg-white">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // prevent form submission
              handleSearch();
            }
          }}
          className="flex-1 min-w-0 px-3 py-2 text-sm sm:px-4 sm:py-2.5 md:py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
        />

        <button
          onClick={() => handleSearch()}
          className="flex-shrink-0 bg-black text-white px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors rounded-r-full"
        >
          <SearchCheck size={18} className="sm:size-5 md:size-5" />
        </button>
      </div>

      {/* 🪄 Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-64 overflow-y-auto">
          {suggestions.slice(0, 20).map((item) => (
            <li
              key={item._id}
              onClick={() => {
                setSearchInput(item.title)
                setSuggestions([])
                navigate(`/result?query=${encodeURIComponent(item.title)}`)
              }}
              className="px-4 py-2 cursor-pointer text-gray-800 hover:bg-gray-100"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search
