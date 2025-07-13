import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  IconSearch,
  IconMenu2,
  IconX,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "@assets/KiswaLogo-01.png";
import profile from "@assets/Profile.svg";
import { ShopModal } from "@components/organisms";
import { NavLink } from "@components/atoms";
import { useQuery } from "react-query";
import { fetchCategories } from "@services/api/fetchCategories";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/useLanguage";
import { Category } from "@types";

// Enhanced StyledBadge with better visual design
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#721013", // Using wine color from your theme
    color: "#fff",
    fontWeight: "bold",
  },
}));
const slugifyName = (t: string) =>
  t
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "");

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const isRTL = language === "ar";

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
    }, 200); // Increased from 100ms to 200ms for better user experience
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
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
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

  const getCategoryName = (category: {
    nameEn: string;
    nameAr: string;
    name: string;
  }) => {
    if (language === "ar") {
      return category.nameAr || category.name;
    }
    return category.nameEn || category.name;
  };

  const navRef = React.useRef<HTMLDivElement>(null);

  // ⬇︎ update --nav-h whenever the navbar is resized (brand logo swaps, window resize, etc.)
  React.useLayoutEffect(() => {
    if (!navRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty(
        "--nav-h",
        `${entry.contentRect.height}px`
      );
    });
    ro.observe(navRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={navRef}
      className={`sticky top-0 z-40 w-full bg-mainColor shadow-sm ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Section: Logo and Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-wine hover:bg-wine/10 rounded-full transition-colors"
            aria-label={t("navbar.toggleMenu")}
          >
            <IconMenu2 size={24} />
          </button>

          <Link to="/" className="relative z-10">
            <img src={Logo} alt="Logo" className="w-32   transition-all" />
          </Link>
        </div>

        {/* Center Section: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink
            label={t("navbar.home")}
            to="/"
            variant="navbar"
            isActive={isActive("/")}
          />

          <div
            className="relative group"
            onMouseEnter={handleOpenModal}
            onMouseLeave={handleCloseModal}
          >
            <NavLink
              label={t("navbar.shop")}
              to="#"
              variant="navbar"
              isActive={isActive("/shop")}
            />
          </div>

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
        </nav>

        {/* Right Section: Icons and Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search - visible on all screens */}
          <NavLink
            label={
              <div className="flex items-center justify-center rounded-full w-10 h-10 bg-wine/10 text-wine hover:bg-wine/20 transition-colors">
                <IconSearch width={20} height={20} />
              </div>
            }
            to="/search"
            variant="navbaricons"
            isActive={isActive("/search")}
          />

          {/* Cart - visible on all screens */}
          <NavLink
            label={
              <div className="flex items-center justify-center rounded-full w-10 h-10 bg-wine/10 text-wine hover:bg-wine/20 transition-colors">
                <StyledBadge badgeContent={cartCount} color="error" showZero>
                  <ShoppingCartIcon sx={{ fontSize: "20px" }} />
                </StyledBadge>
              </div>
            }
            to="/cart"
            variant="navbaricons"
            isActive={isActive("/cart")}
          />

          {/* Profile - only visible on desktop */}
          <div className="hidden lg:block">
            <NavLink
              label={
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-wine/10 hover:bg-wine/20 transition-colors">
                  <img src={profile} alt="Profile" width={20} height={20} />
                </div>
              }
              to="/profile"
              variant="navbaricons"
              isActive={isActive("/profile")}
            />
          </div>

          {/* Language Switcher - only visible on desktop */}
          <div className="hidden lg:block">
            <select
              title={t("language")}
              value={language}
              onChange={handleLanguageChange}
              className="bg-wine text-white px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-wine text-sm min-w-[70px] appearance-none text-center cursor-pointer hover:bg-wine/90 transition-colors"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.5rem center",
                backgroundSize: "1.2em 1.2em",
                paddingRight: "2.5rem",
              }}
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn transition-opacity"
          aria-label="Close Menu"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 ${
          isRTL ? "right-0" : "left-0"
        } w-3/4 max-w-xs bg-mainColor z-50 h-full shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          isMenuOpen
            ? isRTL
              ? "translate-x-0"
              : "translate-x-0"
            : isRTL
            ? "translate-x-full"
            : "-translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center p-4 border-b border-ForthColor/20">
          <Link to="/" onClick={toggleMenu}>
            <img src={Logo} alt="Logo" className="w-20" />
          </Link>
          <button
            onClick={toggleMenu}
            aria-label="Close Menu"
            className="flex items-center justify-center w-10 h-10 text-wine hover:bg-wine/10 rounded-full transition-colors"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* User Profile Section - Improved styling */}
        <div className="p-4 border-b border-ForthColor/20">
          <NavLink
            label={
              <div className="flex items-center w-full">
                <div
                  className={`w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center ${
                    isRTL ? "ml-3" : "mr-3"
                  }`}
                >
                  <img src={profile} alt="Profile" width={20} height={20} />
                </div>
                <span className="font-playfair text-wine font-medium">
                  {t("navbar.myProfile")}
                </span>
              </div>
            }
            to="/profile"
            variant="navbaricons"
            onClick={toggleMenu}
            className="block w-full hover:bg-ForthColor/5 rounded-md p-2 transition-colors"
          />
        </div>

        {/* Mobile Menu Links - Improved tab styling */}
        <div className="flex flex-col py-3 px-4 space-y-2">
          {/* Home Link */}
          <NavLink
            label={
              <div className="flex items-center">
                <span className="text-lg">{t("navbar.home")}</span>
              </div>
            }
            to="/"
            variant="navbaricons"
            isActive={isActive("/")}
            onClick={toggleMenu}
            className={`block w-full p-3 rounded-md transition-colors ${
              isActive("/")
                ? "bg-wine/10 text-wine font-medium"
                : "text-ForthColor hover:bg-ForthColor/10"
            }`}
          />

          {/* Shop Section with Improved Dropdown */}
          <div className="relative w-full rounded-md overflow-hidden">
            <button
              className={`flex items-center justify-between w-full p-3 rounded-md transition-colors ${
                isActive("/shop") || isShopOpen
                  ? "bg-wine/10 text-wine font-medium"
                  : "text-ForthColor hover:bg-ForthColor/10"
              }`}
              onClick={toggleShopMenu}
            >
              <span className="text-lg">{t("navbar.shop")}</span>
              <span>
                {isShopOpen ? (
                  <IconChevronUp size={18} />
                ) : (
                  <IconChevronDown size={18} />
                )}
              </span>
            </button>

            {/* Shop categories - Improved styling */}
            {isShopOpen && (
              <div
                className={`mt-1 rounded-md bg-ForthColor/5 overflow-hidden`}
              >
                {isLoading && (
                  <div className="text-center p-3 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-wine border-t-transparent rounded-full animate-spin mr-2"></div>
                    <p>{t("loadingCategories")}</p>
                  </div>
                )}

                {isError && (
                  <div className="text-center p-3 text-red-500">
                    {(error as Error)?.message || "Error loading categories"}
                  </div>
                )}

                {!isLoading &&
                  !isError &&
                  mainCategories.map((category: Category) => {
                    const subcategories =
                      categories?.filter(
                        (sub: { parentCategoryID: number | null }) =>
                          sub.parentCategoryID === category.categoryID
                      ) || [];

                    const isExpanded = expandedCategory === category.categoryID;
                    const categoryName = getCategoryName(category);
                    const parentSlug = slugifyName(categoryName);
                    const mainPath = `/products/${parentSlug}`;

                    return (
                      <div
                        key={category.categoryID}
                        className="border-b border-ForthColor/10 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <Link
                            to={mainPath}
                            state={{
                              categoryId: category.categoryID,
                              isMainCategory: true,
                            }} // Added isMainCategory flag
                            className={`py-2 px-3 block flex-grow font-medium hover:bg-wine/5 transition-colors ${
                              isExpanded ? "text-wine" : "text-ForthColor"
                            }`}
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
                              className={`p-2 m-1 rounded-full transition-colors ${
                                isExpanded
                                  ? "bg-wine/10 text-wine"
                                  : "text-ForthColor hover:bg-ForthColor/20"
                              }`}
                              aria-expanded={isExpanded}
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
                          <div
                            className={`py-1 ${
                              isRTL ? "pr-4 border-r-2" : "pl-4 border-l-2"
                            } border-wine/20 bg-ForthColor/5 mx-2 mb-1 rounded-sm`}
                          >
                            {subcategories.map(
                              (sub: {
                                categoryID: number;
                                name: string;
                                nameEn: string;
                                nameAr: string;
                              }) => {
                                const subCategoryName = getCategoryName(sub);
                                const subSlug = slugifyName(subCategoryName);
                                const subPath = `/products/${parentSlug}/${subSlug}`;
                                return (
                                  <Link
                                    key={sub.categoryID}
                                    to={subPath}
                                    state={{ categoryId: sub.categoryID }}
                                    className={`block py-2 px-3 text-sm rounded-md my-1 transition-colors ${
                                      isActive(subPath)
                                        ? "text-wine bg-wine/10"
                                        : "text-ForthColor hover:bg-ForthColor/10"
                                    }`}
                                    onClick={toggleMenu}
                                  >
                                    {getCategoryName(sub)}
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Contact Us Link */}
          <NavLink
            label={
              <div className="flex items-center">
                <span className="text-lg">{t("navbar.contactUs")}</span>
              </div>
            }
            to="/contact-us"
            variant="navbaricons"
            isActive={isActive("/contact-us")}
            onClick={toggleMenu}
            className={`block w-full p-3 rounded-md transition-colors ${
              isActive("/contact-us")
                ? "bg-wine/10 text-wine font-medium"
                : "text-ForthColor hover:bg-ForthColor/10"
            }`}
          />

          {/* About Us Link */}
          <NavLink
            label={
              <div className="flex items-center">
                <span className="text-lg">{t("navbar.aboutUs")}</span>
              </div>
            }
            to="/about-us"
            variant="navbaricons"
            isActive={isActive("/about-us")}
            onClick={toggleMenu}
            className={`block w-full p-3 rounded-md transition-colors ${
              isActive("/about-us")
                ? "bg-wine/10 text-wine font-medium"
                : "text-ForthColor hover:bg-ForthColor/10"
            }`}
          />

          {/* Language Switcher - Improved styling */}
          <div className="mt-4 pt-4 border-t border-ForthColor/20">
            <p className="text-ForthColor font-medium mb-2 px-1">
              {t("navbar.language")}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  changeLanguage("en");
                  toggleMenu();
                }}
                className={`flex-1 py-2 px-3 rounded-md font-medium transition-colors ${
                  language === "en"
                    ? "bg-wine text-white"
                    : "border border-ForthColor/30 text-ForthColor hover:bg-ForthColor/10"
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  changeLanguage("ar");
                  toggleMenu();
                }}
                className={`flex-1 py-2 px-3 rounded-md font-medium transition-colors ${
                  language === "ar"
                    ? "bg-wine text-white"
                    : "border border-ForthColor/30 text-ForthColor hover:bg-ForthColor/10"
                }`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Shop Modal */}
      {isModalOpen && (
        <div
          className="absolute left-0 right-0 z-50 w-full"
          onMouseEnter={handleOpenModal}
          onMouseLeave={handleCloseModal}
        >
          <ShopModal
            isOpen={isModalOpen}
            categories={categories || []}
            language={language}
            onMouseEnter={handleOpenModal}
            onMouseLeave={handleCloseModal}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
