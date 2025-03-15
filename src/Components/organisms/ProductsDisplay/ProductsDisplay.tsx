import React, { useState, useEffect } from "react";
import { Card, Button } from "@components/atoms";
import { CardComponent } from "@types";
import { useTranslation } from "react-i18next";

type ProductsDisplayProps = {
  products: CardComponent[];
  language: string; // Add language prop
};

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({ products, language }) => {
  const isRTL = language === "ar";
  const { t } = useTranslation();
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

  return (
    <div className="flex flex-col items-center w-full">
      {/* Display Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full">
        {currentCards.map((card) => {
          // Create a modified card with the correct language-specific properties
          const localizedCard = {
            ...card,
            name: isRTL ? card.nameAr || card.name : card.nameEn || card.name,
            productDescription: isRTL 
              ? card.productDescriptionAr || card.productDescription 
              : card.productDescriptionEn || card.productDescription
          };
          
          return (
            <div className="flex justify-center mx-auto w-full md:w-[70%]" key={card.productID}>
              <Card {...localizedCard} />
            </div>
          );
        })}
      </div>

      {/* Pagination with RTL support */}
      {products.length > cardsPerPage && (
        <div className={`mt-8 flex items-center w-full justify-between md:px-10 `}>
          <Button
            label={t("pagination.previous")}
            onClick={handlePrevious}
            type="PaginationOutlined"
            isDisabled={currentPage === 1}
            className="flex items-center justify-center leading-none"
          />

          <div className={`flex gap-2`}>
            {getPageNumbers().map((item, index) =>
              typeof item === "number" ? (
                <button
                  key={item}
                  onClick={() => paginate(item)}
                  className={`rounded-full flex items-center justify-center ${
                    currentPage === item
                      ? "bg-wine text-mainColor border-spacing-1"
                      : "border-wine border text-wine"
                  } w-6 h-6 md:w-10 md:h-10 text-xs md:text-base`}
                >
                  {item}
                </button>
              ) : (
                <span
                  key={`ellipsis-${item}-${index}`}
                  className={`rounded-full flex items-center justify-center border-wine border text-wine w-6 h-6 text-xs md:w-10 md:h-10 md:text-base`}
                >
                  {item === "left" ? (isRTL ? ">>" : "<<") : (isRTL ? "<<" : ">>")}
                </span>
              )
            )}
          </div>

          <Button
            label={t("pagination.next")}
            type="Pagination"
            onClick={handleNext}
            isDisabled={currentPage === totalPages}
            className="flex items-center justify-center leading-none"
          />
        </div>
      )}
    </div>
  );
};

export default ProductsDisplay;
