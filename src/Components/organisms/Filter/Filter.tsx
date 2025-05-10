import React, { useState, useEffect, useCallback } from "react";
import ReactSlider, { ReactSliderProps } from "react-slider";
import FilterIcon from "@assets/FilterIcon.svg";
import { IconX } from "@tabler/icons-react";
import FilterArrow from "@assets/FilterArrow.svg";
import { Button } from "@components/atoms";
import Checkbox from "@mui/material/Checkbox";
import { FilterCategory as ImportedFilterCategory } from "@types";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

// Extended FilterCategory type to include id
interface FilterCategory extends ImportedFilterCategory {
  id?: number;
}

// Update type to include subcategories
type FilterProps = {
  onFilterChange: (filters: {
    categories?: string[];
    priceRange?: [number, number];
  }) => void;
  onClose?: () => void;
  subcategories?: {
    categoryID: number;
    name: string;
    nameEn?: string;
    nameAr?: string;
  }[];
  mainCategoryId?: number; // Add this to track main category changes
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

const Filter: React.FC<FilterProps> = ({
  onFilterChange,
  onClose,
  subcategories,
  mainCategoryId,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Fallback categories in case no subcategories are provided
  const fallbackCategories: FilterCategory[] = [
    { name: t("filter.categories.jackets"), isChecked: false },
    { name: t("filter.categories.coats"), isChecked: false },
    { name: t("filter.categories.shirts"), isChecked: false },
    { name: t("filter.categories.accessories"), isChecked: false },
    { name: t("filter.categories.pants"), isChecked: false },
    { name: t("filter.categories.shoes"), isChecked: false },
    { name: t("filter.categories.hats"), isChecked: false },
  ];

  // Generate categories from subcategories
  const generateInitialCategories = useCallback((): FilterCategory[] => {
    if (!subcategories || subcategories.length === 0) {
      return fallbackCategories;
    }

    return subcategories.map((category) => ({
      id: category.categoryID,
      name: isRTL
        ? category.nameAr || category.name
        : category.nameEn || category.name,
      isChecked: false,
    }));
  }, [subcategories, isRTL, fallbackCategories]);

  const [categoryItems, setCategoryItems] = useState<FilterCategory[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [isCategoriesCollapsed, setIsCategoriesCollapsed] =
    useState<boolean>(false);

  // Initialize categories when component mounts
  useEffect(() => {
    setCategoryItems(generateInitialCategories());
  }, []);

  // Update categories when subcategories or main category changes
  useEffect(() => {
    console.log("Subcategories updated:", subcategories);
    setCategoryItems(generateInitialCategories());
  }, [subcategories, mainCategoryId, generateInitialCategories, i18n.language]);

  const handleCategoryChange = (index: number) => {
    const updatedCategories = [...categoryItems];
    updatedCategories[index].isChecked = !updatedCategories[index].isChecked;
    setCategoryItems(updatedCategories);
  };

  const handleFilterClick = () => {
    const selectedCategories = categoryItems
      .filter((category) => category.isChecked)
      .map((category) => category.id?.toString() || category.name);

    const filters = {
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
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
              {categoryItems.length > 0 ? (
                categoryItems.map((category, index) => (
                  <div
                    key={`category-${category.id || index}-${mainCategoryId}`}
                    className="flex flex-row items-center justify-between"
                  >
                    <label
                      htmlFor={`category-${category.id || index}-${mainCategoryId}`}
                      className={`font-Poppins text-base cursor-pointer ${
                        category.isChecked ? "text-wine" : "text-ThirdColor"
                      }`}
                    >
                      {category.name}
                    </label>
                    <CustomCheckbox
                      checked={category.isChecked}
                      onChange={() => handleCategoryChange(index)}
                      id={`category-${category.id || index}-${mainCategoryId}`}
                      inputProps={{ "aria-label": category.name }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-ThirdColor font-Poppins text-sm py-2">
                  {t("filter.noCategories")}
                </p>
              )}
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
