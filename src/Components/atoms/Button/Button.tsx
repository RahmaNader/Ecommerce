import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "primary" | "secondary" | "outlined" | "disabled"; // Button types
  isDisabled?: boolean; // Disabled flag
  className?: string; // Additional classes
  size? : "small" | "medium" | "large";
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "primary",
  isDisabled = false,
  className = "",
  size = "small"
}) => {
  // const baseStyles = `px-4 py-2 rounded font-semibold text-sm transition duration-200 ease-in-out`;

  let buttonStyles = "";

  switch (type) {
    case "primary":
      buttonStyles = "bg-[#721013] text-white rounded rounded-4";
      break;
    case "secondary":
      buttonStyles = "bg-[#A78E78] text-white rounded rounded-4";
      break;
    case "outlined":
      buttonStyles = "border border-[#721013] text-[#721013] rounded rounded-4";
      break;
    case "disabled":
      buttonStyles = "bg-gray-400 text-gray-700 cursor-not-allowed rounded rounded-4";
      break;
    default:
      buttonStyles = "bg-blue-500 text-white hover:bg-blue-600 rounded rounded-4";
      break;
  }

  switch (size) {
    case "small":
      className = "px-2 py-2";
      break;
    case "medium": 
      className = "px-3 py-4";
      break;
    case "large":
      className = "w-full py-4";
      break;    
  }

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default Button;
