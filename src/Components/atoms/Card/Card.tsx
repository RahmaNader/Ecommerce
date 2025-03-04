import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CardComponent } from "@types";
import fallbackImage from "@assets/HP_img2.jpeg";
import { Image, CustomRating, SuccessAlert } from "@components/atoms";
import shoppingCart from "@assets/shoppingCart.svg";
import { fetchProductImages } from "@services/api/fetchProductImages";
import { ProductPreference } from "@components/molecules";

const Card: React.FC<CardComponent> = ({
  productID,
  productImages,
  name,
  priceAfterDiscount,
  productPrice,
  averageRate,
  productVarients, // Make sure this is provided
}) => {
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isInCart, setIsInCart] = useState(false);
  const [showPreference, setShowPreference] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(fallbackImage);
  const [imageAlt, setImageAlt] = useState<string>("Product Image");

  // Check if the product is already in the cart
  useEffect(() => {
    const existingCart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart") as string)
      : [];
    setIsInCart(
      existingCart.some((item: { id: number }) => item.id === productID)
    );
  }, [productID]);

  // Load product image: try fetching a new image, fallback to productImages if needed.
  useEffect(() => {
    const loadImage = async () => {
      try {
        const fetchedImage = await fetchProductImages(productID);
        console.log("Fetched Image:", fetchedImage);
        if (fetchedImage) {
          setImageUrl(fetchedImage.imageUrl);
          setImageAlt(fetchedImage.altText || name);
        } else if (productImages && productImages.length > 0) {
          setImageUrl(productImages[0].imageUrl);
          setImageAlt(productImages[0].altText || name);
        }
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };
    loadImage();
  }, [productID, productImages, name]);

  const handleCardClick = () => {
    navigate(`/product-details/${productID}`);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPreference(true);
  };

  // This function will be passed to the ProductPreference component.
  const handlePreferenceSubmit = (preferences: {
    color: string;
    size: string;
    quantity: number;
  }) => {
    setShowPreference(false);

    const existingCart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart") as string)
      : [];

    const existingItemIndex = existingCart.findIndex(
      (item: { id: number; color: string; size: string }) =>
        item.id === productID &&
        item.color === preferences.color &&
        item.size === preferences.size
    );

    if (existingItemIndex !== -1) {
      // If an item with the same productID, color, and size exists, update its quantity.
      existingCart[existingItemIndex].quantity += preferences.quantity;
    } else {
      // Otherwise, add a new item to the cart.
      const newItem = {
        id: productID,
        name,
        priceAfterDiscount,
        productPrice,
        productImages,
        ...preferences,
      };
      existingCart.push(newItem);
    }

    Cookies.set("cart", JSON.stringify(existingCart), { expires: 7 });

    setAlertMessage("Item added successfully to cart");
    setIsInCart(true);

    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  return (
    <div className="relative m-4">
      {alertVisible && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <SuccessAlert message={alertMessage} />
        </div>
      )}

      {showPreference && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ProductPreference
            product={{ productVarients }}
            onSubmit={handlePreferenceSubmit}
            onCancel={() => setShowPreference(false)}
          />
        </div>
      )}

      <div
        onClick={handleCardClick}
        className="relative image-container w-auto h-auto overflow-hidden rounded-t-[500px] cursor-pointer"
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          className="object-cover w-full h-full cursor-pointer"
        />
        <div className="absolute top-0 left-0 w-full h-full border-2 border-golden rounded-t-[500px]" />
        <div
          onClick={handleAddToCartClick}
          className={`absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 rounded-full ${
            isInCart ? "bg-ForthColor" : "bg-wine"
          }`}
        >
          <img src={shoppingCart} alt="Add to Cart" className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p
          onClick={handleCardClick}
          className="font-playfair font-medium text-base md:text-2xl hover:opacity-80 cursor-pointer text-wine"
        >
          {name}
        </p>
        <p className="font-playfair font-semibold text-base md:text-xl text-ForthColor">
          {priceAfterDiscount} EGP
        </p>
        <p className="font-playfair font-medium text-base md:text-xl line-through text-FifthColor">
          {productPrice} EGP
        </p>
      </div>

      <div className="flex justify-center mt-2">
        <CustomRating rate={averageRate ?? 0} mode="hide" />
      </div>
    </div>
  );
};

export default Card;
