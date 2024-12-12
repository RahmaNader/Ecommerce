import React from "react";
import { NavLink } from "@components/atoms";
import { useLocation } from "react-router-dom";
import breadcrumbArrow from "@assets/breadcrumb.png";

const Breadcrumb: React.FC = () => {
  const location = useLocation();

  // Check if the current path contains "profile"
  const isProfilePath = location.pathname.includes("profile");

  const currentPageName = isProfilePath
    ? "Profile"
    : location.pathname
        .split("/")
        .filter(Boolean)
        .pop()
        ?.replace(/-/g, " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

  const previousPagePath = isProfilePath ? "/" : location.state?.from || "/";
  const previousPageName = isProfilePath
    ? "Home"
    : previousPagePath
        .split("/")
        .filter(Boolean)
        .pop()
        ?.replace(/-/g, " ")
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || "Home";

  return (
    <div className="flex items-center mt-4 gap-1 w-auto h-8 space-x-1">
      <NavLink
        label={previousPageName}
        to={previousPagePath}
        variant="breadcrumb"
      />
      <img
        src={breadcrumbArrow}
        alt="Breadcrumb Arrow"
        className="w-4 h-4 md:w-6 md:h-6 transform"
      />
      <span className="text-base md:text-2xl text-wine font-playfair font-bold">
        {currentPageName}
      </span>
    </div>
  );
};

export default Breadcrumb;
