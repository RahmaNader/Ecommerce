import React from "react";
import { ProductsView } from "@components/molecules";
import { Button } from "@components/atoms";
import { useQuery } from "react-query";
import { fetchHomeCategory } from "@services/api/fetchCollections";
import kids from "@assets/HP_kids.svg";
import women from "@assets/HP_women.svg";
import men from "@assets/HP_men.svg";
import { useTranslation } from "react-i18next";


const Home: React.FC = () => {
  const { t } = useTranslation();
  const handleButtonClick = (section: string) => {
    console.log("Button clicked: " + section);
  };

  const {
    data: newArrivals,
    isLoading: isLoadingNewArrivals,
    isError: isErrorNewArrivals,
  } = useQuery("newArrivals", () => fetchHomeCategory(4, "new-arrivals", "New Arrivals"));

  const {
    data: bestSellers,
    isLoading: isLoadingBestSellers,
    isError: isErrorBestSellers,
  } = useQuery("bestSellers", () => fetchHomeCategory(4, "best-selling", "Best Sellers"));

  const {
    data: highestDiscount,
    isLoading: isLoadingHighestDiscount,
    isError: isErrorHighestDiscount,
  } = useQuery("highestDiscount", () => fetchHomeCategory(4, "best-selling", "Best Sellers"));

  return (
    <>
      <div className="flex flex-wrap md:flex-row justify-center items-center md:justify-between my-20 mx-8 md:mx-32">
        <button onClick={() => handleButtonClick("kids")} className="cursor-pointer hover:opacity-80 mb-8 md:mb-0">
          <img src={kids} alt="kids-image" />
        </button>
        <button onClick={() => handleButtonClick("women")} className="cursor-pointer hover:opacity-80 mb-8 md:mb-0">
          <img src={women} alt="women-image" />
        </button>
        <button onClick={() => handleButtonClick("men")} className="cursor-pointer hover:opacity-80">
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
            <Button label={t("home.viewCollection")} onClick={() => handleButtonClick("Best Seller")} />
            </div>
          </>
        )}

        {isLoadingBestSellers && <p>{t("home.loadingBestSellers")}</p>}
        {isErrorBestSellers && <p>{t("home.errorBestSellers")}</p>}
        {bestSellers && bestSellers.length > 0 && (
          <>
            <ProductsView sectionName={t("home.bestSellers")} cards={bestSellers} />
            <div className="flex justify-center mt-12">
              <Button label={t("home.viewBestSellers")} onClick={() => handleButtonClick("Best Seller")} />
            </div>
          </>
        )}

        {isLoadingHighestDiscount && <p>{t("home.loadingHighestDiscount")}</p>}
        {isErrorHighestDiscount && <p>{t("home.errorHighestDiscount")}</p>}
        {highestDiscount && highestDiscount.length > 0 && (
          <>
            <ProductsView sectionName={t("home.highestDiscount")} cards={highestDiscount} />
            <div className="flex justify-center mt-12">
              <Button label={t("home.viewDiscounts")} onClick={() => handleButtonClick("Highest Discount")} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;