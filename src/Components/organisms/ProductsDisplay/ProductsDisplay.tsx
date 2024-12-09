import React, { useState, useEffect } from "react";
import { Card, Button } from "@components/atoms";
import { CardComponent } from "@types";
import { useNavigate } from "react-router-dom";

type ProductsDisplayProps = {
  products: CardComponent[]; 
};

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const isMobile = window.innerWidth < 768;
  const maxPageButtons = isMobile ? 3 : 4;

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

  const totalPages = Math.ceil(products.length / cardsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= maxPageButtons - 1) {
      for (let i = 1; i <= maxPageButtons; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("right");
    } else if (currentPage > totalPages - maxPageButtons + 1) {
      pageNumbers.push("left");
      for (let i = totalPages - maxPageButtons + 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push("left");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("right");
    }
    return pageNumbers;
  };

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full">
      {/* Display Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full">
        {currentCards.map((card) => (
          <div className="flex justify-center mx-auto w-full md:w-[70%]" key={card.id}>
            <Card
              {...card}
              onClick={() => {
                navigate(`/product-details/${card.id}`);
              }}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {products.length > cardsPerPage && (
        <div className="py-8 flex items-center w-full justify-between space-x-2">
          <Button
            label="Previous"
            onClick={handlePrevious}
            type="PaginationOutlined"
            isDisabled={currentPage === 1}
            className="flex items-center justify-center leading-none"
          />

          <div className="flex space-x-2">
            {getPageNumbers().map((item, index) =>
              typeof item === "number" ? (
                <button
                  key={item}
                  onClick={() => paginate(item)}
                  className={`rounded-full flex items-center justify-center ${
                    currentPage === item
                      ? "bg-wine text-white border-spacing-1"
                      : "border-wine border-2 text-wine"
                  } w-[21px] h-[21px] text-[10px] sm:w-[30px] sm:h-[30px] sm:text-[14px] md:w-[40px] md:h-[40px] md:text-[16px] `}
                >
                  {item}
                </button>
              ) : (
                <span
                  key={`ellipsis-${item}-${index}`}
                  className={`rounded-full flex items-center justify-center border-wine border-2 text-wine w-[21px] h-[21px] text-[10px] sm:w-[30px] sm:h-[30px] sm:text-[14px] md:w-[40px] md:h-[40px] md:text-[16px] `}
                >
                  {item === "left" ? "<<" : ">>"}
                </span>
              )
            )}
          </div>

          <Button
            label="Next"
            type="Pagination"
            onClick={handleNext}
            isDisabled={currentPage === totalPages}
            className="flex items-center justify-center leading-none"
            style={{
              alignSelf: "self-end",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsDisplay;
