import React, { useState } from "react";

type ProductCountProps = {
  initialCount?: number; 
  onCountChange?: (count: number) => void; 
};

const ProductCount: React.FC<ProductCountProps> = ({
  initialCount = 1,
  onCountChange,
}) => {
  const [count, setCount] = useState(initialCount);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (onCountChange) onCountChange(newCount);
  };

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      if (onCountChange) onCountChange(newCount);
    }
  };

  return (
    <div className="flex items-center justify-between w-32 h-10 bg-mainColor text-wine border-[2px] border-wine rounded-md px-4">
      <button
        onClick={handleDecrement}
        className="text-wine font-Poppins text-xl font-bold focus:outline-none"
      >
        -
      </button>

      <span className="text-wine font-playfair text-lg font-bold">{count}</span>

      <button
        onClick={handleIncrement}
        className="text-wine font-Poppins text-xl font-bold focus:outline-none"
      >
        +
      </button>
    </div>
  );
};

export default ProductCount;
