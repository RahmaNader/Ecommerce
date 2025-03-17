import React from "react";
import { Breadcrumb } from "@components/molecules";
import SearchBar from "@components/molecules/SearchBar/SearchBar";
import { useTranslation } from "react-i18next";

const SearchScreen: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col justify-left items-start w-full mt-8 px-4 min-h-[80vh]">
      <Breadcrumb />
      <h1 className="text-3xl text-wine font-playfair font-semibold my-6">
        {t("search.title")}
      </h1>
      <SearchBar />
      
      <div className="mt-12 w-full">
        <h2 className="text-2xl text-wine font-playfair mb-6">
          {t("search.popularSearches")}
        </h2>
        <div className="flex flex-wrap gap-3">
          {["jacket", "shirt", "dress", "pants", "shoes"].map((term) => (
            <div 
              key={term}
              className="px-4 py-2 bg-ForthColor/10 hover:bg-ForthColor/20 text-wine rounded-full cursor-pointer"
              onClick={() => window.location.href = `/search-results?query=${term}`}
            >
              {t(`search.popular.${term}`)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
