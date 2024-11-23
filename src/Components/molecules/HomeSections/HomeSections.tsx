// src/Components/molecules/HomeSections/HomeSections.tsx
import React from 'react';
import { Card } from '@components/atoms';
import { Category } from '@components/atoms';

type CardData = {
  src: string;
  alt: string;
  name: string;
  DisPrice: string;
  NormalPrice: string;
  rate: number; 
};

type SectionsProps = {
  SectionName: string;
  cards: CardData[];
};

const HomeSections: React.FC<SectionsProps> = ({ SectionName, cards }) => {
  const handleCardClick = (item: string) => {
    console.log(`Image clicked: ${item}`);
  };

  return (
    <>
      <div>
        <Category SectionName={SectionName} />

        <div className="flex flex-wrap justify-between mx-[50px]">
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center my-10"
            >
              <Card
                src={card.src}
                alt={card.alt}
                name={card.name}
                DisPrice={card.DisPrice}
                NormalPrice={card.NormalPrice}
                rate={card.rate} 
                onClick={() => handleCardClick(card.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeSections;