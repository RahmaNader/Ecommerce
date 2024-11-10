import { NavLink as RouterNavLink } from "react-router-dom";

type NavLinkProps = {
  label: string;
  to?: string;
  variant: "navbar" | "footer" | "navbaricons" | "subnavbar";
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({
  label,
  to,
  variant,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  let className = "";

  if (variant === "navbar") {
    className =
      "font-playfair text-[24px] font-normal leading-[31.99px] text-left underline-from-font decoration-skip-ink-none hover:text-wine inline";
  } else if (variant === "footer") {
    className =
      "font-playfair text-[16px] font-medium leading-[21.33px] text-left underline-from-font decoration-skip-ink-none hover:text-eightColor inline";
  } else if (variant === "navbaricons") {
    className =
      "text-dark-grey text-2xl font-normal font-playfair inline";
  } else if (variant === "subnavbar") {
    className =
      "font-playfair text-[20px] font-normal leading-[28px] underline-from-font decoration-skip-ink-none hover:text-wine inline text-center";
  }

  if (to) {
    return (
      <RouterNavLink
        to={to}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {label}
      </RouterNavLink>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default NavLink;