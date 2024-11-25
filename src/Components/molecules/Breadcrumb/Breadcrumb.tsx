import React from "react";
import { NavLink } from "@components/atoms";
import { useLocation } from "react-router-dom";
import breadcrumbArrow from "@assets/breadcrumb.png";

const Breadcrumb: React.FC = () => {
  const location = useLocation();

  const currentPageName =
  location.pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// Get the previous page path and name from location.state
const previousPagePath = location.state?.from || "/";
const previousPageName: string =
  previousPagePath
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ")
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "Home";

  return (
    <div className="flex items-center gap-[4px] w-auto h-[32px] space-x-1">
      <NavLink
        label={previousPageName}
        to={previousPagePath}
        variant="breadcrumb"
      />
      <img
        src={breadcrumbArrow}
        alt="Breadcrumb Arrow"
        className="w-[22px] h-[22px] opacity-100 transform"
      />
      <span className="text-[24px] leading-[31.99px] text-wine font-playfair font-bold">
        {currentPageName}
      </span>
    </div>
  );
};

export default Breadcrumb;