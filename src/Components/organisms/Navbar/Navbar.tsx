import React from "react";
import { NavLink } from "@components/atoms";
import { useLocation } from "react-router-dom";
import Logo from "@assets/Logo.png";
import { IconSearch } from "@tabler/icons-react";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="w-full flex justify-between items-center relative px-6 xl:px-32 pt-2">
      {/* Logo and Branding */}
      <div className="flex items-center gap-4">
        <img src={Logo} alt="Logo" className="h-[51px] w-[101px]" />
      </div>

      {/* Navigation Links */}
      <div className="hidden xl:flex items-center space-x-8">
        <NavLink label="Home" to="/" variant="navbar" />
        <NavLink label="Shop" to="/shop" variant="navbar" />
        <NavLink label="Blogs" to="/blogs" variant="navbar" />
        <NavLink label="Contact Us" to="/contact-us" variant="navbar" />
        <NavLink label="About Us" to="/about-us" variant="navbar" />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <NavLink
          label={<IconSearch width={32} height={32} />}
          to="/search"
          variant="navbaricons"
        />
        {/* Other icons */}
      </div>
    </nav>
  );
};

export default Navbar;