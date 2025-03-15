import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ProductsDisplay } from "@components/organisms";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/useLanguage";

const WishListScreen: React.FC = () => {
  const [wishlist, setWishlist] = useState([]);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === "ar";

  useEffect(() => {
    const storedWishlist = Cookies.get("wishlist")
      ? JSON.parse(Cookies.get("wishlist") as string)
      : [];
    setWishlist(storedWishlist);
  }, []);

  return (
    <div className={`flex flex-col mt-8 md:mt-16 justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
      <h1 className="text-2xl font-semibold text-wine font-playfair md:self-start mx-auto md:mx-0">
        {t("profileSidebar.wishList")}
      </h1>
      <p className="text-ForthColor font-playfair text-xl mb-4 md:self-start mx-auto md:mx-0">
        {isRTL ? "عرض قائمة المفضلة لديك" : "See your favorites list"}
      </p>
      <div className="flex justify-center">
        {wishlist.length > 0 ? (
          <ProductsDisplay 
            products={wishlist}
            language={language} 
          />
        ) : (
          <p className="text-lg text-gray-500">
            {isRTL ? "قائمة المفضلة فارغة." : "Your wishlist is empty."}
          </p>
        )}
      </div>
    </div>
  );
};

export default WishListScreen;