import React, { useState, useEffect, useMemo } from "react";
import ReactSlider, { ReactSliderProps } from "react-slider";
import FilterIcon from "@assets/FilterIcon.svg";
import FilterArrow from "@assets/FilterArrow.svg";
import { IconX } from "@tabler/icons-react";
import { Button } from "@components/atoms";
import { useTranslation } from "react-i18next";
import { useShop } from "@context/ShopContext";

type SliderProps = ReactSliderProps<[number, number]>;
const Slider = ReactSlider as unknown as React.FC<SliderProps>;

const FALLBACK_KEYS = [
  "filter.categories.jackets",
  "filter.categories.coats",
  "filter.categories.shirts",
  "filter.categories.accessories",
  "filter.categories.pants",
  "filter.categories.shoes",
  "filter.categories.hats",
];

type FilterProps = { onClose?: () => void };

const Filter: React.FC<FilterProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const shop = useShop();

  /* ---------- subcategory list ---------- */
  const subcategories = useMemo(() => {
    if (!shop.parentId) return [];
    return shop.categories.filter((c) => c.parentCategoryID === shop.parentId);
  }, [shop.categories, shop.parentId]);

  /* ---------- local UI state ---------- */
  const [categoryItems, setCategoryItems] = useState<
    { id?: number; name: string }[]
  >([]);
  const [priceRange, setPriceRange] = useState<[number, number]>(
    shop.filters.priceRange ?? [0, 5000]
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  /* ---------- build category list whenever language / data change ---------- */
  useEffect(() => {
    const fallback = FALLBACK_KEYS.map((key) => ({ name: t(key) }));
    const cats = subcategories.length
      ? subcategories.map((c) => ({
          id: c.categoryID,
          name: isRTL ? c.nameAr ?? c.name : c.nameEn ?? c.name,
        }))
      : fallback;
    setCategoryItems(cats);
  }, [subcategories, i18n.language, t, isRTL]);

  /* ---------- handlers ---------- */
  const clickCategory = (id?: number) => {
    if (!id) return;
    shop.setActiveIds(shop.parentId, id);
    onClose?.();
  };

  const applyFilters = () => {
    shop.setFilters({ ...shop.filters, priceRange });
    onClose?.();
  };

  const clear = () => {
    setPriceRange([0, 5000]);
    shop.resetFilters();
    onClose?.();
  };

  /* ---------- render ---------- */
  return (
    <div className="flex flex-col items-start w-full">
      {/* header */}
      <div
        className="relative flex flex-col gap-2 w-full bg-customBeige"
        style={{ minHeight: 100 }}
      >
        {onClose && (
          <button
            onClick={onClose}
            aria-label={t("filter.close")}
            className="absolute right-2 text-wine border-wine border-2 rounded-full cursor-pointer"
          >
            <IconX size={28} />
          </button>
        )}

        <div className="absolute bottom-4 flex flex-row justify-between w-full items-center mt-2">
          <p className="font-playfair text-2xl font-bold text-wine text-left">
            {t("filter.title")}
          </p>
          <img src={FilterIcon} alt="Filter icon" className="h-6 w-6" />
        </div>
      </div>

      <div className="px-4 gap-9 w-full flex flex-col">
        {/* categories */}
        <div className="w-full flex flex-col">
          <div
            className="flex flex-row items-center justify-between cursor-pointer"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <p className="font-playfair text-2xl text-wine text-left font-semibold">
              {t("filter.categoriestitle")}
            </p>
            <img
              src={FilterArrow}
              alt=""
              className={`w-5 h-5 transform transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : "rotate-270"
              }`}
            />
          </div>

          {!isCollapsed && (
            <div className="mt-2">
              {categoryItems.length ? (
                categoryItems.map((cat, idx) => (
                  <div
                    key={`cat-${cat.id ?? idx}`}
                    className="flex flex-row items-center justify-between py-2 cursor-pointer hover:bg-wine/10 px-2 rounded transition-colors"
                    onClick={() => clickCategory(cat.id)}
                  >
                    <span className="font-Poppins text-base text-wine hover:text-wine/80 transition-colors">
                      {cat.name}
                    </span>
                    <span className="text-wine">&rsaquo;</span>
                  </div>
                ))
              ) : (
                <p className="text-ThirdColor font-Poppins text-sm py-2">
                  {t("filter.noCategories")}
                </p>
              )}
            </div>
          )}
        </div>

        {/* price range */}
        <div className="w-full flex flex-col">
          <p className="font-playfair text-2xl text-wine ltr:text-left rtl:text-right font-semibold">
            {t("filter.priceRange")}
          </p>
          <div className="flex justify-between mt-2">
            <span className="font-Poppins text-base text-wine">
              EGP {priceRange[0]}
            </span>
            <span className="font-Poppins text-base text-wine">
              EGP {priceRange[1]}
            </span>
          </div>
          <Slider
            className="relative w-full items-center rounded-md mt-2"
            thumbClassName="absolute relative transform -translate-y-1/2 w-4 h-4 bg-wine rounded-full cursor-pointer"
            trackClassName="h-[1px] bg-ThirdColor"
            min={0}
            max={5000}
            step={100}
            value={priceRange}
            onChange={(v: [number, number]) => setPriceRange(v)}
            withTracks
            pearling
            minDistance={10}
          />
        </div>

        {/* buttons */}
        <Button
          label={t("filter.apply")}
          type="primary"
          onClick={applyFilters}
          style={{
            width: "90%",
            maxHeight: 60,
            fontSize: 20,
            alignSelf: "center",
            fontFamily: "PlayFair",
          }}
        />
        <Button
          label={t("filter.clear")}
          type="secondary"
          onClick={clear}
          style={{
            width: "90%",
            maxHeight: 50,
            fontSize: 16,
            marginTop: 10,
            alignSelf: "center",
            fontFamily: "PlayFair",
            backgroundColor: "transparent",
            border: "1px solid #7D3B3B",
            color: "#7D3B3B",
          }}
        />
      </div>
    </div>
  );
};

export default Filter;
