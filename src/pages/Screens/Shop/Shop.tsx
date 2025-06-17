import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchFilteredProducts } from "@services/api/fetchFilteredProducts";
import { fetchCategories } from "@services/api/fetchCategories";
import { useParams, Navigate, useSearchParams } from "react-router-dom";
import { Filter, ProductsDisplay } from "@components/organisms";
import { Breadcrumb, LoadingSkeleton } from "@components/molecules";
import FilterIcon from "@assets/FilterIcon.svg";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/useLanguage";
import { Category } from "@types";
import noProducts from "@assets/no-products.png";
const slugify = (t: string) => t.replace(/\s+/g, "-").toLowerCase();

const matchBySlug = (cats: Category[], raw?: string) => {
  if (!raw) return undefined;
  const norm = slugify(raw);
  return (
    cats.find((c) => c.slug?.toLowerCase() === norm) ||
    cats.find(
      (c) =>
        slugify(c.nameEn || c.name) === norm ||
        slugify(c.nameAr || c.name) === norm
    )
  );
};

type ShopParams = { mainSlug: string; subSlug?: string };

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

  /* ---------- URL params ---------- */
  const { mainSlug, subSlug } = useParams<ShopParams>();
  const activeSlug = subSlug ?? mainSlug; // ← always the slug we display/query

  /* ---------- pagination ---------- */
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = useMemo(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    return Number.isNaN(p) || p < 1 ? 1 : p;
  }, [searchParams]);
  const [pageNumber, setPageNumber] = useState(initialPage);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    setSearchParams(params, { replace: true });
  }, [pageNumber, searchParams, setSearchParams]);

  useEffect(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    if (!Number.isNaN(p) && p !== pageNumber) setPageNumber(p);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    [pageNumber]
  );

  /* ---------- UI state ---------- */
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const pageSize = 12;

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isMainCategory, setIsMainCategory] = useState(false);
  const [slugChecked, setSlugChecked] = useState(false);

  /* ---------- fetch all categories once ---------- */
  const {
    data: allCats = [],
    isLoading: catsLoading,
    error: catsError,
  } = useQuery<Category[], Error>(["allCategories"], fetchCategories, {
    staleTime: 5 * 60_000,
  });

  /* ---------- resolve slug → categoryID ---------- */
  useEffect(() => {
    if (allCats.length === 0) return;
    const matched = matchBySlug(allCats, activeSlug);
    if (matched) {
      setCategoryId(matched.categoryID);
      setIsMainCategory(matched.parentCategoryID === null);
    } else {
      setCategoryId(null);
      setIsMainCategory(false);
    }
    setSlugChecked(true);
  }, [allCats, activeSlug]);

  /* ---------- child-category list for filter ---------- */
  const subcats = useMemo(() => {
    if (!allCats || categoryId === null) return [];
    const current = allCats.find((c) => c.categoryID === categoryId);
    if (!current) return [];
    return current.parentCategoryID === null
      ? allCats.filter((c) => c.parentCategoryID === current.categoryID)
      : allCats.filter((c) => c.parentCategoryID === current.parentCategoryID);
  }, [allCats, categoryId]);

  /* ---------- products query ---------- */
  const resolvedParentIds: number[] = React.useMemo(() => {
    if (categoryId === null) return [];

    if (isMainCategory) return [categoryId]; // e.g. “Men”

    const parentId = allCats.find(
      (c) => c.categoryID === categoryId
    )?.parentCategoryID;
    return parentId ? [parentId] : []; // e.g. parent of “Shirts” (= Men)
  }, [categoryId, isMainCategory, allCats]);

  const resolvedCategoryIds: number[] | undefined = React.useMemo(() => {
    if (categoryId === null) return undefined;

    // sub-category selected → include it as an explicit category filter
    return isMainCategory
      ? filterCriteria.categories?.map(Number)
      : [categoryId, ...(filterCriteria.categories?.map(Number) || [])];
  }, [categoryId, isMainCategory, filterCriteria.categories]);

  const {
    data: productsData,
    isLoading: prodsLoading,
    error: prodsError,
  } = useQuery(
    [
      "categoryProducts",
      resolvedParentIds,
      resolvedCategoryIds,
      pageNumber,
      language,
    ],
    () =>
      fetchFilteredProducts({
        parentCategories: resolvedParentIds,
        categoryIds: resolvedCategoryIds,
        minPrice: filterCriteria.priceRange?.[0],
        maxPrice: filterCriteria.priceRange?.[1],
        sizeLabels: filterCriteria.size ? [filterCriteria.size] : undefined,
        pageNumber,
        pageSize,
        isEnglish: language !== "ar",
      }),
    {
      enabled:
        resolvedParentIds.length > 0 || resolvedCategoryIds !== undefined,
      keepPreviousData: true,
    }
  );

  /* ---------- pagination helpers ---------- */
  const totalPages = Math.ceil((productsData?.totalCount || 0) / pageSize);

  const getPageNumbers = () => {
    const pageNumbers: (number | "left" | "right")[] = [];
    const maxPageButtons = 4;
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else if (pageNumber <= maxPageButtons - 1) {
      for (let i = 1; i <= maxPageButtons; i++) pageNumbers.push(i);
      pageNumbers.push("right");
    } else if (pageNumber > totalPages - maxPageButtons + 1) {
      pageNumbers.push("left");
      for (let i = totalPages - maxPageButtons + 1; i <= totalPages; i++)
        pageNumbers.push(i);
    } else {
      pageNumbers.push("left");
      for (let i = pageNumber - 1; i <= pageNumber + 1; i++)
        pageNumbers.push(i);
      pageNumbers.push("right");
    }
    return pageNumbers;
  };

  /* ---------- display name (breadcrumb header) ---------- */
  const displayName = useMemo(() => {
    if (isMainCategory && categoryId !== null) {
      const map: Record<number, { en: string; ar: string }> = {
        1: { en: "Men", ar: "رجالي" },
        2: { en: "Women", ar: "حريمي" },
        3: { en: "Kids", ar: "أطفالي" },
      };
      if (map[categoryId])
        return isRTL ? map[categoryId].ar : map[categoryId].en;
    }
    if (productsData?.products.length) {
      const { category } = productsData.products[0];
      return isRTL
        ? category.nameAr || category.name
        : category.nameEn || category.name;
    }
    return (
      (activeSlug ?? "").charAt(0).toUpperCase() + (activeSlug ?? "").slice(1)
    );
  }, [isMainCategory, categoryId, productsData, isRTL, activeSlug]);
  useEffect(() => {
    if (isFilterOpen) {
      setShowSidebar(true);
    } else {
      const timer = setTimeout(() => setShowSidebar(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isFilterOpen]);

  /* ---------- loading / error states ---------- */
  if ((catsLoading || prodsLoading || !slugChecked) && !productsData) {
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

  if (catsError || prodsError) return <div>{t("common.errorLoading")}</div>;
  if (slugChecked && categoryId === null) return <Navigate to="/" />;

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
              <Filter
                onFilterChange={(f) => {
                  setFilterCriteria(f);
                  setPageNumber(1);
                }}
                onClose={() => setIsFilterOpen(false)}
                subcategories={subcats}
                mainCategoryId={categoryId!}
              />
            </div>
            <div
              className="flex-1 bg-black opacity-50"
              onClick={() => setIsFilterOpen(false)}
            />
          </div>
        )}

        {/* ---- sticky sidebar (desktop) ---- */}
        <div className="laptop:hidden w-full md:w-1/4 p-4 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <Filter
            onFilterChange={(f) => {
              setFilterCriteria(f);
              setPageNumber(1);
            }}
            subcategories={subcats}
            mainCategoryId={categoryId!}
          />
        </div>

        {/* ---- products ---- */}
        <div className="w-full p-4">
          <p className="kiwi font-playball text-3xl md:text-4xl text-wine text-left mb-4">
            {displayName}
          </p>
          +{" "}
          {productsData && productsData.products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-6">
              {/* replace with your own asset */}
              <img
                src={noProducts}
                alt={t("shop.noProductsAlt", "No products illustration")}
                className="w-60 h-60 opacity-80"
              />
              <p className="font-playfair text-xl text-ForthColor text-center">
                {t(
                  "shop.noProductsMessage",
                  "Sorry, no items match your filters."
                )}
              </p>
              <button
                onClick={() => {
                  setFilterCriteria({});
                  setPageNumber(1);
                }}
                className="px-5 py-3 bg-wine text-mainColor rounded-md hover:bg-sixColor transition-colors"
              >
                {t("shop.clearFilters", "Clear filters")}
              </button>
            </div>
          )}
          {/* mobile filter button */}
          <div className="banana laptop:flex hidden justify-start">
            <button onClick={() => setIsFilterOpen(true)}>
              <img src={FilterIcon} alt={t("filter.title")} />
            </button>
          </div>
          <ProductsDisplay products={productsData?.products || []} />
          {/* pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4 px-2">
              <button
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
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
                      onClick={() => setPageNumber(item)}
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
                  setPageNumber((prev) => Math.min(prev + 1, totalPages))
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
