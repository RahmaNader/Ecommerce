import React from "react";
import { Breadcrumb } from "@components/molecules";
import { SearchBar } from "@components/molecules";

const SearchScreen: React.FC = () => {
  return (
    <div className="flex flex-col justify-left items-start w-full mt-8 px-4">
      {/*
      // search bar
      // search suggestions
      // search results
        */}
        <Breadcrumb />
        <SearchBar />
    </div>

  );
};

export default SearchScreen;
