// src/pages/screens/Shop/Shop.tsx
import React, { useState, useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { Filter } from "@components/organisms";
// import { Breadcrumb } from "@components/molecules";
import { ProductsDisplay } from "@components/organisms";
import { cards } from "@data/cards";
import { CardProps } from "@types";

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
  const [filteredCards, setFilteredCards] = useState<CardProps[]>(cards);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({});

  const lastSegment = location.pathname.split("/").filter(Boolean).pop();

  useEffect(() => {
    if (!category) {
      return;
    }
    let newFilteredCards = [...cards];

    if (filterCriteria.size) {
      newFilteredCards = newFilteredCards.filter(
        (card) => card.size === filterCriteria.size
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
          card.price >= filterCriteria.priceRange![0] &&
          card.price <= filterCriteria.priceRange![1]
        );
      });
    }

    setFilteredCards(newFilteredCards);
    setFilteredCards(newFilteredCards);
  }, [filterCriteria, category]);

  if (!category) {
    return <Navigate to="/" />;
  }
  const handleFilterChange = (filters: FilterCriteria) => {
    setFilterCriteria(filters);
  };

  return (
    <div className="bg-customBeige min-h-screen md:p-10">
      {/* <Breadcrumb /> */}
      <div className="flex flex-col lg:flex-row items-start ">
        <div className="w-full md:w-1/4 p-4 md:sticky md:top-0 md:h-screen md:overflow-y-auto flex justify-center">
          <Filter onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full lg:w-3/4 p-4 ">
          <p className="font-playball text-[40px] text-wine text-center md:text-left">
            {(lastSegment ?? "").charAt(0).toUpperCase() +
              (lastSegment ?? "").slice(1)}
          </p>
          <ProductsDisplay products={filteredCards} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
