import icon from "@assets/discount icon.svg";
import icon2 from "@assets/Vector.svg";
import { Button, Category } from "@components/atoms";
import { CartProduct, Breadcrumb } from "@components/molecules";
import { product as productData } from "@data/cards";
import { useState } from "react";

const Cart: React.FC = () => {
  const [products, setProducts] = useState([productData, productData, productData]); // Example data for now

  const removeProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="min-h-screen w-full px-2 md:px-10">

      <Breadcrumb />

      <Category SectionName={"Cart"} mdMyValue={"mt-2"} />

      <div className="flex flex-col md:flex-row justify-between w-full">

        <div className="md:w-7/12 w-full">
          {products.map((product, index) => (
            <CartProduct
              key={index}
              product={product}
              onRemove={() => removeProduct(index)}
            />
          ))}
        </div>

        <div className="w-full md:w-4/12 flex flex-col border border-ForthColor rounded-xl p-8 bg-[#A78E781C]">
        
          <h2 className="font-semibold font-playfair text-wine text-lg md:text-xl">Order Summary</h2>
          
          <div className="flex justify-between w-full border border-b-gray-400">
            <div className="mb-5">
              <h4 className="mb-4">Price</h4>
              <h4 className="mb-4">Discount</h4>
              <h4 className="mb-4">Shipping</h4>
              <h4 className="mb-4">Coupon Applied</h4>
            </div>
            <div className="mb-5">
              <h4 className="mb-4">{productData.Price}</h4>
              <h4 className="mb-4">{productData.Discount}</h4>
              <h4 className="mb-4">{productData.Shipping}</h4>
              <h4 className="mb-4">{productData.CouponApplied}</h4>
            </div>
          </div>
          <div className="flex justify-between pt-4 w-full">
            <div className="mb-5">
              <h4 className="mb-4">TOTAL</h4>
              <h4 className="mb-4">Estimated Delivery by</h4>
            </div>
            <div className="mb-5">
              <h4 className="mb-4">{productData.TOTAL}</h4>
              <h4 className="mb-4">{productData.EstimatedDeliveryBy}</h4>
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
            label={"Checkout"}
            type="primary"
            size="large"
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />

        </div>

      </div>

    </div>
  );
};
export default Cart;