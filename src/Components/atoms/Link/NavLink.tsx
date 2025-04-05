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
  isActive: isActiveProp,
  className: additionalClassName = "",
}) => {
  const location = useLocation();
  const isSidebarActive = variant === "sidebar" && location.pathname === to;
  
  // Special case for shop link - active when on product pages
  const isShopActive = to === "#" && location.pathname.includes("/products");
  
  const isActive = 
    isActiveProp || 
    isShopActive || 
    (to !== "/" && to !== "#" && location.pathname.startsWith(to)) || 
    location.pathname === to;

  let className = "";

  if (variant === "navbar") {
    className =
      `font-playfair text-xl font-medium relative transition-colors ${
        isActive 
          ? "text-wine after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-wine" 
          : "text-ForthColor hover:text-wine"
      }`;
  } else if (variant === "footer") {
    className =
      "font-playfair text-base font-medium text-ForthColor hover:text-eightColor transition-colors";
  } else if (variant === "navbaricons") {
    className = "inline-block transition-transform hover:scale-110";
  } else if (variant === "subnavbar") {
    className =
      "font-playfair text-lg font-medium text-ForthColor hover:text-wine transition-colors";
  } else if (variant === "breadcrumb") {
    className =
      "font-playfair text-base md:text-lg text-ThirdColor font-medium hover:text-wine transition-colors";
  } else if (variant === "sidebar") {
    className = `flex items-center gap-4 p-3 rounded-md font-playfair text-lg font-medium transition-colors ${
      isSidebarActive 
        ? "text-wine bg-wine/10" 
        : "text-ForthColor hover:bg-ForthColor/10"
    }`;
  } else if (variant === "sidenavbar") {
    className =
      `w-full font-playfair font-medium h-14 text-base border-b border-ForthColor/30 
       ${isActive ? "text-wine bg-[#A78E7830]" : "text-ForthColor bg-[#A78E7810]"} 
       hover:bg-[#A78E7830] flex items-center px-6 py-4 transition-colors`;
  }

  className = `${className} ${additionalClassName}`;

  return (
    <RouterNavLink
      to={to}
      state={state ?? { from: location.pathname }}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {variant === "sidebar" && (
          <span className="flex-shrink-0">
            {isSidebarActive ? (
              <img src={ActiveIcon} className="w-6 h-6" alt="Active Icon" />
            ) : (
              <img src={DefaultIcon} className="w-6 h-6" alt="Icon" />
            )}
          </span>
        )}
        <span>{label}</span>
      </div>
    </RouterNavLink>
  );
};

export default NavLink;
