import React, { useRef, useState } from "react";
import Logo from "@assets/Logo.png";
import { IconSearch, IconMenu2, IconX } from "@tabler/icons-react";
import profile from "@assets/Profile.svg";
import bag from "@assets/Bag.svg";
import { ShopModal } from "@components/organisms";
import { NavLink } from "@components/atoms";
import { useLocation } from "react-router-dom";

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

  const isOnProductPage = location.pathname.startsWith("/products");

  return (
    <div className="w-full flex justify-between items-center relative px-6 xl:px-44 pt-4">
      {/* Left side: Menu button and Logo */}
      <div className="flex items-center gap-4">
        {/* Menu button visible on lg and smaller screens */}
        <div className="xl:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            <IconMenu2 size={32} />
          </button>
        </div>
        <img src={Logo} alt="Logo" className="h-8 w-auto ml-2" />
      </div>

      {/* Right-side icons - Visible on all screens */}
      <div className="flex items-center space-x-4 gap-4 md:gap-0 ">
        <IconSearch width={32} height={32} />
        <img src={profile} alt="Profile" width={32} height={32} />
        <img src={bag} alt="Shopping Bag" width={32} height={32} />
      </div>

      {/* Main Nav Links - Hidden on screens smaller than xl */}
      <div className="hidden xl:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
        <NavLink label="Home" to="/" />
        <div
          className="relative cursor-pointer"
          onMouseEnter={handleOpenModal}
          onMouseLeave={handleCloseModal}
        >
          <span
            className={`text-2xl font-normal font-playfair ${
              isOnProductPage ? "text-wine" : "text-dark-grey hover:text-wine"
            }`}
          >
            Shop
          </span>
        </div>
        <NavLink label="Blogs" to="/blogs" />
        <NavLink label="Contact Us" to="/contact" />
        <NavLink label="About us" to="/about-us" />
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Animated Full-screen Menu for smaller screens */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white z-50 overflow-hidden transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Close Button and Logo */}
        <div className="flex justify-between items-center px-4 pt-4">
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
          <button onClick={toggleMenu} aria-label="Close Menu">
            <IconX size={32} />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-4 text-xl mt-8">
          <NavLink label="Home" to="/" onClick={toggleMenu} />
          <div className="w-full">
            <button
              className="text-xl font-semibold w-full text-center"
              onClick={toggleShopMenu}
            >
              Shop
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                isShopOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <div className="flex flex-col items-center space-y-2 mt-2">
                <NavLink label="Men" to="/products/men" onClick={toggleMenu} />
                <NavLink
                  label="Women"
                  to="/products/women"
                  onClick={toggleMenu}
                />
                <NavLink
                  label="Kids"
                  to="/products/kids"
                  onClick={toggleMenu}
                />
              </div>
            </div>
          </div>
          <NavLink label="Blogs" to="/blogs" onClick={toggleMenu} />
          <NavLink label="Contact Us" to="/contact" onClick={toggleMenu} />
          <NavLink label="About us" to="/about-us" onClick={toggleMenu} />
        </div>
      </div>

      {/* Shop Modal */}
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
