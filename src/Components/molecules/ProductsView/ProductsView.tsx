import React from 'react';
import { Card, Category } from '@components/atoms';
import { CardComponent, ProductsViewProps } from '@types';

const ProductsView: React.FC<ProductsViewProps> = ({ sectionName, cards }) => {
  return (
    <div className='max-w-[1200px] w-full justify-center mx-auto'>
      <Category SectionName={sectionName} />

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-6 mx-auto px-2 md:px-4">
        {cards.map((card: CardComponent) => (
          <div
            key={card.productID}
            className="m-2 sm:m-3 md:m-4 lg:m-5 flex justify-center w-[140px] xs:w-[160px] sm:w-auto"
          >
            <Card
              productImages={card.productImages}
              productID={card.productID}
              name={card.name}
              priceAfterDiscount={card.priceAfterDiscount}
              productPrice={card.productPrice}
              averageRate={card.averageRate}
              productDescription={card.productDescription}
              productQuantity={card.productQuantity}
              category={card.category}
              categoryID={card.categoryID}
              nameEn={card.nameEn}
              nameAr={card.nameAr}
              productDescriptionEn={card.productDescriptionEn}
              productDescriptionAr={card.productDescriptionAr}
              productCode={card.productCode}
              reviews={card.reviews}
              productVarients={card.productVarients}
              reviewPercentages={card.reviewPercentages}
              created={card.created}
              lastUpdated={card.lastUpdated}
              discountPercent={card.discountPercent}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsView;