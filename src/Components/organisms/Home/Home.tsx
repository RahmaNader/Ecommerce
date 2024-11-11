// src/Components/organisms/Home/Home.tsx
import React from "react";
import { HomeSections } from "@components/molecules";
import { Button } from "@components/atoms";
import kids from "@assets/HP_kids.svg";
import women from "@assets/HP_women.svg";
import men from "@assets/HP_men.svg";
import Img1 from "@assets/HP_img1.jpeg";
import Img2 from "@assets/HP_img2.jpeg";
import Img3 from "@assets/HP_img3.jpeg";

const Home: React.FC = () => {
  const handleButtonClick = (string: string) => {
    console.log("Button clicked " + string);
  };

  // a placeholder array for now until the backend api is ready
  const newCollectionCards = [
    {
      src: Img1,
      alt: "product-image",
      name: "Classic Jacket",
      DisPrice: "200EGP",
      NormalPrice: "250EGP",
      rate: 4,
    },
    {
      src: Img2,
      alt: "product-image",
      name: "Modern Coat",
      DisPrice: "300EGP",
      NormalPrice: "350EGP",
      rate: 5,
    },
    {
      src: Img3,
      alt: "product-image",
      name: "Stylish Shirt",
      DisPrice: "150EGP",
      NormalPrice: "180EGP",
      rate: 3,
    },
    {
      src: Img1,
      alt: "product-image",
      name: "Elegant Dress",
      DisPrice: "400EGP",
      NormalPrice: "450EGP",
      rate: 2,
    },
  ];

  const specialOffersCards: string | never[] = [];

  const bestSellerCards = [
    {
      src: Img1,
      alt: "product-image",
      name: "Classic Jacket",
      DisPrice: "200EGP",
      NormalPrice: "250EGP",
      rate: 4,
    },
    {
      src: Img2,
      alt: "product-image",
      name: "Modern Coat",
      DisPrice: "300EGP",
      NormalPrice: "350EGP",
      rate: 5,
    },
    {
      src: Img3,
      alt: "product-image",
      name: "Stylish Shirt",
      DisPrice: "150EGP",
      NormalPrice: "180EGP",
      rate: 3,
    },
    {
      src: Img1,
      alt: "product-image",
      name: "Elegant Dress",
      DisPrice: "400EGP",
      NormalPrice: "450EGP",
      rate: 2,
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between my-20 mx-8 md:mx-32">
        <button
          onClick={() => handleButtonClick("kids")}
          className="cursor-pointer hover:opacity-80 mb-8 md:mb-0"
        >
          <img src={kids} alt="kids-image" />
        </button>
        <button
          onClick={() => handleButtonClick("women")}
          className="cursor-pointer hover:opacity-80 mb-8 md:mb-0"
        >
          <img src={women} alt="women-image" />
        </button>
        <button
          onClick={() => handleButtonClick("men")}
          className="cursor-pointer hover:opacity-80"
        >
          <img src={men} alt="men-image" />
        </button>
      </div>

      <div className="flex flex-col">
        {newCollectionCards.length > 0 && (
          <>
            <HomeSections
              SectionName="New Collection"
              cards={newCollectionCards}
            />
            <div className="flex justify-center mt-12">
              <Button
                label="View Collection"
                onClick={() => handleButtonClick("New Collection")}
              />
            </div>
          </>
        )}

        {specialOffersCards.length > 0 && (
          <>
            <HomeSections
              SectionName="Special Offers"
              cards={specialOffersCards}
            />
            <div className="flex justify-center mt-12">
              <Button
                label="View Collection"
                onClick={() => handleButtonClick("Special Offers")}
              />
            </div>
          </>
        )}

        {bestSellerCards.length > 0 && (
          <>
            <HomeSections SectionName="Best Seller" cards={bestSellerCards} />
            <div className="flex justify-center mt-12">
              <Button
                label="View Collection"
                onClick={() => handleButtonClick("Best Seller")}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
