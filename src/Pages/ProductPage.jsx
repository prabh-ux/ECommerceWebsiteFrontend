import React, { useEffect, useState } from "react"
import brand from '../assets/brand.png';
import SingleProductHeroSec from "../components/SingleProductHeroSec";
import SingleProdDec from "../components/SingleProdDec";
import SingleProdRev from "../components/SingleProdRev";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ActionScreen from "../components/ActionScreen";
const ProductPage = () => {
  const reviews = [
    { name: "Aarav", rating: 5, comment: "Great quality and fits perfectly!" },
    { name: "Simran", rating: 4, comment: "Very stylish but delivery was a bit late." },
  ]
  const location = useLocation();

  const prodID = location.state?.product?._id;
  const [product, setProduct] = useState();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
const [showScreen,setShowScreen]=useState(false);
const [screenToShow,setScreenToShow]=useState("");
  const fetchSingleProd = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/fetchsingleprod`, {
        productId: prodID
      }, { withCredentials: true });

      console.log(res.data.product);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchSingleProd();
  }, [])



  const img = [
    brand, brand, brand,
    brand, brand, brand
  ]

  const color = [
    "black", "gray", "maroon", "beige"
  ]

  const [selectedImg, setSelectedImg] = useState({ index: 0, src: null });
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="pt-24 px-6 md:px-20 max-w-6xl mx-auto">
      {showScreen && <ActionScreen subheading={` ${screenToShow==="heroSec"?'item successfully added to the cart':'review submitted successfully'} `}  showScreen={showScreen} setShowScreen={setShowScreen} />}

      <SingleProductHeroSec setScreenToShow={setScreenToShow} setShowScreen={setShowScreen} product={product} quantity={quantity} setQuantity={setQuantity}  color={color} selectedColor={selectedColor} setSelectedColor={setSelectedColor} selectedSize={selectedSize} setSelectedSize={setSelectedSize} selectedImg={selectedImg} setSelectedImg={setSelectedImg} img={img} />
      <SingleProdDec product={product} />
      <SingleProdRev setScreenToShow={setScreenToShow} setShowScreen={setShowScreen} product={product} reviews={reviews} />
    </div>
  )
}

export default ProductPage
