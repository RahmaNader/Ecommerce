import NavLink from "@components/atoms/Link/NavLink";
import React from "react";
import Logo from "@assets/Logo.png";
import { IconSearch } from "@tabler/icons-react";
import profile from "@assets/Profile.svg";
import bag from "@assets/Bag.svg";
const Navbar: React.FC = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center justify-between">
        <img src={Logo} />
      </div>
      <div className="flex items-center justify-between space-x-8 ">
        <NavLink label={"Home"} />
        <NavLink label={"Shop"} />
        <NavLink label={"Blogs"} />
        <NavLink label={"Contact Us"} />
      </div>
      <div className="flex items-center justify-between space-x-8">
        <IconSearch width={32} height={32} />
        <img src={profile} width={32} height={32} />
        <img src={bag} width={32} height={32} />
      </div>
    </div>
  );
};

export default Navbar;
