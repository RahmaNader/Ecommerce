import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import icon from "@assets/discount icon.svg";
import icon2 from "@assets/Vector.svg";
import { Button, Category, SuccessAlert, ErrorAlert } from "@components/atoms";
import { CartProduct, Breadcrumb } from "@components/molecules";

const validCoupons = {
  SAVE10: 0.1, // 10% discount
  SAVE20: 0.2, // 20% discount
};

const Cart: React.FC = () => {
  const [products, setProducts] = useState<{ id: number; quantity: number; DisPrice: number; Shipping: number; name: string; Price: number; Discount: number; Color: string; Size: string }[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Load cart items from cookies on component mount
  useEffect(() => {
    const cartData = Cookies.get("cart");
    if (cartData) {
      setProducts(JSON.parse(cartData));
    }
  }, []);

  const saveCartToCookies = (cart: { id: number; quantity: number; DisPrice: number; Shipping: number }[]) => {
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
  };

  const removeProduct = (id: number) => {
    const updatedProducts = products.filter((product: { id: number }) => product.id !== id);
    setProducts(updatedProducts);
    saveCartToCookies(updatedProducts);
  };

  const updateProductQuantity = (id: number, quantity: number) => {
    const updatedProducts = products.map((product: { id: number; quantity: number; DisPrice: number; Shipping: number; name: string; Price: number; Discount: number; Color: string; Size: string }) =>
      product.id === id ? { ...product, quantity } : product
    );
    setProducts(updatedProducts);
    saveCartToCookies(updatedProducts);
  };

  const calculateSummary = () => {
    return products.reduce(
      (summary, product: { id: number; quantity: number; DisPrice: number; Shipping: number; name: string; Price: number; Discount: number; Color: string; Size: string }) => {
        const totalProductPrice = product.DisPrice * product.quantity;
        summary.subTotal += totalProductPrice;
        summary.shipping += product.Shipping;
        return summary;
      },
      { subTotal: 0, shipping: 0 }
    );
  };

  const applyCoupon = () => {
    if (couponCode in validCoupons) {
      const discount = validCoupons[couponCode as keyof typeof validCoupons];
      setCouponDiscount(discount);
      setAlert({ type: "success", message: "Coupon applied successfully!" });
    } else {
      setCouponDiscount(0);
      setAlert({ type: "error", message: "Wrong coupon code!" });
    }

    // Clear the alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);
  };

  const summary = calculateSummary();
  const totalBeforeCoupon = summary.subTotal + summary.shipping;
  const totalAfterCoupon = totalBeforeCoupon * (1 - couponDiscount);

  return (
    <div className="min-h-screen w-full px-4 md:px-10">
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
          {products.map((product: { id: number; quantity: number; DisPrice: number; Shipping: number; name: string; Price: number; Discount: number; Color: string; Size: string }) => (
            <CartProduct
              key={product.id}
              product={product}
              onRemove={() => removeProduct(product.id)}
              onQuantityChange={(quantity) =>
                updateProductQuantity(product.id, quantity)
              }
            />
          ))}
          {products.length === 0 && (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full h-fit md:w-4/12 flex flex-col border border-ForthColor rounded-xl p-6 bg-[#A78E781C]">
          <h2 className="font-semibold font-playfair mb-4 text-wine text-lg md:text-xl">
            Order Summary
          </h2>

          <div className="flex flex-col gap-4 justify-between w-full border-b border-b-gray-400 pb-4">
            <div className="flex flex-row w-full justify-between text-wine text-base font-medium font-Poppins">
              <h4>Subtotal</h4>
              <h4>{summary.subTotal.toFixed(2)} EGP</h4>
            </div>

            <div className="flex flex-row w-full justify-between text-wine text-base font-medium font-Poppins">
              <h4>Shipping</h4>
              <h4>{summary.shipping.toFixed(2)} EGP</h4>
            </div>
          </div>

          <div className="flex flex-col gap-4 my-4 justify-between w-full">
            <div className="flex flex-row w-full justify-between text-wine text-base font-medium font-Poppins">
              <h4>TOTAL</h4>
              <h4>{totalAfterCoupon.toFixed(2)} EGP</h4>
            </div>
          </div>

          <div className="mb-4 relative">
            <input
              type="text"
              name="discount coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon Code"
              className="w-full px-4 py-2 mt-1 border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
            />
            <div className="absolute right-3.5 bottom-2.5">
              <img src={icon} alt="Coupon Icon" className="relative" />
              <img src={icon2} alt="" className="absolute top-1/3 left-1/3" />
            </div>
          </div>

          {couponDiscount > 0 && (
            <div className="text-green font-medium mt-2">Coupon applied</div>
          )}

          <div className="flex flex-col w-full gap-4 my-4">
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
              onClick={() => console.log("Checkout clicked!")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
