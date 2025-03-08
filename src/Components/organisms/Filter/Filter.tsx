import React, { useState } from "react";
import ReactSlider from "react-slider";
import FilterIcon from "@assets/FilterIcon.svg";
import { IconX } from "@tabler/icons-react";
import FilterArrow from "@assets/FilterArrow.svg";
import { Button } from "@components/atoms";
import Checkbox from "@mui/material/Checkbox";
import { FilterCategory } from '@types';
import { FilterCategory } from "@types";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

type FilterProps = {
  onFilterChange: (filters: {
    size?: string;
    collection?: number;
    categories?: string[];
    priceRange?: [number, number];
  }) => void;
  onClose?: () => void;
};


const CustomCheckbox = styled(Checkbox)(() => ({
  color: "#721013",
  "&.Mui-checked": {
    color: "#721013",
  },
  "&:hover": {
    backgroundColor: "rgba(114, 16, 19, 0.1)",
  },
}));

const Filter: React.FC<FilterProps> = ({ onFilterChange, onClose }) => {
  const { t } = useTranslation();

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const initialCategories: FilterCategory[] = [
    { name: t("filter.categories.jackets"), isChecked: false },
    { name: t("filter.categories.coats"), isChecked: false },
    { name: t("filter.categories.shirts"), isChecked: false },
    { name: t("filter.categories.accessories"), isChecked: false },
    { name: t("filter.categories.pants"), isChecked: false },
    { name: t("filter.categories.shoes"), isChecked: false },
    { name: t("filter.categories.hats"), isChecked: false },
  ];

  const collections = [
    t("filter.collections.allProducts"),
    t("filter.collections.bestSellers"),
    t("filter.collections.newArrivals"),
    t("filter.collections.accessories"),
  ];

  const ALL_PRODUCTS_INDEX = 0;

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<number | null>(
    null
  );
  const [categoryItems, setCategoryItems] =
    useState<FilterCategory[]>(initialCategories);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const [isCategoriesCollapsed, setIsCategoriesCollapsed] =
    useState<boolean>(true);
  const [isCollectionsCollapsed, setIsCollectionsCollapsed] =
    useState<boolean>(true);

  const handleCategoryChange = (index: number) => {
    const updatedCategories = [...categoryItems];
    updatedCategories[index].isChecked = !updatedCategories[index].isChecked;
    setCategoryItems(updatedCategories);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(selectedSize === size ? null : size);
  };

  const handleFilterClick = () => {
    const selectedCategories = categoryItems
      .filter((category) => category.isChecked)
      .map((category) => category.name);

    const filters = {
      size: selectedSize || undefined,
      collection:
        selectedCollection !== null && selectedCollection !== ALL_PRODUCTS_INDEX
          ? selectedCollection
          : undefined,
      categories:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      priceRange,
    };

    if (selectedCollection === ALL_PRODUCTS_INDEX) {
      filters.size = undefined;
      filters.collection = undefined;
      filters.categories = undefined;
    }

    onFilterChange(filters);
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div
        className="relative flex flex-col gap-2 w-full bg-customBeige"
        style={{ minHeight: "100px" }}
      >
        {/* Conditionally render the close button if onClose is provided */}
        {onClose && (
          <div className="absolute right-2">
            <button
              onClick={onClose}
              aria-label={t("filter.close")}
              className="text-wine border-wine border-2 rounded-full cursor-pointer"
            >
              <IconX size={28} />
            </button>
          </div>
        )}

        <div className="absolute bottom-4 flex flex-row justify-between w-full items-center mt-2">
          <p className="font-playfair text-2xl font-bold text-wine text-left">
            {t("filter.title")}
          </p>
          <img src={FilterIcon} alt="Filter icon" className="h-6 w-6" />
        </div>
      </div>

      {/* Main content starts below the header */}
      <div className="px-4 gap-9 w-full flex flex-col">
        {/* Size Filter */}
        <div className="flex flex-col w-full">
          <p className="font-playfair text-2xl text-wine ltr:text-left rtl:text-right font-semibold">
            {t("filter.size")}
          </p>
          <div
            className="flex gap-3 sm:gap-4 mt-2 w-full items-center justify-evenly"
            role="group"
            aria-label={t("filter.sizeSelection")}
          >
            {sizes.map((size, index) => (
              <div
                key={index}
                onClick={() => handleSizeClick(size)}
                role="button"
                tabIndex={0}
                aria-pressed={selectedSize === size ? "true" : "false"}
                className={`font-Jost flex items-center text-base w-9 h-10 justify-center border-2 rounded-lg cursor-pointer focus:outline-none ${
                  selectedSize === size
                    ? "text-wine border-wine"
                    : "text-ThirdColor border-ThirdColor"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Categories Filter */}
        <div className="w-full flex flex-col">
          <div
            className="flex flex-row items-center justify-between cursor-pointer"
            onClick={() => setIsCategoriesCollapsed(!isCategoriesCollapsed)}
          >
            <p className="font-playfair text-2xl text-wine text-left font-semibold">
              {t("filter.categoriestitle")}
            </p>
            <img
              src={FilterArrow}
              alt="Filter icon"
              className={`w-5 h-5 transform transition-transform duration-300 ${
                isCategoriesCollapsed ? "rotate-180" : "rotate-270"
              }`}
            />
          </div>

          {!isCategoriesCollapsed && (
            <div className="mt-2">
              {categoryItems.map((category, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between"
                >
                  <label
                    htmlFor={`category-${index}`}
                    className={`font-Poppins text-base cursor-pointer ${
                      category.isChecked ? "text-wine" : "text-ThirdColor"
                    }`}
                  >
                    {category.name}
                  </label>
                  <CustomCheckbox
                    checked={category.isChecked}
                    onChange={() => handleCategoryChange(index)}
                    id={`category-${index}`}
                    inputProps={{ "aria-label": category.name }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Collections Filter */}
        <div className="w-full flex flex-col">
          <div
            className="flex flex-row items-center justify-between cursor-pointer"
            onClick={() => setIsCollectionsCollapsed(!isCollectionsCollapsed)}
          >
            <p className="font-playfair text-2xl text-wine text-left font-semibold">
              {t("filter.collectionstitle")}
            </p>
            <img
              src={FilterArrow}
              alt="Filter icon"
              className={`w-5 h-5 transform transition-transform duration-300 ${
                isCollectionsCollapsed ? "rotate-180" : "rotate-270"
              }`}
            />
          </div>

          {!isCollectionsCollapsed && (
            <div className="mt-2">
              {collections.map((collection, index) => (
                <p
                  key={index}
                  className={`font-Poppins text-base cursor-pointer ${
                    selectedCollection === index
                      ? "text-wine"
                      : "text-ThirdColor"
                  }`}
                  onClick={() => setSelectedCollection(index)}
                >
                  {collection}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="w-[100%] flex flex-col">
          <p className="font-playfair text-2xl text-wine ltr:text-left rtl:text-right font-semibold">
            {t("filter.priceRange")}
          </p>
          <div className="flex justify-between mt-2">
            <span className="font-Poppins text-base text-wine">
              EGP {priceRange[0]}
            </span>
            <span className="font-Poppins text-base text-wine">
              EGP {priceRange[1]}
            </span>
          </div>
          <ReactSlider
            className="relative w-[100%] items-center rounded-md mt-2"
            thumbClassName="absolute relative transform -translate-y-1/2 w-4 h-4 bg-wine rounded-full cursor-pointer focus:outline-none focus:ring-wine"
            trackClassName="h-[1px] bg-ThirdColor"
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onChange={(values) => setPriceRange(values as [number, number])}
            withTracks={true}
            pearling
            minDistance={10}
          />
        </div>

        {/* Filter Button */}
        <Button
          label={t("filter.apply")}
          type="primary"
          onClick={handleFilterClick}
          style={{
            width: "90%",
            maxHeight: "60px",
            fontSize: "20px",
            alignSelf: "center",
            fontFamily: "PlayFair",
          }}
        />
      </div>
    </div>
  );
};

export default Filter;
