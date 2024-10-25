import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

type NavLinkProps = {
  label: string;
  to?: string;
  unStyled?:boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({
  label,
  to,
  unStyled,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (to) {
    return (
      <RouterNavLink
        to={to}
        className={({ isActive }) =>
          unStyled
            ? "" // No styling applied if `unstyled` is true
            : `text-dark-grey hover:text-wine no-underline text-2xl font-normal font-playfair ${
                isActive ? "text-wine" : "text-dark-grey"
              }`
        }
        onMouseEnter={onMouseEnter} // Add optional hover start
        onMouseLeave={onMouseLeave} // Add optional hover end
      >
        {label}
      </RouterNavLink>
    );
  }

  return (
    <span
      className="text-dark-grey hover:text-wine text-2xl font-normal font-playfair cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {label}
    </span>
  );
};

export default NavLink;
