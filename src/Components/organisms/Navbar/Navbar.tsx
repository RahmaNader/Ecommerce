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
      <div className="flex items-center gap-4">
        <div className="xl:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            <IconMenu2 size={32} />
          </button>
        </div>

        <img src={Logo} alt="Logo" className="h-8 w-auto ml-2" />
      </div>

      <div className="flex items-center space-x-4 gap-4 md:gap-0 ">
        <NavLink
          label={<IconSearch width={32} height={32} />}
          to="/search"
          variant="navbaricons"
        />
        <NavLink
          label={<img src={bag} alt="Shopping Bag" width={32} height={32} />}
          to="/cart"
          variant="navbaricons"
        />
        <NavLink
          label={<img src={profile} alt="Profile" width={32} height={32} />}
          to="/profile"
          variant="navbaricons"
        />
      </div>

      <div className="hidden xl:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
        <NavLink label="Home" to="/" variant="navbar" />

        <NavLink
        label="Shop"
        to="#"
        variant="navbar"
        onMouseEnter={handleOpenModal}
        onMouseLeave={handleCloseModal}
      />

        <NavLink label="Blogs" to="/blogs" variant="navbar" />
        <NavLink label="Contact Us" to="/contact" variant="navbar" />
        <NavLink label="About Us" to="/about-us" variant="navbar" />
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}

      <div
        className={`fixed top-0 left-0 right-0 bg-eightColor z-50 overflow-hidden transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 pt-4">
          <img src={Logo} alt="Logo" className="h-8 w-auto" />

          <button onClick={toggleMenu} aria-label="Close Menu">
            <IconX size={32} />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-4 mb-8 ">
          <NavLink label="Home" to="/" variant="navbar" onClick={toggleMenu} />
          <div className="w-full text-center">
            <NavLink
              label="Shop"
              to="#"
              variant="navbar"
              onClick={toggleShopMenu}
            />
            <div
              className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                isShopOpen ? "max-h-40" : "max-h-0"
              } flex justify-center items-center`}
            >
              <div className="flex flex-row items-center space-x-4 mt-2">
                <NavLink
                  label="Men"
                  to="/products/men"
                  variant="subnavbar"
                  onClick={toggleMenu}
                />
                <p>.</p>
                <NavLink
                  label="Women"
                  to="/products/women"
                  variant="subnavbar"
                  onClick={toggleMenu}
                />
                <p>.</p>
                <NavLink
                  label="Kids"
                  to="/products/kids"
                  variant="subnavbar"
                  onClick={toggleMenu}
                />
              </div>
            </div>
          </div>
          <NavLink
            label="Blogs"
            to="/blogs"
            variant="navbar"
            onClick={toggleMenu}
          />
          <NavLink
            label="Contact Us"
            to="/contact"
            variant="navbar"
            onClick={toggleMenu}
          />
          <NavLink
            label="About Us"
            to="/about-us"
            variant="navbar"
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
