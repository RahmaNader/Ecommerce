import image1 from '../../../assets/product1.jpg'
import plusIcon from '../../../assets/plus.svg'
import minusIcon from '../../../assets/minus.svg'
import '../../../App.css'
import { useState } from 'react'



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
        <div className="py-5 mx-12 flex border-b border-b-gray-300 primary">
            <div className="w-1/6">
                <img src={image1} alt="" className='w-4/5 rounded-md' />
            </div>
            <div className="w-4/6 flex flex-col">
                <h3>Osmond Armchair</h3>
                <div className='flex flex-col mt-3'>
                    <div className='mt-2'>
                        <span className='me-2'>Color:</span>
                        <span>Brown</span>
                    </div>
                    <div className='mt-2 mb-6'>
                        <span className='me-2'>Size:</span>
                        <span>Small</span>
                    </div>
                </div>
                <div className='flex'>
                    <div className='border rounded-sm border-[#721013] w-[20%] py-2 px-6 flex justify-between '>
                        {isDisabled ? <img src={minusIcon} alt="" className='text-gray-600' /> : <img src={minusIcon} alt="" className='cursor-pointer' onClick={decrementProductQuantity} />}
                        <span>{productQuantity}</span>
                        <img src={plusIcon} alt="" className='cursor-pointer' onClick={incrementProductQuantity}/>
                    </div>
                    <div className='content-center ms-5'>
                        <span className='remove-button cursor-pointer'>Remove</span>
                    </div>
                </div>

            </div>
            <div className="w-1/6">
                <h4>200.00EGP</h4>
            </div>
        </div>
    </>


}
