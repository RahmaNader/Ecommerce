import React from "react";
import { ProductCard } from "@components/atoms/ProductCard/ProductCard";
import { CardComponent } from "@types";

type ProductsDisplayProps = {
  products: CardComponent[];
  // language: string;
};

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({
  products,
  // language,
}) => {
  // const isRTL = language === "ar";

  return (
    <div className="w-full">
      <section
        className="
          grid auto-rows-[1fr] gap-y-2 gap-x-4 md:gap-x-10
          grid-cols-2      
          sm:grid-cols-3      
          lg:grid-cols-4  
          justify-items-center
        "
      >
        {products.map((card) => (
          <div key={card.productID} className="max-w-[225px] w-full">
            <ProductCard
              productID={card.productID}
              name={card.name}
              nameEn={card.nameEn}
              nameAr={card.nameAr}
              productPrice={card.productPrice}
              priceAfterDiscount={card.priceAfterDiscount}
              discountPercent={card.discountPercent}
              productVarients={card.productVarients}
              productImages={card.productImages}
              averageRate={card.averageRate}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProductsDisplay;
