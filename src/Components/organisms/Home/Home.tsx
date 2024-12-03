// src/Components/organisms/Home/Home.tsx
import React from "react";
import { ProductsView } from "@components/molecules";
import {productsViewCards} from "@data/cards"
import { Button } from "@components/atoms";
import kids from "@assets/HP_kids.svg";
import women from "@assets/HP_women.svg";
import men from "@assets/HP_men.svg";

const Home: React.FC = () => {
  const handleButtonClick = (string: string) => {
    console.log("Button clicked " + string);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center  md:justify-between my-20 mx-8 md:mx-32">
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
        {productsViewCards.length > 0 && (
          <>
            <ProductsView
              sectionName="New Collection"
              cards={productsViewCards}
            />
            <div className="flex justify-center mt-12">
              <Button
                label="View Collection"
                onClick={() => handleButtonClick("New Collection")}
              />
            </div>
          </>
        )}

        {productsViewCards.length > 0 && (
          <>
            <ProductsView
              sectionName="Special Offers"
              cards={productsViewCards}
            />
            <div className="flex justify-center mt-12">
              <Button
                label="View Collection"
                onClick={() => handleButtonClick("Special Offers")}
              />
            </div>
          </>
        )}

        {productsViewCards.length > 0 && (
          <>
            <ProductsView sectionName="Best Seller" cards={productsViewCards} />
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
