import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "primary" | "secondary" | "outlined" | "disabled"; // Button types
  isDisabled?: boolean; // Disabled flag
  className?: string; // Additional classes
  size?: "small" | "medium" | "large" | "login-register";
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
      buttonStyles = "bg-mainColor text-white rounded rounded-4";
      break;
    case "secondary":
      buttonStyles = "bg-skin text-white rounded rounded-4";
      break;
    case "outlined":
      buttonStyles = "border border-mainColor text-mainColor rounded rounded-4";
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
      className = "px-5 py-2.5";
      break;
    case "medium":
      className = "px-10 py-2.5";
      break;
    case "large":
      className = "w-full py-3.5";
      break;
    case "login-register":
      className = "w-1/2 py-3.5";
      break;
  }

  return (
    <button
      className={`${className} ${buttonStyles}`}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default Button;
