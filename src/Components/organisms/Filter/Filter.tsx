import React, { useState } from "react";
import ReactSlider, { ReactSliderProps } from "react-slider";
import FilterIcon from "@assets/FilterIcon.svg";
import { IconX } from "@tabler/icons-react";
import FilterArrow from "@assets/FilterArrow.svg";
import { Button } from "@components/atoms";
import Checkbox from "@mui/material/Checkbox";
import { FilterCategory } from "@types";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

type FilterProps = {
  onFilterChange: (filters: {
    categories?: string[];
    priceRange?: [number, number];
  }) => void;
  onClose?: () => void;
};

const Slider = ReactSlider as unknown as React.FC<
  ReactSliderProps<[number, number]>
>;

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

  const initialCategories: FilterCategory[] = [
    { name: t("filter.categories.jackets"), isChecked: false },
    { name: t("filter.categories.coats"), isChecked: false },
    { name: t("filter.categories.shirts"), isChecked: false },
    { name: t("filter.categories.accessories"), isChecked: false },
    { name: t("filter.categories.pants"), isChecked: false },
    { name: t("filter.categories.shoes"), isChecked: false },
    { name: t("filter.categories.hats"), isChecked: false },
  ];

  const [categoryItems, setCategoryItems] =
    useState<FilterCategory[]>(initialCategories);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const [isCategoriesCollapsed, setIsCategoriesCollapsed] =
    useState<boolean>(true);

  const handleCategoryChange = (index: number) => {
    const updatedCategories = [...categoryItems];
    updatedCategories[index].isChecked = !updatedCategories[index].isChecked;
    setCategoryItems(updatedCategories);
  };

  const handleFilterClick = () => {
    const selectedCategories = categoryItems
      .filter((category) => category.isChecked)
      .map((category) => category.name);

    const filters = {
      categories:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      priceRange,
    };

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
          <Slider
            className="relative w-[100%] items-center rounded-md mt-2"
            thumbClassName="absolute relative transform -translate-y-1/2 w-4 h-4 bg-wine rounded-full cursor-pointer focus:outline-none focus:ring-wine"
            trackClassName="h-[1px] bg-ThirdColor"
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onChange={(values: [number, number]) => setPriceRange(values)}
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
