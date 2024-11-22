import React, { useState } from "react";
import ReactSlider from "react-slider";
// import FilterIcon from "@assets/FilterIcon.svg";
import FilterArrow from "@assets/FilterArrow.svg";
import { Button } from "@components/atoms";

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
    { name: "Accessories", isChecked: false },
    { name: "Pants", isChecked: false },
    { name: "Shoes", isChecked: false },
    { name: "Hats", isChecked: false },
  ];

  const collections = [
    "All products",
    "Best sellers",
    "New arrivals",
    "Accessories",
  ];

  const ALL_PRODUCTS_INDEX = 0;

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<number | null>(
    null
  );
  const [categoryItems, setCategoryItems] =
    useState<Category[]>(initialCategories);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

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
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
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
    <div className="flex flex-col items-start px-4 gap-[36px] w-full  mt-10">
      {/* title div here*/}
      <div className="flex flex-col w-full">
        <p className="font-playfair text-[20px] md:text-[30px] text-wine text-left font-semibold">
          Size
        </p>
        <div
          className="flex gap-3 sm:gap-4 mt-2 w-full items-center justify-evenly"
          role="group"
          aria-label="Size selection"
        >
          {sizes.map((size, index) => (
            <div
              key={index}
              onClick={() => handleSizeClick(size)}
              role="button"
              tabIndex={0}
              aria-pressed={selectedSize === size}
              className={`font-Jost flex items-center text-[10px] w-[30px] h-[30px] md:text-[16px] md:w-[42px] md:h-[42px] justify-center border-2 rounded-lg cursor-pointer focus:outline-none ${
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

      <div className="w-full flex flex-col">
        <div
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={() => setIsCategoriesCollapsed(!isCategoriesCollapsed)}
        >
          <p className="font-playfair text-[20px] md:text-[30px] text-wine text-left font-semibold">
            Categories
          </p>
          <img
            src={FilterArrow}
            alt="Filter icon"
            className={`w-[21px] h-[21px] transform transition-transform duration-300 ${
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

      <div className="w-full flex flex-col">
        <div
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={() => setIsCollectionsCollapsed(!isCollectionsCollapsed)}
        >
          <p className="font-playfair text-[20px] md:text-[30px] text-wine text-left font-semibold">
            Collections
          </p>
          <img
            src={FilterArrow}
            alt="Filter icon"
            className={`w-[21px] h-[21px] transform transition-transform duration-300 ${
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

      <div className="w-[100%] flex flex-col">
        <p className="font-playfair text-[20px] md:text-[30px] text-wine text-left font-semibold">
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
          className="relative w-[100%] items-center rounded-md mt-2"
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
      <Button
        label="Filter"
        type="primary"
        onClick={handleFilterClick}
        style={{
          width: "90%",
          maxHeight: "60px",
          fontSize: "20px",
          alignSelf:"center",
        }}
      />
    </div>
  );
};

export default Filter;
