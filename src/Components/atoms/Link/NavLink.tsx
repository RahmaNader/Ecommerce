import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

type NavLinkProps = {
  label: string;
  to?: string;  
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({
  label,
  to,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  if (to) {
    return (
      <RouterNavLink
        to={to}
        className="text-dark-grey hover:text-ThirdColor no-underline font-normal font-playfair"
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {label}
      </RouterNavLink>
    );
  }

  return (
    <button
      className="text-dark-grey hover:text-wine text-2xl font-normal font-playfair cursor-pointer bg-transparent border-none"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default NavLink;
