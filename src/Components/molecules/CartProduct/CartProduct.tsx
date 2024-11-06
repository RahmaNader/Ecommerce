import image1 from '../../../assets/product1.jpg'
import plusIcon from '../../../assets/plus.svg'
import minusIcon from '../../../assets/minus.svg'
import '../../../App.css'
import { useState } from 'react'


export const product = {
    name: "Osmond Armchair",
    Price: "200.00EGP",
    Discount: "200.00EGP",
    Shipping : "200.00EGP",
    CouponApplied :"200.00EGP",
    TOTAL : "200.00EGP",
    EstimatedDeliveryBy : "01 Feb, 2023"
}


export default function CartProduct() {


    const [isDisabled , setIsDisabled] = useState(false)

    const [productQuantity, setProductQuantity] = useState(1)

    function incrementProductQuantity(){
        setProductQuantity(productQuantity + 1)
        setIsDisabled(false)
    }
    function decrementProductQuantity(){
        if(productQuantity === 0){
            setIsDisabled(true)
        }else{
            setProductQuantity(productQuantity - 1)
        }
        
    }


    return <>
        <div className="py-5 mx-12 flex border-b border-b-gray-300 text-mainColor max-sm:flex-col">
            <div className="lg:w-1/4 md:w-4/12 max-sm:w-full">  
                <img src={image1} alt="" className='lg:w-full lg:h-full md:w-full md:h-full max-sm:w-full rounded-md' />
            </div>
            <div className="lg:w-2/4 md:w-7/12 max-sm:w-full sm:ps-4 flex flex-col md:ps-4 max-sm:px-2 max-sm:my-2">
                <h3>{product.name}</h3>
                <div className='flex flex-col mt-3'>
                    <div className='mt-2'>
                        <span className='me-2 text-skin'>Color:</span>
                        <span>Brown</span>
                    </div>
                    <div className='mt-2 mb-6'>
                        <span className='me-2 text-skin'>Size:</span>
                        <span>Small</span>
                    </div>
                </div>
                <div className='flex'>
                    <div className='border rounded-sm border-mainColor max-sm:w-[100%] md:w-[50%] lg:w-[35%] py-2 px-7 md:px-3.5 flex justify-between max-sm:px-4 '>
                        {isDisabled ? <img src={minusIcon} alt="" className='text-gray-600' /> : <img src={minusIcon} alt="" className='cursor-pointer' onClick={decrementProductQuantity} />}
                        <span>{productQuantity}</span>
                        <img src={plusIcon} alt="" className='cursor-pointer' onClick={incrementProductQuantity}/>
                    </div>
                    <div className='content-center ms-5'>
                        <span className='remove-button cursor-pointer'>Remove</span>
                    </div>
                </div>

            </div>
            <div className="lg:w-1/4 md:w-1/12 max-sm:w-1/12 max-sm:my-3">
                <h4>200.00EGP</h4>
            </div>
        </div>
    </>


}
