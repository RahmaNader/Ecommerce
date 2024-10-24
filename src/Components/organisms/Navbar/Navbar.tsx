import React, { useRef, useState } from "react";
import Logo from "@assets/Logo.png";
import { IconSearch } from "@tabler/icons-react";
import profile from "@assets/Profile.svg";
import bag from "@assets/Bag.svg";
import { ShopModal } from "@components/organisms";
import { NavLink } from "@components/atoms";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const isOnProductPage = location.pathname.startsWith("/products");

  return (
    <div className="w-full flex justify-between items-center relative px-44 pt-4">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="flex items-center space-x-8">
        <NavLink label="Home" to="/" />
        <div
          className="cursor-pointer relative"
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
      <div className="flex items-center space-x-8">
        <IconSearch width={32} height={32} />
        <img src={profile} alt="Profile" width={32} height={32} />
        <img src={bag} alt="Shopping Bag" width={32} height={32} />
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
