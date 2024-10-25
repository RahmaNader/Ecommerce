import star from '@assets/Star.svg'
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
     <img src={src} alt={alt} />
     {/* use text or image and what is best .... ?? */}
       <div className="mt-5 ">
       <p className="font-instrument font-medium text-[20px] leading-[24.4px] text-secondColor ">{name}</p>
      <p className="font-mainFontFamily font-semibold text-[20px] leading-[30px] text-ForthColor">{DisPrice}</p>
      <p className="font-mainFontFamily font-medium text-[15px]  line-through text-FifthColor">{NormalPrice}</p>
      
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
  
   
