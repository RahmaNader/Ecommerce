import React from "react";
import { ProductCount } from "@components/atoms";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/useLanguage";
import { Link } from "react-router-dom";
import { ProductVariant, SizeQuantity } from "@types";

interface CartProductProps {
  product: {
    id: number;
    name: string;
    DisPrice: number;
    color: string;
    size: string;
    quantity: number;
    src?: string;
    alt: string;
    NormalPrice: number;
    nameEn?: string;
    nameAr?: string;
    language?: string;
    productID?: number;
    productVarients: ProductVariant[];
  };
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
  isArabic?: boolean;
}
export type StockLine = SizeQuantity & {
  qty?: number;
  remainingQuantity?: number;
};

const CartProduct: React.FC<CartProductProps> = ({
  product,
  onRemove,
  onQuantityChange,
}) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === "ar";
  console.log("productttsdkfslkdfnlskdf", product);
  const displayName =
    isRTL && product.nameAr
      ? product.nameAr
      : !isRTL && product.nameEn
      ? product.nameEn
      : product.name;

  const normalise = (s: string | null | undefined) =>
    (s ?? "").trim().toLowerCase();

  const getQty = (sq: StockLine): number =>
    sq.quantity ?? sq.qty ?? sq.remainingQuantity ?? 0;

  const getMaxStock = (p: CartProductProps["product"]): number => {
    const variant = p.productVarients.find(
      (v: ProductVariant) => normalise(v.colorNameEn) === normalise(p.color)
    );
    const line = variant?.sizeQuantities?.find(
      (s: SizeQuantity) => s.sizeLabel === p.size
    );
    return line ? getQty(line as StockLine) : 1;
  };
  const maxStock = getMaxStock(product);
  const handleCountChange = (count: number) => {
    const safe = Math.min(count, maxStock);
    onQuantityChange(safe);
  };

  const productId = product.productID || product.id;
  const hasDiscount = product.NormalPrice > product.DisPrice;
  return (
    <div className="border-b border-b-ForthColor/50 py-4 sm:py-6 w-full">
      <div
        className={`flex ${
          isRTL ? "flex-row-reverse" : "flex-row"
        } gap-3 sm:gap-4`}
      >
        {/* Product Image - Compact but visible on all screens */}
        <div className="w-20 xs:w-24 sm:w-32 md:w-40 flex-shrink-0">
          <Link to={`/product-details/${productId}`}>
            <img
              src={product.src}
              alt={product.alt || displayName}
              className="w-full h-20 xs:h-24 sm:h-32 md:h-40 object-cover rounded-md"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div
          className={`flex flex-col gap-1 xs:gap-2 sm:gap-3 w-full ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <div
            className={`flex flex-row w-full justify-between items-start ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <h3 className="font-semibold font-playfair text-wine text-sm xs:text-base sm:text-lg line-clamp-2">
              <Link
                to={`/product-details/${productId}`}
                className="hover:text-sixColor transition-colors cursor-pointer"
              >
                {displayName}
              </Link>
            </h3>

            <div className="flex flex-col items-end ml-2">
              <p className="font-medium text-wine text-xs xs:text-sm sm:text-base whitespace-nowrap">
                {(product.DisPrice * product.quantity).toFixed(2)}{" "}
                {t("product.currency")}
              </p>
              {hasDiscount && (
                <p className="text-gray-500 text-xs sm:text-sm line-through whitespace-nowrap">
                  {(product.NormalPrice * product.quantity).toFixed(2)}{" "}
                  {t("product.currency")}
                </p>
              )}
            </div>
          </div>

          {/* Product Attributes - Stack horizontally on all screens */}
          <div className="flex flex-row gap-3 text-xs xs:text-sm sm:text-base flex-wrap">
            <p className={`text-ForthColor ${isRTL ? "text-right" : ""}`}>
              {t("cartProduct.color")}:{" "}
              <span className="text-wine font-medium ml-1">
                {product.color}
              </span>
            </p>
            <p className={`text-ForthColor ${isRTL ? "text-right" : ""}`}>
              {t("cartProduct.size")}:{" "}
              <span className="text-wine font-medium ml-1">{product.size}</span>
            </p>
          </div>

          {/* Quantity Controls and Remove Button - Optimized for small screens */}
          <div
            className={`flex items-center justify-between mt-1 sm:mt-3 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <div className="scale-90 origin-left">
              <ProductCount
                initialCount={product.quantity}
                max={maxStock}
                onCountChange={handleCountChange}
              />
            </div>
            <button
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 underline text-xs xs:text-sm sm:text-base transition-colors"
            >
              {t("cartProduct.remove")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
