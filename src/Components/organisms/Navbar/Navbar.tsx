import React, { useRef, useState } from "react";
import Logo from "@assets/Logo.png";
import { IconSearch, IconMenu2, IconX } from "@tabler/icons-react";
import profile from "@assets/Profile.svg";
import bag from "@assets/Bag.svg";
import { ShopModal } from "@components/organisms";
import { NavLink } from "@components/atoms";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation(); 

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

  return (
    <div className="w-full flex justify-between items-center relative px-6 xl:px-44 pt-4">
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

      <div className="flex items-center space-x-2 gap-0 md:space-x-4 ">
        <NavLink
          label={<IconSearch width={28} height={28} />}
          to="/search"
          variant="navbaricons"
          isActive={isActive("/search")}
        />
        <NavLink
          label={<img src={bag} alt="Shopping Bag" width={28} height={28} />}
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

          <button onClick={toggleMenu} aria-label="Close Menu" className="text-wine border-wine border-2 rounded-full">
            <IconX size={28} />
          </button>
        </div>

        <div className="flex flex-col space-y-8 px-4 py-2 mt-4">
          <NavLink
            label="Home"
            to="/"
            variant="navbar"
            isActive={isActive("/")}
            onClick={toggleMenu}
          />
          <div className="relative">
            <NavLink
              label="Shop"
              to="#"
              variant="navbar"
              onClick={toggleShopMenu}
              isActive={isActive("/shop")}
            />
            <div
              className={`flex flex-col space-y-2 pl-4 transition-max-height duration-300 ease-in-out ${
                isShopOpen ? "max-h-40" : "max-h-0"
              } overflow-hidden`}
            >
              <NavLink
                label="Men"
                to="/products/men"
                variant="subnavbar"
                onClick={toggleMenu}
              />
              <NavLink
                label="Women"
                to="/products/women"
                variant="subnavbar"
                onClick={toggleMenu}
              />
              <NavLink
                label="Kids"
                to="/products/kids"
                variant="subnavbar"
                onClick={toggleMenu}
              />
            </div>
          </div>
          <NavLink
            label="Blogs"
            to="/blogs"
            variant="navbar"
            isActive={isActive("/blogs")}
            onClick={toggleMenu}
          />
          <NavLink
            label="Contact Us"
            to="/contact-us"
            variant="navbar"
            isActive={isActive("/contact-us")}
            onClick={toggleMenu}
          />
          <NavLink
            label="About Us"
            to="/about-us"
            variant="navbar"
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
        />
      )}
    </div>
  );
};

export default Navbar;
