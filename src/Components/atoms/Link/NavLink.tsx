import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { NavLinkProps } from "@types";

const NavLink: React.FC<NavLinkProps> = ({
  label,
  DefaultIcon,
  ActiveIcon,
  to = "/",
  variant,
  state,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const location = useLocation();

  const isSidebarActive = variant === "sidebar" && location.pathname === to;

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
  } else if (variant === "sidebar") {
    className = `flex items-center space-x-4 p-2 rounded-md font-playfair text-xl font-semibold ${
      isSidebarActive ? "text-wine" : "text-ForthColor"
    } hover:text-wine`;
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
      <div className="flex flex-row items-center gap-4">
        {variant === "sidebar" && (
          <span>
            {isSidebarActive ? 
              <img
              src={ActiveIcon}
              className="w-8 h-8"
              alt="Profile Icon"/> 
              : 
              <img
              src={DefaultIcon}
              className="w-8 h-8"
              alt="Profile Icon"/> 
            }
          </span>
        )}
        <span>{label}</span>
      </div>
    </RouterNavLink>
  );
};

export default NavLink;
