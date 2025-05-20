import React, { useState, useEffect } from "react";
import ReactSlider, { ReactSliderProps } from "react-slider";
import FilterIcon from "@assets/FilterIcon.svg";
import { IconX } from "@tabler/icons-react";
import FilterArrow from "@assets/FilterArrow.svg";
import { Button } from "@components/atoms";
import { FilterCategory as ImportedFilterCategory } from "@types";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

// Extended FilterCategory type to include id
interface FilterCategory extends ImportedFilterCategory {
  id?: number;
}

// Update type to include subcategories and main category info
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
  mainCategoryId?: number;
  mainCategoryName?: string;
};

const Slider = ReactSlider as unknown as React.FC<
  ReactSliderProps<[number, number]>
>;

const FALLBACK_KEYS = [
  "filter.categories.jackets",
  "filter.categories.coats",
  "filter.categories.shirts",
  "filter.categories.accessories",
  "filter.categories.pants",
  "filter.categories.shoes",
  "filter.categories.hats",
];

const Filter: React.FC<FilterProps> = ({
  onFilterChange,
  onClose,
  subcategories,
  mainCategoryId,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const location = useLocation();

  // Fallback categories in case no subcategories are provided

  // Generate categories from subcategories
  useEffect(() => {
    const fallbackCategories: FilterCategory[] = FALLBACK_KEYS.map((key) => ({
      name: t(key),
      isChecked: false,
    }));

    const categories = subcategories?.length
      ? subcategories.map((c) => ({
          id: c.categoryID,
          name: isRTL ? c.nameAr ?? c.name : c.nameEn ?? c.name,
          isChecked: false,
        }))
      : fallbackCategories;

    setCategoryItems(categories);
  }, [subcategories, i18n.language]);

  const [categoryItems, setCategoryItems] = useState<FilterCategory[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [isCategoriesCollapsed, setIsCategoriesCollapsed] =
    useState<boolean>(false);

  // Initialize categories when component mounts or when subcategories/language changes

  const handleCategoryClick = (
    categoryId: number | undefined,
    categoryName: string
  ) => {
    if (!categoryId) return;

    // Get current main category name from pathname
    const pathParts = location.pathname.split("/");
    const mainCategoryName = pathParts[2] || "";

    // Navigate to the subcategory
    navigate(`/products/${mainCategoryName}/${categoryName.toLowerCase()}`, {
      state: { categoryId: categoryId },
    });

    // Close the filter on mobile
    if (onClose) {
      onClose();
    }
  };

  const handleFilterClick = () => {
    const filters = {
      priceRange,
    };

    onFilterChange(filters);

    // Close filter on mobile after applying
    if (onClose) {
      onClose();
    }
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
                    className="flex flex-row items-center justify-between py-2 cursor-pointer hover:bg-wine/10 px-2 rounded transition-colors"
                    onClick={() =>
                      handleCategoryClick(category.id, category.name)
                    }
                  >
                    <span className="font-Poppins text-base text-wine hover:text-wine/80 transition-colors">
                      {category.name}
                    </span>
                    <span className="text-wine">&rsaquo;</span>
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
            max={5000}
            step={100}
            value={priceRange}
            onChange={(values: [number, number]) => setPriceRange(values)}
            withTracks={true}
            pearling
            minDistance={10}
          />
        </div>

        {/* Filter Button - Only for price filtering now */}
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
