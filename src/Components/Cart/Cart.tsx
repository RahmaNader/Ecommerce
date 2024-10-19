import React from 'react'
import './Cart.css'
// import cartLabel from '../../assets/b77df37a0d3e47ceb1db42ac8203669e 2.svg'
// import cartuUnderline from '../../assets/b18de9afddf97544222b001bc3156a32.png'

export default function Cart() {
  return  <div className=" pt-8">
    <div className='flex flex-col items-center relative'>
    {/* <img src={cartLabel} alt="" className=''/> */}
    <h1 className="text-center w-96 primary absolute top-40">Your Cart Items</h1>
    {/* <img src={cartuUnderline} alt="" className='relative bottom-16 w-full'/> */}
    </div>
    <div className='p-6 flex flex-col itmes-between'>
      <div className='w-2/3'>

      </div>
      <div className='w-1/3 flex flex-col'>
        <h2>Order Summary</h2>
        <div className='flex items-between'>
          <div className='w-1/2'>
            <h4>Price</h4>
            <h4>Discount</h4>
            <h4>Shipping</h4>
            <h4>Coupon Applied</h4>
          </div>
          <div className='w-1/2'>
            <h4>200.00EGP</h4>
            <h4>200.00EGP</h4>
            <h4>200.00EGP</h4>
            <h4>200.00EGP</h4>
          </div>
        </div>
      </div>
    </div>
    </div>
    
}


// <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
//       <div className="rounded-lg md:w-2/3">
//         {/* {cart?.data.products.map((product, index) => {
//           return <CartProduct key={index} product={product} setCart={setCart} cart={cart} />
//         })} */}
//       </div>
//       <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
//         <div className="mb-2 flex justify-between">
//           <p className="text-gray-700">Subtotal</p>
//           {/* <p className="text-gray-700">${cart?.data.totalCartPrice}</p> */}
//         </div>
//         <div className="flex justify-between">
//           <p className="text-gray-700">Shipping</p>
//           <p className="text-gray-700">$0</p>
//         </div>
//         <hr className="my-4" />
//         <div className="flex justify-between">
//           <p className="text-lg font-bold">Total</p>
//           <div className="">
//             {/* <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice} USD</p> */}
//             <p className="text-sm text-gray-700">including VAT</p>
//           </div>
//         </div>
//       </div>
//     </div>