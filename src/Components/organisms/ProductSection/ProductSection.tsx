import React, { useState, useEffect, useRef } from "react";
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
import {
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import { fetchProductVariant } from "src/services/api/fetchVariants";
import { useNavigate } from "react-router-dom";

interface ProductSectionProps {
  product: CardComponent;
  isArabic?: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  product,
  isArabic = false,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = isArabic || i18n.language === "ar";

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [count, setCount] = useState(1);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const magnifierSize = { width: 300, height: 300 }; // Size of the floating magnifier
  const zoomLevel = 2.5; // Magnification level
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const productName = isRTL
    ? product.nameAr || product.name
    : product.nameEn || product.name;
  const productDescription = isRTL
    ? product.productDescriptionAr || product.productDescription
    : product.productDescriptionEn || product.productDescription;

  // If "product.copyLink" is not yet defined in translations
  // You can add this to your component
  const copyLinkText = t("product.copyLink", "Copy Link");

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
  useEffect(() => {
    if (product.productImages.length <= 1) return;
    if (showGallery || isHovering) return;

    const timer = setInterval(() => {
      setSelectedImageIndex((prev) =>
        prev === product.productImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [product.productImages.length, showGallery, isHovering]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target as Node)
      ) {
        setShowShareOptions(false);
      }
    };

    if (showShareOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareOptions]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setAlertMessage(t("product.selectColorAndSize"));
      setAlertType("error");
      setTimeout(() => setAlertType(null), 3000);
      return;
    }

    // Authentication check removed - allow anyone to add to cart

    const selectedVariant = productVariants.find(
      (v) => v.colorNameEn === selectedColor
    );

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
      language: isRTL ? "ar" : "en",
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

    // Authentication check removed - allow anyone to buy now

    handleAddToCart();

    navigate("/cart");
  };

  const handleShare = () => {
    // Get the current URL
    const url = window.location.href;
    const title = productName;
    const text = productDescription?.substring(0, 100) || productName;

    // Try to use the Web Share API first (works well on mobile)
    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.log("Error sharing:", error);
          // If sharing fails, show the dropdown instead
          setShowShareOptions((prev) => !prev);
        });
    } else {
      // If Web Share API is not supported, toggle dropdown
      setShowShareOptions((prev) => !prev);
    }
  };

  const handleCountChange = (newCount: number) => {
    const max = getMaxStock(selectedColor, selectedSize);
    setCount(Math.min(newCount, max || 1));
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

  const handleImageClick = () => {
    setShowGallery(true);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (window.innerWidth >= 1024) {
      // Only show floating magnifier on larger screens
      setShowMagnifier(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowMagnifier(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageContainerRef.current) {
      const { left, top, width, height } =
        imageContainerRef.current.getBoundingClientRect();

      // Calculate relative position within the image (0-100%)
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setMousePosition({ x, y });

      // Calculate position for the floating magnifier
      // Position it near the cursor but ensure it stays within viewport
      const cursorX = e.clientX;
      const cursorY = e.clientY;

      // Position magnifier to the right of cursor, unless near right edge
      let magnifierX = cursorX + 20;
      if (magnifierX + magnifierSize.width > window.innerWidth) {
        magnifierX = cursorX - magnifierSize.width - 20;
      }

      // Position magnifier centered vertically with cursor
      let magnifierY = cursorY - magnifierSize.height / 2;
      // Ensure it doesn't go offscreen
      if (magnifierY < 0) magnifierY = 0;
      if (magnifierY + magnifierSize.height > window.innerHeight) {
        magnifierY = window.innerHeight - magnifierSize.height;
      }

      setMagnifierPosition({ x: magnifierX, y: magnifierY });
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === product.productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? product.productImages.length - 1 : prev - 1
    );
  };

  const normalize = (s?: string | null) => (s ?? "").trim().toLowerCase();

  /** Grab whatever stock key the API sends back */
  const getQty = (sq: SizeQuantity) =>
    Number(
      (sq as any).quantity ?? // most common
        (sq as any).qty ?? // e.g. .NET “qty”
        (sq as any).remainingQuantity ?? // sometimes used
        0
    );
  const availableSizes =
    productVariants.find(
      (v) => normalize(v.colorNameEn) === normalize(selectedColor)
    )?.sizeQuantities ?? [];
  const getMaxStock = (color: string | null, size: string | null): number => {
    if (!color || !size) return 0;
    const variant = productVariants.find(
      (v) => normalize(v.colorNameEn) === normalize(color)
    );
    const sz = variant?.sizeQuantities?.find((s) => s.sizeLabel === size);
    return sz ? getQty(sz) : 0;
  };
  useEffect(() => {
    setCount(1);
  }, [selectedColor, selectedSize]);
  const stockLeft = getMaxStock(selectedColor, selectedSize);
  useEffect(() => setCount(1), [selectedColor, selectedSize]);
  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-center w-full gap-10 my-8 px-6 `}
    >
      {alertType && alertMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          {alertType === "error" ? (
            <ErrorAlert message={alertMessage} />
          ) : (
            <SuccessAlert message={alertMessage} />
          )}
        </div>
      )}

      <div className="flex flex-col justify-center items-center gap-4">
        <div
          ref={imageContainerRef}
          className="w-48  h-72 sm:w-60 sm:h-72 md:w-[360px] md:h-[420px] lg:w-[400px] lg:h-[500px] relative overflow-hidden rounded-t-[500px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={handleImageClick}
        >
          <div
            dir="ltr"
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${selectedImageIndex * 100}%)` }}
          >
            {product.productImages.map((img, idx) => (
              <div
                key={img.imageId ?? idx}
                className="w-full h-full flex-shrink-0" /* each slide = full viewport */
              >
                <img
                  src={img.imageUrl}
                  alt={productDescription}
                  className="object-cover w-full h-full border border-golden rounded-t-[500px]"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {isHovering && window.innerWidth < 1024 && (
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                backgroundImage: `url(${
                  product.productImages[selectedImageIndex]?.imageUrl ||
                  product.productImages[0]?.imageUrl
                })`,
                backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "200%",
                zIndex: 5,
              }}
            />
          )}

          {/* Show a small indicator of the area being magnified on larger screens */}
          {showMagnifier && (
            <div
              className="absolute pointer-events-none border-2 border-white"
              style={{
                left: `calc(${mousePosition.x}% - 40px)`,
                top: `calc(${mousePosition.y}% - 40px)`,
                width: "80px",
                height: "80px",
                opacity: 0.6,
                zIndex: 6,
              }}
            ></div>
          )}
        </div>
        {/* Floating magnifier for desktop/laptop */}
        {showMagnifier && (
          <div
            className="fixed pointer-events-none rounded-lg shadow-xl overflow-hidden border-4 border-white z-50"
            style={{
              left: magnifierPosition.x,
              top: magnifierPosition.y,
              width: magnifierSize.width,
              height: magnifierSize.height,
              backgroundImage: `url(${
                product.productImages[selectedImageIndex]?.imageUrl ||
                product.productImages[0]?.imageUrl
              })`,
              backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${zoomLevel * 100}%`,
            }}
          />
        )}

        {/* Thumbnails Row */}
        {product.productImages.length > 1 && (
          <div className="flex flex-row items-center gap-4 w-full max-w-[300px] mt-2">
            {product.productImages.map((image, index) => (
              <div
                key={image.imageId || index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative flex-none cursor-pointer transition-all duration-200`}
                style={{
                  width: "49px",
                  height: "50px",
                }}
              >
                <img
                  src={image.imageUrl}
                  alt={image.altText || `Product view ${index + 1}`}
                  className="object-cover w-full h-full rounded-[5px]"
                  style={{
                    border:
                      selectedImageIndex === index
                        ? "2px solid #721013"
                        : "1px solid #721013",
                    borderRadius: "5px",
                  }}
                />
                {selectedImageIndex === index && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.25)",
                      borderRadius: "5px",
                      border: "1px solid #721013",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div
        className={`flex flex-col justify-center max-w-[448px] space-y-3 md:space-y-6 `}
      >
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
                  title={
                    isRTL
                      ? variant.colorNameAr || variant.colorNameEn
                      : variant.colorNameEn
                  }
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
            <div className="flex flex-row gap-3 items-start">
              {availableSizes.map((size, idx) => {
                const isOutOfStock = getQty(size) <= 0;

                return (
                  <div className="flex flex-col justify-between">
                    <button
                      key={idx}
                      type="button"
                      disabled={isOutOfStock}
                      aria-disabled={isOutOfStock}
                      onClick={() =>
                        !isOutOfStock && setSelectedSize(size.sizeLabel ?? null)
                      }
                      className={`px-4 py-2 rounded-md border-2 transition
              ${
                isOutOfStock
                  ? "border-gray-300 text-gray-400 opacity-50 cursor-not-allowed pointer-events-none"
                  : selectedSize === size.sizeLabel
                  ? "bg-wine text-white border-wine"
                  : "border-wine text-wine hover:bg-wine hover:text-white"
              }`}
                    >
                      {size.sizeLabel}
                    </button>
                    <p className="text-xs text-red-400">
                      {isOutOfStock && t("product.OutOfStock")}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <div
          className={`flex gap-2 flex-row justify-between items-center w-full `}
        >
          <div className={`flex flex-col sm:flex-row gap-2 items-center `}>
            <ProductCount
              initialCount={1}
              max={stockLeft}
              onCountChange={handleCountChange}
            />{" "}
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
            <div className="relative">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-wine text-mainColor hover:bg-sixColor flex items-center justify-center"
                aria-label={t("product.shareProduct")}
              >
                <FaShareAlt size={16} />
              </button>

              {showShareOptions && (
                <div
                  ref={shareMenuRef}
                  className="absolute right-0 bottom-12 bg-white shadow-lg rounded-md p-3 z-30 w-52"
                >
                  <div className="flex flex-col gap-2">
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `${productName} - ${window.location.href}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
                        alt="WhatsApp"
                        className="w-5 h-5"
                      />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                        alt="Facebook"
                        className="w-5 h-5"
                      />
                      <span>Facebook</span>
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `Check out this product: ${productName}`
                      )}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
                        alt="Twitter"
                        className="w-5 h-5"
                      />
                      <span>Twitter</span>
                    </a>

                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(
                        window.location.href
                      )}&text=${encodeURIComponent(
                        `Check out this product: ${productName}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
                        alt="Telegram"
                        className="w-5 h-5"
                      />
                      <span>Telegram</span>
                    </a>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setAlertMessage(t("product.urlCopiedToClipboard"));
                        setAlertType("success");
                        setTimeout(() => setAlertType(null), 3000);
                        setShowShareOptions(false);
                      }}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{copyLinkText}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Image Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            <button
              className="absolute top-4 right-4 text-white z-10"
              onClick={() => setShowGallery(false)}
            >
              <FaTimes size={24} />
            </button>

            <div className="w-full h-full max-w-4xl max-h-[80vh] relative flex items-center justify-center">
              <img
                src={product.productImages[selectedImageIndex]?.imageUrl}
                alt={productDescription}
                className="max-h-full max-w-full object-contain cursor-pointer"
                onClick={nextImage}
              />

              <button
                className="absolute left-4 bg-white bg-opacity-50 p-2 rounded-full"
                onClick={prevImage}
              >
                <FaChevronLeft size={20} />
              </button>

              <button
                className="absolute right-4 bg-white bg-opacity-50 p-2 rounded-full"
                onClick={nextImage}
              >
                <FaChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnails for gallery */}
            {product.productImages.length > 1 && (
              <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2 max-w-full px-4">
                {product.productImages.map((image, index) => (
                  <div
                    key={image.imageId || index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`cursor-pointer border-2 ${
                      selectedImageIndex === index
                        ? "border-white"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image.imageUrl}
                      alt={`Thumbnail ${index}`}
                      className="h-16 w-16 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSection;
