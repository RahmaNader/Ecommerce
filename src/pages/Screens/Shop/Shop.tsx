import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import {
  fetchCategoryProducts,
  fetchMainCategoryProducts,
} from "@services/api/fetchCategoryProducts";
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

  const { data: allCategories, isLoading: categoriesLoading } = useQuery(
    ["allCategories"],
    fetchCategories,
    { staleTime: 300000 }
  );

  const {
    data: products,
    isLoading: productsLoading,
    error,
  } = useQuery(
    ["categoryProducts", categoryId],
    () => {
      const isMainCategoryFromHome = location.state?.isMainCategory;
      return isMainCategoryFromHome
        ? fetchMainCategoryProducts(categoryId)
        : fetchCategoryProducts(categoryId);
    },
    { enabled: !!categoryId, staleTime: 300000 }
  );

  const subcategories = useMemo(() => {
    if (!allCategories || !categoryId) return [];
    const currentCategory = allCategories.find(
      (cat: Category) => cat.categoryID === parseInt(categoryId)
    );
    if (currentCategory?.parentCategoryID === null) {
      return allCategories.filter(
        (cat: Category) => cat.parentCategoryID === currentCategory.categoryID
      );
    } else if (currentCategory?.parentCategoryID) {
      return allCategories.filter(
        (cat: Category) =>
          cat.parentCategoryID === currentCategory.parentCategoryID
      );
    }
    return [];
  }, [allCategories, categoryId]);

  useEffect(() => {
    setShowSidebar(isFilterOpen);
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
        filtered = filtered.filter(
          (product) =>
            Number(product.priceAfterDiscount) >=
              filterCriteria.priceRange![0] &&
            Number(product.priceAfterDiscount) <= filterCriteria.priceRange![1]
        );
      }
    }
    return filtered;
  }, [products, filterCriteria]);

  const isLoading = productsLoading || categoriesLoading;
  if (isLoading) return <Loading />;
  if (error) return <div>{t("common.errorLoading")}</div>;
  if (!category) return <Navigate to="/" />;

  const handleFilterChange = (filters: FilterCriteria) =>
    setFilterCriteria(filters);

  const handleCloseSidebar = () => {
    setIsFilterOpen(false);
    setShowSidebar(false);
  };

  const getCategoryDisplayName = () => {
    const isMainCategory = location.state?.isMainCategory;
    if (isMainCategory) {
      const mainCategoryMap: Record<number, { en: string; ar: string }> = {
        1: { en: "Men", ar: "رجالي" },
        2: { en: "Women", ar: "حريمي" },
        3: { en: "Kids", ar: "أطفالي" },
      };
      if (categoryId && mainCategoryMap[categoryId]) {
        return isRTL
          ? mainCategoryMap[categoryId].ar
          : mainCategoryMap[categoryId].en;
      }
    }
    if (!products || products.length === 0) {
      return (
        (lastSegment ?? "").charAt(0).toUpperCase() +
        (lastSegment ?? "").slice(1)
      );
    }
    const firstProduct = products[0];
    return isRTL
      ? firstProduct.category.nameAr || firstProduct.category.name
      : firstProduct.category.nameEn || firstProduct.category.name;
  };

  return (
    <div
      className={`bg-customBeige min-h-screen p-2 md:p-10 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <Breadcrumb />
      <div className="flex flex-col xl:flex-row xl:items-start items-center">
        {showSidebar && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className={`transform ${
                isFilterOpen
                  ? "translate-x-0"
                  : isRTL
                  ? "translate-x-full"
                  : "-translate-x-full"
              } transition-transform duration-300 ease-in-out sm:w-3/4 bg-mainColor p-4 overflow-y-auto ${
                isRTL ? "right-0" : "left-0"
              }`}
            >
              <div className="flex w-full">
                <Filter
                  onFilterChange={handleFilterChange}
                  onClose={handleCloseSidebar}
                  subcategories={subcategories}
                  mainCategoryId={parseInt(categoryId)}
                />
              </div>
            </div>
            <div
              className="flex-1 bg-black opacity-50"
              onClick={handleCloseSidebar}
            />
          </div>
        )}

        <div className="laptop:hidden w-full md:w-1/4 p-4 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <Filter
            onFilterChange={handleFilterChange}
            subcategories={subcategories}
            mainCategoryId={parseInt(categoryId)}
          />
        </div>

        <div className="w-full p-4">
          <p className="kiwi font-playball text-3xl md:text-4xl text-wine text-left mb-4">
            {getCategoryDisplayName()}
          </p>
          <div className="banana laptop:flex hidden justify-start">
            <button onClick={() => setIsFilterOpen(true)}>
              <img src={FilterIcon} alt={t("filter.title")} />
            </button>
          </div>
          <ProductsDisplay products={filteredProducts} language={language} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
