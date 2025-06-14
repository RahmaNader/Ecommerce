import React, { useState } from "react";
import { ProductCountProps } from "@types";

const ProductCount: React.FC<ProductCountProps> = ({
  initialCount = 1,
  max,
  onCountChange,
}) => {
  const safeInit = Math.max(1, Math.min(max ?? Infinity, initialCount));
  const [count, setCount] = useState(safeInit);
  const setAndEmit = (val: number) => {
    setCount(val);
    onCountChange?.(val);
  };

  const handleIncrement = () => {
    const next = count + 1;
    if (max === undefined || next <= max) setAndEmit(next);
  };

  const handleDecrement = () => {
    if (count > 1) setAndEmit(count - 1);
  };
  const incDisabled = max !== undefined && count >= max;
  const decDisabled = count === 1;

  return (
    <div className="flex items-center justify-between w-32 h-10 bg-mainColor text-wine border-[2px] border-wine rounded-md px-4">
      <button
        onClick={handleDecrement}
        disabled={decDisabled}
        className={`text-xl font-bold focus:outline-none transition
    ${
      decDisabled
        ? "text-gray-400 cursor-not-allowed opacity-50"
        : "text-wine hover:text-sixColor"
    }`}
      >
        –
      </button>

      <span className="text-wine font-playfair text-lg font-bold">{count}</span>

      <button
        onClick={handleIncrement}
        disabled={incDisabled}
        className={`text-xl font-bold focus:outline-none transition
    ${
      incDisabled
        ? "text-gray-400 cursor-not-allowed opacity-50"
        : "text-wine hover:text-sixColor"
    }`}
      >
        +
      </button>
    </div>
  );
};

export default ProductCount;
