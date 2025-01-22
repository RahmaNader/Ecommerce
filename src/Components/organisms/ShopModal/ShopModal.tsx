import React from "react";
import { Link, useLocation } from "react-router-dom";

interface Category {
  categoryID: number;
  name: string;
  parentCategoryID: number | null;
  createdAt: string;
}

type ShopModalProps = {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  categories: Category[];
};

const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  categories,
}) => {
  const location = useLocation();
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
        <div className="grid grid-cols-3 gap-8">
          {mainCategories.map((mainCat) => {
            const subcategories = categories.filter(
              (sub) => sub.parentCategoryID === mainCat.categoryID
            );

            return (
              <div key={mainCat.categoryID} className="text-center">
                <h2 className="text-xl font-bold text-wine mb-4">
                  {mainCat.name}
                </h2>
                <ul className="space-y-2">
                  {subcategories.map((sub) => {
                    const subPath = `/products/${mainCat.name.toLowerCase()}/${sub.name.toLowerCase()}`;
                    const isActive = location.pathname.includes(subPath);

                    return (
                      <li key={sub.categoryID}>
                        <Link
                          to={subPath}
                          state={{ categoryId: sub.categoryID }}
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
