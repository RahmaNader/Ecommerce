import { useNavigate } from "react-router-dom";
import { CardComponent } from "@types";
import { CustomRating } from "@components/atoms";
import shoppingCart from "@assets/shoppingCart.svg";

const Card: React.FC<CardComponent> = ({
  id,
  src,
  alt,
  name,
  DisPrice,
  NormalPrice,
  rate,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product-details/${id}`);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    console.log("Add to cart clicked for product ID:", id);
  };

  return (
    <div className="text-center m-4 ">
      <div
        onClick={handleCardClick}
        className="image-container relative w-auto h-auto overflow-hidden rounded-t-[500px] cursor-pointer"
      >
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full cursor-pointer"
        />
        <div className="absolute top-0 left-0 w-full h-full border-[2px] border-golden rounded-t-[500px]" />

        <div
          onClick={handleAddToCartClick}
          className="absolute bottom-4 right-4 w-10 h-10 bg-wine rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
        >
          <img src={shoppingCart} alt="Add to Cart" className=" w-5 h-5" />
        </div>
      </div>

      <div className="mt-4">
        <p
          onClick={handleCardClick}
          className="font-instrumentSans font-medium text-[15px] md:text-[20px] lg:text-[25px] leading-[24.4px] hover:opacity-80 cursor-pointer text-secondColor"
        >
          {name}
        </p>
        <p className="font-playfair font-semibold text-[15px] md:text-[20px] lg:text-[25px] leading-[30px] text-ForthColor">
          {DisPrice} EGP
        </p>
        <p className="font-playfair font-medium text-[15px] md:text-[20px] lg:text-[20px] line-through text-FifthColor">
          {NormalPrice} EGP
        </p>
      </div>

      <div className="flex justify-center mt-2">
        <CustomRating rate={rate} mode="hide" />
      </div>
    </div>
  );
};

export default Card;
