import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CardComponent } from "@types";
import fallbackImage from "@assets/HP_img2.jpeg";
import { CustomRating, SuccessAlert } from "@components/atoms";
import shoppingCart from "@assets/shoppingCart.svg";
import { ProductPreference } from "@components/molecules";
import { useTranslation } from "react-i18next";

const Card: React.FC<CardComponent> = ({
  productID,
  productImages,
  name,
  nameEn,
  nameAr,
  priceAfterDiscount,
  productPrice,
  averageRate,
  productVarients,
  discountPercent,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); 
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isInCart, setIsInCart] = useState(false);
  const [showPreference, setShowPreference] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(fallbackImage);
  const [imageAlt, setImageAlt] = useState<string>(t("card.productImage"));
  
  const displayName = i18n.language === "ar" ? nameAr : (nameEn || name);

  useEffect(() => {
    const existingCart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart") as string)
      : [];
    setIsInCart(
      existingCart.some((item: { id: number }) => item.id === productID)
    );
  }, [productID]);

  useEffect(() => {
    if (productImages) {
      if (Array.isArray(productImages) && productImages.length > 0) {
        const firstImage = productImages[0];
        if (firstImage && firstImage.imageUrl) {
          setImageUrl(firstImage.imageUrl);
          setImageAlt(firstImage.altText || displayName);
          return;
        }
      }
      console.warn("No valid images found for product:", productID);
    }
  }, [productImages, displayName, productID]);

  const handleCardClick = () => {
    navigate(`/product-details/${productID}`);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPreference(true);
  };

  const handlePreferenceSubmit = (preferences: {
    color: string;
    size: string;
    quantity: number;
    price: number;
    priceAfterDiscount: number;
    imageUrl: string;
    name: string;
    productId: number;
  }) => {
    setShowPreference(false);
  
    const existingCart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart") as string)
      : [];
  
    const cartItem = {
      id: productID,
      name: displayName, 
      DisPrice: priceAfterDiscount,
      NormalPrice: productPrice,
      src: preferences.imageUrl || (productImages?.[0]?.imageUrl || ""),
      alt: displayName,
      color: preferences.color,
      size: preferences.size,
      quantity: preferences.quantity,
      productID: productID,
      nameEn: nameEn,
      nameAr: nameAr,
      discountPercent: discountPercent,
      language: i18n.language, 
      productVarientId: productVarients?.find(v => v.colorNameEn === preferences.color)?.productVarientId,
    };
  
    const existingItemIndex = existingCart.findIndex(
      (item: { id: number; color: string; size: string }) =>
        item.id === cartItem.id &&
        item.color === cartItem.color &&
        item.size === cartItem.size
    );
  
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      existingCart.push(cartItem);
    }
  
    Cookies.set("cart", JSON.stringify(existingCart), { expires: 7 });
    setAlertMessage(t("card.addedToCart"));
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
        className="relative image-container w-auto h-auto min-h-[200px] overflow-hidden rounded-t-[500px] cursor-pointer"
      >
        <img
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
          <img src={shoppingCart} alt={t("card.addToCart")} className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p
          onClick={handleCardClick}
          className="font-playfair font-medium text-base md:text-2xl hover:opacity-80 cursor-pointer text-wine"
        >
          {displayName} {/* Use the displayName variable instead of just name */}
        </p>
        <p className="font-playfair font-semibold text-base md:text-xl text-ForthColor">
          {t("card.priceInCurrency", { price: priceAfterDiscount })}
        </p>
        <p className="font-playfair font-medium text-base md:text-xl line-through text-FifthColor">
          {t("card.priceInCurrency", { price: productPrice })}
        </p>
      </div>

      <div className="flex justify-center mt-2">
        <CustomRating rate={averageRate ?? 0} mode="hide" />
      </div>
    </div>
  );
};

export default Card;
