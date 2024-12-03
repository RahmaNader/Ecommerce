import { NavLink as RouterNavLink, useLocation } from "react-router-dom";

type NavLinkProps = {
  label: string | JSX.Element;
  to?: string;
  variant: "navbar" | "footer" | "navbaricons" | "subnavbar" | "breadcrumb";
  state?: never;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({
  label,
  to = "/",
  variant,
  state,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const location = useLocation();
  let className = "";

  if (variant === "navbar") {
    className =
      "font-playfair text-[24px] font-normal leading-[31.99px] text-left underline-from-font decoration-skip-ink-none hover:text-wine inline";
  } else if (variant === "footer") {
    className =
      "font-playfair text-[16px] font-medium leading-[21.33px] text-left underline-from-font decoration-skip-ink-none hover:text-eightColor inline";
  } else if (variant === "navbaricons") {
    className = "inline";
  } else if (variant === "subnavbar") {
    className =
      "font-playfair text-[20px] font-normal leading-[28px] underline-from-font decoration-skip-ink-none hover:text-wine inline text-center";
  } else if (variant === "breadcrumb") {
    className =
      "font-playfair text-[15px] md:text-[28px] text-ThirdColor inline font-bold";
  }

  return (
    <RouterNavLink
      to={to}
      state={state ?? { from: location.pathname }}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {label}
    </RouterNavLink>
  );
};

export default NavLink;