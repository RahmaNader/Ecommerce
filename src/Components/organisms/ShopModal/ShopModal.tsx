// ShopModal.tsx
import React from "react";

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
  if (!isOpen) return null;

  return (
    <div
      className="absolute left-1/2 top-full transform -translate-x-1/2 mt-4 z-50 w-[78%] ease-in shadow-[0px_0px_14.4px_-1px_#A78E7875]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="bg-[#faf7f2] p-8 rounded-lg w-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#721013] mb-4">Men</h2>
            <ul className="space-y-2">
              <li className="text-[#8c7361] hover:text-[#721013]">Pants</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Tops</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Shoes</li>
              <li className="text-[#8c7361] hover:text-[#721013]">
                Accessories
              </li>
              <li className="text-[#8c7361] hover:text-[#721013]">Dresses</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Bags</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Suits</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Sports</li>
            </ul>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#721013] mb-4">Women</h2>
            <ul className="space-y-2">
              <li className="text-[#8c7361] hover:text-[#721013]">Pants</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Tops</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Shoes</li>
              <li className="text-[#8c7361] hover:text-[#721013]">
                Accessories
              </li>
              <li className="text-[#8c7361] hover:text-[#721013]">Dresses</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Bags</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Suits</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Sports</li>
            </ul>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#721013] mb-4">Kids</h2>
            <ul className="space-y-2">
              <li className="text-[#8c7361] hover:text-[#721013]">Pants</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Tops</li>
              <li className="text-[#721013] font-bold">Shoes</li>{" "}
              {/* Highlighted Item */}
              <li className="text-[#8c7361] hover:text-[#721013]">
                Accessories
              </li>
              <li className="text-[#8c7361] hover:text-[#721013]">Dresses</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Bags</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Suits</li>
              <li className="text-[#8c7361] hover:text-[#721013]">Sports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
