import cartIcon from "../../../assets/cart-icon.svg";
import cartIcon2 from "../../../assets/cart-icon2.png";
import icon from "../../../assets/discount icon.svg";
import icon2 from "../../../assets/Vector.svg";
import plusIcon from '../../../assets/plus.svg'
import { product } from "@components/molecules/CartProduct/CartProduct";
import { Button } from "@components/atoms";
import { Address } from "@components/molecules";


export default function CheckOut() {
    return (
        <div className="py-8 lg:px-12 md:px-5 max-sm:px-2.5 ">
            <div className="pt-16 w-full">
                <div className="flex flex-col items-center mb-10">
                    <img src={cartIcon} alt="" className="" />
                    <h1 className="text-center w-full text-mainColor font-playfair text-5xl">
                        Checkout
                    </h1>
                    <img src={cartIcon2} alt="" className="w-25 mt-2.5" />
                    
                </div>
                <div className="flex justify-between w-full max-sm:flex-col md:flex-row">
                    <div className="lg:w-3/4 md:w-7/12 max-sm:w-full">
                    <div>
                        <Address />
                    </div>
                    <div className="flex mt-4 px-8">
                    <img src={plusIcon} className="w-6" alt="" />
                    <p className="text-mainColor text-xl ps-2">Add New Address</p>
                    </div>
                    
                    </div>
                    <div className="primary lg:w-1/4 md:w-5/12 max-sm:w-full max-sm:my-4 flex flex-col border border-1 border-skin p-12 bg-[#A78E781C] ">
                        <h2 className="pb-4 w-full">Order Summary</h2>
                        <div className="flex justify-between w-full border border-b-gray-400border border-b-gray-400">
                            <div className="mb-5">
                                <h4 className="mb-4">Price</h4>
                                <h4 className="mb-4">Discount</h4>
                                <h4 className="mb-4">Shipping</h4>
                                <h4 className="mb-4">Coupon Applied</h4>
                            </div>
                            <div className="mb-5">
                                <h4 className="mb-4">{product.Price}</h4>
                                <h4 className="mb-4">{product.Discount}</h4>
                                <h4 className="mb-4">{product.Shipping}</h4>
                                <h4 className="mb-4">{product.CouponApplied}</h4>
                            </div>
                        </div>
                        <div className="flex justify-between pt-4 w-full">
                            <div className="mb-5">
                                <h4 className="mb-4">TOTAL</h4>
                                <h4 className="mb-4">Estimated Delivery by</h4>
                            </div>
                            <div className="mb-5">
                                <h4 className="mb-4">{product.TOTAL}</h4>
                                <h4 className="mb-4">{product.EstimatedDeliveryBy}</h4>
                            </div>
                        </div>
                        <div className="mb-4 relative">
                            <input
                                type="text"
                                name="discount coupon"
                                placeholder="Coupon Code"
                                className="w-full py-2 px-3.5 rounded-sm placeholder-[#A78E78] border border-[#A78E78]"
                            />
                            <div className="absolute right-3.5 bottom-2.5">
                                <img src={icon} alt="" className="relative" />
                                <img
                                      src={icon2}
                                    alt=""
                                    className="absolute top-1/3 left-1/3 "
                                />
                            </div>
                        </div>
                        <Button
                            label={"Next"}
                            type="primary"
                            size="large"
                            onClick={function (): void {
                                throw new Error("Function not implemented.");
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
