import React from "react";

type ReturnCardProps = {
  image: string;
  title: string;
  color: string;
  size: string;
  price: string;
  quantity: number;
  onDetailsClick: () => void;
};

const ReturnCard: React.FC<ReturnCardProps> = ({
  image,
  title,
  color,
  size,
  price,
  quantity,
  onDetailsClick,
}) => {
  return (
    <div className="flex items-center justify-between w-full p-4 border rounded-lg bg-[#FAF5F0] border-[#D6C7B8]">
      {/* Left Section: Product Image */}
      <div className="flex items-center">
        <img
          src={image}
          alt={title}
          className="w-20 h-20 rounded-md object-cover"
        />
        <div className="ml-4">
          {/* Product Title */}
          <h3 className="text-lg font-semibold text-wine">{title}</h3>
          {/* Product Attributes */}
          <div className="flex items-center mt-1 text-sm text-[#A78E78] space-x-2">
            <span>{color}</span>
            <span>|</span>
            <span>{size}</span>
          </div>
        </div>
      </div>

      {/* Right Section: Price and Details */}
      <div className="flex flex-col items-end">
        {/* Price */}
        <p className="text-lg font-semibold text-wine">{price}</p>
        {/* Quantity */}
        <p className="text-sm text-[#A78E78]">Qty: {quantity}</p>
        {/* Details Button */}
        <button
          onClick={onDetailsClick}
          className="mt-2 text-sm text-wine underline flex items-center hover:text-[#A78E78]"
        >
          Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4 ml-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ReturnCard;
