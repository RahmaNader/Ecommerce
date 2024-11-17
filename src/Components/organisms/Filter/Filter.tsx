// src/components/organisms/Filter/Filter.tsx
import React, { useState } from "react";
import ReactSlider from "react-slider";
import FilterIcon from "@assets/FilterIcon.svg";
import FilterArrow from "@assets/FilterArrow.svg";

interface Category {
  name: string;
  isChecked: boolean;
}

type FilterProps = {
  onFilterChange: (filters: {
    size?: string;
    collection?: number;
    categories?: string[];
    priceRange?: [number, number];
  }) => void;
};

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const initialCategories: Category[] = [
    { name: "Jackets", isChecked: false },
    { name: "Coats", isChecked: false },
    { name: "Shirts", isChecked: false },
    // ... add more categories as needed
  ];

  const collections = [
    "All products",
    "Best sellers",
    "New arrivals",
    "Accessories",
  ];

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<number | null>(
    null
  );
  const [categoryItems, setCategoryItems] = useState<Category[]>(initialCategories);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Collapse states
  const [isCategoriesCollapsed, setIsCategoriesCollapsed] = useState<boolean>(
    true
  );
  const [isCollectionsCollapsed, setIsCollectionsCollapsed] = useState<boolean>(
    true
  );

  // Handle category checkbox change
  const handleCategoryChange = (index: number) => {
    const updatedCategories = [...categoryItems];
    updatedCategories[index].isChecked = !updatedCategories[index].isChecked;
    setCategoryItems(updatedCategories);
  };

  const handleFilterClick = () => {
    const selectedCategories = categoryItems
      .filter((category) => category.isChecked)
      .map((category) => category.name);

    onFilterChange({
      size: selectedSize || undefined,
      collection: selectedCollection !== null ? selectedCollection : undefined,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      priceRange,
    });
  };

  return (
    <div className="flex flex-col items-start p-0 gap-[36px] max-w-[305px] max-h-[845px] mt-10">
      {/* Filter Header */}
      <div className="flex flex-row items-center w-[269px] h-[36px] justify-between">
        <p className="font-playfair text-[30px] font-bold text-wine text-left">
          Filters
        </p>
        <img src={FilterIcon} alt="Filter icon" className="w-[27px] h-[25px]" />
      </div>

      {/* Size Filter */}
      <div>
        <p className="font-playfair text-[18px] text-wine text-left font-semibold">
          Size
        </p>
        <div
          className="flex gap-4 mt-2 max-w-[268px]"
          role="group"
          aria-label="Size selection"
        >
          {sizes.map((size, index) => (
            <div
              key={index}
              onClick={() => setSelectedSize(size)}
              role="button"
              tabIndex={0}
              aria-pressed={selectedSize === size}
              className={`font-Jost flex items-center text-[16px] w-[42px] h-[42px] justify-center border-2 rounded-lg cursor-pointer focus:outline-none ${
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
      <div className="max-w-[272px] flex flex-col">
        <div
          className="w-[272px] flex flex-row items-center justify-between cursor-pointer"
          onClick={() => setIsCategoriesCollapsed(!isCategoriesCollapsed)}
        >
          <p className="font-playfair text-[18px] text-wine text-left font-semibold">
            Categories
          </p>
          <img
            src={FilterArrow}
            alt="Filter icon"
            className={`w-[12.25px] h-[14px] transform transition-transform duration-300 ${
              isCategoriesCollapsed ? "rotate-180" : "rotate-270"
            }`}
          />
        </div>

        {!isCategoriesCollapsed && (
          <div className="mt-2">
            {categoryItems.map((category, index) => (
              <div
                key={index}
                className="w-[272px] flex flex-row items-center justify-between"
              >
                <label
                  htmlFor={`category-${index}`}
                  className={`font-Poppins text-[16px] cursor-pointer ${
                    category.isChecked ? "text-wine" : "text-ThirdColor"
                  }`}
                >
                  {category.name}
                </label>
                <input
                  type="checkbox"
                  checked={category.isChecked}
                  onChange={() => handleCategoryChange(index)}
                  id={`category-${index}`}
                  className="border-2 rounded-[4px] w-[20px] h-[20px] appearance-none cursor-pointer border-ThirdColor bg-customBeige checked:bg-wine checked:border-wine "
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collections Filter */}
      <div className="max-w-[272px] flex flex-col">
        <div
          className="w-[272px] flex flex-row items-center justify-between cursor-pointer"
          onClick={() => setIsCollectionsCollapsed(!isCollectionsCollapsed)}
        >
          <p className="font-playfair text-[18px] text-wine text-left font-semibold">
            Collections
          </p>
          <img
            src={FilterArrow}
            alt="Filter icon"
            className={`w-[12.25px] h-[14px] transform transition-transform duration-300 ${
              isCollectionsCollapsed ? "rotate-180" : "rotate-270"
            }`}
          />
        </div>

        {!isCollectionsCollapsed && (
          <div className="mt-2">
            {collections.map((collection, index) => (
              <p
                key={index}
                className={`font-Poppins text-[16px] cursor-pointer ${
                  selectedCollection === index ? "text-wine" : "text-ThirdColor"
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
      <div className="max-w-[272px] flex flex-col">
        <p className="font-playfair text-[18px] text-wine text-left font-semibold">
          Price Range
        </p>
        <div className="flex justify-between mt-2">
          <span className="font-Poppins text-[16px] text-wine">
            EGP {priceRange[0]}
          </span>
          <span className="font-Poppins text-[16px] text-wine">
            EGP {priceRange[1]}
          </span>
        </div>
        <ReactSlider
          className="relative w-[263px] items-center rounded-md mt-2"
          thumbClassName="absolute relative transform -translate-y-1/2 w-4 h-4 bg-wine rounded-full cursor-pointer focus:outline-none focus:ring-wine"
          trackClassName="h-[1px] bg-ThirdColor"
          min={0}
          max={1000}
          step={1}
          value={priceRange}
          onChange={(values) => setPriceRange(values as [number, number])}
          withTracks={true}
          pearling
          minDistance={10}
        />
      </div>

      {/* Filter Button */}
      <button
        className="font-Playfair w-full max-w-[263px] h-[60px] bg-wine text-[20px] text-white rounded-md mt-4 focus:outline-none focus:ring-0"
        aria-label="Apply filters"
        onClick={handleFilterClick}
      >
        Filter
      </button>
    </div>
  );
};

export default Filter;
