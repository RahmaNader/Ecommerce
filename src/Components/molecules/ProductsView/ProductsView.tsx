import React from 'react';
import { Card, Category } from '@components/atoms';
import { CardComponent, ProductsViewProps } from '@types';

const ProductsView: React.FC<ProductsViewProps> = ({ sectionName, cards }) => {
  return (
      <div className='w-[90%] justify-center mx-auto px-16'>
        <Category SectionName={sectionName} />

        <div className="flex flex-wrap justify-around ">
          {cards.map((card: CardComponent) => (
            <div
              key={card.productID}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center"
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
