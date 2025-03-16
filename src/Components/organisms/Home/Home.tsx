import React from "react";
import { ProductsView } from "@components/molecules";
import { Button } from "@components/atoms";
import { useQuery } from "react-query";
import { fetchHomeCategory } from "@services/api/fetchCollections";
import kids from "@assets/HP_kids.svg";
import women from "@assets/HP_women.svg";
import men from "@assets/HP_men.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCategoryClick = (category: string, categoryId: number) => {
    navigate(`/products/${category.toLowerCase()}`, {
      state: { categoryId }
    });
  };

  const handleButtonClick = (collectionType: string) => {
    navigate(`/collection/${collectionType.toLowerCase().replace(/\s+/g, '-')}`);
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
  } = useQuery("highestDiscount", () => fetchHomeCategory(3, "highest-discount"));

  return (
    <>
      <div className="flex flex-wrap md:flex-row justify-center items-center md:justify-between my-20 mx-8 md:mx-32">
        <button 
          onClick={() => handleCategoryClick("kids", 3)} 
          className="cursor-pointer hover:opacity-80 mb-8 md:mb-0"
        >
          <img src={kids} alt="kids-image" />
        </button>
        <button 
          onClick={() => handleCategoryClick("women", 2)} 
          className="cursor-pointer hover:opacity-80 mb-8 md:mb-0"
        >
          <img src={women} alt="women-image" />
        </button>
        <button 
          onClick={() => handleCategoryClick("men", 1)} 
          className="cursor-pointer hover:opacity-80"
        >
          <img src={men} alt="men-image" />
        </button>
      </div>

      <div className="flex flex-col">
        {isLoadingNewArrivals &&<p>{t("home.loadingNewCollection")}</p>}
        {isErrorNewArrivals && <p>{t("home.errorNewCollection")}</p>}
        {newArrivals && newArrivals.length > 0 && (
          <>
            <ProductsView sectionName={t("home.newCollection")} cards={newArrivals} />
            <div className="flex justify-center mt-12">
              <Button label={t("home.viewCollection")} onClick={() => handleButtonClick("new-arrivals")} />
            </div>
          </>
        )}

        {isLoadingBestSellers && <p>{t("home.loadingBestSellers")}</p>}
        {isErrorBestSellers && <p>{t("home.errorBestSellers")}</p>}
        {bestSellers && bestSellers.length > 0 && (
          <>
            <ProductsView sectionName={t("home.bestSellers")} cards={bestSellers} />
            <div className="flex justify-center mt-12">
              <Button label={t("home.viewBestSellers")} onClick={() => handleButtonClick("best-selling")} />
            </div>
          </>
        )}

        {isLoadingHighestDiscount && <p>{t("home.loadingHighestDiscount")}</p>}
        {isErrorHighestDiscount && <p>{t("home.errorHighestDiscount")}</p>}
        {highestDiscount && highestDiscount.length > 0 && (
          <>
            <ProductsView sectionName={t("home.highestDiscount")} cards={highestDiscount} />
            <div className="flex justify-center mt-12">
              <Button label={t("home.viewDiscounts")} onClick={() => handleButtonClick("highest-discount")} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;