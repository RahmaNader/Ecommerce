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
  const baseStyles = `w-[233px] h-[60px] rounded-[5px] bg-secondColor pt-[10px] pb-[10px] ps-[46px] pe-[46px] font-mainFontFamily `;

  let buttonStyles = "";

  switch (type) {
    case "primary":
      buttonStyles = "bg-blue-500 text-white hover:bg-blue-600";
      break;
    case "secondary":
      buttonStyles = "bg-gray-500 text-white hover:bg-gray-600";
      break;
    case "outlined":
      buttonStyles = "border border-blue-500 text-blue-500 ";
      break;
    case "disabled":
      buttonStyles = "bg-gray-400 text-gray-700 cursor-not-allowed";
      break;
    default:
      buttonStyles = "w-[233px] h-[60px] rounded-[5px] bg-secondColor pt-[10px] pb-[10px] ps-[46px] pe-[46px]"
      break;
  }

  return (
    <button
      className={`${baseStyles} ${buttonStyles} ${className} `}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default Button;
