import React, { useState } from "react";
import { CardComponent } from "@types";
import Rating from "@components/atoms/CustomRating/CustomRating";
import { calculateDiscountPercentage } from "@utils/calculations";
import { FaShareAlt } from "react-icons/fa";
import { ProductCount } from "@components/atoms";
import heart from "@assets/heart.svg";

const ProductSection: React.FC<{ product: CardComponent }> = ({ product }) => {
  const discountedPrice = calculateDiscountPercentage(
    product.NormalPrice,
    product.DisPrice
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    console.log(product.name);
  };

  const handleBuyNow = () => {
    console.log(product.name);
  };

  const handleShare = () => {
    console.log("Share button clicked");
  };

  const handleCountChange = (count: number) => {
    console.log(`Selected quantity: ${count}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full  gap-8 my-8 px-6">
      {/* product photos */}
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="image-container w-[200px] min-h-[200px]  md:w-full h-[100%] relative overflow-hidden rounded-t-[500px]">
          <img
            src={product.src}
            alt={product.alt}
            className="object-cover w-full h-full cursor-pointer"
          />
          <div className="absolute top-0 left-0 w-full h-full border-[2px] border-[#E3C174] rounded-t-[500px]" />
        </div>

        <div className="flex flex-row gap-2 justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-[50px] h-[50px] bg-wine rounded-md border-2 border-[#E3C174] cursor-pointer hover:opacity-80"
            ></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center space-y-6 items-start">
        {/* product title */}
        <div className="flex flex-row w-full justify-between items-center ">
          <p className="font-playfair text-wine text-[20px] md:text-[40px] font-extrabold">
            {product.name}
          </p>

          <img
            src={heart}
            alt="add to favorites"
            className="w-full h-full cursor-pointer max-w-[30px] max-h-[30px]"
          />
        </div>

        {/* product rating */}
        <div className="flex items-center space-x-1">
          <Rating rate={product.rate}  mode="show"/>
        </div>

        {/* price */}
        <div className="flex flex-row gap-8 items-center">
          <p className="font-playfair text-lg font-semibold text-wine">
            {product.DisPrice} EGP
          </p>

          <p className="font-playfair text-lg font-medium line-through text-[#E14B4B]">
            {product.NormalPrice} EGP
          </p>

          <p className="font-Poppins font-normal text-sm text-[#FF3333] bg-[#FF3333]/10 p-2 rounded-3xl">
            -{discountedPrice}%
          </p>
        </div>

        <hr className="border-t-2 border-ForthColor my-4 w-full" />

        {/* Product Description */}
        <p className="font-Poppins text-[15px] text-ForthColor font-light">
          {product.description}
        </p>

        {/* choose color */}
        <div className="flex flex-col gap-4">
          <p className="font-playfair font-semibold text-xl text-wine">
            Select Colors
          </p>

          <div className="flex flex-row gap-3 items-center">
            {product.color.map((color, index) => (
              <div
                key={index}
                className={`w-[35px] h-[35px] rounded-full cursor-pointer border-[3px] ${
                  selectedColor === color ? "border-wine" : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
                title={color}
                onClick={() => setSelectedColor(color)}
                role="button"
                tabIndex={0}
              ></div>
            ))}
          </div>
        </div>

        {/* choose size */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row justify-between items-center">
            <p className="font-playfair font-semibold text-xl text-wine">
              Choose Size
            </p>
            <p className="font-playfair underline font-medium text-sm text-ForthColor cursor-pointer">
              Size Guide
            </p>
          </div>

          <div className="flex flex-row gap-3 items-center">
            {product.size.map((size, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md border-2 ${
                  selectedSize === size
                    ? "bg-wine text-white"
                    : "border-wine text-wine"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-row justify-between items-center">
          
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <ProductCount initialCount={1} onCountChange={handleCountChange} />
            <button
              onClick={handleAddToCart}
              className="w-32 h-10 bg-wine text-mainColor rounded-md hover:bg-sixColor"
            >
              Add to Cart
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <button
              onClick={handleBuyNow}
              className="w-32 h-10 bg-mainColor text-wine border-[2px] border-wine rounded-md hover:border-sixColor"
            >
              Buy Now
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-wine text-mainColor hover:bg-sixColor flex items-center justify-center"
              aria-label="Share Product"
            >
              <FaShareAlt size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductSection;
