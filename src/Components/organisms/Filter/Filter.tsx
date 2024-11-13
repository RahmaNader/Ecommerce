import React, { useState } from "react";
import ReactSlider from "react-slider";
import FilterIcon from "@assets/FilterIcon.svg";
import FilterArrow from "@assets/FilterArrow.svg";

interface Category {
  name: string;
  isChecked: boolean;
}

const Filter: React.FC = () => {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const categories: Category[] = [
    { name: "Pants", isChecked: false },
    { name: "Tops", isChecked: false },
    { name: "Shoes", isChecked: false },
    { name: "Accessories", isChecked: false },
    { name: "Dresses", isChecked: false },
    { name: "Bags", isChecked: false },
    { name: "Suits", isChecked: false },
    { name: "Sports", isChecked: false },
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

  // State to manage category collapse
  const [isCategoriesCollapsed, setIsCategoriesCollapsed] =
    useState<boolean>(false);
  const [isCollectionsCollapsed, setIsCollectionsCollapsed] =
    useState<boolean>(false);

  // State to manage category items
  const [categoryItems, setCategoryItems] = useState<Category[]>(categories);

  // State for price range slider
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 1000]);

  // Function to handle clicking on a size box
  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  // Function to handle key press on a size box
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    size: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSizeClick(size);
    }
  };

  // Function to handle category collapse toggle
  const handleCategoriesToggle = () => {
    setIsCategoriesCollapsed(!isCategoriesCollapsed);
  };

  // Function to handle collections collapse toggle
  const handleCollectionsToggle = () => {
    setIsCollectionsCollapsed(!isCollectionsCollapsed);
  };

  // Function to handle category checkbox change
  const handleCategoryChange = (index: number) => {
    const updatedCategories = [...categoryItems];
    updatedCategories[index].isChecked = !updatedCategories[index].isChecked;
    setCategoryItems(updatedCategories);
  };

  const formatCurrency = (value: number) => {
    return `EGP ${value.toFixed(2)}`;
  };

  return (
    <div className="flex flex-col items-start p-0 gap-[36px] max-w-[305px] max-h-[845px] mt-10 ">
      <div className="flex flex-row items-center w-[269px] h-[36px] justify-between">
        <p className="font-playfair text-[30px] font-bold text-wine text-left">
          Filters
        </p>
        <img src={FilterIcon} alt="Filter icon" className="w-[27px] h-[25px]" />
      </div>

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
              onClick={() => handleSizeClick(size)}
              onKeyPress={(e) => handleKeyPress(e, size)}
              role="button"
              tabIndex={0}
              aria-pressed={selectedSize === size}
              className={`font-Jost flex items-center text-[16px] w-[42px] h-[42px] justify-center border-2 text-ThirdColor border-ThirdColor rounded-lg cursor-pointer focus:outline-none 
                ${
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

      <div className="max-w-[272px] flex flex-col">
        <div
          className="w-[272px] flex flex-row items-center justify-between cursor-pointer"
          onClick={handleCategoriesToggle}
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

        <div
          className={`mt-2 overflow-hidden transition-max-height duration-500 ease-in-out ${
            isCategoriesCollapsed ? "max-h-0" : "max-h-screen"
          }`}
        >
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
                className={`border-2 rounded-[4px] w-[20px] h-[20px] appearance-none cursor-pointer border-ThirdColor bg-customBeige checked:bg-wine checked:border-wine `}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[272px] flex flex-col">
        <div
          className="w-[272px] flex flex-row items-center justify-between cursor-pointer"
          onClick={handleCollectionsToggle}
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

        <div
          className={`mt-2 overflow-hidden transition-max-height duration-500 ease-in-out ${
            isCollectionsCollapsed ? "max-h-0" : "max-h-screen"
          }`}
        >
          <div className="list-disc">
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
        </div>
      </div>

      <div className="max-w-[272px] flex flex-col">
        <p className="font-playfair text-[18px] text-wine text-left font-semibold">
          Prices Range
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

      <button
        className=" font-Playfair w-[100%] max-w-[263px] h-[60px] bg-wine text-[20px] text-white  rounded-md mt-4 focus:outline-none focus:ring-0"
        aria-label="Apply filters"
      >
        Filter
      </button>
    </div>
  );
};

export default Filter;
