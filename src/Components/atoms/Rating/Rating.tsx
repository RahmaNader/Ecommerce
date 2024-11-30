import React from "react";
import star from "@assets/Star.svg";
import greyStar from "@assets/GreyStar.svg";

type RatingProps = {
  rate: number;
};

const Rating: React.FC<RatingProps> = ({ rate }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex justify-center">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src={i < Math.floor(rate) ? star : greyStar}
            alt={i < Math.floor(rate) ? "Golden Star" : "Grey Star"}
            className="w-6 h-6"
          />
        ))}
      </div>

      <span className="font-Poppins font-semibold text-[14px] text-wine ">{rate.toFixed(1)} </span>
    </div>
  );
};

export default Rating;
