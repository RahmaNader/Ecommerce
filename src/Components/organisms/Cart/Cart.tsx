import './Cart.css'
import cartIcon from '../../../assets/cart-icon.svg'
import cartIcon2 from '../../../assets/cart-icon2.png'
import icon from '../../../assets/discount icon.svg'
import icon2 from '../../../assets/Vector.svg'
import { Button } from '@components/atoms'
import { CartProduct } from '@components/molecules'
import Navbar from '../Navbar/Navbar'
import { product } from '@components/molecules/CartProduct/CartProduct'



export default function Cart() {
  return <>
    <Navbar />
    <div className="pt-16 w-full">
      <div className='flex flex-col items-center'>
        <img src={cartIcon} alt="" className='' />
        <h1 className="text-center w-full text-mainColor font-playfair text-5xl">Cart</h1>
        <img src={cartIcon2} alt="" className='w-25 mt-2.5' />
      </div>
      <div className='py-8 lg:px-24 md:px-5 sm:px-4 flex justify-between w-full sm:flex-col md:flex-row'>
        <div className='lg:w-3/4 md:w-7/12 sm:w-full '>
          <CartProduct />
        </div>
        <div className='primary lg:w-1/4 md:w-5/12 sm:w-full sm:my-4 sm: flex flex-col border border-1 border-skin p-12 bg-[#A78E781C] '>
          <h2 className='pb-4 w-full'>Order Summary</h2>
          <div className='flex justify-between w-full border border-b-gray-400border border-b-gray-400'>
            <div className='mb-5'>
              <h4 className='mb-4'>Price</h4>
              <h4 className='mb-4'>Discount</h4>
              <h4 className='mb-4'>Shipping</h4>
              <h4 className='mb-4'>Coupon Applied</h4>
            </div>
            <div className='mb-5'>
              <h4 className='mb-4'>{product.Price}</h4>
              <h4 className='mb-4'>{product.Discount}</h4>
              <h4 className='mb-4'>{product.Shipping}</h4>
              <h4 className='mb-4'>{product.CouponApplied}</h4>
            </div>
          </div>
          <div className='flex justify-between pt-4 w-full'>
            <div className='mb-5'>
              <h4 className='mb-4'>TOTAL</h4>
              <h4 className='mb-4'>Estimated Delivery by</h4>
            </div>
            <div className='mb-5'>
              <h4 className='mb-4'>{product.TOTAL}</h4>
              <h4 className='mb-4'>{product.EstimatedDeliveryBy}</h4>
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
  </>
}