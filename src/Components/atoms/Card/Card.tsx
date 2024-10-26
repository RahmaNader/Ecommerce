import star from '@assets/Star.svg'
import tests from '@assets/tree.jpg'  // image with another w and h to test card Frame work good  or not 
type CardProps={

  src:string;// for image 
  alt:string;// for image
  name:string;// clothes kind
  DisPrice:string; // clothes price after discount 
  NormalPrice:string;// clothes price before discount 
  
}

  const Card =({src,alt,name,DisPrice,NormalPrice}:CardProps) => {
    return <>
     <div className=" text-center ">
     <div className="image-container  w-[225px] h-[358.3px] relative overflow-hidden rounded-t-[500px]">
  {/* Image */}
  <img
    src={src}
    alt={alt}
    className="object-cover w-full h-full"
  />
  
  {/* Frame Border */}
  <div className="absolute top-0 left-0 w-full h-full border-[2px] border-[#E3C174] rounded-t-[500px] "></div>
</div>

     {/* use text or image and what is best .... ?? */}
       <div className="mt-5 ">
       <p className="font-instrument font-medium text-[20px] leading-[24.4px] text-secondColor ">{name}</p>
      <p className="font-playfair font-semibold text-[20px] leading-[30px] text-ForthColor">{DisPrice}</p>
      <p className="font-playfair font-medium text-[15px]  line-through text-FifthColor">{NormalPrice}</p>
      
       </div>
       {/* use image or icon what is better .. ? */}
       <div className='flex  justify-center' >
        <img src={star} alt="Star Icon" />
        <img src={star} alt="Star Icon" />
        <img src={star} alt="Star Icon" />
        <img src={star} alt="Star Icon" />
       </div>
     </div>
    </>
  };
  
  export default Card;
  
   
