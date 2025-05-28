// src/screens/Shop/Shop.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import {
  fetchCategoryProducts,
  fetchMainCategoryProducts,
} from "@services/api/fetchCategoryProducts";
import { fetchCategories } from "@services/api/fetchCategories";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { Filter, ProductsDisplay } from "@components/organisms";
import { Breadcrumb, Loading } from "@components/molecules";
import FilterIcon from "@assets/FilterIcon.svg";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/useLanguage";
import { Category } from "@types";

const slugify = (t: string) => t.replace(/\s+/g, "-").toLowerCase();

const matchBySlug = (cats: Category[], slug?: string) => {
  if (!slug) return undefined;
  const norm = slug.toLowerCase();
  return (
    cats.find((c) => c.slug?.toLowerCase() === norm) ??
    cats.find(
      (c) =>
        slugify((c.nameEn || c.name).toLowerCase()) === norm ||
        slugify((c.nameAr || c.name).toLowerCase()) === norm
    )
  );
};

type ShopParams = { category: string };
type NavState =
  | { categoryId?: number; isMainCategory?: boolean }
  | null
  | undefined;

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

  const { category: categorySlug } = useParams<ShopParams>();
  const location = useLocation();
  const navState = location.state as NavState;

  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isMainCategory, setIsMainCategory] = useState(false);
  const [slugChecked, setSlugChecked] = useState(false);

  const {
    data: allCats = [],
    isLoading: catsLoading,
    error: catsError,
  } = useQuery<Category[], Error>(["allCategories"], fetchCategories, {
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    if (allCats.length === 0) return;
    if (navState?.categoryId) {
      setCategoryId(navState.categoryId);
      setIsMainCategory(navState.isMainCategory ?? false);
      setSlugChecked(true);
      return;
    }

    // 2. Fallback: resolve from slug
    const matched = matchBySlug(allCats, categorySlug);
    if (matched) {
      setCategoryId(matched.categoryID);
      setIsMainCategory(matched.parentCategoryID === null);
    } else {
      setCategoryId(null);
      setIsMainCategory(false);
    }
    setSlugChecked(true);
  }, [allCats, categorySlug, navState]);

  const {
    data: products,
    isLoading: prodsLoading,
    error: prodsError,
  } = useQuery(
    ["categoryProducts", categoryId],
    () =>
      isMainCategory && categoryId !== null
        ? fetchMainCategoryProducts(categoryId)
        : fetchCategoryProducts(categoryId!),
    { enabled: categoryId !== null, staleTime: 5 * 60_000 }
  );

  const subcats = useMemo(() => {
    if (!allCats || categoryId === null) return [];
    const current = allCats.find((c) => c.categoryID === categoryId);
    if (!current) return [];
    return current.parentCategoryID === null
      ? allCats.filter((c) => c.parentCategoryID === current.categoryID)
      : allCats.filter((c) => c.parentCategoryID === current.parentCategoryID);
  }, [allCats, categoryId]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let out = [...products];

    if (filterCriteria.categories?.length) {
      out = out.filter((p) =>
        filterCriteria.categories!.includes(p.categoryID.toString())
      );
    }
    if (filterCriteria.priceRange) {
      const [min, max] = filterCriteria.priceRange;
      out = out.filter(
        (p) =>
          Number(p.priceAfterDiscount) >= min &&
          Number(p.priceAfterDiscount) <= max
      );
    }
    return out;
  }, [products, filterCriteria]);

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
    if (products && products.length > 0) {
      const { category } = products[0];
      return isRTL
        ? category.nameAr || category.name
        : category.nameEn || category.name;
    }
    return (
      (categorySlug ?? "").charAt(0).toUpperCase() +
      (categorySlug ?? "").slice(1)
    );
  }, [isMainCategory, categoryId, products, isRTL, categorySlug]);

  /* ───── effects ─────────────────────────────────────────────────── */

  useEffect(() => setShowSidebar(isFilterOpen), [isFilterOpen]);
  useEffect(() => setSlugChecked(!catsLoading), [categorySlug, catsLoading]);

  /* ───── guards ──────────────────────────────────────────────────── */

  if (catsLoading || prodsLoading || !slugChecked) return <Loading />;
  if (catsError || prodsError) return <div>{t("common.errorLoading")}</div>;
  if (slugChecked && categoryId === null) return <Navigate to="/" />;

  /* ───── render ──────────────────────────────────────────────────── */

  return (
    <div
      className={`bg-customBeige min-h-screen p-2 md:p-10 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <Breadcrumb />

      <div className="flex flex-col xl:flex-row xl:items-start items-center">
        {/* mobile overlay sidebar */}
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
                onFilterChange={setFilterCriteria}
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

        {/* desktop sticky sidebar */}
        <div className="laptop:hidden w-full md:w-1/4 p-4 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <Filter
            onFilterChange={setFilterCriteria}
            subcategories={subcats}
            mainCategoryId={categoryId!}
          />
        </div>

        {/* products */}
        <div className="w-full p-4">
          <p className="kiwi font-playball text-3xl md:text-4xl text-wine text-left mb-4">
            {displayName}
          </p>

          {/* filter button (mobile) */}
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
