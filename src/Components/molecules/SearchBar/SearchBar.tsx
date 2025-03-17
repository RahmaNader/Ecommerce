import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IconSearch } from "@tabler/icons-react";
import { CardComponent } from '@types';
import { searchProducts } from '@services/api/search';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

interface SearchBarProps {
  onResultClick?: (productId: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onResultClick }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<CardComponent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length < 3) {
        setResults([]);
        setError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const result = await searchProducts(query, 1, 8, !isRTL);
        setResults(result.products);
        setShowResults(true);
      } catch (err) {
        console.error("Search error:", err);
        setError(t("search.errorMessage"));
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [isRTL, t]
  );

  useEffect(() => {
    if (inputValue) {
      debouncedSearch(inputValue);
    } else {
      setResults([]);
      setShowResults(false);
    }
    
    // Cleanup debounce on component unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleResultClick = (productId: number) => {
    if (onResultClick) {
      onResultClick(productId);
    } else {
      navigate(`/product-details/${productId}`);
    }
    setInputValue("");
    setShowResults(false);
  };

  const handleSearch = () => {
    if (inputValue.trim().length >= 3) {
      navigate(`/search-results?query=${encodeURIComponent(inputValue)}`);
      setShowResults(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim().length >= 3) {
      handleSearch();
    }
  };

  const getProductName = (product: CardComponent) => {
    if (isRTL) {
      return product.nameAr || product.name;
    }
    return product.nameEn || product.name;
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${t("common.currency")}`;
  };

  return (
    <div className="flex flex-col items-center w-full mt-8 relative" ref={searchContainerRef}>
      <div className="w-full max-w-[1206px] h-[73px] border border-ThirdColor rounded-[58px] box-border flex items-center px-4 md:px-6 lg:px-8">
        <div className="flex flex-row items-center gap-[16px] w-full">
          <IconSearch width={32} height={32} className="text-ThirdColor" />
          <input 
            type="text" 
            placeholder={t("search.placeholder")} 
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full h-[43px] px-4 text-[16px] md:text-[18px] lg:text-[20px] leading-[27px] font-playfair placeholder-ThirdColor text-secondColor bg-customBeige border-none outline-none" 
          />
        </div>

        <button 
          onClick={handleSearch}
          className="flex flex-row justify-center items-center px-[16px] md:px-[24px] lg:px-[31px] py-[8px] gap-[10px] w-[124px] h-[43px] bg-wine rounded-[48px] ml-4"
        >
          <span className="font-playfair font-medium text-[16px] md:text-[18px] lg:text-[20px] leading-[27px] text-customBeige">
            {t("search.buttonText")}
          </span>
        </button>
      </div>

      {showResults && (inputValue.length >= 3) && (
        <div className="absolute w-full max-w-[1206px] px-4 max-h-[500px] left-1/2 transform -translate-x-1/2 top-[84px] border border-ThirdColor rounded-[10px] bg-customBeige z-20 overflow-y-auto overflow-x-hidden">
          {isLoading && (
            <div className="w-full text-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-wine mx-auto"></div>
              <p className="mt-2 text-wine">{t("search.loading")}</p>
            </div>
          )}
          
          {error && (
            <div className="w-full text-center py-6 text-red-600">
              {error}
            </div>
          )}
          
          {!isLoading && !error && results.length === 0 && inputValue.length >= 3 && (
            <div className="w-full text-center py-6">
              <p className="text-ForthColor">{t("search.noResults")}</p>
            </div>
          )}
          
          {!isLoading && results.map((product) => (
            <div 
              key={product.productID}
              onClick={() => handleResultClick(product.productID)}
              className="flex items-center gap-4 p-4 border-b border-ThirdColor/30 hover:bg-[rgba(167,142,120,0.13)] cursor-pointer transition-colors"
            >
              <img 
                src={product.productImages[0]?.imageUrl} 
                alt={getProductName(product)}
                className="w-16 h-16 object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/64x64?text=No+Image";
                }}
              />
              <div className={`flex flex-col flex-grow ${isRTL ? 'text-right' : 'text-left'}`}>
                <span className="font-playfair font-medium text-[18px] text-wine">
                  {getProductName(product)}
                </span>
                <span className="text-ForthColor text-sm">
                  {product.category?.nameEn || product.category?.nameAr || product.category?.name || t("search.uncategorized")}
                </span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-wine">
                  {formatPrice(product.priceAfterDiscount || product.productPrice)}
                </div>
                {product.discountPercent > 0 && (
                  <div className="text-xs text-ForthColor line-through">
                    {formatPrice(product.productPrice)}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {results.length > 0 && (
            <div className="flex justify-center p-3 border-t border-ThirdColor/30">
              <button 
                onClick={handleSearch}
                className="text-wine hover:underline font-medium"
              >
                {t("search.viewAllResults")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;