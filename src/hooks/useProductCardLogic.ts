// Components/atoms/Card/useProductCardLogic.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { ProductVariant, ProductImage } from "@types";
import fallbackImage from "@assets/HP_img2.jpeg";

interface CartItem {
  id: number;
  color: string;
  size: string;
  quantity: number;
  productVarients: ProductVariant[];
  [key: string]: unknown;
}

export interface UseProductCardLogicProps {
  productID: number;
  name: string;
  nameEn: string;
  nameAr: string;
  productPrice: number;
  priceAfterDiscount: number;
  discountPercent: number;
  productVarients: ProductVariant[];
  productImages: ProductImage[];
  status?: string;
}

export function useProductCardLogic(props: UseProductCardLogicProps) {
  const {
    productID,
    name,
    nameEn,
    nameAr,
    productPrice,
    priceAfterDiscount,
    discountPercent,
    productVarients,
    productImages,
  } = props;

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const displayName =
    i18n.language === "ar" ? nameAr : nameEn || name || "Product";

  const firstImage = productImages?.[0];
  const imageUrl = firstImage?.imageUrl ?? fallbackImage;
  const imageAlt = firstImage?.altText ?? displayName;

  const [alertVisible, setAlertVisible] = useState(false);
  const [showPreference, setShowPreference] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const existing: CartItem[] = Cookies.get("cart")
      ? (JSON.parse(Cookies.get("cart") as string) as CartItem[])
      : [];
    setIsInCart(existing.some((it) => it.id === productID));
  }, [productID]);

  const handleCardClick = () => navigate(`/product-details/${productID}`);

  const handleAddToCartIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowPreference(true);
  };

  const closePreference = () => setShowPreference(false);

  const handlePreferenceSubmit = (prefs: {
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

    const existing: CartItem[] = Cookies.get("cart")
      ? (JSON.parse(Cookies.get("cart") as string) as CartItem[])
      : [];

    const cartItem: CartItem = {
      id: productID,
      color: prefs.color,
      size: prefs.size,
      quantity: prefs.quantity,
      name: displayName,
      DisPrice: priceAfterDiscount,
      NormalPrice: productPrice,
      src: prefs.imageUrl || imageUrl,
      alt: displayName,
      productID,
      nameEn,
      nameAr,
      discountPercent,
      language: i18n.language,
      productVarients,
      productVarientId:
        productVarients.find((v) => v.colorNameEn === prefs.color)
          ?.productVarientId ?? 0,
    };

    const idx = existing.findIndex(
      (it) =>
        it.id === cartItem.id &&
        it.color === cartItem.color &&
        it.size === cartItem.size
    );

    if (idx !== -1) existing[idx].quantity += cartItem.quantity;
    else existing.push(cartItem);

    Cookies.set("cart", JSON.stringify(existing), { expires: 7 });
    setIsInCart(true);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  return {
    t,
    displayName,
    imageUrl,
    imageAlt,
    alertVisible,
    showPreference,
    isInCart,
    handleCardClick,
    handleAddToCartIconClick,
    closePreference,
    handlePreferenceSubmit,
    priceAfterDiscount,
    productPrice,
    productVarients,
  };
}
