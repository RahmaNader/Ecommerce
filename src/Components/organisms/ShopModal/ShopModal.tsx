import React from "react";
import { Link, useLocation } from "react-router-dom";

// 1. Define an interface (or type) for each category shape:
interface Category {
  categoryID: number;
  name: string;
  parentCategoryID: number | null;
  createdAt: string; // if you care about it
}

type ShopModalProps = {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  // 2. Accept categories as a prop
  categories: Category[];
};

const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  categories,
}) => {
  const location = useLocation();

  // 3. Filter out main categories (parentCategoryID === null)
  const mainCategories = categories.filter(
    (cat) => cat.parentCategoryID === null
  );

  if (!isOpen) return null;

  return (
    <div
      className="bg-customBeige absolute left-1/2 top-full transform -translate-x-1/2 mt-4 z-50 w-[55%] ease-in shadow-custom-light"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-8 rounded-lg w-auto">
        {/* 4. Create columns for each main category */}
        <div className="grid grid-cols-3 gap-8">
          {mainCategories.map((mainCat) => {
            // 5. Find subcategories for this main category
            const subcategories = categories.filter(
              (sub) => sub.parentCategoryID === mainCat.categoryID
            );

            return (
              <div key={mainCat.categoryID} className="text-center">
                <h2 className="text-xl font-bold text-wine mb-4">
                  {mainCat.name}
                </h2>
                <ul className="space-y-2">
                  {/* 6. For each subcategory, build your <Link/> */}
                  {subcategories.map((sub) => {
                    // Construct a route, e.g. /products/men/pants or /products/women/tops
                    // Adjust your route strategy as needed
                    const subPath = `/products/${mainCat.name.toLowerCase()}/${sub.name.toLowerCase()}`;

                    // Check if link is active
                    const isActive = location.pathname.includes(subPath);

                    return (
                      <li key={sub.categoryID}>
                        <Link
                          to={subPath}
                          className={`text-[16px] ${
                            isActive
                              ? "text-wine font-medium"
                              : "text-mutedGray font-normal"
                          } hover:text-wine`}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    );
                  })}

                  {/* If you want to link the main category itself, you could add something here */}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
