import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CardComponent } from "@types";
import { CustomRating, SuccessAlert } from "@components/atoms";
import shoppingCart from "@assets/shoppingCart.svg";
import { ProductPreference } from "@components/molecules";

const Card: React.FC<CardComponent> = ({
  id,
  src,
  alt,
  name,
  DisPrice,
  NormalPrice,
  rate,
  color,
  size,
}) => {
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isInCart, setIsInCart] = useState(false);
  const [showPreference, setShowPreference] = useState(false); // Manage ProductPreference visibility

  useEffect(() => {
    const existingCart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart") as string)
      : [];
    setIsInCart(existingCart.some((item: { id: number }) => item.id === id));
  }, [id]);

  const handleCardClick = () => {
    navigate(`/product-details/${id}`);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Show the ProductPreference component for selecting size and color
    setShowPreference(true);
  };

  const handlePreferenceSubmit = (preferences: { color: string; size: string }) => {
    setShowPreference(false);

    // Add the item to the cart with preferences
    const existingCart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart") as string)
      : [];

    if (isInCart) {
      // Remove item from the cart
      const updatedCart = existingCart.filter((item: { id: number }) => item.id !== id);
      Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });

      setAlertMessage("Item was removed successfully from cart");
      setAlertVisible(true);
      setIsInCart(false);
    } else {
      const newItem = {
        id,
        name,
        DisPrice,
        NormalPrice,
        src,
        quantity: 1,
        ...preferences,
      };

      const updatedCart = [...existingCart, newItem];
      Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });

      setAlertMessage("Item added successfully to cart");
      setAlertVisible(true);
      setIsInCart(true);
    }

    setTimeout(() => setAlertVisible(false), 3000);
  };

  return (
    <div className="text-center m-4">
      {alertVisible && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <SuccessAlert message={alertMessage} />
        </div>
      )}

      {showPreference && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ProductPreference
              product={{ color, size }}
              onSubmit={handlePreferenceSubmit}
              onCancel={() => setShowPreference(false)}
            />
          </div>
        </div>
      )}

      <div
        onClick={handleCardClick}
        className="image-container relative w-auto h-auto overflow-hidden rounded-t-[500px] cursor-pointer"
      >
        <img
          src={src}
          alt={alt}
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

      <div className="mt-4">
        <p
          onClick={handleCardClick}
          className="font-playfair font-medium text-base md:text-2xl hover:opacity-80 cursor-pointer text-wine"
        >
          {name}
        </p>
        <p className="font-playfair font-semibold text-base md:text-xl text-ForthColor">
          {DisPrice} EGP
        </p>
        <p className="font-playfair font-medium text-base md:text-xl line-through text-FifthColor">
          {NormalPrice} EGP
        </p>
      </div>

      <div className="flex justify-center mt-2">
        <CustomRating rate={rate} mode="hide" />
      </div>
    </div>
  );
};

export default Card;
