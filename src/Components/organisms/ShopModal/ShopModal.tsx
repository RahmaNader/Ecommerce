import React from "react";
import { Link, useLocation } from "react-router-dom";
import { categories } from "./utils";
type ShopModalProps = {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
}) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div
      className="bg-customBeige absolute left-1/2 top-full transform -translate-x-1/2 mt-4 z-50 w-[55%] ease-in shadow-custom-light"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-8 rounded-lg w-auto">
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-wine mb-4">Men</h2>
            <ul className="space-y-2">
              {categories.men.map((item) => {
                const isActive = location.pathname.includes(
                  `/products/men/${item.toLowerCase()}`
                );
                return (
                  <li key={item}>
                    <Link
                      to={`/products/men/${item.toLowerCase()}`}
                      className={`text-[16px] ${
                        isActive
                          ? "text-wine font-medium"
                          : "text-mutedGray font-normal"
                      } hover:text-wine`}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold text-wine mb-4">Women</h2>
            <ul className="space-y-2">
              {categories.women.map((item) => {
                const isActive = location.pathname.includes(
                  `/products/women/${item.toLowerCase()}`
                );
                return (
                  <li key={item}>
                    <Link
                      to={`/products/women/${item.toLowerCase()}`}
                      className={`text-[16px] ${
                        isActive
                          ? "text-wine font-medium"
                          : "text-mutedGray font-normal"
                      } hover:text-wine`}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold text-wine mb-4">Kids</h2>
            <ul className="space-y-2">
              {categories.kids.map((item) => {
                const isActive = location.pathname.includes(
                  `/products/kids/${item.toLowerCase()}`
                );
                return (
                  <li key={item}>
                    <Link
                      to={`/products/kids/${item.toLowerCase()}`}
                      className={`text-[16px] ${
                        isActive
                          ? "text-wine font-medium"
                          : "text-mutedGray font-normal"
                      } hover:text-wine`}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
