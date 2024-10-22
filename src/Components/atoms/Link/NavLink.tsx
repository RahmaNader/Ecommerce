import React from "react";
import { Link } from "react-router-dom";

type NavLinkProps = {
  label: string;
  to?: string;
  onHover?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({ label, to, onHover }) => {
  if (to) {
    return (
      <Link
        to={to}
        className="text-dark-grey hover:text-wine no-underline text-2xl font-normal"
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      className="text-dark-grey hover:text-wine focus:outline-none text-2xl font-normal"
    >
      {label}
    </button>
  );
};

export default NavLink;
