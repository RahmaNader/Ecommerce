import React, { useMemo, useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Breadcrumb, LoadingSkeleton } from "@components/molecules";
import { Filter, ProductsDisplay } from "@components/organisms";
import FilterIcon from "@assets/FilterIcon.svg";
import noProducts from "@assets/no-products.png";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/useLanguage";
import { useShop } from "@context/ShopContext";

const Shop: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === "ar";
  const shop = useShop();

  /* ---------- local UI state ---------- */
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { mainSlug, subSlug } = useParams<{
    mainSlug?: string;
    subSlug?: string;
  }>();
  const prettify = (slug?: string) =>
    slug
      ? slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "";

  const displayName = useMemo(() => {
    // use category names when we have them
    const activeId = shop.subId ?? shop.parentId ?? null;
    if (activeId) {
      const cat = shop.categories.find((c) => c.categoryID === activeId);
      if (cat) {
        return isRTL
          ? cat.nameAr || cat.name // Arabic UI → Arabic label
          : cat.nameEn || cat.name; // English UI → English label
      }
    }
    // fallback: prettify the slug itself
    return prettify(subSlug ?? mainSlug);
  }, [shop.categories, shop.parentId, shop.subId, isRTL, mainSlug, subSlug]);

  /* ---------- derived display name ---------- */

  /* ---------- filter slide-in toggle (mobile) ---------- */
  useEffect(() => {
    if (isFilterOpen) setShowSidebar(true);
    else {
      const t = setTimeout(() => setShowSidebar(false), 0);
      return () => clearTimeout(t);
    }
  }, [isFilterOpen]);

  /* ---------- loading / error shortcuts ---------- */
  if (shop.loadingCats || shop.loadingProducts) {
    return (
      <div
        className={`bg-customBeige min-h-screen p-2 md:p-10 ${
          isRTL ? "rtl" : "ltr"
        }`}
      >
        <Breadcrumb />
        <div className="grid gap-y-4 gap-x-4 md:gap-x-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-items-center px-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-full max-w-[225px]">
              <LoadingSkeleton variant="product" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (shop.slugsChecked && !shop.parentId && !shop.subId)
    return <Navigate to="/" />;

  /* ---------- pagination helpers ---------- */
  const totalPages = shop.totalPages;
  const pageNumber = shop.pageNumber;

  const getPageNumbers = () => {
    const nums: (number | "left" | "right")[] = [];
    const maxButtons = 4;
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) nums.push(i);
    } else if (pageNumber <= maxButtons - 1) {
      for (let i = 1; i <= maxButtons; i++) nums.push(i);
      nums.push("right");
    } else if (pageNumber > totalPages - maxButtons + 1) {
      nums.push("left");
      for (let i = totalPages - maxButtons + 1; i <= totalPages; i++)
        nums.push(i);
    } else {
      nums.push("left");
      for (let i = pageNumber - 1; i <= pageNumber + 1; i++) nums.push(i);
      nums.push("right");
    }
    return nums;
  };

  const handlePageChange = (n: number) => {
    shop.setPageNumber(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- render ---------- */
  return (
    <div
      className={`bg-customBeige min-h-screen p-2 md:p-10 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <Breadcrumb />

      <div className="flex flex-col xl:flex-row xl:items-start items-center">
        {/* ---- slide-in filter (mobile) ---- */}
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
              <Filter onClose={() => setIsFilterOpen(false)} />
            </div>
            <div
              className="flex-1 bg-black opacity-50"
              onClick={() => setIsFilterOpen(false)}
            />
          </div>
        )}

        {/* ---- sticky sidebar (desktop) ---- */}
        <div className="laptop:hidden w-full md:w-1/4 p-4 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <Filter />
        </div>

        {/* ---- products ---- */}
        <div className="w-full p-4">
          <p className="kiwi font-playball text-3xl md:text-4xl text-wine text-left mb-4">
            {displayName}
          </p>

          {shop.products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-6">
              <img
                src={noProducts}
                alt={t("shop.noProductsAlt")}
                className="w-60 h-60 opacity-80"
              />
              <p className="font-playfair text-xl text-ForthColor text-center">
                {t(
                  "shop.noProductsMessage",
                  "Sorry, no items match your filters."
                )}
              </p>
              <button
                onClick={shop.resetFilters}
                className="px-5 py-3 bg-wine text-mainColor rounded-md hover:bg-sixColor transition-colors"
              >
                {t("shop.clearFilters")}
              </button>
            </div>
          )}

          {/* mobile filter button */}
          <div className="banana laptop:flex hidden justify-start">
            <button onClick={() => setIsFilterOpen(true)}>
              <img src={FilterIcon} alt={t("filter.title")} />
            </button>
          </div>

          <ProductsDisplay products={shop.products} />

          {/* pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4 px-2">
              <button
                onClick={() => handlePageChange(Math.max(pageNumber - 1, 1))}
                disabled={pageNumber === 1}
                className="px-3 sm:px-5 py-2 border border-wine text-wine rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
              >
                {t("pagination.previous")}
              </button>

              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                {getPageNumbers().map((item, idx) =>
                  typeof item === "number" ? (
                    <button
                      key={item}
                      onClick={() => handlePageChange(item)}
                      className={`rounded-full flex items-center justify-center font-medium w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-base ${
                        pageNumber === item
                          ? "bg-wine text-mainColor"
                          : "border border-wine text-wine"
                      }`}
                    >
                      {item}
                    </button>
                  ) : (
                    <span
                      key={`ellipsis-${item}-${idx}`}
                      className="rounded-full flex items-center justify-center border border-wine text-wine w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-base"
                    >
                      …
                    </span>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  handlePageChange(Math.min(pageNumber + 1, totalPages))
                }
                disabled={pageNumber === totalPages}
                className="px-3 sm:px-5 py-2 bg-wine text-mainColor rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
              >
                {t("pagination.next")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
