import React from "react";
import { useParams, Navigate } from "react-router-dom";

type ShopParams = {
  category: string;
  item?: string;
};

const Shop: React.FC = () => {
  const { category, item } = useParams<ShopParams>();

  if (!category) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-customBeige min-h-screen">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-[#721013]">
          {category.charAt(0).toUpperCase() + category.slice(1)}
          {item ? `: ${item}` : ""}
        </h1>
        <p className="text-[#8c7361] mt-4">
          {item
            ? `This is the ${item} section for ${category}.`
            : `Browse items in the ${category} category.`}
        </p>
      </div>
    </div>
  );
};

export default Shop;
