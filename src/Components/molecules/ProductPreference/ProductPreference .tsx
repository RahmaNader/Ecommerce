import React, { useState, useEffect } from "react";
import { ErrorAlert, ProductCount } from "@components/atoms";
import { ProductVariant, SizeQuantity } from "@types";

interface ProductPreferenceProps {
  product: {
    productVarients?: { $id: string; $values: ProductVariant[] } | ProductVariant[];
    productPrice?: number;
    priceAfterDiscount?: number;
    productImages?: Array<{ imageUrl: string }> | { $values: Array<{ imageUrl: string }> };
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

  // Extract variants correctly
  let variants: ProductVariant[] = [];
  if (Array.isArray(product.productVarients)) {
    variants = product.productVarients;
  } else if (product.productVarients && product.productVarients.$values) {
    variants = product.productVarients.$values;
  }

  // Extract unique colors from variants
  const colors = Array.from(
    new Map(
      variants.map((variant) => [variant.colorNameEn, { name: variant.colorNameEn || "Unknown", code: variant.colorCode }])
    ).values()
  );

  // Extract available sizes for the selected color
  const availableSizes = variants.find(
    (v) => v.colorNameEn === selectedColor
  )?.sizeQuantities ?? [];

  const handleSubmit = () => {
    if (selectedColor && selectedSize && quantity > 0) {
      onSubmit({
        color: selectedColor,
        size: selectedSize,
        quantity,
        price: product.productPrice || 0,
        priceAfterDiscount: product.priceAfterDiscount || 0,
        imageUrl: product.productImages ? (Array.isArray(product.productImages) ? product.productImages[0].imageUrl : product.productImages.$values[0].imageUrl) : "",
        name: product.name || "",
        productId: product.productID || 0,
      });
      setError(null);
    } else {
      setError("Please select a color, size, and quantity!");
    }
  };

  return (
    <div className="fixed flex flex-col inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
      {error && <ErrorAlert message={error} />}
      <div className="bg-mainColor p-6 rounded-lg shadow-lg relative md:w-96">
        <button
          title="Cancel"
          onClick={onCancel}
          className="rounded-full border-2 p-1 my-2 border-wine absolute right-4 top-2 text-wine hover:text-ForthColor hover:border-ForthColor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Color Selection */}
        <p className="font-playfair font-semibold text-lg text-wine mb-4">Choose Color</p>
        <div className="flex gap-3 mb-4">
          {colors.map((colorOption, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                  selectedColor === colorOption.name ? "border-wine" : "border-golden"
                }`}
                style={{ backgroundColor: colorOption.code }}
                onClick={() => {
                  setSelectedColor(colorOption.name);
                  setSelectedSize(null); // Reset size when color changes.
                }}
              />
              <span style={{ color: "#000", fontSize: "12px", marginTop: "4px" }}>
                {colorOption.name}
              </span>
            </div>
          ))}
        </div>

        {/* Size Selection */}
        <p className="font-playfair font-semibold text-lg text-wine mb-4">Choose Size</p>
        <div className="flex gap-3 mb-4">
          {availableSizes.length > 0 ? (
            availableSizes.map((sizeOption: SizeQuantity, index: number) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-md border ${
                  selectedSize === sizeOption.sizeLabel ? "bg-wine text-white" : "border-ForthColor text-ForthColor"
                }`}
                onClick={() => setSelectedSize(sizeOption.sizeLabel || null)}
                disabled={sizeOption.quantity <= 0}
              >
                {sizeOption.sizeLabel || 'Unknown'}
              </button>
            ))
          ) : (
            <p className="text-wine">No sizes available for this color</p>
          )}
        </div>

        {/* Quantity Selection */}
        <div className="flex items-center gap-3 mb-6">
          <p className="font-playfair font-semibold text-lg text-wine">Quantity:</p>
          <ProductCount
            initialCount={quantity}
            onCountChange={(newCount) => setQuantity(newCount)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3">
          <button onClick={onCancel} className="px-4 py-2 bg-ForthColor text-white rounded-md">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-wine text-white rounded-md">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPreference;
