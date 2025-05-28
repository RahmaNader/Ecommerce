import { FC } from "react";
import { CardComponent } from "@types";
import { ProductCard } from "../../atoms/ProductCard/ProductCard";
import Category from "../../atoms/Category/Category";

interface ProductsGridProps {
  products: CardComponent[];
  /** optional section heading if you want to match Category + grid */
  sectionName?: string;
}

export const ProductsGrid: FC<ProductsGridProps> = ({
  products,
  sectionName,
}) => (
  <div className="w-full">
    {sectionName && <Category SectionName={sectionName} />}

    <section
      className="
  grid auto-rows-[1fr] gap-y-8 gap-x-4 md:gap-x-10 justify-center
  grid-cols-2
  sm:[grid-template-columns:repeat(auto-fit,minmax(180px,225px))]
"
    >
      {products.map((p) => (
        <div key={p.productID} className="max-w-[225px] w-full">
          <ProductCard
            key={p.productID}
            productID={p.productID}
            name={p.name}
            nameEn={p.nameEn}
            nameAr={p.nameAr}
            productPrice={p.productPrice}
            priceAfterDiscount={p.priceAfterDiscount}
            discountPercent={p.discountPercent}
            productVarients={p.productVarients}
            productImages={p.productImages}
            averageRate={p.averageRate}
          />
        </div>
      ))}
    </section>
  </div>
);
