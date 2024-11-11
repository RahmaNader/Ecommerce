import React from 'react';
import { IconSearch } from "@tabler/icons-react";

const SearchBar: React.FC = () => {
  return (
    <div className="flex justify-center items-start w-full mt-8">
      <div className="w-full max-w-[1206px] h-[73px] border border-ThirdColor rounded-[58px] box-border flex items-center px-4 md:px-6 lg:px-8">
        {/* Left Section - Search Icon and Label */}
        <div className="flex flex-row items-center gap-[16px] w-full">
          {/* Search Icon */}
          <IconSearch width={32} height={32} className="text-ThirdColor" />
          {/* Search TextBox */}
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full h-[43px] px-4 text-[16px] md:text-[18px] lg:text-[20px] leading-[27px] font-playfair placeholder-ThirdColor text-secondColor bg-customBeige border-none outline-none" 
          />
        </div>

        <button className="flex flex-row justify-center items-center px-[16px] md:px-[24px] lg:px-[31px] py-[8px] gap-[10px] w-[124px] h-[43px] bg-wine rounded-[48px] ml-4">
          <span className="font-playfair font-medium text-[16px] md:text-[18px] lg:text-[20px] leading-[27px] text-customBeige">
            Search
          </span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
