// src/data/cards.ts
import Img1 from "@assets/HP_img1.jpeg";
import Img2 from "@assets/HP_img2.jpeg";
import Img3 from "@assets/HP_img3.jpeg";

interface CardProps {
    src: string;
    alt: string;
    name: string;
    DisPrice: number;
    NormalPrice: number;
    rate: number;
    size: string;
    category: string;
    collection: number;
    price: number;
  }

export const cards: CardProps[] = [
  {
    src: Img1,
    alt: "product-image",
    name: "Classic Jacket",
    DisPrice: 200,
    NormalPrice: 250,
    rate: 4,
    size: "M",
    category: "Jackets",
    collection: 0,
    price: 200,
  },
  {
    src: Img2,
    alt: "product-image",
    name: "Modern Coat",
    DisPrice: 300,
    NormalPrice: 350,
    rate: 5,
    size: "L",
    category: "Coats",
    collection: 1,
    price: 300,
  },
  {
    src: Img3,
    alt: "product-image",
    name: "Modern Coat",
    DisPrice: 300,
    NormalPrice: 350,
    rate: 5,
    size: "L",
    category: "Coats",
    collection: 1,
    price: 300,
  },
  // ... add more cards with appropriate properties
];
