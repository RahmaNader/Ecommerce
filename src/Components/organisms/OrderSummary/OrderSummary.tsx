import React, { useState, useRef, useEffect } from "react";
import { Button } from "@components/atoms";
import Cookies from "js-cookie";
import { OrderSummaryProps, CouponStatus } from "@types";
import {
  calculateSummary,
  applyCoupon,
  saveOrderSummary,
} from "@utils/OrderSummaryUtils";
import icon from "@assets/discount icon.svg";
import icon2 from "@assets/Vector.svg";

const OrderSummary: React.FC<OrderSummaryProps> = ({
  products,
  showCheckoutButton,
  onCheckoutClick,
  currentStep,
  onNextClick,
}) => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [summary, setSummary] = useState(() => {
    const saved = Cookies.get("orderSummary");
    return saved ? JSON.parse(saved) : calculateSummary(products);
  });
  const [couponStatus, setCouponStatus] = useState<CouponStatus>(() => {
    return Cookies.get("appliedCoupon") ? "success" : "none";
  });
  const couponInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newSummary = calculateSummary(products);
    setSummary(newSummary);
    const existingCoupon = Cookies.get('appliedCoupon');
    if (existingCoupon) {
      setCouponStatus('success');
    }
    else{
        setCouponStatus('none');
    }
  }, [products]);

  useEffect(() => {
    saveOrderSummary(summary);
  }, [summary]);

  const handleApplyCoupon = () => {
    if (!couponCode) return;

    const result = applyCoupon(couponCode.toUpperCase());
    setCouponStatus(result);

    if (result === "success") {
      setSummary(calculateSummary(products));
      setCouponCode("");
    }
  };

  const getCouponMessage = () => {
    switch (couponStatus) {
      case "success":
        return (
          <p className="text-green-600 text-sm mt-2">
            Coupon applied successfully!
          </p>
        );
      case "already_applied":
        return (
          <p className="text-red-600 text-sm mt-2">
            Coupon has already been applied
          </p>
        );
      case "invalid":
        return <p className="text-red-600 text-sm mt-2">Invalid coupon code</p>;
      default:
        return null;
    }
  };

  const formatNumber = (num: number | null | undefined) => {
    return num !== null && num !== undefined ? num.toFixed(2) : "0.00";
  };

  return (
    <div className="w-full h-fit md:w-4/12 flex flex-col border border-ForthColor rounded-xl p-6 bg-[#A78E781C]">
      <h2 className="font-semibold font-playfair mb-4 text-wine text-lg md:text-xl">
        Order Summary
      </h2>

      <div className="flex flex-col gap-4 border-b border-b-gray-400 pb-4">
        <div className="flex justify-between text-wine text-base font-medium font-Poppins">
          <h4>Price</h4>
          <h4>{formatNumber(summary.total)} EGP</h4>
        </div>

        <div className="flex justify-between text-wine text-base font-medium font-Poppins">
          <h4>Discount</h4>
          <h4>{formatNumber(summary.total - summary.subTotal)} EGP</h4>
        </div>

        <div className="flex justify-between text-wine text-base font-medium font-Poppins">
          <h4>Shipping</h4>
          <h4>{formatNumber(summary.shipping)} EGP</h4>
        </div>

        {summary.couponDiscount > 0 && (
          <div className="flex justify-between text-wine text-base font-medium font-Poppins">
            <h4>Coupon Discount</h4>
            <h4>
              -
              {formatNumber(summary.totalBeforeCoupon - summary.totalAfterCoupon)}{" "}
              EGP
            </h4>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4 text-wine text-base font-medium font-Poppins">
        <h4>TOTAL</h4>
        <h4> { formatNumber(summary.totalAfterCoupon) } EGP</h4>
      </div>

      <div className="flex justify-between mt-4 text-wine text-base font-medium font-Poppins">
        <h4>Estimated Delivery by</h4>
        <h4>{summary.deliveryDate}</h4>
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
        {getCouponMessage()}

        <Button
          label="Apply Coupon"
          type="secondary"
          size="medium"
          onClick={handleApplyCoupon}
        />

        {showCheckoutButton ? (
          <Button
            label="Checkout"
            type="primary"
            size="large"
            onClick={onCheckoutClick}
          />
        ) : (
          <Button
            size="large"
            label={currentStep === "payment" ? "Confirm Order" : "Next"}
            onClick={onNextClick}
          />
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
