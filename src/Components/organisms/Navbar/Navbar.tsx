import React, { useEffect, useState } from "react";
import {  useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { IconSearch, IconMenu2, IconX } from "@tabler/icons-react";
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

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);


  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery("categories", fetchCategories);

  const mainCategories = categories?.filter(
    (cat: any) => cat.parentCategoryID === null
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
  };

  const toggleShopMenu = () => {
    setIsShopOpen((prev) => !prev);
  };

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const updateCartCount = () => {
      const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart") as string) : [];
      const totalItems = cart.reduce((count: number, item: { quantity: number }) => count + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-between items-center bg-mainColor relative px-6 xl:px-44 pt-4">
      <div className="flex items-center gap-4">
        <div className="xl:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            <IconMenu2 size={28} />
          </button>
        </div>
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-8 md:h-14 w-auto ml-2" />
        </Link>
      </div>

      <div className="flex items-center space-x-2 gap-0 md:space-x-4">
        <NavLink
          label={<IconSearch width={28} height={28} />}
          to="/search"
          variant="navbaricons"
          isActive={isActive("/search")}
        />
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

      <div className="hidden xl:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
        <NavLink
          label="Home"
          to="/"
          variant="navbar"
          isActive={isActive("/")}
        />
        <NavLink
          label="Shop"
          to="#"
          variant="navbar"
          onMouseEnter={handleOpenModal}
          onMouseLeave={handleCloseModal}
          isActive={isActive("/shop")}
        />
        <NavLink
          label="Blogs"
          to="/blogs"
          variant="navbar"
          isActive={isActive("/blogs")}
        />
        <NavLink
          label="Contact Us"
          to="/contact-us"
          variant="navbar"
          isActive={isActive("/contact-us")}
        />
        <NavLink
          label="About Us"
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
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
          <button
            onClick={toggleMenu}
            aria-label="Close Menu"
            className="text-wine border-wine border-2 rounded-full"
          >
            <IconX size={28} />
          </button>
        </div>

        <div className="flex items-center text-center w-full flex-col mt-4">
          <NavLink
            label="Home"
            to="/"
            variant="sidenavbar"
            isActive={isActive("/")}
            onClick={toggleMenu}
          />

          <div className="relative w-full">
            <NavLink
              label="Shop"
              to="#"
              variant="sidenavbar"
              onClick={toggleShopMenu}
              isActive={isActive("/shop")}
            />
            <div
              className={`flex flex-col transition-max-height duration-300 ease-in-out ${
                isShopOpen ? "max-h-40" : "max-h-0"
              } overflow-hidden border-l-4 border-wine`}
            >
              {isLoading && (
                <p className="text-center p-2">Loading categories...</p>
              )}
              {isError && (
                <p className="text-center p-2 text-red-600">
                  {(error as Error)?.message}
                </p>
              )}
              {!isLoading &&
                !isError &&
                mainCategories.map((category: any) => (
                  <NavLink
                    key={category.categoryID}
                    label={category.name}
                    to={`/products/${category.name.toLowerCase()}`}
                    variant="sidenavbarsub"
                    onClick={toggleMenu}
                  />
                ))}
            </div>
          </div>

          <NavLink
            label="Blogs"
            to="/blogs"
            variant="sidenavbar"
            isActive={isActive("/blogs")}
            onClick={toggleMenu}
          />
          <NavLink
            label="Contact Us"
            to="/contact-us"
            variant="sidenavbar"
            isActive={isActive("/contact-us")}
            onClick={toggleMenu}
          />
          <NavLink
            label="About Us"
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
        />
      )}
    </div>
  );
};

export default Navbar;
