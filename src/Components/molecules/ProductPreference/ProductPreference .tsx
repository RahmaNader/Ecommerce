import React, { useState } from "react";

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

  const handleSubmit = () => {
    if (selectedColor && selectedSize && quantity > 0) {
      onSubmit({ color: selectedColor, size: selectedSize, quantity });
    } else {
      alert("Please select a color, size, and quantity!");
    }
  };

  return (
    <div className="flex flex-col">
      <p className="font-playfair font-semibold text-xl text-wine">Select Color</p>
      <div className="flex flex-row gap-3 mt-2">
        {product.color.map((colorOption, index) => (
          <div
            key={index}
            className={`w-9 h-9 rounded-full cursor-pointer border-2 ${
              selectedColor === colorOption ? "border-wine" : "border-golden"
            }`}
            style={{ backgroundColor: colorOption }}
            onClick={() => setSelectedColor(colorOption)}
          />
        ))}
      </div>

      <p className="font-playfair font-semibold text-xl text-wine mt-4">Select Size</p>
      <div className="flex gap-2 mt-2">
        {product.size.map((sizeOption, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md border-2 ${
              selectedSize === sizeOption ? "bg-wine text-white" : "border-wine text-wine"
            }`}
            onClick={() => setSelectedSize(sizeOption)}
          >
            {sizeOption}
          </button>
        ))}
      </div>

      <p className="font-playfair font-semibold text-xl text-wine mt-4">Quantity</p>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        className="border border-wine rounded-md p-2 w-20 mt-2"
      />

      <div className="flex gap-4 mt-6 justify-end">
        <button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={onCancel}>
          Cancel
        </button>
        <button className="px-4 py-2 bg-wine text-white rounded-md" onClick={handleSubmit}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ProductPreference;
