import React, { useMemo } from 'react'
import lookbook1 from '../assets/lookbook1.png'
import lookbook2 from '../assets/lookbook2.png'
import lookbook3 from '../assets/lookbook3.png'
import lookbook4 from '../assets/lookbook4.png'
import lookbookwomen1 from '../assets/lookbookwomen1.png'
import lookbookwomen2 from '../assets/lookbookwomen2.png'
import lookbookwomen3 from '../assets/lookbookwomen3.png'
import lookbookwomen4 from '../assets/lookbookwomen4.png'
import lookbookkids1 from '../assets/lookbookkids1.png'
import lookbookkids2 from '../assets/lookbookkids2.png'
import lookbookkids3 from '../assets/lookbookkids3.png'
import lookbookkids4 from '../assets/lookbookkids4.png'


const lookBookCategory = {
  "men's": {
    images: [lookbook1, lookbook2, lookbook3, lookbook4],
    names: ["Summer Collection", "Urban Styles", "Street Vibes", "Winter Essentials"],
  },
  "women's": {
    images: [lookbookwomen1, lookbookwomen2, lookbookwomen3, lookbookwomen4],
    names: ["Summer Collection", "Urban Styles", "Street Vibes", "Winter Essentials"],
  },
  "kids": {
    images: [lookbookkids1, lookbookkids2, lookbookkids3, lookbookkids4],
    names: ["Summer Collection", "Urban Styles", "Street Vibes", "Winter Essentials"],
  },
  "accessories": {
    images: [lookbook1, lookbook2, lookbook3, lookbook4],
    names: ["Summer Collection", "Urban Styles", "Street Vibes", "Winter Essentials"],
  },
  "gifts": {
    images: [lookbook1, lookbook2, lookbook3, lookbook4],
    names: ["Summer Collection", "Urban Styles", "Street Vibes", "Winter Essentials"],
  }
}






const HomeSec2 = ({ selected }) => {

  if (selected === "accessories"||selected==="gifts") return null;
  const { images, names } = lookBookCategory[selected] || lookBookCategory["men's"];

  const lookbook = useMemo(() =>

    names.map((name, index) => (
      {
        id: index + 1,
        image: images[index],
        name,

      }

    ))
    , [images, names]);




  return (
  <section className="w-full py-16 sm:py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10 sm:mb-12">
      Our Lookbook
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
      {lookbook.map((p) => 
        p.image && (
          <div
            key={p.id}
            className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-64 sm:h-72 md:h-80 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-sm sm:text-base">
              {p.name}
            </div>
          </div>
        )
      )}
    </div>
  </div>
</section>

  )
}

export default HomeSec2
