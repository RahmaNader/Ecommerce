import React from 'react';
import { Card, Category } from '@components/atoms';
import { CardComponent, ProductsViewProps } from '@types';

const ProductsView: React.FC<ProductsViewProps> = ({ sectionName, cards }) => {
  return (
    <>
      <div>
        <Category SectionName={sectionName} />

        <div className="flex flex-wrap justify-between mx-12">
          {cards.map((card: CardComponent) => (
            <div
              key={card.productID}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center"
            >
              <Card
                productImages = {card.productImages}
                productID={card.productID}
                name={card.name}
                priceAfterDiscount={card.priceAfterDiscount}
                productPrice={card.productPrice}
                averageRate={card.averageRate}
                productDescription={card.productDescription}
                color={card.color}
                productQuantity={card.productQuantity}
                size={card.size}
                category={card.category}
                // collection={card.collection}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsView;
