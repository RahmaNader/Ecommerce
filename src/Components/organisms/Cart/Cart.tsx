// import React from 'react'
import './Cart.css'
import cartIcon from '../../../assets/cart-icon.svg'
import cartIcon2 from '../../../assets/cart-icon2.png'
import icon from '../../../assets/discount icon.svg'
import icon2 from '../../../assets/Vector.svg'
import { Button } from '@components/atoms'
import  CartProduct  from '@components/molecules/CartProduct/CartProduct'



export default function Cart() {
  return <div className="pt-16 w-full">
    <div className='flex flex-col items-center'>
      <img src={cartIcon} alt="" className='' />
      <h1 className="text-center w-full primary top-40">Cart</h1>
      <img src={cartIcon2} alt="" className='w-25' />
    </div>
    <div className='py-8 px-24 flex justify-between w-full '>
      <div className='w-3/4 '>
        <CartProduct />
      </div>
      <div className='primary w-1/4 flex flex-col border border-1 border-[#A78E78] p-12 bg-[#A78E781C] '>
        <h2 className='pb-4 w-full'>Order Summary</h2>
        <div className='flex justify-between w-full border border-b-gray-400border border-b-gray-400'>
          <div className='mb-5'>
            <h4 className='mb-4'>Price</h4>
            <h4 className='mb-4'>Discount</h4>
            <h4 className='mb-4'>Shipping</h4>
            <h4 className='mb-4'>Coupon Applied</h4>
          </div>
          <div className='mb-5'>
            <h4 className='mb-4'>200.00EGP</h4>
            <h4 className='mb-4'>200.00EGP</h4>
            <h4 className='mb-4'>200.00EGP</h4>
            <h4 className='mb-4'>200.00EGP</h4>
          </div>
        </div>
        <div className='flex justify-between pt-4 w-full'>
          <div className='mb-5'>
            <h4 className='mb-4'>TOTAL</h4>
            <h4 className='mb-4'>Estimated Delivery by</h4>
          </div>
          <div className='mb-5'>
            <h4 className='mb-4'>200.00EGP</h4>
            <h4 className='mb-4'>01 Feb, 2023</h4>
          </div>
        </div>
        <div className='mb-4 relative'>
          <input type="text" name='discount coupon' placeholder='Coupon Code' className='w-full py-2 px-3.5 rounded-sm placeholder-[#A78E78] border border-[#A78E78]' />
          <div className='absolute right-3.5 bottom-2.5'>
            <img src={icon} alt="" className='relative' />
            <img src={icon2} alt="" className='absolute top-1/3 left-1/3 ' />
          </div>
        </div>
        <Button label={"Checkout"} type="primary" size="large" />
      </div>
    </div>

  </div>

}