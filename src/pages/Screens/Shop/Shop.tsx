    import React, { useState } from "react";
    import { useParams, Navigate, useLocation } from "react-router-dom";
    import { Filter } from '@components/organisms';
    import { Breadcrumb } from "@components/molecules";
    import { Card } from '@components/atoms';
    import Img1 from "@assets/HP_img1.jpeg";
    import Img2 from "@assets/HP_img2.jpeg";
    import Img3 from "@assets/HP_img3.jpeg";
    import { Button } from "@components/atoms";

    type ShopParams = {
      category: string;
      item?: string;
    };

    type CardType = {
      src: string;
      alt: string;
      name: string;
      DisPrice: string;
      NormalPrice: string;
      rate: number;
    };

    // Define 'cards' outside of the Shop component
    const cards: CardType[] = [
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
      // Additional cards can be added here
    ];

    const Shop: React.FC = () => {
      const { category } = useParams<ShopParams>();
      const location = useLocation();
      const [filteredCards, setFilteredCards] = useState<CardType[]>(cards);

      // Pagination state
      const [currentPage, setCurrentPage] = useState(1);
      const cardsPerPage = 6;

      if (!category) {
        return <Navigate to="/" />;
      }

      // Extract the last segment of the URL path
      const lastSegment = location.pathname.split("/").filter(Boolean).pop();

      // Get current cards
      const indexOfLastCard = currentPage * cardsPerPage;
      const indexOfFirstCard = indexOfLastCard - cardsPerPage;
      const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

      // Change page
      const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

      // Handle Previous and Next buttons
      const handlePrevious = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

      const handleNext = () => {
        if (currentPage < Math.ceil(filteredCards.length / cardsPerPage)) {
          setCurrentPage(currentPage + 1);
        }
      };

      // Handle filter changes
      const handleFilterChange = (filters: any) => {
        // Apply filtering logic based on the filters received
        let filtered = cards;

        // Example filter: filter by rate
        if (filters.rate) {
          filtered = filtered.filter((card) => card.rate >= filters.rate);
        }

        // Reset to first page when filters change
        setFilteredCards(filtered);
        setCurrentPage(1);
      };

      return (
        <div className="bg-customBeige min-h-screen md:p-10">
          {/*<Breadcrumb />*/}
          <div className="flex flex-col lg:flex-row items-start ">
            {/* Filter Section */}
            <div className="w-full md:w-1/4 p-4 md:sticky md:top-0 md:h-screen md:overflow-y-auto flex justify-center">
              <Filter onFilterChange={handleFilterChange} />
            </div>
            {/* Products Section */}
            <div className="w-full lg:w-3/4 p-4 ">
              <p className="font-playball text-[40px] text-wine text-center md:text-left">
                {(lastSegment ?? "").charAt(0).toUpperCase() +
                  (lastSegment ?? "").slice(1)}
              </p>
              <div className="flex flex-wrap gap-5 justify-center">
                {currentCards.map((card, index) => (
                  <div
                    key={`${card.name}-${index}`}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center my-10"
                  >
                    <Card
                      src={card.src}
                      alt={card.alt}
                      name={card.name}
                      DisPrice={card.DisPrice}
                      NormalPrice={card.NormalPrice}
                      rate={card.rate}
                    />
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <Pagination
                  cardsPerPage={cardsPerPage}
                  totalCards={filteredCards.length}
                  paginate={paginate}
                  currentPage={currentPage}
                  handlePrevious={handlePrevious}
                  handleNext={handleNext}
                />
              </div>
            </div>
          </div>
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
        <div className="max-w-[856px] max-h-[100px] mt-4">
          <div className="flex flex-row items-center justify-center">
            <div>
              <Button
                label="Previous"
                onClick={handlePrevious}
                type="PaginationOutlined"
                isDisabled={currentPage === 1}
              />
            </div>

            <div className="flex flex-row">
              {pageNumbers.map((number) => (
                <div
                  key={number}
                  className={`mx-1 ${currentPage === number ? "font-bold" : ""}`}
                >
                  <button
                    onClick={() => paginate(number)}
                    className={`w-[50px] h-[50px] rounded-full flex items-center justify-center ${
                      currentPage === number
                        ? "bg-wine text-white"
                        : "border-wine border-2 text-wine"
                    }`}
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

    export default Shop;
