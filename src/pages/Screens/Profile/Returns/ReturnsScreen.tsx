import React from "react";
import fallbackImage from "@assets/HP_img1.jpeg";

const ReturnsScreen: React.FC = () => {
  // Mock data for product details
  const products = [
    {
      name: "One Life Graphic T-shirt",
      size: "Small",
      color: "Brown",
      price: "200.00 EGP",
      quantity: 1,
      imageUrl: "/path-to-your-image/image1.png",
    },
    {
      name: "Classic Denim Jacket",
      size: "Medium",
      color: "Blue",
      price: "500.00 EGP",
      quantity: 1,
      imageUrl: "/path-to-your-image/image2.png",
    },
    {
      name: "Running Shoes",
      size: "42",
      color: "Black",
      price: "800.00 EGP",
      quantity: 1,
      imageUrl: "/path-to-your-image/image3.png",
    },
  ];

  return (
    <div className="flex flex-col mt-8 md:mt-16 justify-center">
      <h1 className="text-2xl font-semibold text-wine font-playfair md:self-start mx-auto md:mx-0">
        Return
      </h1>
      <p className="text-ForthColor font-playfair text-xl mb-4 md:self-start mx-auto md:mx-0">
        Return your order
      </p>

      {products.map((product, index) => (
        <div key={index} className="flex flex-row items-center justify-between mt-8 border-2 border-ForthColor rounded-xl w-full h-[150px] p-4 bg-beige">
          {/* Image Section */}
          <div className="flex items-center space-x-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
              className="w-24 h-24 rounded-lg rtl:ml-4 object-cover"
            />
            {/* Details Section */}
            <div className="flex flex-col justify-center">
              <h2 className="text-lg mb-6 font-playfair font-semibold text-wine">
                {product.name}
              </h2>
              <p className="text-sm text-ForthColor">{`${product.color} | ${product.size}`}</p>
            </div>
          </div>

          {/* Price and Action Section */}
          <div className="flex flex-col items-end justify-between h-full">
            <span className="font-playfair text-wine font-bold text-lg">{product.price}</span>
            <span className="text-sm text-ForthColor">{`Qty: ${product.quantity}`}</span>
            <button className="text-ForthColor underline text-l font-semibold mt-2">
              Details ➔
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReturnsScreen;