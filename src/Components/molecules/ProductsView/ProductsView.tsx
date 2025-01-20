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
              key={card.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center"
            >
              <Card
                {...card}
                color={Array.isArray(card.color) ? card.color : []}
                size={Array.isArray(card.size) ? card.size : []}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsView;
