import React from "react";
import { CardComponent } from "@types";
import Rating from "@components/atoms/Rating/Rating";

//
import heart from "@assets/heart.svg";

const ProductSection: React.FC<{ product: CardComponent }> = ({ product }) => {
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
        <div className="flex flex-row w-full justify-between items-center gap-8">
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
          <Rating rate={product.rate} />
        </div>

        {/* price */}
        <div>
          <p className="text-lg font-medium text-gray-700">
            Price: {product.DisPrice} EGP
          </p>

          <p className="text-sm line-through text-gray-500">
            Original Price: {product.NormalPrice} EGP
          </p>
        </div>

        {/* Product Description */}
        <p className="text-gray-600">
          Category: {product.category} <br />
          Size: {product.size} <br />
          Collection: {product.collection}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="w-32 h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add to Cart
          </button>
          <button className="w-32 h-10 bg-green-500 text-white rounded-md hover:bg-green-600">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
