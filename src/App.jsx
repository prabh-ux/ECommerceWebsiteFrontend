import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import ProductPage from './Pages/ProductPage'
import SearchResult from './components/SearchResult'
import Cart from './Pages/Cart'
import Profile from './Pages/Profile'
import Transition from './transitions/Transition'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import axios from 'axios'
import OtpVerification from './components/OtpVerification'
import Search from './components/Search'

function App() {
  const [selected, setSelected] = useState("men's");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const checkLoginStatus = async () => {

    try {

      const res = await axios.get(`${backendUrl}/auth/check`, {
        withCredentials: true
      });

      if (res.data.loggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);

      }

    } catch (error) {
      setIsLoggedIn(false);
    }
  }

const location=useLocation();
  useEffect(() => {
    checkLoginStatus();
  }, [])


const hideSearchOn=['/login','/signup'];


  return (
    <div className=' min-h-screen  flex flex-col justify-between  '>

      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} selected={selected} setSelected={setSelected} />
    {/* Search bar always visible below navbar */}
    {!hideSearchOn.includes(location.pathname)&& <div className="mt-20 px-4 sm:px-6 lg:px-8 w-full">
        <Search />
      </div>}

      <Routes>
        <Route path='/' element={<Home selected={selected} />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/result' element={<SearchResult />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify' element={<OtpVerification />} />
      </Routes>
      <Transition selected={selected} />
      
      <Footer />

    </div>


  )
}

export default App
