// src/components/atoms/Card/Card.tsx
import React from "react";
import star from "@assets/Star.svg";
import greyStar from "@assets/GreyStar.svg";
import { CardProps } from "@types";

const Card: React.FC<CardProps> = ({
  src,
  alt,
  name,
  DisPrice,
  NormalPrice,
  rate,
}) => {
  return (
    <div className="text-center">
      <div className="image-container w-[225px] h-[358.3px] relative overflow-hidden rounded-t-[500px] cursor-pointer hover:opacity-80 ">
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full cursor-pointer"
        />
        <div className="absolute top-0 left-0 w-full h-full border-[2px] border-[#E3C174] rounded-t-[500px]" />
      </div>

      <div className="mt-5">
        <p className="font-instrument font-medium text-[20px] leading-[24.4px] hover:opacity-80 cursor-pointer text-secondColor">
          {name}
        </p>
        <p className="font-playfair font-semibold text-[20px] leading-[30px] text-ForthColor">
          EGP {DisPrice}
        </p>
        <p className="font-playfair font-medium text-[15px] line-through text-FifthColor">
          EGP {NormalPrice}
        </p>
      </div>

      <div className="flex justify-center">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src={i < rate ? star : greyStar}
            alt={i < rate ? "Golden Star" : "Grey Star"}
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
