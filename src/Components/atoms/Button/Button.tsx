import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "primary" | "secondary" | "outlined" | "disabled";
  isDisabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "primary",
  isDisabled = false,
  className = "",
}) => {
  const baseStyles = `px-4 py-2 rounded font-semibold text-sm transition duration-200 ease-in-out`;

  let buttonStyles = "";

  switch (type) {
    case "primary":
      buttonStyles = "bg-blue-500 text-white hover:bg-blue-600";
      break;
    case "secondary":
      buttonStyles = "bg-gray-500 text-white hover:bg-gray-600";
      break;
    case "outlined":
      buttonStyles = "border border-blue-500 text-blue-500 hover:bg-blue-50";
      break;
    case "disabled":
      buttonStyles = "bg-gray-400 text-gray-700 cursor-not-allowed";
      break;
    default:
      buttonStyles = "bg-blue-500 text-white hover:bg-blue-600";
      break;
  }

  return (
    <button
      className={`${baseStyles} ${buttonStyles} ${className}`}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default Button;
