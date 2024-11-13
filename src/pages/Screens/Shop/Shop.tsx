import React from "react";
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
  const { category, item } = useParams<ShopParams>();

  if (!category) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col lg:flex-row bg-customBeige min-h-screen mb-10 items-start justify-center">
      <div className="ml-10 mt-16">
        <Breadcrumb />
        <Filter/>
      </div>
      
      <div className="flex flex-col md:flex-row flex-wrap gap-5 justify-items-center ">
        <div className="w-[100%]">
          <p className="font-playball text-[40px] text-wine">
            Tops
          </p>
        </div>
        {cards.map((card) => (
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
  );
};

export default Shop;