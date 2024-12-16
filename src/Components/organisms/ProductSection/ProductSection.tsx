import React, { useState, useEffect } from "react";
import { CardComponent } from "@types";
import { calculateDiscountPercentage } from "@utils/calculations";
import { ProductCount, CustomRating } from "@components/atoms";
import heart from "@assets/heart.svg";
import filledHeart from "@assets/filledHeart.svg";
import { FaShareAlt } from "react-icons/fa";

const ProductSection: React.FC<{ product: CardComponent }> = ({ product }) => {
  const discountedPrice = calculateDiscountPercentage(
    product.NormalPrice,
    product.DisPrice
  );

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

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

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isInWishlist = wishlist.some(
      (item: CardComponent) => item.id === product.id
    );
    setIsFavorited(isInWishlist);
  }, [product.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isProductInWishlist = wishlist.some(
      (item: CardComponent) => item.id === product.id
    );

    if (isProductInWishlist) {
      // Remove product from wishlist
      const updatedWishlist = wishlist.filter(
        (item: CardComponent) => item.id !== product.id
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsFavorited(false);
    } else {
      // Add product to wishlist
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsFavorited(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 my-8 px-6">
      {/* Product Image Section */}
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="image-container w-48 min-h-48 md:w-full h-[100%] relative overflow-hidden rounded-t-[500px]">
          <img
            src={product.src}
            alt={product.alt}
            className="object-cover w-full h-full cursor-pointer"
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col justify-center space-y-3 md:space-y-6 items-start">
        {/* Product Title and Wishlist Icon */}
        <div className="flex flex-row w-full justify-between items-center">
          <p className="font-playfair text-wine text-2xl md:text-4xl font-extrabold">
            {product.name}
          </p>

          <img
            src={isFavorited ? filledHeart : heart}
            alt="Toggle wishlist"
            className="w-8 h-8 cursor-pointer"
            onClick={toggleWishlist}
          />
        </div>

        {/* Product Rating */}
        <div className="flex items-center">
          <CustomRating rate={product.rate} mode="show" />
        </div>

        {/* Product Price */}
        <div className="flex flex-row gap-8 items-center">
          <p className="font-playfair text-lg font-semibold text-wine">
            {product.DisPrice} EGP
          </p>

          <p className="font-playfair text-lg font-medium line-through text-FifthColor">
            {product.NormalPrice} EGP
          </p>

          <p className="font-Poppins font-normal text-sm text-customRed bg-customRed/10 p-2 rounded-3xl">
            -{discountedPrice}%
          </p>
        </div>

        <hr className="border-t-2 border-ForthColor my-4 w-full" />

        {/* Product Description */}
        <p className="font-Poppins text-base text-ForthColor font-light">
          {product.description}
        </p>

        {/* Choose Color */}
        <div className="flex flex-col gap-4">
          <p className="font-playfair font-semibold text-xl text-wine">
            Select Colors
          </p>

          <div className="flex flex-row gap-3 items-center">
            {product.color.map((color, index) => (
              <div
                key={index}
                className={`w-9 h-9 rounded-full cursor-pointer border-2 ${
                  selectedColor === color ? "border-wine" : "border-golden"
                }`}
                style={{ backgroundColor: color }}
                title={color}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Choose Size */}
        <div className="flex flex-col gap-4 w-full">
          <p className="font-playfair font-semibold text-xl text-wine">
            Choose Size
          </p>

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