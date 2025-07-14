import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, type Variants } from "framer-motion";

import { Button } from "@components/atoms";
import { ProductsGrid } from "@components/organisms/ProductsGrid/ProductsGrid";
import { CategoryItem } from "@components/atoms/CategoryItem/CategoryItem";
import { fetchHomeCategory } from "@services/api/fetchCollections";
import { useLanguage } from "@context/useLanguage";

import kids from "@assets/Kids.jpeg";
import women from "@assets/WomenCategory.jpg";
import men from "@assets/MenCategory.jpeg";
import { useIsSmall } from "@hooks/useIsSmall";

const slugify = (txt: string) =>
  txt
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "");

/* ─────────────────────────────────────────────────────────
   1 ▪ Grid st agger  (slower reveal)
   ───────────────────────────────────────────────────────── */
const gridVariants: Variants = {
  hidden: {},
  show: {
    /* was 0.15 / 0.1   →   now each card waits a bit longer */
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

/* ─────────────────────────────────────────────────────────
   2 ▪ Fade-slide  (slower spring)
   ───────────────────────────────────────────────────────── */
const fadeSlide: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      /* ↓ lower stiffness + extra damping  → gentler + longer */
      stiffness: 80,
      damping: 18,
    },
  },
};

/* ─────────────────────────────────────────────────────────
   3 ▪ Section fade-in
   ───────────────────────────────────────────────────────── */
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    /* was 0.4 s → now 0.8 s */
    transition: { duration: 0.8 },
  },
};

/* ─────────────────────────────────────────────────────────
   4 ▪ “Swoop” animations for small screens
   ───────────────────────────────────────────────────────── */
const swoopLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 140, // lower = slower
      damping: 20,
    },
  },
};

const swoopRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 20,
    },
  },
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isSmall = useIsSmall();
  const handleCategoryClick = (
    nameEn: string,
    nameAr: string,
    categoryId: number
  ) => {
    const slug = slugify(language === "ar" ? nameAr : nameEn);
    navigate(`/products/${slug}`, {
      state: { categoryId, isMainCategory: true },
    });
  };

  const handleButtonClick = (collectionType: string) => {
    navigate(
      `/collection/${collectionType.toLowerCase().replace(/\s+/g, "-")}`
    );
  };

  /* ---------- data queries ---------- */
  const { data: newArrivals } = useQuery("newArrivals", () =>
    fetchHomeCategory(3, "new-arrivals")
  );
  const { data: bestSellers } = useQuery("bestSellers", () =>
    fetchHomeCategory(3, "best-selling")
  );
  const { data: highestDiscount } = useQuery("highestDiscount", () =>
    fetchHomeCategory(3, "highest-discount")
  );

  /* ---------- render ---------- */
  return (
    <>
      {/* Category grid */}
      <div className="w-[90%] mx-auto px-16">
        <motion.section
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid auto-rows-[1fr] gap-y-20 gap-x-10 justify-center"
          style={{ gridTemplateColumns: "repeat(auto-fit, 225px)" }}
        >
          <motion.div
            variants={isSmall ? swoopLeft : fadeSlide}
            initial="hidden"
            whileInView="show"
            /*  ↓ fire only after the card is **completely** in view  */
            viewport={{
              once: true,
              amount: 0.8,
              margin: "-64px 0px -32px 0px",
            }}
          >
            <CategoryItem
              src={men}
              alt="Men"
              onClick={() => handleCategoryClick("Men", "رجالي", 1)}
              label={t("home.men")}
            />
          </motion.div>

          <motion.div
            variants={fadeSlide}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.8,
              margin: "-64px 0px -32px 0px",
            }}
          >
            <CategoryItem
              src={women}
              alt="Women"
              onClick={() => handleCategoryClick("Women", "حريمي", 2)}
              label={t("home.women")}
            />
          </motion.div>

          <motion.div
            variants={isSmall ? swoopRight : fadeSlide}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.8,
              margin: "-64px 0px -32px 0px",
            }}
          >
            <CategoryItem
              src={kids}
              alt="Kids"
              onClick={() => handleCategoryClick("Kids", "اطفالي", 3)}
              label={t("home.kids")}
            />
          </motion.div>
        </motion.section>
      </div>

      {/* Collections */}
      <motion.div
        className="flex flex-col"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {newArrivals && newArrivals.length > 0 && (
          <>
            <ProductsGrid
              products={newArrivals}
              sectionName={t("home.newCollection")}
            />

            <div className="flex justify-center mt-12">
              <Button
                label={t("home.viewCollection")}
                onClick={() => handleButtonClick("new-arrivals")}
              />
            </div>
          </>
        )}

        {bestSellers && bestSellers.length > 0 && (
          <>
            <ProductsGrid
              products={bestSellers}
              sectionName={t("home.bestSellers")}
            />

            <div className="flex justify-center mt-12">
              <Button
                label={t("home.viewBestSellers")}
                onClick={() => handleButtonClick("best-selling")}
              />
            </div>
          </>
        )}

        {highestDiscount && highestDiscount.length > 0 && (
          <>
            <ProductsGrid
              products={highestDiscount.slice(0, 3)}
              sectionName={t("home.highestDiscount")}
            />

            <div className="flex justify-center mt-12">
              <Button
                label={t("home.viewDiscounts")}
                onClick={() => handleButtonClick("highest-discount")}
              />
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Home;
