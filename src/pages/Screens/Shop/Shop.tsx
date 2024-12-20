import React, { useState, useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { Filter, ProductsDisplay } from "@components/organisms";
import { cards } from "@data/cards";
import { CardComponent } from "@types";
import { Breadcrumb } from "@components/molecules";
import FilterIcon from "@assets/FilterIcon.svg";

type ShopParams = {
  category: string;
  item?: string;
};

type FilterCriteria = {
  size?: string;
  collection?: number;
  categories?: string[];
  priceRange?: [number, number];
};

const Shop: React.FC = () => {
  const { category } = useParams<ShopParams>();
  const location = useLocation();
  const [filteredCards, setFilteredCards] = useState<CardComponent[]>(cards);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // Controls sidebar visibility with animation

  const lastSegment = location.pathname.split("/").filter(Boolean).pop();

  useEffect(() => {
    // Filter cards based on filter criteria
    let newFilteredCards = [...cards];

    if (Object.keys(filterCriteria).length === 0) {
      // Reset to all cards if no filters are applied
      newFilteredCards = cards;
    } else {
      if (filterCriteria.size) {
        newFilteredCards = newFilteredCards.filter((card) =>
          card.size.includes(filterCriteria.size!)
        );
      }

      if (filterCriteria.collection !== undefined) {
        newFilteredCards = newFilteredCards.filter(
          (card) => card.collection === filterCriteria.collection
        );
      }

      if (filterCriteria.categories && filterCriteria.categories.length > 0) {
        newFilteredCards = newFilteredCards.filter((card) =>
          filterCriteria.categories?.includes(card.category)
        );
      }

      if (filterCriteria.priceRange) {
        newFilteredCards = newFilteredCards.filter((card) => {
          return (
            card.DisPrice >= filterCriteria.priceRange![0] &&
            card.DisPrice <= filterCriteria.priceRange![1]
          );
        });
      }
    }

    setFilteredCards(newFilteredCards);
  }, [filterCriteria]);

  // Handle sidebar visibility with animation
  useEffect(() => {
    if (isFilterOpen) {
      setShowSidebar(true);
    } else {
      const timer = setTimeout(() => setShowSidebar(false), 300); // Match duration with CSS transition
      return () => clearTimeout(timer);
    }
  }, [isFilterOpen]);

  if (!category) {
    return <Navigate to="/" />;
  }

  const handleFilterChange = (filters: FilterCriteria) => {
    setFilterCriteria(filters);
  };

  const handleCloseSidebar = () => {
    setIsFilterOpen(false);
    setShowSidebar(false); // Hide the overlay immediately
  };

  return (
    <div className="bg-customBeige min-h-screen p-2 md:p-10">
      <Breadcrumb />
      {/* Filter Sidebar for screens smaller than laptop size */}
      <div className="flex flex-col xl:flex-row xl:items-start items-center">
        {showSidebar && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className={`transform ${
                isFilterOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out sm:w-3/4 bg-mainColor p-4 overflow-y-auto`}
            >
              <div className="flex w-[100%]">
                {/* onClose passed here, so cursor will be pointer */}
                <Filter
                  onFilterChange={handleFilterChange}
                  onClose={handleCloseSidebar}
                />
              </div>
            </div>
            {/* Overlay */}
            <div
              className="flex-1 bg-black opacity-50"
              onClick={handleCloseSidebar}
            ></div>
          </div>
        )}

        {/* Desktop Filter for screens larger than laptop size */}
        <div className="laptop:hidden w-full md:w-1/4 p-4 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          {/* No onClose passed here, so no pointer cursor */}
          <Filter onFilterChange={handleFilterChange} />
        </div>

        {/* Products Section */}
        <div className="w-full lg:w-3/4 p-4">
          <div className="flex flex-row justify-between w-full px-4 mb-4 md:px-12">
            <p className="kiwi font-playball text-3xl md:text-4xl text-wine text-left">
              {(lastSegment ?? "").charAt(0).toUpperCase() +
                (lastSegment ?? "").slice(1)}
            </p>
            <div className="banana laptop:flex hidden justify-start">
              <button onClick={() => setIsFilterOpen(true)}>
                <img src={FilterIcon} alt="Open Filters" />
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <ProductsDisplay products={filteredCards} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
