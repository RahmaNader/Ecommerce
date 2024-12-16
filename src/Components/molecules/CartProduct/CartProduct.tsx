import React from "react";
import image1 from "@assets/product1.jpg";
import { ProductCount } from "@components/atoms";

interface Product {
  id: number;
  name: string;
  Price: number;
  Discount: number;
  Shipping: number;
  Color: string;
  Size: string;
  quantity: number;
}

interface CartProductProps {
  product: Product;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

const CartProduct: React.FC<CartProductProps> = ({
  product,
  onRemove,
  onQuantityChange,
}) => {
  const handleCountChange = (count: number) => {
    onQuantityChange(count);
  };

  return (
    <div className="border-b border-b-ForthColor/50 py-8 w-full px-4">
      <div className="flex flex-col md:flex-row gap-4 mx-auto max-w-screen-lg">
        <div className="w-full md:w-4/12 flex-shrink-0">
          <img
            src={image1}
            alt={product.name}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col gap-4 w-full md:w-8/12">
          <h3 className="font-semibold font-playfair text-wine text-lg md:text-xl">
            {product.name}
          </h3>

          <div className="flex flex-row gap-2 items-center">
            <span className="text-ForthColor text-base font-Poppins">Color:</span>
            <span className="text-wine text-base font-Poppins">
              {product.Color}
            </span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <span className="text-ForthColor text-base font-Poppins">Size:</span>
            <span className="text-wine text-base font-Poppins">
              {product.Size}
            </span>
          </div>

          <div className="flex flex-row gap-8 items-center">
            <ProductCount
              initialCount={product.quantity}
              onCountChange={handleCountChange}
            />
            <button onClick={onRemove} className="text-wine hover:underline">
              Remove
            </button>
          </div>
        </div>

        <div className="flex md:justify-end items-center md:w-auto">
          <span className="text-wine text-base font-Poppins">
            {(product.Price * product.quantity).toFixed(2)} EGP
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
