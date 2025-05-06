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
  categories: Category[];
  language: string;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
};

const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  categories,
  language,
  onMouseEnter,
  onMouseLeave
}) => {
  const location = useLocation();
  
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
      className="absolute left-1/2 top-full transform -translate-x-1/2 mt-4 z-50 w-[55%] 
                 transition-all duration-300 ease-in-out"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-customBeige p-10 rounded-lg shadow-custom-light border-t-2 border-wine/20">
        <div className="grid grid-cols-3 gap-10">
          {mainCategories.map((mainCat) => {
            const subcategories = categories.filter(
              (sub) => sub.parentCategoryID === mainCat.categoryID
            );
            const mainCatName = getCategoryName(mainCat);
            const mainPath = `/products/${mainCatName.toLowerCase()}`;
            const isMainActive = location.pathname === mainPath;

            return (
              <div key={mainCat.categoryID} className="flex flex-col">
                <div className="pb-2 mb-4 border-b border-wine/20">
                  <Link
                    to={mainPath}
                    state={{ categoryId: mainCat.categoryID, isMainCategory: true }}
                    className={`text-xl font-semibold text-wine hover:text-wine/80 
                              transition-colors duration-200 ${
                                isMainActive ? "underline underline-offset-4" : ""
                              }`}
                  >
                    {getCategoryName(mainCat)}
                  </Link>
                </div>
                <ul className="space-y-3">
                  {subcategories.map((sub) => {
                    const subCatName = getCategoryName(sub);
                    const subPath = `/products/${mainCatName.toLowerCase()}/${subCatName.toLowerCase()}`;
                    const isActive = location.pathname.includes(subPath);

                    return (
                      <li key={sub.categoryID} className="group">
                        <Link
                          to={subPath}
                          state={{ categoryId: sub.categoryID }}
                          className={`text-[16px] transition-all duration-200
                                    ${isActive
                                      ? "text-wine font-medium"
                                      : "text-mutedGray hover:text-wine/80"
                                    } flex items-center`}
                        >
                          <span className={`transition-all duration-200 
                                          ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`}>
                            {getCategoryName(sub)}
                          </span>
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
