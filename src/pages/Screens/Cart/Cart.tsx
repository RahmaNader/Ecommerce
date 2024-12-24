import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import icon from "@assets/discount icon.svg";
import icon2 from "@assets/Vector.svg";
import { Product } from "@types";
import { Button, Category, SuccessAlert, ErrorAlert } from "@components/atoms";
import { CartProduct, Breadcrumb } from "@components/molecules";

const validCoupons = {
  SAVE10: 0.1,
  SAVE20: 0.2,
};

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const couponInputRef = useRef<HTMLInputElement>(null);

  const getDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7);
    return deliveryDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const cartData = Cookies.get("cart");
    if (cartData) {
      setProducts(JSON.parse(cartData));
    }
  }, []);

  const saveCartToCookies = (updatedProducts: Product[]) => {
    Cookies.set("cart", JSON.stringify(updatedProducts), { expires: 2 });
  };

  const removeProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    saveCartToCookies(updatedProducts);
  };

  const updateProductQuantity = (id: number, quantity: number) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, quantity } : product
    );
    setProducts(updatedProducts);
    saveCartToCookies(updatedProducts);
  };

  const calculateSummary = () => {
    return products.reduce(
      (summary, product) => {
        summary.Total += product.NormalPrice * product.quantity;
        summary.subTotal += product.DisPrice * product.quantity;
        summary.shipping += 50;
        return summary;
      },
      { subTotal: 0, shipping: 0, Total: 0 }
    );
  };

  const applyCoupon = () => {
    if (couponCode in validCoupons) {
      setCouponDiscount(validCoupons[couponCode as keyof typeof validCoupons]);
      setAlert({ type: "success", message: "Coupon applied successfully!" });
    } else {
      setCouponDiscount(0);
      setAlert({ type: "error", message: "Invalid coupon code!" });
    }

    // Clear the input field
    if (couponInputRef.current) {
      couponInputRef.current.value = "";
      setCouponCode("");
    }

    setTimeout(() => setAlert(null), 3000);
  };

  const summary = calculateSummary();
  const totalBeforeCoupon = summary.subTotal + summary.shipping;
  const totalAfterCoupon = totalBeforeCoupon * (1 - couponDiscount);

  const handleCheckoutClick = () => {
    const authToken = Cookies.get('authToken');
    const cartItems = Cookies.get('cart') ? JSON.parse(Cookies.get('cart') as string) : [];

    if (!authToken) {
      setAlert({
        type: 'error',
        message: 'Please login to proceed with checkout'
      });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    if (cartItems.length === 0) {
      setAlert({
        type: 'error',
        message: 'Your cart is empty'
      });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    navigate('/cart/checkout');
  };

  return (
    <div className="min-h-screen w-full px-2 md:px-10">
      <Breadcrumb />
      <Category SectionName={"Cart"} mdMyValue={"mt-2"} />

      {alert && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
          role="alert"
        >
          {alert.type === "success" ? (
            <SuccessAlert message={alert.message} />
          ) : (
            <ErrorAlert message={alert.message} />
          )}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between w-full gap-6">
        {/* Cart Items */}
        <div className="md:w-7/12 w-full">
          {products.length > 0 ? (
            products.map((product) => (
              <CartProduct
                key={product.id}
                product={product}
                onRemove={() => removeProduct(product.id)}
                onQuantityChange={(quantity) =>
                  updateProductQuantity(product.id, quantity)
                }
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full h-fit md:w-4/12 flex flex-col border border-ForthColor rounded-xl p-6 bg-[#A78E781C]">
          <h2 className="font-semibold font-playfair mb-4 text-wine text-lg md:text-xl">
            Order Summary
          </h2>

          <div className="flex flex-col gap-4 border-b border-b-gray-400 pb-4">
            <div className="flex justify-between text-wine text-base font-medium font-Poppins">
              <h4>Price</h4>
              <h4>{summary.Total.toFixed(2)} EGP</h4>
            </div>

            <div className="flex justify-between text-wine text-base font-medium font-Poppins">
              <h4>Discount</h4>
              <h4>{summary.subTotal.toFixed(2)} EGP</h4>
            </div>

            <div className="flex justify-between text-wine text-base font-medium font-Poppins">
              <h4>Shipping</h4>
              <h4>{summary.shipping.toFixed(2)} EGP</h4>
            </div>
            <div className="flex justify-between text-wine text-base font-medium font-Poppins">
              <h4>Coupon Discount</h4>
              <h4>-{(totalBeforeCoupon - totalAfterCoupon).toFixed(2)} EGP</h4>
            </div>
          </div>

          <div className="flex justify-between mt-4 text-wine text-base font-medium font-Poppins">
            <h4>TOTAL</h4>
            <h4>{totalAfterCoupon.toFixed(2)} EGP</h4>
          </div>

          <div className="flex justify-between mt-4 text-wine text-base font-medium font-Poppins">
            <h4>Estimated Delivery by</h4>
            <h4>{getDeliveryDate()}</h4>
          </div>

          <div className="flex flex-col gap-4 my-4 justify-between w-full">
            <div className="mt-4 relative">
              <input
                ref={couponInputRef}
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon Code"
                className="w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
              />
              <div className="absolute right-3 bottom-2.5">
                <img src={icon} alt="Coupon Icon" />
                <img src={icon2} alt="" className="absolute top-1/3 left-1/3" />
              </div>
            </div>

            <Button
              label={"Apply Coupon"}
              type="secondary"
              size="medium"
              onClick={applyCoupon}
            />
            <Button
              label={"Checkout"}
              type="primary"
              size="large"
              onClick={handleCheckoutClick}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;