import React from "react";
import { Link, useLocation } from "react-router-dom";

interface Category {
  categoryID: number;
  name: string;
  nameEn: string;
  nameAr: string;
  parentCategoryID: number | null;
  createdAt: string;
}

type ShopModalProps = {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  categories: Category[];
  language: string;
};

const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  categories,
  language,
}) => {
  const location = useLocation();
  
  // Helper function to get the appropriate category name based on language
  const getCategoryName = (category: Category) => {
    if (language === "ar") {
      return category.nameAr || category.name;
    }
    return category.nameEn || category.name;
  };

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
            const mainCatName = getCategoryName(mainCat);
            const mainPath = `/products/${mainCatName.toLowerCase()}`;
            const isMainActive = location.pathname === mainPath;

            return (
              <div key={mainCat.categoryID} className="text-center">
                <Link
                  to={mainPath}
                  state={{ categoryId: mainCat.categoryID }}
                  className={`text-xl font-bold ${
                    isMainActive ? "text-wine" : "text-wine"
                  } mb-4 block hover:underline`}
                >
                  {getCategoryName(mainCat)}
                </Link>
                <ul className="space-y-2">
                  {subcategories.map((sub) => {
                    const subCatName = getCategoryName(sub);
                    const subPath = `/products/${mainCatName.toLowerCase()}/${subCatName.toLowerCase()}`;
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
                          {getCategoryName(sub)}
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
