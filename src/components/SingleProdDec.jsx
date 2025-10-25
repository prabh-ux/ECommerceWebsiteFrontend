import React from 'react'

const SingleProdDec = ({ product }) => {
  return (
    <div className="mt-16 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 md:p-10 max-w-5xl mx-auto">
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Product Details
      </h2>

      {/* Long Description */}
      <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">
        {product?.description}
      </p>

      {/* Specs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mb-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Specifications</h3>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li>✔ Fit: Slim</li>
            <li>✔ Fabric: 100% Cotton</li>
            <li>✔ Sleeve: Full Sleeve</li>
            <li>✔ Pattern: Solid</li>
            <li>✔ Occasion: Formal / Casual</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Care Instructions</h3>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li>• Machine wash cold with like colors</li>
            <li>• Do not bleach</li>
            <li>• Warm iron if needed</li>
            <li>• Line dry in shade</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 sm:my-8 border-gray-200" />

      {/* Extra Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 text-xs sm:text-sm">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Country of Origin</h3>
          <p>India</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Return & Exchange</h3>
          <p>
            Easy 7-day returns and exchanges. No questions asked. For details, please check our{" "}
            <a href="#" className="underline hover:text-black">Return Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SingleProdDec
