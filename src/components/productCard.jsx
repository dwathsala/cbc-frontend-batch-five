export default function ProductCard({ product }) {
  return (
    <div className="w-[280px] bg-white rounded-3xl shadow-lg m-4 flex flex-col overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300">
      
      {/* Product Image */}
      <div className="w-full h-[220px] bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 italic">No Image</div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col justify-between h-[200px]">
        {/* Name and Alt Name */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 truncate">
            {product.name}
          </h2>
          {product.altName && product.altName.length > 0 && (
            <p className="text-sm text-gray-500 italic truncate">
              {product.altName.join(", ")}
            </p>
          )}
        </div>

        {/* Description */}
        <p
          className="text-sm text-gray-700 mt-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        {/* Price and Stock */}
        <div className="flex justify-between items-center mt-4">
          <div>
            {product.labelledPrice && product.labelledPrice > product.price ? (
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm line-through">
                  ${product.labelledPrice.toFixed(2)}
                </span>
                <span className="text-green-600 font-bold text-lg">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-green-600 font-bold text-lg">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div>
            {product.isAvailable && product.stock > 0 ? (
              <span className="text-sm text-green-600 font-medium">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-sm text-red-500 font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Optional CTA Button */}
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
