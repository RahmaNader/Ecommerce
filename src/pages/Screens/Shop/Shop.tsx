import React , { useState}   from "react";
import { useParams, Navigate } from "react-router-dom";
import {Filter} from '@components/organisms';
import { Breadcrumb } from "@components/molecules";
import { Card } from '@components/atoms';
import Img1 from "@assets/HP_img1.jpeg";
import Img2 from "@assets/HP_img2.jpeg";
import Img3 from "@assets/HP_img3.jpeg";

type ShopParams = {
  category: string;
  item?: string;
};

const cards = [
  {
    src: Img1,
    alt: "product-image",
    name: "Classic Jacket",
    DisPrice: "200EGP",
    NormalPrice: "250EGP",
    rate: 4,
  },
  {
    src: Img2,
    alt: "product-image",
    name: "Modern Coat",
    DisPrice: "300EGP",
    NormalPrice: "350EGP",
    rate: 5,
  },
  {
    src: Img3,
    alt: "product-image",
    name: "Stylish Shirt",
    DisPrice: "150EGP",
    NormalPrice: "180EGP",
    rate: 3,
  },
  {
    src: Img1,
    alt: "product-image",
    name: "Elegant Dress",
    DisPrice: "400EGP",
    NormalPrice: "450EGP",
    rate: 2,
  },
  {
    src: Img1,
    alt: "product-image",
    name: "Classic Jacket",
    DisPrice: "200EGP",
    NormalPrice: "250EGP",
    rate: 4,
  },
  {
    src: Img2,
    alt: "product-image",
    name: "Modern Coat",
    DisPrice: "300EGP",
    NormalPrice: "350EGP",
    rate: 5,
  },
  {
    src: Img3,
    alt: "product-image",
    name: "Stylish Shirt",
    DisPrice: "150EGP",
    NormalPrice: "180EGP",
    rate: 3,
  },
  {
    src: Img1,
    alt: "product-image",
    name: "Elegant Dress",
    DisPrice: "400EGP",
    NormalPrice: "450EGP",
    rate: 2,
  },
  {
    src: Img1,
    alt: "product-image",
    name: "Classic Jacket",
    DisPrice: "200EGP",
    NormalPrice: "250EGP",
    rate: 4,
  },
  {
    src: Img2,
    alt: "product-image",
    name: "Modern Coat",
    DisPrice: "300EGP",
    NormalPrice: "350EGP",
    rate: 5,
  },
  {
    src: Img3,
    alt: "product-image",
    name: "Stylish Shirt",
    DisPrice: "150EGP",
    NormalPrice: "180EGP",
    rate: 3,
  },
  {
    src: Img1,
    alt: "product-image",
    name: "Elegant Dress",
    DisPrice: "400EGP",
    NormalPrice: "450EGP",
    rate: 2,
  },
];

const Shop: React.FC = () => {
  const { category, item } = useParams();
  const [filteredCards, setFilteredCards] = useState(cards);

  if (!category) {
    return <Navigate to="/" />;
  }

   // Extract the last segment of the URL path
  const lastSegment = location.pathname.split("/").filter(Boolean).pop();

  return (
    <div className="bg-customBeige min-h-screen md:p-10">
       {/* <Breadcrumb /> */}
      <div className="flex flex-col lg:flex-row items-start ">
        {/* Filter Section */}
        <div className="w-full md:w-1/4 p-4 md:sticky md:top-0 flex justify-center">
          <Filter onFilterChange={() => {
            // Handle filter change logic here
            const filtered = cards.filter(card => {
              return card.rate > 3; 
            });
            setFilteredCards(filtered);
          }} />
        </div>
        {/* Products Section */}
        <div className="w-full lg:w-3/4 p-4">
        <p className="font-playball text-[40px] text-wine text-center md:text-left">
        {(lastSegment ?? '').charAt(0).toUpperCase() + (lastSegment ?? '').slice(1)}
      </p>
          <div className="flex flex-wrap gap-5 justify-center">
            {filteredCards.map((card) => (
              <div
                key={card.name}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center my-10"
              >
                <Card
                  src={card.src}
                  alt={card.alt}
                  name={card.name}
                  DisPrice={card.DisPrice}
                  NormalPrice={card.NormalPrice}
                  rate={card.rate}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;