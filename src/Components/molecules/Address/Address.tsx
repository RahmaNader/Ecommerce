// import { ToggleRadioButton } from "@components/atoms"


export interface AddressProps {
    building: string;
    aptNo: string;
    floor: string;
    street: string;
    phoneNumber: string;
    country: string;
    city: string;
    additionalDirections?: string;
    saveAddress: boolean;
  }
  
  const Address: React.FC<AddressProps> = ({
    building,
    aptNo,
    floor,
    street,
    phoneNumber,
    country,
    city,
    additionalDirections,
    
  }) => {
    return (
      <div className="py-5 flex border-b border-b-gray-300 text-mainColor w-[95%]">
        <div className="ms-5 w-full flex justify-between items-center">
          <div className="w-4/5">
            <div className="text-[#AF754D] text-lg px-8 font-Poppins">
              <p>{building} {aptNo}, {floor} Floor, {street}</p>
              <p>Contact - {phoneNumber}</p>
              <p>{city}, {country}</p>
              {additionalDirections && <p>{additionalDirections}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Address;
  


{/* <img src={plusIcon} alt="" className='cursor-pointer' /> */ }


/* <img src={image1} alt="" className='lg:w-full lg:h-full md:w-full md:h-full max-sm:w-full rounded-md' /> */

/* <h3>{product.name}</h3> */

