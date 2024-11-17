import { ToggleRadioButton } from "@components/atoms"


export default function Address() {
    return (
        <>
            <div className="py-5 flex border-b border-b-gray-300 text-mainColor w-[95%]">
                    <div className='ms-5 w-full flex justify-between items-center'>
                    
                        <div className="w-4/5">
                        <ToggleRadioButton label="El Shorouk City" />  
                            <div className="text-addressDetails text-lg px-8">
                            <p>1131 Dusty Townline, Jacksonville, TX 40322</p>
                            <p>Contact - (20) 010-234-347</p>
                        </div>       
                        </div>
                        <div className="w-1/5 flex justify-around">
                            <span className='text-mainColor cursor-pointer'>Edit</span>
                            <span className="w-0.5 h-6 bg-gray-300"></span>
                            <span className='text-removeButton cursor-pointer'>Remove</span>
                        </div>
                     
                    </div>
                   
            </div>
        </>
    )
}


{/* <img src={plusIcon} alt="" className='cursor-pointer' /> */ }


/* <img src={image1} alt="" className='lg:w-full lg:h-full md:w-full md:h-full max-sm:w-full rounded-md' /> */

/* <h3>{product.name}</h3> */