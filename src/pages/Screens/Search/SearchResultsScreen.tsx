import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "@components/molecules";
import SearchBar from "@components/molecules/SearchBar/SearchBar"; // Import SearchBar
import { searchProducts } from "@services/api/search";
import { ProductsDisplay } from "@components/organisms";
import { useTranslation } from "react-i18next";
import { CardComponent } from "@types";

const SearchResultsScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const isRTL = i18n.language === "ar";
  
  const [products, setProducts] = useState<CardComponent[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocalizedSearchTerm = (term: string): string => {
    const popularTerms = ['jacket', 'shirt', 'dress', 'pants', 'shoes'];
    if (isRTL && popularTerms.includes(term.toLowerCase())) {
      return t(`search.popular.${term.toLowerCase()}`);
    }
    return term;
  };

  const localizedQuery = getLocalizedSearchTerm(query);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const results = await searchProducts(query, !isRTL);
        setProducts(results.products);
        setTotalCount(results.totalCount);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
        setError(t("search.errorFetching"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query,  isRTL, t]);



  return (
    <div className="flex flex-col items-center w-full">
      {/* Container with max-width and centered */}
      <div className="w-full max-w-[800px] px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        <Breadcrumb />
        <SearchBar /> {/* Add SearchBar here */}
        
        <h1 className="text-2xl sm:text-3xl text-wine font-playfair font-semibold mt-4 mb-4 sm:mb-6">
          {t("search.resultsFor")} "{localizedQuery}"
        </h1>
        
        {isLoading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-wine"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded relative my-4" role="alert">
            <span className="block text-sm sm:text-base">{error}</span>
          </div>
        )}
        
        {!isLoading && !error && (
          <>
            <p className="text-base sm:text-lg text-ForthColor mb-4 sm:mb-6">
              {t("search.showing")} {totalCount} {t("search.results")}
            </p>
            
            {products.length > 0 ? (
              <div className="w-full">
                <ProductsDisplay 
                  products={products} 
                  language={isRTL ? "ar" : "en"}
                />
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-lg sm:text-xl text-ForthColor">{t("search.noProductsFound")}</p>
                <p className="mt-2 text-sm sm:text-base text-wine">{t("search.tryDifferentKeywords")}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResultsScreen;