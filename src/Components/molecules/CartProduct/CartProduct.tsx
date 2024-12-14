import React from "react";
import image1 from "@assets/product1.jpg";
import { ProductCount } from "@components/atoms";

interface Product {
  name: string;
  Price: string;
  Discount: string;
  Shipping: string;
  CouponApplied: string;
  TOTAL: string;
  EstimatedDeliveryBy: string;
  Color: string;
  Size: string;
}

interface CartProductProps {
  product: Product;
  onRemove: () => void;
}

const CartProduct: React.FC<CartProductProps> = ({ product, onRemove }) => {
  const handleCountChange = (count: number) => {
    console.log(`Selected quantity: ${count}`);
  };

  return (

<div className="w-screen border-b border-b-ForthColor/50 pb-8 px-4">
  <div className="flex flex-row gap-4 mx-auto max-w-screen-lg">
    <div className="w-4/12 flex-shrink-0">
      <img
        src={image1}
        alt={product.name}
        className="w-full h-auto object-cover rounded-md"
      />
    </div>

    <div className="flex flex-col pl-4 gap-8 w-8/12">
      <h3 className="font-semibold font-playfair text-wine text-lg md:text-xl">
        {product.name}
      </h3>

      <div className="flex flex-row gap-2 items-center">
        <span className="text-ForthColor text-base font-Poppins">Color:</span>
        <span className="text-wine text-base font-Poppins">{product.Color}</span>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <span className="text-ForthColor text-base font-Poppins">Size:</span>
        <span className="text-wine text-base font-Poppins">{product.Size}</span>
      </div>

      <div className="flex flex-row gap-8 items-center">
        <ProductCount initialCount={1} onCountChange={handleCountChange} />
        <button
          onClick={onRemove}
          className="text-wine hover:underline"
        >
          Remove
        </button>
      </div>
    </div>

    <div className="justify-end">
      <span className="text-wine text-base font-Poppins">{product.Price}</span>
    </div>
  </div>
</div>

  

  );
};

export default CartProduct;
