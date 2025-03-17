import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
import { useNavigate } from 'react-router-dom';

interface ProductSectionProps {
  product: CardComponent;
  isArabic?: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({ product, isArabic = false }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); 
  const isRTL = isArabic || i18n.language === 'ar';
  
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [count, setCount] = useState(1);

  const productName = isRTL ? product.nameAr || product.name : product.nameEn || product.name;
  const productDescription = isRTL 
    ? product.productDescriptionAr || product.productDescription 
    : product.productDescriptionEn || product.productDescription;

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
      setAlertMessage(t("product.selectColorAndSize"));
      setAlertType("error");
      setTimeout(() => setAlertType(null), 3000);
      return;
    }

    const authToken = Cookies.get("authToken");
    if (!authToken) {
      setAlertMessage(t("product.loginToAddCart"));
      setAlertType("error");
      setTimeout(() => setAlertType(null), 3000);
      return;
    }

    const selectedVariant = productVariants.find(v => v.colorNameEn === selectedColor);
    
    if (!selectedVariant) {
      setAlertMessage(t("product.variantNotFound"));
      setAlertType("error");
      setTimeout(() => setAlertType(null), 3000);
      return;
    }
    
    const variantId = selectedVariant.productVarientId;
    
    console.log("Selected variant:", selectedVariant);
    console.log("Using variant ID:", variantId);
    
    const existingCart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart") as string)
      : [];
    
    const cartItem = {
      id: product.productID,
      name: productName, 
      DisPrice: product.priceAfterDiscount,
      NormalPrice: product.productPrice,
      src: product.productImages[0]?.imageUrl,
      alt: productName, 
      color: selectedColor,
      size: selectedSize,
      quantity: count,
      productVarientId: variantId,
      productID: product.productID,
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      discountPercent: product.discountPercent,
      language: isRTL ? 'ar' : 'en', 
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
    setAlertMessage(t("product.addedToCart"));
    setAlertType("success");
    setTimeout(() => setAlertType(null), 3000);
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      setAlertMessage(t("product.selectColorAndSize"));
      setAlertType("error");
      setTimeout(() => setAlertType(null), 3000);
      return;
    }

    const authToken = Cookies.get("authToken");
    if (!authToken) {
      setAlertMessage(t("product.loginToAddCart"));
      setAlertType("error");
      setTimeout(() => setAlertType(null), 3000);
      return;
    }

    handleAddToCart();
    
    navigate('/cart');
  };

  const handleShare = () => {
    try {
      const currentUrl = window.location.href;
            navigator.clipboard.writeText(currentUrl)
        .then(() => {
          setAlertMessage(t("product.urlCopiedToClipboard"));
          setAlertType("success");
          setTimeout(() => setAlertType(null), 3000);
        })
        .catch((err) => {
          console.error("Failed to copy URL: ", err);
          setAlertMessage(t("product.failedToCopyUrl"));
          setAlertType("error");
          setTimeout(() => setAlertType(null), 3000);
        });
    } catch (err) {
      console.error("Clipboard API not supported", err);
      setAlertMessage(t("product.browserDoesNotSupportSharing"));
      setAlertType("error");
      setTimeout(() => setAlertType(null), 3000);
    }
  };

  const handleCountChange = (count: number) => {
    setCount(count);
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
      setAlertMessage(t("product.loginToAddWishlist"));
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
      setAlertMessage(t("product.removedFromWishlist"));
      setAlertType("success");
    } else {
      wishlist.push(product);
      Cookies.set("wishlist", JSON.stringify(wishlist), { expires: 1 });
      setIsFavorited(true);
      setAlertMessage(t("product.addedToWishlist"));
      setAlertType("success");
    }

    setTimeout(() => setAlertType(null), 3000);
  };

  const availableSizes = productVariants.find(
    (v) => v.colorNameEn === selectedColor
  )?.sizeQuantities ?? [];

  return (
    <div className={`flex flex-col md:flex-row items-center justify-center w-full gap-10 my-8 px-6 `}>
      {alertType && alertMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          {alertType === "error" ? (
            <ErrorAlert message={alertMessage} />
          ) : (
            <SuccessAlert message={alertMessage} />
          )}
        </div>
      )}

      {/* Product Image Section - Same for both languages */}
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="image-container w-48 min-h-48 md:w-full h-[100%] relative overflow-hidden rounded-t-[500px]">
          <img
            src={product.productImages[0]?.imageUrl}
            alt={productDescription}
            className="object-cover max-w-[300px] min-h-[450px] h-full w-full cursor-pointer border border-1 border-golden rounded-t-[500px]"
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className={`flex flex-col justify-center space-y-3 md:space-y-6 `}>
        <div className={`flex flex-row w-full justify-between items-center `}>
          <p className="font-playfair text-wine text-2xl md:text-4xl font-extrabold">
            {productName}
          </p>

          <img
            src={isFavorited ? filledHeart : heart}
            alt={t("product.toggleWishlist")}
            className="w-8 h-8 cursor-pointer"
            onClick={toggleWishlist}
          />
        </div>

        <div className="flex items-center">
          {product.averageRate && product.averageRate > 0 ? (
            <CustomRating rate={product.averageRate} mode="show" />
          ) : (
            <p className="text-ForthColor font-Poppins text-sm italic">
              {t("product.noRatingsYet")}
            </p>
          )}
        </div>

        <div className={`flex flex-row gap-8 items-center `}>
          <p className="font-playfair text-lg font-semibold text-wine">
            {product.priceAfterDiscount} {t("product.currency")}
          </p>
          <p className="font-playfair text-lg font-medium line-through text-FifthColor">
            {product.productPrice} {t("product.currency")}
          </p>
          <p className="font-Poppins font-normal text-sm text-customRed bg-customRed/10 p-2 rounded-3xl">
            -{product.discountPercent}%
          </p>
        </div>

        <hr className="border-t-2 border-ForthColor my-4 w-full" />

        <p className="font-Poppins text-base text-ForthColor font-light">
          {productDescription}
        </p>

        {/* Color Selection */}
        <div className="flex flex-col gap-4">
          <p className="font-playfair font-semibold text-xl text-wine">
            {t("product.selectColor")}
          </p>
          {productVariants.length === 0 ? (
            <p>{t("product.noColorsAvailable")}</p>
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
                  title={isRTL ? variant.colorNameAr || variant.colorNameEn : variant.colorNameEn}
                  onClick={() => setSelectedColor(variant.colorNameEn)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Size Selection */}
        <div className="flex flex-col gap-4">
          <p className="font-playfair font-semibold text-xl text-wine">
            {t("product.chooseSize")}
          </p>
          {selectedColor && availableSizes.length === 0 ? (
            <p>{t("product.noAvailableSizes")}</p>
          ) : selectedColor ? (
            <div className="flex flex-row gap-3 items-center">
              {availableSizes.map((size: SizeQuantity, index: number) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md border-2 ${
                    selectedSize === size.sizeLabel
                      ? "bg-wine text-white"
                      : "border-wine text-wine"
                  }`}
                  onClick={() => setSelectedSize(size.sizeLabel || "")}
                >
                  {size.sizeLabel}
                </button>
              ))}
            </div>
          ) : (
            <p>{t("product.noSizesAvailable")}</p>
          )}
        </div>

        <div className={`flex gap-2 flex-row justify-between items-center w-full `}>
          <div className={`flex flex-col sm:flex-row gap-2 items-center `}>
            <ProductCount initialCount={1} onCountChange={handleCountChange} />
            <button
              onClick={handleAddToCart}
              className="w-32 h-10 bg-wine text-mainColor rounded-md hover:bg-sixColor"
            >
              {t("product.addToCart")}
            </button>
          </div>

          <div className={`flex flex-col sm:flex-row gap-2 items-center `}>
            <button
              onClick={handleBuyNow}
              className="w-32 h-10 bg-mainColor text-wine border-[2px] border-wine rounded-md hover:border-sixColor"
            >
              {t("product.buyNow")}
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-wine text-mainColor hover:bg-sixColor flex items-center justify-center"
              aria-label={t("product.shareProduct")}
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