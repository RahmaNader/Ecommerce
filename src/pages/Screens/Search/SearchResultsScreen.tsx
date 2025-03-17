import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "@components/molecules";
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
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const results = await searchProducts(query, page, pageSize, !isRTL);
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
  }, [query, page, pageSize, isRTL, t]);

  return (
    <div className="flex flex-col w-full mt-8 px-4">
      <Breadcrumb />
      
      <h1 className="text-3xl text-wine font-playfair font-semibold my-6">
        {t("search.resultsFor")} "{query}"
      </h1>
      
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wine"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {!isLoading && !error && (
        <>
          <p className="text-lg text-ForthColor mb-6">
            {t("search.showing")} {products.length} {t("search.of")} {totalCount} {t("search.results")}
          </p>
          
          {products.length > 0 ? (
            <ProductsDisplay products={products} language={isRTL ? "ar" : "en"} />
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-ForthColor">{t("search.noProductsFound")}</p>
              <p className="mt-2 text-wine">{t("search.tryDifferentKeywords")}</p>
            </div>
          )}
          
          {totalCount > pageSize && (
            <div className="flex justify-center mt-10 mb-8">
              {/* Pagination buttons */}
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`px-4 py-2 mx-1 rounded ${
                  page === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-wine text-white hover:bg-wine/80"
                }`}
              >
                {t("pagination.previous")}
              </button>
              
              <span className="flex items-center px-4">
                {t("pagination.page")} {page} {t("pagination.of")} {Math.ceil(totalCount / pageSize)}
              </span>
              
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page >= Math.ceil(totalCount / pageSize)}
                className={`px-4 py-2 mx-1 rounded ${
                  page >= Math.ceil(totalCount / pageSize)
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-wine text-white hover:bg-wine/80"
                }`}
              >
                {t("pagination.next")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultsScreen;