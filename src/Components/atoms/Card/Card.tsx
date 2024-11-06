import star from "@assets/Star.svg";
import greyStar from "@assets/GreyStar.svg"; // Assuming you have a grey star image

type CardProps = {
  src: string; // for image
  alt: string; // for image
  name: string; // clothes kind
  DisPrice: string; // clothes price after discount
  NormalPrice: string; // clothes price before discount
  rate: number; // rating out of 5
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
    <div className="text-center">
      <div  onClick={onClick} className="image-container w-[225px] h-[358.3px] relative overflow-hidden rounded-t-[500px] cursor-pointer hover:opacity-80">
        {/* Image */}
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full cursor-pointer"
        />
        {/* Frame Border */}
        <div className="absolute top-0 left-0 w-full h-full border-[2px] border-[#E3C174] rounded-t-[500px]" />
      </div>

      {/* Product Details */}
      <div className="mt-5">
        <p
          onClick={onClick}
          className="font-instrument font-medium text-[20px] leading-[24.4px] hover:opacity-80 cursor-pointer text-secondColor"
        >
          {name}
        </p>
        <p className="font-playfair font-semibold text-[20px] leading-[30px] text-ForthColor">
          {DisPrice}
        </p>
        <p className="font-playfair font-medium text-[15px] line-through text-FifthColor">
          {NormalPrice}
        </p>
      </div>

      {/* Star Rating */}
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