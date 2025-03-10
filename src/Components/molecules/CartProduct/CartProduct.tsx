import React from "react";
import { ProductCount } from "@components/atoms";
import { useTranslation } from "react-i18next"; 

interface CartProductProps {
  product: {
    id: number;
    name: string;
    DisPrice: number;
    color: string;
    size: string;
    quantity: number;
    src: string;
    alt: string;
    NormalPrice: number;
  };
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
  isArabic?: boolean; 
}

const CartProduct: React.FC<CartProductProps> = ({
  product,
  onRemove,
  onQuantityChange,
}) => {
  const { t } = useTranslation();
  
  const handleCountChange = (count: number) => {
    onQuantityChange(count);
  };

  return (
    <div className="border-b border-b-ForthColor/50 py-8 w-full px-2">
      
      <div className={`flex md:flex-row gap-4 `}>
        <div className="w-fit md:w-4/12">
          <img
            src={product.src}
            alt={product.name}
            className="max-w-48 h-52 object-cover rounded-md"
          />
        </div>

        <div className={`flex flex-col gap-4 w-full md:w-8/12`}>
          <div className={`flex flex-row w-full justify-between `}>
            <h3 className="font-semibold font-playfair text-wine text-lg md:text-xl">
              {product.name}
            </h3>

            <p className="font-medium text-wine">
              {(product.DisPrice * product.quantity).toFixed(2)} {t("product.currency")}
            </p>
          </div>

          <p className="text-ForthColor text-base font-Poppins">
            {t("cartProduct.color")}:{" "}
            <span className="text-wine text-base font-Poppins">
              {product.color}
            </span>
          </p>
          <p className="text-ForthColor text-base font-Poppins">
            {t("cartProduct.size")}:{" "}
            <span className="text-wine text-base font-Poppins">
              {product.size}
            </span>
          </p>
          <div className={`flex flex-col md:flex-row place-items-start gap-2 md:items-center w-full justify-between `}>
            <ProductCount
              initialCount={product.quantity}
              onCountChange={handleCountChange}
            />
            <button onClick={onRemove} className="text-red-500 underline">
              {t("cartProduct.remove")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;