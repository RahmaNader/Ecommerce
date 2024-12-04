import React from 'react';
import { Card, Category } from '@components/atoms';
import { CardComponent, ProductsViewProps } from '@types';

const ProductsView: React.FC<ProductsViewProps> = ({ sectionName, cards }) => {
  return (
    <>
      <div>
        <Category SectionName={sectionName} />

        <div className="flex flex-wrap justify-between mx-[50px]">
          {cards.map((card: CardComponent) => (
            <div
              key={card.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center"
            >
              <Card
                id={card.id}
                src={card.src}
                alt={card.alt}
                name={card.name}
                DisPrice={card.DisPrice}
                NormalPrice={card.NormalPrice}
                rate={card.rate}
                description={card.description}
                color={card.color}
                availableQuantity={card.availableQuantity}
                size={card.size}
                category={card.category}
                collection={card.collection}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsView;
