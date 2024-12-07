import React from 'react';

const WishListScreen: React.FC = () => {
  return (
    <div className="flex flex-col mt-8 md:mt-16 justify-center">
      <h1 className="text-2xl font-semibold text-wine font-playfair md:self-start mx-auto md:mx-0">
           Wish list
      </h1>
      <p className="text-ForthColor font-playfair text-xl mb-4 md:self-start mx-auto md:mx-0">
          See your favorites list
      </p>
    </div>
  );
};

export default WishListScreen;
