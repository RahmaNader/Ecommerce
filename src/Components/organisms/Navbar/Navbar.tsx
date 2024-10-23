import React, { useRef, useState } from "react";
import Logo from "@assets/Logo.png";
import { IconSearch } from "@tabler/icons-react";
import profile from "@assets/Profile.svg";
import bag from "@assets/Bag.svg";
import { ShopModal } from "@components/organisms";
import { NavLink } from "@components/atoms";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleOpenModal = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setIsModalOpen(false);
    }, 100);
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center justify-between">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="flex items-center justify-between space-x-8">
        <NavLink label="Home" to="/" />
        <div
          className="relative"
          onMouseEnter={handleOpenModal}
          onMouseLeave={handleCloseModal}
        >
          <span className="text-dark-grey hover:text-wine text-2xl font-normal font-playfair cursor-pointer">
            Shop
          </span>
        </div>
        <NavLink label="Blogs" to="/blogs" />
        <NavLink label="Contact Us" to="/contact" />
      </div>
      <div className="flex items-center justify-between space-x-8">
        <IconSearch width={32} height={32} />
        <img src={profile} alt="Profile" width={32} height={32} />
        <img src={bag} alt="Shopping Bag" width={32} height={32} />
      </div>

      {/* Render the ShopModal when isModalOpen is true */}
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
