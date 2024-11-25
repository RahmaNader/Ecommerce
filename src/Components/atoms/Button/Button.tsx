import React from "react";

type ButtonProps = {
  label: string;
  type?:
    | "primary"
    | "secondary"
    | "outlined"
    | "disabled"
    | "PaginationOutlined"
    | "Pagination";
  onClick?: () => void;
  isDisabled?: boolean; // Disabled flag
  className?: string; // Additional classes
  size?: "small" | "medium" | "large" | "login-register";
  style?: React.CSSProperties;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "primary",
  isDisabled = false,
  className = "",
  size = "small",
  style = {},
}) => {
  let buttonStyles = "";

  switch (type) {
    case "primary":
      buttonStyles = "bg-wine text-white rounded rounded-4 hover:bg-sixColor";
      break;
    case "secondary":
      buttonStyles = "bg-skin text-white rounded rounded-4 ";
      break;
    case "outlined":
      buttonStyles = "border border-mainColor text-mainColor rounded rounded-4";
      break;
    case "disabled":
      buttonStyles =
        "bg-gray-400 text-gray-700 cursor-not-allowed rounded rounded-4 ";
      break;
    case "PaginationOutlined":
      buttonStyles =
        "font-Playfair text-[10px] w-[40px] h-[25px] sm:text-[20px] sm:w-[140px] sm:h-[60px] mx-2 border-2 border-wine text-wine rounded rounded-4 cursor-pointer hover:border-sixColor hover:text-sixColor";
      break;
    case "Pagination":
      buttonStyles =
        "font-Playfair text-[10px] w-[40px] h-[25px] sm:text-[20px] sm:w-[140px] sm:h-[60px] mx-2 bg-wine text-white rounded rounded-4 cursor-pointer hover:bg-sixColor";
      break;
    default:
      buttonStyles =
        "bg-blue-500 text-white hover:bg-blue-600 rounded rounded-4 ";
      break;
  }

  switch (size) {
    case "small":
      className += " px-5 py-2.5";
      break;
    case "medium":
      className += " px-10 py-2.5";
      break;
    case "large":
      className += " w-full py-3.5";
      break;
    case "login-register":
      className += "w-3/4 py-2 text-[20px] ";
      break;
  }

  return (
    <button
      className={`${buttonStyles} ${className}`}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      type="submit"
      style={style}
    >
      {label}
    </button>
  );
};

export default Button;
