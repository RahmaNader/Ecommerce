import React, { useState } from 'react';
import { IconSearch } from "@tabler/icons-react";

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const suggestionsList = ["Shorts", "T-Shirts", "Jeans", "Jackets", "Sneakers"];
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const filteredSuggestions = suggestionsList.filter((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col items-center w-full mt-8 relative">
      <div className="w-full max-w-[1206px] h-[73px] border border-ThirdColor rounded-[58px] box-border flex items-center px-4 md:px-6 lg:px-8">
        <div className="flex flex-row items-center gap-[16px] w-full">
          <IconSearch width={32} height={32} className="text-ThirdColor" />
          <input 
            type="text" 
            placeholder="Search" 
            value={inputValue}
            onChange={handleInputChange}
            className="w-full h-[43px] px-4 text-[16px] md:text-[18px] lg:text-[20px] leading-[27px] font-playfair placeholder-ThirdColor text-secondColor bg-customBeige border-none outline-none" 
          />
        </div>

        <button className="flex flex-row justify-center items-center px-[16px] md:px-[24px] lg:px-[31px] py-[8px] gap-[10px] w-[124px] h-[43px] bg-wine rounded-[48px] ml-4">
          <span className="font-playfair font-medium text-[16px] md:text-[18px] lg:text-[20px] leading-[27px] text-customBeige">
            Search
          </span>
        </button>
      </div>

      {inputValue && suggestions.length > 0 && (
        <div className="absolute w-[1205px] max-h-[260px] left-1/2 transform -translate-x-1/2 top-[110px] border border-ThirdColor rounded-[10px] bg-customBeige z-10 overflow-y-auto overflow-x-hidden">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-[1181px] h-[64px] m-[12px] rounded-[10px] flex items-center px-4 cursor-pointer hover:bg-[rgba(167,142,120,0.13)] hover:text-wine"
            >
              <span className="font-playfair font-medium text-[24px] leading-[32px] text-wine">
                {suggestion}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
