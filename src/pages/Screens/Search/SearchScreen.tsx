import React from "react";
import { Breadcrumb, SearchBar } from "@components/molecules";

const SearchScreen: React.FC = () => {
  return (
    <div className="flex flex-col justify-left items-start w-full mt-8 px-4">
        <Breadcrumb />
        <SearchBar />
    </div>

  );
};

export default SearchScreen;
