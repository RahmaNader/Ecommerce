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
      className="fixed inset-0 flex justify-center items-center z-10000"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-[#faf7f2] p-8 rounded-lg w-[70%] h-auto">
        {/* Grid layout for categories */}
        <div className="grid grid-cols-3 gap-8">
          {/* Men Category */}
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

          {/* Women Category */}
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

          {/* Kids Category */}
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

        {/* Close button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={onMouseLeave}
            className="text-red-500 hover:text-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
