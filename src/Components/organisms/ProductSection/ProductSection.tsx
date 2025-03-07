import React, { useState, useEffect } from "react";
import { CardComponent, ProductVariant, SizeQuantity } from "@types";
import Cookies from "js-cookie";
import {
  ProductCount,
  CustomRating,
  SuccessAlert,
  ErrorAlert,
} from "@components/atoms";
import heart from "@assets/heart.svg";
import filledHeart from "@assets/filledHeart.svg";
import { FaShareAlt } from "react-icons/fa";
import { fetchProductVariant } from "src/services/api/fetchVariants";

const ProductSection: React.FC<{ product: CardComponent }> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const variants = await fetchProductVariant(product.productID);
        console.log("Product Variants:", variants);
        setProductVariants(variants);
      } catch (error) {
        console.error("Failed to fetch variants:", error);
      }
    };

    fetchVariants();
  }, [product.productID]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setAlertMessage("Please select both a color and a size.");
      setAlertType("error");
      setTimeout(() => setAlertType(null), 3000);
      return;
    }

    const authToken = Cookies.get("authToken");
    if (!authToken) {
      setAlertMessage("You need to log in to add to the cart.");
      setAlertType("error");
      setTimeout(() => setAlertType(null), 3000);
      return;
    }

    const existingCart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart") as string)
      : [];
    existingCart.push({
      id: product.productID,
      name: product.name,
      DisPrice: product.priceAfterDiscount,
      NormalPrice: product.productPrice,
      src: product.productImages[0]?.imageUrl,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    });

    Cookies.set("cart", JSON.stringify(existingCart), { expires: 7 });
    setAlertMessage("Item added successfully to cart.");
    setAlertType("success");
    setTimeout(() => setAlertType(null), 3000);
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
    const wishlist = Cookies.get("wishlist")
      ? JSON.parse(Cookies.get("wishlist") as string)
      : [];
    const isInWishlist = wishlist.some(
      (item: CardComponent) => item.productID === product.productID
    );
    setIsFavorited(isInWishlist);
  }, [product.productID]);

  const toggleWishlist = () => {
    const authToken = Cookies.get("authToken");
    const isAuthenticated = authToken && authToken.trim().length > 0;

    if (!isAuthenticated) {
      setAlertMessage("You need to log in to add to the wish list");
      setAlertType("error");
      setTimeout(() => setAlertType(null), 3000);
      return;
    }

    const wishlist = Cookies.get("wishlist")
      ? JSON.parse(Cookies.get("wishlist") as string)
      : [];
    const isProductInWishlist = wishlist.some(
      (item: CardComponent) => item.productID === product.productID
    );

    if (isProductInWishlist) {
      const updatedWishlist = wishlist.filter(
        (item: CardComponent) => item.productID !== product.productID
      );
      Cookies.set("wishlist", JSON.stringify(updatedWishlist), { expires: 1 });
      setIsFavorited(false);
      setAlertMessage("Item removed from wishlist");
      setAlertType("success");
    } else {
      wishlist.push(product);
      Cookies.set("wishlist", JSON.stringify(wishlist), { expires: 1 });
      setIsFavorited(true);
      setAlertMessage("Item added to wishlist");
      setAlertType("success");
    }

    setTimeout(() => setAlertType(null), 3000);
  };

  const availableSizes = productVariants.find((v) => v.colorNameEn === selectedColor)
  ?.sizeQuantities ?? [];


  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full gap-10 my-8 px-6">
      {alertType && alertMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          {alertType === "error" ? (
            <ErrorAlert message={alertMessage} />
          ) : (
            <SuccessAlert message={alertMessage} />
          )}
        </div>
      )}

      {/* Product Image Section */}
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="image-container w-48 min-h-48 md:w-full h-[100%] relative overflow-hidden rounded-t-[500px]">
          <img
            src={product.productImages[0]?.imageUrl}
            alt={product.productDescription}
            className="object-cover max-w-[300px] h-full cursor-pointer border border-1 border-golden rounded-t-[500px]"
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col justify-center space-y-3 md:space-y-6 items-start">
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

        <div className="flex items-center">
          <CustomRating rate={product.averageRate ?? 0} mode="show" />
        </div>

        <div className="flex flex-row gap-8 items-center">
          <p className="font-playfair text-lg font-semibold text-wine">
            {product.priceAfterDiscount} EGP
          </p>
          <p className="font-playfair text-lg font-medium line-through text-FifthColor">
            {product.productPrice} EGP
          </p>
          <p className="font-Poppins font-normal text-sm text-customRed bg-customRed/10 p-2 rounded-3xl">
            -{product.discountPercent}%
          </p>
        </div>

        <hr className="border-t-2 border-ForthColor my-4 w-full" />

        <p className="font-Poppins text-base text-ForthColor font-light">
          {product.productDescription}
        </p>

        {/* Color Selection */}
        <div>
          <p className="font-playfair font-semibold text-xl text-wine">
            Select Color
          </p>
          {productVariants.length === 0 ? (
            <p>There are no colors available</p>
          ) : (
            <div className="flex flex-row gap-3 items-center">
              {productVariants.map((variant) => (
                <div
                  key={variant.productVarientId}
                  className={`w-9 h-9 rounded-full cursor-pointer border-2 ${
                    selectedColor === variant.colorNameEn
                      ? "border-wine"
                      : "border-golden"
                  }`}
                  style={{ backgroundColor: variant.colorCode }}
                  title={variant.colorNameEn}
                  onClick={() => setSelectedColor(variant.colorNameEn)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Size Selection */}
        <div>
        <p className="font-playfair font-semibold text-xl text-wine">Choose Size</p>
        {selectedColor && availableSizes.length === 0 ? (
          <p>There are no available sizes</p>
        ) : selectedColor ? (
          <div className="flex flex-row gap-3 items-center">
            {availableSizes.map((size : SizeQuantity, index : number) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md border-2 ${selectedSize === size.sizeLabel ? "bg-wine text-white" : "border-wine text-wine"}`}
                onClick={() => setSelectedSize(size.sizeLabel || "")}
              >
                {size.sizeLabel}
              </button>
            ))}
          </div>
        ) : (
          <p>There are no sizes available</p>
        )}
      </div>

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