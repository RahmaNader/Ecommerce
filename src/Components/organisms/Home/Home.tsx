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

const slugify = (txt: string) =>
  txt
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "");

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeSlide: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language } = useLanguage();

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
          <motion.div variants={fadeSlide}>
            <CategoryItem
              src={men}
              alt="Men"
              onClick={() => handleCategoryClick("Men", "رجالي", 1)}
              label={t("home.men")}
            />
          </motion.div>

          <motion.div variants={fadeSlide}>
            <CategoryItem
              src={women}
              alt="Women"
              onClick={() => handleCategoryClick("Women", "حريمي", 2)}
              label={t("home.women")}
            />
          </motion.div>

          <motion.div variants={fadeSlide}>
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
