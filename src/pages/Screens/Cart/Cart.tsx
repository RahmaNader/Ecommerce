import React, { useState } from "react";
import icon from "@assets/discount icon.svg";
import icon2 from "@assets/Vector.svg";
import { Button, Category, SuccessAlert, ErrorAlert } from "@components/atoms";
import { CartProduct, Breadcrumb } from "@components/molecules";

const mockProducts = [
  {
    id: 1,
    name: "Cotton T-Shirt",
    Price: 150,
    Discount: 20,
    Shipping: 30,
    CouponApplied: 0,
    Color: "Blue",
    Size: "Medium",
    quantity: 1,
  },
  {
    id: 2,
    name: "Jeans",
    Price: 400,
    Discount: 50,
    Shipping: 40,
    CouponApplied: 0,
    Color: "Black",
    Size: "Large",
    quantity: 1,
  },
  {
    id: 3,
    name: "Hoodie",
    Price: 300,
    Discount: 40,
    Shipping: 35,
    CouponApplied: 0,
    Color: "Gray",
    Size: "Small",
    quantity: 1,
  },
  {
    id: 4,
    name: "Leather Jacket",
    Price: 1200,
    Discount: 200,
    Shipping: 60,
    CouponApplied: 0,
    Color: "Brown",
    Size: "Large",
    quantity: 1,
  },
  {
    id: 5,
    name: "Sneakers",
    Price: 800,
    Discount: 100,
    Shipping: 50,
    CouponApplied: 0,
    Color: "White",
    Size: "42",
    quantity: 1,
  },
];

const validCoupons = {
  SAVE10: 0.1, // 10% discount
  SAVE20: 0.2, // 20% discount
};

const Cart: React.FC = () => {
  const [products, setProducts] = useState(mockProducts);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const updateProductQuantity = (id: number, quantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const calculateSummary = () => {
    return products.reduce(
      (summary, product) => {
        const totalProductPrice = product.Price * product.quantity;
        summary.subTotal += totalProductPrice;
        summary.discount += product.Discount * product.quantity;
        summary.shipping += product.Shipping;
        return summary;
      },
      { subTotal: 0, discount: 0, shipping: 0 }
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
  const totalBeforeCoupon = summary.subTotal - summary.discount + summary.shipping;
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
          {products.map((product) => (
            <CartProduct
              key={product.id}
              product={product}
              onRemove={() => removeProduct(product.id)}
              onQuantityChange={(quantity) =>
                updateProductQuantity(product.id, quantity)
              }
            />
          ))}
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
              <h4>Discount</h4>
              <h4>-{summary.discount.toFixed(2)} EGP</h4>
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
