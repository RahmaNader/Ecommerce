import React from "react";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Product Image Section */}
      <div className="flex-1">
        <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-md"></div>
        <div className="flex gap-4 mt-4">
          {/* Thumbnail Skeletons */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-16 h-16 bg-gray-200 animate-pulse rounded-md"
            ></div>
          ))}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="flex-1 space-y-6">
        {/* Product Name */}
        <div className="w-3/4 h-8 bg-gray-200 animate-pulse rounded-md"></div>

        {/* Product Price */}
        <div className="w-1/2 h-6 bg-gray-200 animate-pulse rounded-md"></div>

        {/* Rating */}
        <div className="w-1/3 h-4 bg-gray-200 animate-pulse rounded-md"></div>

        {/* Product Description */}
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-full h-4 bg-gray-200 animate-pulse rounded-md"
            ></div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <div className="w-32 h-10 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="w-32 h-10 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
