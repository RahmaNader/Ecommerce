// Navbar.tsx
import React, { useRef, useState, useEffect } from "react";
import Logo from "@assets/Logo.png";
import { IconSearch } from "@tabler/icons-react";
import profile from "@assets/Profile.svg";
import bag from "@assets/Bag.svg";
import { ShopModal } from "@components/organisms";
import { NavLink } from "@components/atoms";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPinned, setIsModalPinned] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = () => {
    if (!isModalPinned) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    if (!isModalPinned) {
      setIsModalOpen(false);
    }
  };

  const handleToggleModal = () => {
    setIsModalPinned((prev) => !prev);
    setIsModalOpen((prev) => !prev || !isModalPinned);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isModalPinned &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalPinned(false);
        setIsModalOpen(false);
      }
    };

    if (isModalPinned) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalPinned]);

  return (
    <div className="w-full flex justify-between items-center relative">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="flex items-center space-x-8">
        <NavLink label="Home" to="/" />
        <div
          className="cursor-pointer"
          onMouseEnter={handleOpenModal}
          onMouseLeave={handleCloseModal}
          onClick={handleToggleModal}
        >
          <span className="text-dark-grey hover:text-wine text-2xl font-normal font-playfair">
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
            modalRef={modalRef}
          />
        )}
    </div>
  );
};

export default Navbar;
