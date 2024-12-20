import React, { useState, useEffect } from "react";
import { ErrorAlert, ProductCount } from "@components/atoms";

interface ProductPreferenceProps {
  product: { color: string[]; size: string[] };
  onSubmit: (preferences: { color: string; size: string; quantity: number }) => void;
  onCancel: () => void;
}

const ProductPreference: React.FC<ProductPreferenceProps> = ({
  product,
  onSubmit,
  onCancel,
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = () => {
    if (selectedColor && selectedSize && quantity > 0) {
      onSubmit({ color: selectedColor, size: selectedSize, quantity });
      setError(null);
    } else {
      setError("Please select a color, size, and quantity!");
    }
  };

  return (
    <div className="fixed flex flex-col inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
      {error && <ErrorAlert message={error} />}
      <div className="bg-mainColor p-6 rounded-lg shadow-lg relative md:w-96">
      <button
          onClick={onCancel}
          className="rounded-full border-[2px] p-[5px] my-2 border-wine absolute right-4 top-2 text-wine hover:text-ForthColor hover:border-ForthColor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <p className="font-playfair font-semibold text-lg text-wine mb-4">
          Choose Color
        </p>
        <div className="flex gap-3 mb-4">
          {product.color.map((colorOption, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                selectedColor === colorOption ? "border-wine" : "border-golden"
              }`}
              style={{ backgroundColor: colorOption }}
              onClick={() => setSelectedColor(colorOption)}
            />
          ))}
        </div>

        <p className="font-playfair font-semibold text-lg text-wine mb-4">
          Choose Size
        </p>
        <div className="flex gap-3 mb-4">
          {product.size.map((sizeOption, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md border ${
                selectedSize === sizeOption
                  ? "bg-wine text-white"
                  : "border-ForthColor text-ForthColor"
              }`}
              onClick={() => setSelectedSize(sizeOption)}
            >
              {sizeOption}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <p className="font-playfair font-semibold text-lg text-wine">
            Quantity:
          </p>
          <ProductCount
            initialCount={quantity}
            onCountChange={(newCount) => setQuantity(newCount)}
          />
        </div>

        <div className="flex justify-between gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-ForthColor text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-wine text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPreference;
