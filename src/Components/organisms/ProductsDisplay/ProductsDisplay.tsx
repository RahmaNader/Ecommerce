import React, { useState, useEffect } from "react";
import { Button } from "@components/atoms";
import { ProductCard } from "@components/atoms/ProductCard/ProductCard";
import { CardComponent } from "@types";
import { useTranslation } from "react-i18next";

type ProductsDisplayProps = {
  products: CardComponent[];
  language: string; 
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
      {/* Products Grid - Using the same styling as ProductsGrid */}
      <div className="w-[90%] mx-auto px-4 md:px-16">
        <section
          className="grid auto-rows-[1fr] gap-y-8 gap-x-4 md:gap-x-10 justify-evenly"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 225px))" }}
        >
          {currentCards.map((card) => (
            <ProductCard
              key={card.productID}
              productID={card.productID}
              name={card.name}
              nameEn={card.nameEn}
              nameAr={card.nameAr}
              productPrice={card.productPrice}
              priceAfterDiscount={card.priceAfterDiscount}
              discountPercent={card.discountPercent}
              productVarients={card.productVarients}
              productImages={card.productImages}
              averageRate={card.averageRate}
            />
          ))}
        </section>
      </div>

      {/* Pagination with RTL support */}
      {products.length > cardsPerPage && (
        <div className={`mt-8 flex items-center w-full justify-between md:px-10`}>
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