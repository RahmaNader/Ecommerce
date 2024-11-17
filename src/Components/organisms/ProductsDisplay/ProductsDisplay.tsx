// src/components/organisms/ProductsDisplay/ProductsDisplay.tsx
import React, { useState } from "react";
import { Card } from "@components/atoms";
import { Button } from "@components/atoms";

interface CardProps {
    src: string;
    alt: string;
    name: string;
    DisPrice: number;
    NormalPrice: number;
    rate: number;
    size: string;
    category: string;
    collection: number;
    price: number;
  }

  type ProductsDisplayProps = {
    products: CardProps[];
  };
  
  const ProductsDisplay: React.FC<ProductsDisplayProps> = ({ products }) => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;
  
    // Get current cards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);
  
    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
    // Handle Previous and Next buttons
    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNext = () => {
      if (currentPage < Math.ceil(products.length / cardsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    return (
      <div>
        {/* Products Grid */}
        <div className="flex flex-wrap gap-5 justify-center">
          {currentCards.map((card) => (
            <div
              key={card.name}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center my-10"
            >
              <Card {...card} />
            </div>
          ))}
        </div>
  
        {/* Pagination */}
        <Pagination
          cardsPerPage={cardsPerPage}
          totalCards={products.length}
          paginate={paginate}
          currentPage={currentPage}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </div>
    );
  };
  
  type PaginationProps = {
    cardsPerPage: number;
    totalCards: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
    handlePrevious: () => void;
    handleNext: () => void;
  };
  
  const Pagination: React.FC<PaginationProps> = ({
    cardsPerPage,
    totalCards,
    paginate,
    currentPage,
    handlePrevious,
    handleNext,
  }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="max-w-[856px] max-h-[100px] mt-4 ">
        <div className="flex flex-row items-center justify-center">
          <div>
            <Button
              label="Previous"
              onClick={handlePrevious}
              type="PaginationOutlined"
              isDisabled={currentPage === 1}
            />
          </div>
  
          <div className="flex flex-row ">
            {pageNumbers.map((number) => (
              <div
                key={number}
                className={`mx-1 ${currentPage === number ? "font-bold" : ""}`}
              >
                <button
                  onClick={() => paginate(number)}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  {number}
                </button>
              </div>
            ))}
          </div>
  
          <div>
            <Button
              label="Next"
              type="Pagination"
              onClick={handleNext}
              isDisabled={currentPage === pageNumbers.length}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductsDisplay;