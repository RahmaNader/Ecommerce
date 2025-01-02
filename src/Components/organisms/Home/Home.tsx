import React from "react";
import { ProductsView } from "@components/molecules";
import { Button } from "@components/atoms";
import { useQuery } from "react-query";
import { fetchNewArrivals } from "@services/api/fetchCollections";
import kids from "@assets/HP_kids.svg";
import women from "@assets/HP_women.svg";
import men from "@assets/HP_men.svg";

const Home: React.FC = () => {
  const handleButtonClick = (section: string) => {
    console.log("Button clicked: " + section);
  };

  // Fetch "New Arrivals" using React Query
  const {
    data: newArrivals,
    isLoading: isLoadingNewArrivals,
    isError: isErrorNewArrivals,
  } = useQuery("newArrivals", () => fetchNewArrivals(4));

  return (
    <>
      <div className="flex flex-wrap md:flex-row justify-center items-center md:justify-between my-20 mx-8 md:mx-32">
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
        {/* Render "New Collection" dynamically */}
        {isLoadingNewArrivals && <p>Loading New Collection...</p>}
        {isErrorNewArrivals && <p>Error fetching New Collection.</p>}
        {!isLoadingNewArrivals && !isErrorNewArrivals && newArrivals && (
          <>
            <ProductsView sectionName="New Collection" cards={newArrivals} />
            <div className="flex justify-center mt-12">
              <Button
                label="View Collection"
                onClick={() => handleButtonClick("New Collection")}
              />
            </div>
          </>
        )}

        {/* Example placeholder for "Special Offers" */}
        <ProductsView sectionName="Special Offers" cards={[]} />
        <ProductsView sectionName="Best Seller" cards={[]} />
      </div>
    </>
  );
};

export default Home;
