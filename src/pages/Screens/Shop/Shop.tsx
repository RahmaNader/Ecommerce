import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { fetchCategoryProducts, fetchMainCategoryProducts } from "@services/api/fetchCategoryProducts";
import { fetchCategories } from "@services/api/fetchCategories";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { Filter, ProductsDisplay } from "@components/organisms";
import { Breadcrumb, Loading } from "@components/molecules";
import FilterIcon from "@assets/FilterIcon.svg";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/useLanguage";
import { Category } from "@types";

type ShopParams = {
  category: string;
  item?: string;
};

type FilterCriteria = {
  size?: string;
  collection?: number;
  categories?: string[];
  priceRange?: [number, number];
};

const Shop: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === "ar";
  
  const { category } = useParams<ShopParams>();
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const lastSegment = location.pathname.split("/").filter(Boolean).pop();

  // Fetch all categories
  const { data: allCategories, isLoading: categoriesLoading } = useQuery(
    ['allCategories'],
    fetchCategories,
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  // Fetch products for the current category
  const { data: products, isLoading: productsLoading, error } = useQuery(
    ['categoryProducts', categoryId],
    () => {
      // Check if this is a main category navigation (from home page)
      const isMainCategoryFromHome = location.state?.isMainCategory;
      
      if (isMainCategoryFromHome) {
        return fetchMainCategoryProducts(categoryId);
      } else {
        return fetchCategoryProducts(categoryId);
      }
    },
    {
      enabled: !!categoryId,
      staleTime: 5 * 60 * 1000,
    }
  );

  // Get subcategories for the current main category
  const subcategories = useMemo(() => {
    if (!allCategories || !categoryId) return [];
    
    // First, determine if we're looking at a main category
    const currentCategory = allCategories.find((cat: Category) => cat.categoryID === parseInt(categoryId));
    
    // If this is a main category (has null parentCategoryID)
    if (currentCategory?.parentCategoryID === null) {
      // Return its subcategories
      return allCategories.filter((cat: Category) => cat.parentCategoryID === currentCategory.categoryID);
    } 
    // If this is a subcategory, get siblings (other subcategories with same parent)
    else if (currentCategory?.parentCategoryID) {
      return allCategories.filter((cat: Category) => cat.parentCategoryID === currentCategory.parentCategoryID);
    }
    
    return [];
  }, [allCategories, categoryId]);

  useEffect(() => {
    if (isFilterOpen) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false)
    }
  }, [isFilterOpen]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    if (Object.keys(filterCriteria).length > 0) {
      if (filterCriteria.categories?.length) {
        filtered = filtered.filter((product) =>
          filterCriteria.categories?.includes(product.categoryID.toString())
        );
      }

      if (filterCriteria.priceRange) {
        filtered = filtered.filter((product) =>
          Number(product.priceAfterDiscount) >= filterCriteria.priceRange![0] &&
          Number(product.priceAfterDiscount) <= filterCriteria.priceRange![1]
        );
      }
    }

    return filtered;
  }, [products, filterCriteria]);

  const isLoading = productsLoading || categoriesLoading;
  
  if (isLoading) return <Loading />;
  if (error) return <div>{t("common.errorLoading")}</div>;

  if (!category) {
    return <Navigate to="/" />;
  }

  const handleFilterChange = (filters: FilterCriteria) => {
    setFilterCriteria(filters);
  };

  const handleCloseSidebar = () => {
    setIsFilterOpen(false);
    setShowSidebar(false); 
  };

  const getCategoryDisplayName = () => {
    // Check if we're viewing a main category
    const isMainCategory = location.state?.isMainCategory;
    
    if (isMainCategory) {
      // For main categories, use the category from URL or a mapping
      const mainCategoryMap: Record<number, { en: string; ar: string }> = {
        1: { en: "Men", ar: "رجالي" },
        2: { en: "Women", ar: "حريمي" },
        3: { en: "Kids", ar: "أطفالي" }
      };
      
      if (categoryId && mainCategoryMap[categoryId]) {
        return isRTL ? mainCategoryMap[categoryId].ar : mainCategoryMap[categoryId].en;
      }
    }
    
    // Fall back to existing logic for subcategories
    if (!products || products.length === 0) {
      return (lastSegment ?? "").charAt(0).toUpperCase() + (lastSegment ?? "").slice(1);
    }
    
    const firstProduct = products[0];
    if (isRTL) {
      return firstProduct.category.nameAr || firstProduct.category.name;
    } else {
      return firstProduct.category.nameEn || firstProduct.category.name;
    }
  };

  return (
    <div className={`bg-customBeige min-h-screen p-2 md:p-10 ${isRTL ? 'rtl' : 'ltr'}`}>
      <Breadcrumb />
      {/* Filter Sidebar for screens smaller than laptop size */}
      <div className="flex flex-col xl:flex-row xl:items-start items-center">
        {showSidebar && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className={`transform ${
                isFilterOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out sm:w-3/4 bg-mainColor p-4 overflow-y-auto ${
                isRTL ? "right-0" : "left-0"
              }`}
            >
              <div className="flex w-[100%]">
                <Filter
                  onFilterChange={handleFilterChange}
                  onClose={handleCloseSidebar}
                  subcategories={subcategories}
                  mainCategoryId={parseInt(categoryId)}
                />
              </div>
            </div>
            {/* Overlay */}
            <div
              className="flex-1 bg-black opacity-50"
              onClick={handleCloseSidebar}
            ></div>
          </div>
        )}

        {/* Desktop Filter for screens larger than laptop size */}
        <div className="laptop:hidden w-full md:w-1/4 p-4 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <Filter 
            onFilterChange={handleFilterChange} 
            subcategories={subcategories} 
            mainCategoryId={parseInt(categoryId)}
          />
        </div>

        {/* Products Section */}
        <div className="w-full lg:w-3/4 p-4">
          <div className="flex flex-row justify-between w-full px-4 mb-4 md:px-12">
            <p className="kiwi font-playball text-3xl md:text-4xl text-wine text-left">
              {getCategoryDisplayName()}
            </p>
            <div className="banana laptop:flex hidden justify-start">
              <button onClick={() => setIsFilterOpen(true)}>
                <img src={FilterIcon} alt={t("filter.title")} />
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <ProductsDisplay 
              products={filteredProducts} 
              language={language} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
