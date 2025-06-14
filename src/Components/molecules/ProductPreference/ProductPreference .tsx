import React, { useState, useEffect } from "react";
import { ErrorAlert, ProductCount } from "@components/atoms";
import { ProductVariant, SizeQuantity } from "@types";
import { useTranslation } from "react-i18next";

interface ColorOption {
  name: string;
  code: string;
}

interface ProductPreferenceProps {
  product: {
    productVarients?:
      | { $id: string; $values: ProductVariant[] }
      | ProductVariant[];
    productPrice?: number;
    priceAfterDiscount?: number;
    productImages?:
      | Array<{ imageUrl: string }>
      | { $values: Array<{ imageUrl: string }> };
    name?: string;
    productID?: number;
  };
  onSubmit: (preferences: {
    color: string;
    size: string;
    quantity: number;
    price: number;
    priceAfterDiscount: number;
    imageUrl: string;
    name: string;
    productId: number;
  }) => void;
  onCancel: () => void;
}

const ProductPreference: React.FC<ProductPreferenceProps> = ({
  product,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  let variants: ProductVariant[] = [];
  if (Array.isArray(product.productVarients)) {
    variants = product.productVarients;
  } else if (product.productVarients && product.productVarients.$values) {
    variants = product.productVarients.$values;
  }

  const colors: ColorOption[] = Array.from(
    new Map(
      variants.map((variant) => [
        variant.colorNameEn,
        { name: variant.colorNameEn || "Unknown", code: variant.colorCode },
      ])
    ).values()
  );
  const normalise = (s?: string | null) => (s ?? "").trim().toLowerCase();

  const availableSizes =
    variants.find((v) => normalise(v.colorNameEn) === normalise(selectedColor))
      ?.sizeQuantities ?? [];
  const getQty = (sq: SizeQuantity) =>
    Number(
      (sq as any).quantity ??
        (sq as any).qty ??
        (sq as any).remainingQuantity ??
        0
    );
  const getMaxStock = (color: string | null, size: string | null): number => {
    if (!color || !size) return 1; // until both are chosen
    const line = variants
      .find((v) => normalise(v.colorNameEn) === normalise(color))
      ?.sizeQuantities?.find((s) => s.sizeLabel === size);
    return line ? getQty(line) : 1;
  };
  useEffect(() => {
    setQuantity(1);
  }, [selectedColor, selectedSize]);
  const maxStock = getMaxStock(selectedColor, selectedSize);

  const handleSubmit = () => {
    const max = getMaxStock(selectedColor, selectedSize);
    if (quantity > max) {
      setError(t("productPreference.exceedStock")); // add this key to i18n
      return;
    }

    if (selectedColor && selectedSize && quantity > 0) {
      onSubmit({
        color: selectedColor,
        size: selectedSize,
        quantity,
        price: product.productPrice || 0,
        priceAfterDiscount: product.priceAfterDiscount || 0,
        imageUrl: product.productImages
          ? Array.isArray(product.productImages)
            ? product.productImages[0]?.imageUrl
            : product.productImages.$values[0]?.imageUrl
          : "",
        name: product.name || "",
        productId: product.productID || 0,
      });
      setError(null);
    } else {
      setError(t("productPreference.selectionRequired"));
    }
  };

  return (
    <div className="fixed flex flex-col inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
      {error && <ErrorAlert message={error} />}
      <div className="bg-mainColor p-6 rounded-lg shadow-lg relative md:w-96">
        <button
          title={t("productPreference.cancel")}
          onClick={onCancel}
          className="rounded-full border-2 p-1 my-2 border-wine absolute rtl:left-4 ltr:right-4 top-2 text-wine hover:text-ForthColor hover:border-ForthColor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Color Selection */}
        <p className="font-playfair font-semibold text-lg text-wine mb-4">
          {t("productPreference.chooseColor")}
        </p>
        <div className="flex gap-3 mb-4">
          {colors.map((colorOption: ColorOption, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                  selectedColor === colorOption.name
                    ? "border-wine"
                    : "border-golden"
                }`}
                style={{ backgroundColor: colorOption.code }}
                onClick={() => {
                  setSelectedColor(colorOption.name);
                  setSelectedSize(null);
                }}
                title={colorOption.name}
              />
            </div>
          ))}
        </div>

        <p className="font-playfair font-semibold text-lg text-wine mb-4">
          {t("productPreference.chooseSize")}
        </p>
        <div className="flex gap-3 mb-4">
          {availableSizes.length > 0 ? (
            availableSizes.map((sizeOption: SizeQuantity, index: number) => {
              const isOutOfStock = getQty(sizeOption) <= 0;
              console.log("sizeOption 👉", sizeOption);

              return (
                <button
                  key={index}
                  type="button"
                  disabled={isOutOfStock}
                  aria-disabled={isOutOfStock}
                  onClick={() =>
                    !isOutOfStock &&
                    setSelectedSize(sizeOption.sizeLabel || null)
                  }
                  className={`px-3 py-1 rounded-md border transition 
            ${
              isOutOfStock
                ? "border-gray-300 text-gray-400 cursor-not-allowed opacity-50" // SOLD-OUT style
                : selectedSize === sizeOption.sizeLabel
                ? "bg-wine text-white border-wine" // SELECTED style
                : "border-ForthColor text-ForthColor hover:bg-ForthColor hover:text-white"
            }`}
                >
                  {sizeOption.sizeLabel || t("productPreference.unknown")}
                </button>
              );
            })
          ) : (
            <p className="text-wine">
              {t("productPreference.noSizesAvailable")}
            </p>
          )}
        </div>

        {/* Quantity Selection */}
        <div className="flex items-center gap-3 mb-6">
          <p className="font-playfair font-semibold text-lg text-wine">
            {t("productPreference.quantity")}
          </p>
          <ProductCount
            initialCount={quantity}
            max={maxStock}
            onCountChange={(newCount) => setQuantity(newCount)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-ForthColor text-white rounded-md"
          >
            {t("productPreference.cancel")}
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-wine text-white rounded-md"
          >
            {t("productPreference.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPreference;
