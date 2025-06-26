import React from "react";
// import { ProductsView } from "@components/molecules";
import { Button } from "@components/atoms";
import { useQuery } from "react-query";
import { fetchHomeCategory } from "@services/api/fetchCollections";
import kids from "@assets/Kids.jpeg";
import women from "@assets/WomenCategory.jpg";
import men from "@assets/MenCategory.jpeg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ProductsGrid } from "@components/organisms/ProductsGrid/ProductsGrid";
import { CategoryItem } from "@components/atoms/CategoryItem/CategoryItem";
import { buildProductPath } from "@utils/buildProductPath";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string, categoryId: number) => {
    navigate(buildProductPath(categoryName), {
      state: { categoryId, isMainCategory: true },
    });
  };

  const handleButtonClick = (collectionType: string) => {
    navigate(
      `/collection/${collectionType.toLowerCase().replace(/\s+/g, "-")}`
    );
  };

  const {
    data: newArrivals,
    isLoading: isLoadingNewArrivals,
    isError: isErrorNewArrivals,
  } = useQuery("newArrivals", () => fetchHomeCategory(3, "new-arrivals"));

  const {
    data: bestSellers,
    isLoading: isLoadingBestSellers,
    isError: isErrorBestSellers,
  } = useQuery("bestSellers", () => fetchHomeCategory(3, "best-selling"));

  const {
    data: highestDiscount,
    isLoading: isLoadingHighestDiscount,
    isError: isErrorHighestDiscount,
  } = useQuery("highestDiscount", () =>
    fetchHomeCategory(3, "highest-discount")
  );

  return (
    <>
      {/* Category Section - Updated for single column on small screens */}
      <div className="w-[90%] mx-auto px-16">
        <section
          className="grid auto-rows-[1fr] gap-y-20 gap-x-10 justify-center"
          style={{ gridTemplateColumns: "repeat(auto-fit, 225px)" }}
        >
          <CategoryItem
            src={men}
            alt="Men"
            onClick={() => handleCategoryClick("men", 1)}
            label={t("home.men")}
          />
          <CategoryItem
            src={women}
            alt="Women"
            onClick={() => handleCategoryClick("women", 2)}
            label={t("home.women")}
          />
          <CategoryItem
            src={kids}
            alt="Kids"
            onClick={() => handleCategoryClick("kids", 3)}
            label={t("home.kids")}
          />
        </section>
      </div>

      <div className="flex flex-col">
        {isLoadingNewArrivals && <p>{t("home.loadingNewCollection")}</p>}
        {isErrorNewArrivals && <p>{t("home.errorNewCollection")}</p>}
        {newArrivals && newArrivals.length > 0 && (
          <>
            {/* <ProductsView
              sectionName={t("home.newCollection")}
              cards={newArrivals}
            /> */}
            <ProductsGrid
              products={newArrivals}
              sectionName={t("home.newCollection")} // optional
            />

            <div className="flex justify-center mt-12">
              <Button
                label={t("home.viewCollection")}
                onClick={() => handleButtonClick("new-arrivals")}
              />
            </div>
          </>
        )}

        {isLoadingBestSellers && <p>{t("home.loadingBestSellers")}</p>}
        {isErrorBestSellers && <p>{t("home.errorBestSellers")}</p>}
        {bestSellers && bestSellers.length > 0 && (
          <>
            {/* <ProductsView
              sectionName={t("home.bestSellers")}
              cards={bestSellers}
            /> */}
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

        {isLoadingHighestDiscount && <p>{t("home.loadingHighestDiscount")}</p>}
        {isErrorHighestDiscount && <p>{t("home.errorHighestDiscount")}</p>}
        {highestDiscount && highestDiscount.length > 0 && (
          <>
            {/* <ProductsView
              sectionName={t("home.highestDiscount")}
              cards={highestDiscount}
            /> */}
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
      </div>
    </>
  );
};

export default Home;
