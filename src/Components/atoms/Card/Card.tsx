import star from "@assets/Star.svg";
import greyStar from "@assets/GreyStar.svg";

type CardProps = {
  src: string;
  alt: string; 
  name: string; 
  DisPrice: string; 
  NormalPrice: string; 
  rate: number;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({
  src,
  alt,
  name,
  DisPrice,
  NormalPrice,
  rate,
  onClick,
}) => {
  return (
    <div className="w-[75%] h-[75%] text-center m-4">
      <div  onClick={onClick} className="image-container w-auto h-auto relative overflow-hidden rounded-t-[500px] cursor-pointer hover:opacity-80 ">
        
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full cursor-pointer"
        />
        
        <div className="absolute top-0 left-0 w-full h-full border-[2px] border-[#E3C174] rounded-t-[500px]" />
      </div>

    
      <div className="mt-4">
        <p
          onClick={onClick}
          className="font-instrument font-medium text-[15px] md:text-[20px]  lg:text-[25px] leading-[24.4px] hover:opacity-80 cursor-pointer text-secondColor"
        >
          {name}
        </p>
        <p className="font-playfair font-semibold text-[15px]  md:text-[20px]  lg:text-[25px] leading-[30px] text-ForthColor">
          {DisPrice}
        </p>
        <p className="font-playfair font-medium text-[15px] md:text-[20px]  lg:text-[20px]  line-through text-FifthColor">
          {NormalPrice}
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