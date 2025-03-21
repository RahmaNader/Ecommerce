import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { IconSearch, IconMenu2, IconX, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "@assets/Logo.png";
import profile from "@assets/Profile.svg";
import { ShopModal } from "@components/organisms";
import { NavLink } from "@components/atoms";
import { useQuery } from "react-query";
import { fetchCategories } from "@services/api/fetchCategories";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/useLanguage";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.target.value as "en" | "ar");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery("categories", fetchCategories);

  const mainCategories =
    categories?.filter(
      (cat: { parentCategoryID: number | null }) =>
        cat.parentCategoryID === null
    ) || [];

  const handleOpenModal = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsModalOpen(false);
    }, 100);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsShopOpen(false);
    setExpandedCategory(null);
  };

  const toggleShopMenu = () => {
    setIsShopOpen((prev) => !prev);
    setExpandedCategory(null);
  };

  const toggleCategoryExpansion = (categoryId: number) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  };

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const updateCartCount = () => {
      const cart = Cookies.get("cart")
        ? JSON.parse(Cookies.get("cart") as string)
        : [];
      const totalItems = cart.reduce(
        (count: number, item: { quantity: number }) => count + item.quantity,
        0
      );
      setCartCount(totalItems);
    };

    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);

    return () => clearInterval(interval);
  });

  const getCategoryName = (category: { nameEn: string; nameAr: string; name: string }) => {
    if (language === "ar") {
      return category.nameAr || category.name;
    }
    return category.nameEn || category.name;
  };

  return (
    <div className="w-full flex justify-between items-center bg-mainColor relative px-6 xl:px-44 pt-4">
      <div className="flex items-center gap-4">
        <div className="xl:hidden flex items-center">
          <button onClick={toggleMenu} aria-label={t("navbar.toggleMenu")}>
            <IconMenu2 size={28} />
          </button>
        </div>
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-20 md:w-28 ml-2" />
        </Link>
      </div>

      <div className="flex items-center space-x-2 rtl:gap-2 gap-0 md:space-x-4">
        <NavLink
          label={<IconSearch width={28} height={28} />}
          to="/search"
          variant="navbaricons"
          isActive={isActive("/search")}
        />

        <label htmlFor="language-select" className="sr-only ">
          {t("language")}
        </label>

        <select
          title={t("language")}
          value={language}
          onChange={handleLanguageChange}
          className="bg-wine text-white px-1 py-1 rounded-lg outline-none focus:ring-2 focus:ring-wine"
        >
          <option value="en" >
            English
          </option>
          <option value="ar">
            العربية
          </option>
        </select>

        <NavLink
          label={
            <IconButton
              aria-label="cart"
              sx={{
                "&:hover": {
                  color: "#f4eee8",
                  backgroundColor: "#f4eee8",
                },
              }}
            >
              <StyledBadge badgeContent={cartCount} color="success" showZero>
                <ShoppingCartIcon
                  sx={{
                    color: "black",
                    fontSize: "28px",
                  }}
                />
              </StyledBadge>
            </IconButton>
          }
          to="/cart"
          variant="navbaricons"
          isActive={isActive("/cart")}
        />

        <NavLink
          label={<img src={profile} alt="Profile" width={28} height={28} />}
          to="/profile"
          variant="navbaricons"
          isActive={isActive("/profile")}
        />
      </div>

      <div className="hidden xl:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2 ltr:gap-4 rtl:gap-4">
        <NavLink
          label={t("navbar.home")}
          to="/"
          variant="navbar"
          isActive={isActive("/")}
        />
        <NavLink
          label={t("navbar.shop")}
          to="#"
          variant="navbar"
          onMouseEnter={handleOpenModal}
          onMouseLeave={handleCloseModal}
          isActive={isActive("/shop")}
        />

        <NavLink
          label={t("navbar.contactUs")}
          to="/contact-us"
          variant="navbar"
          isActive={isActive("/contact-us")}
        />
        <NavLink
          label={t("navbar.aboutUs")}
          to="/about-us"
          variant="navbar"
          isActive={isActive("/about-us")}
        />
      </div>

      {isMenuOpen && (
        <button
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          aria-label="Close Menu"
          onClick={toggleMenu}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-3/4 max-w-xs bg-mainColor z-50 h-full shadow-md overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4">
          <img src={Logo} alt="Logo" className="w-20 md:w-28 ml-2" />
          <button
            onClick={toggleMenu}
            aria-label="Close Menu"
            className="text-wine border-wine border-2 rounded-full"
          >
            <IconX size={28} />
          </button>
        </div>

        <div className="flex flex-col mt-4 w-full">
          <NavLink
            label={t("navbar.home")}
            to="/"
            variant="sidenavbar"
            isActive={isActive("/")}
            onClick={toggleMenu}
          />

          <div className="relative w-full">
            <div 
              className="flex items-center justify-between text-wine w-full font-playfair font-medium h-16 text-base border-b border-ForthColor bg-[#A78E7821] px-4 py-2"
              onClick={toggleShopMenu}
            >
              <span>
                {t("navbar.shop")}
              </span>
              {isShopOpen ? (
                <IconChevronUp size={20} />
              ) : (
                <IconChevronDown size={20} />
              )}
            </div>
            
            {isShopOpen && (
              <div className="pl-4 border-l-4 border-wine">
                {isLoading && (
                  <p className="text-center p-2">{t("loadingCategories")}</p>
                )}
                {isError && (
                  <p className="text-center p-2 text-red-600">
                    {(error as Error)?.message}
                  </p>
                )}
                {!isLoading &&
                  !isError &&
                  mainCategories.map((category: { categoryID: number; name: string; nameEn: string; nameAr: string }) => {
                    const subcategories = categories?.filter(
                      (sub: { parentCategoryID: number | null }) => 
                        sub.parentCategoryID === category.categoryID
                    ) || [];
                    
                    const isExpanded = expandedCategory === category.categoryID;
                    const categoryName = getCategoryName(category);
                    const mainPath = `/products/${categoryName.toLowerCase()}`;

                    return (
                      <div key={category.categoryID} className="mb-2">
                        <div className="flex items-center justify-between pr-4">
                          <Link
                            to={mainPath}
                            state={{ categoryId: category.categoryID }}
                            className={`py-2 block font-normal text-wine`}
                            onClick={toggleMenu}
                          >
                            {getCategoryName(category)}
                          </Link>
                          {subcategories.length > 0 && (
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleCategoryExpansion(category.categoryID);
                              }}
                              className="p-1"
                            >
                              {isExpanded ? (
                                <IconChevronUp size={16} />
                              ) : (
                                <IconChevronDown size={16} />
                              )}
                            </button>
                          )}
                        </div>
                        
                        {isExpanded && subcategories.length > 0 && (
                          <ul className="border-t border-gray-300 mt-2 pt-2">
                            {subcategories.map((sub: { categoryID: number; name: string; nameEn: string; nameAr: string }) => {
                              const subCategoryName = getCategoryName(sub);
                              const subPath = `/products/${categoryName.toLowerCase()}/${subCategoryName.toLowerCase()}`;
                              const isActive = location.pathname.includes(subPath);
                              
                              return (
                                <li key={sub.categoryID} className="py-1 text-center">
                                  <Link
                                    to={subPath}
                                    state={{ categoryId: sub.categoryID }}
                                    className={`inline-block text-sm ${
                                      isActive ? "text-wine font-medium" : "text-gray-700"
                                    }`}
                                    onClick={toggleMenu}
                                  >
                                    {getCategoryName(sub)}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    );
                  })
                }
              </div>
            )}
          </div>
          <NavLink
            label={t("navbar.contactUs")}
            to="/contact-us"
            variant="sidenavbar"
            isActive={isActive("/contact-us")}
            onClick={toggleMenu}
          />
          <NavLink
            label={t("navbar.aboutUs")}
            to="/about-us"
            variant="sidenavbar"
            isActive={isActive("/about-us")}
            onClick={toggleMenu}
          />
        </div>
      </div>

      {isModalOpen && (
        <ShopModal
          isOpen={isModalOpen}
          onMouseEnter={handleOpenModal}
          onMouseLeave={handleCloseModal}
          categories={categories || []}
          language={language}
        />
      )}
    </div>
  );
};

export default Navbar;
