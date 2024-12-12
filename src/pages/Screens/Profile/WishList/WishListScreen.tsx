import React, { useState, useEffect } from 'react';
import { ProductsDisplay } from "@components/organisms";

const WishListScreen: React.FC = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  return (
    <div className="flex flex-col mt-8 md:mt-16 justify-center">
      <h1 className="text-2xl font-semibold text-wine font-playfair md:self-start mx-auto md:mx-0">
        Wish List
      </h1>
      <p className="text-ForthColor font-playfair text-xl mb-4 md:self-start mx-auto md:mx-0">
        See your favorites list
      </p>
      <div className="flex justify-center">
        {wishlist.length > 0 ? (
          <ProductsDisplay products={wishlist} />
        ) : (
          <p className="text-lg text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WishListScreen;
