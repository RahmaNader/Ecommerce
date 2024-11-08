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
  const handleImageClick = (category: string) => {
    console.log(`Image clicked: ${category}`);
  };

  //a placeholder array for now until the backend api is ready
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
      <div className="flex justify-center my-10">
        <div>
          <img
            src={kids}
            alt="kids-image"
            className="cursor-pointer hover:opacity-80 my-10"
            onClick={() => handleImageClick("kids")}
          />
        </div>

        <div>
          <img
            src={women}
            alt="women-image"
            className="cursor-pointer hover:opacity-80 my-10"
            onClick={() => handleImageClick("women")}
          />
        </div>

        <div>
          <img
            src={men}
            alt="men-image"
            className="cursor-pointer hover:opacity-80 my-10"
            onClick={() => handleImageClick("men")}
          />
        </div>
      </div>

      <div>
        {newCollectionCards.length > 0 && (
          <>
            <HomeSections
              SectionName="New Collection"
              cards={newCollectionCards}
            />
            <div className="flex justify-center mt-12">
              <Button label="View Collection" onClick={function (): void {
                throw new Error("Function not implemented.");
              } } />
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
              <Button label="View Collection" onClick={function (): void {
                throw new Error("Function not implemented.");
              } } />
            </div>
          </>
        )}

        {bestSellerCards.length > 0 && (
          <>
            <HomeSections SectionName="Best Seller" cards={bestSellerCards} />
            <div className="flex justify-center mt-12">
              <Button label="View Collection" onClick={function (): void {
                throw new Error("Function not implemented.");
              } } />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;