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
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'; // Add this import
import placeOrder from "@services/api/placeOrder";

const OrderSummary: React.FC<OrderSummaryProps> = ({
  products,
  showCheckoutButton,
  onCheckoutClick,
  currentStep,
  onNextClick,
  selectedPaymentMethod,
  selectedAddress,
  selectedShippingMethod,
  isArabic = false,
}) => {
  const { t } = useTranslation(); 
  const navigate = useNavigate();
  
  // Remove the duplicate declaration of couponCode
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  
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

  const handleConfirmOrder = async () => {
    if (currentStep !== 'payment' || selectedPaymentMethod !== 'cod') {
      // If not in payment step or not using COD, use the regular next click
      if (onNextClick) {
        onNextClick();
      }
      return;
    }

    if (!selectedAddress) {
      setOrderError(t("orderSummary.noAddressSelected"));
      return;
    }

    setIsPlacingOrder(true);
    setOrderError(null);

    try {
      // Format the products for the API
      const shoppingItems = products.map(product => ({
        productId: product.id,
        quantity: product.quantity,
        color: product.color || "Default",
        sizeLabel: product.size || "Default",
      }));

      // Prepare order data
      const orderData = {
        city: selectedAddress.city,
        shippingAddressId: String(Date.now()), // Use timestamp as fallback ID
        // shippingAddressId: selectedAddress.id || String(Date.now()), // Use timestamp as fallback ID
        isFastShipping: selectedShippingMethod === 'fast',
        couponCode: Cookies.get('appliedCoupon') || undefined,
        shoppingItems
      };

      // Place the order
      await placeOrder(orderData);
      
      // Clear cart and other order-related data
      Cookies.remove('cart');
      Cookies.remove('appliedCoupon');
      Cookies.remove('orderSummary');
      
      // Redirect to orders page
      navigate('/profile/orders');
    } catch (error) {
      console.error('Failed to place order:', error);
      setOrderError(t("orderSummary.orderError"));
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const getCouponMessage = () => {
    switch (couponStatus) {
      case "success":
        return (
          <p className="text-green-600 text-sm mt-2">
            {t("orderSummary.couponSuccess")}
          </p>
        );
      case "already_applied":
        return (
          <p className="text-red-600 text-sm mt-2">
            {t("orderSummary.couponAlreadyApplied")}
          </p>
        );
      case "invalid":
        return <p className="text-red-600 text-sm mt-2">{t("orderSummary.couponInvalid")}</p>;
      default:
        return null;
    }
  };

  const formatNumber = (num: number | null | undefined) => {
    return num !== null && num !== undefined ? num.toFixed(2) : "0.00";
  };

  return (
    <div className={`w-full h-fit md:w-4/12 flex flex-col border border-ForthColor rounded-xl p-6 bg-[#A78E781C] ${isArabic ? 'rtl' : 'ltr'}`}>
      <h2 className="font-semibold font-playfair mb-4 text-wine text-lg md:text-xl">
        {t("orderSummary.title")}
      </h2>

      <div className="flex flex-col gap-4 border-b border-b-gray-400 pb-4">
        <div className={`flex justify-between text-wine text-base font-medium font-Poppins ${isArabic ? 'flex-row-reverse' : ''}`}>
          <h4>{t("orderSummary.price")}</h4>
          <h4>{formatNumber(summary.total)} {t("product.currency")}</h4>
        </div>

        <div className={`flex justify-between text-wine text-base font-medium font-Poppins ${isArabic ? 'flex-row-reverse' : ''}`}>
          <h4>{t("orderSummary.discount")}</h4>
          <h4>{formatNumber(summary.total - summary.subTotal)} {t("product.currency")}</h4>
        </div>

        <div className={`flex justify-between text-wine text-base font-medium font-Poppins ${isArabic ? 'flex-row-reverse' : ''}`}>
          <h4>{t("orderSummary.shipping")}</h4>
          <h4>{formatNumber(summary.shipping)} {t("product.currency")}</h4>
        </div>

        {summary.couponDiscount > 0 && (
          <div className={`flex justify-between text-wine text-base font-medium font-Poppins ${isArabic ? 'flex-row-reverse' : ''}`}>
            <h4>{t("orderSummary.couponDiscount")}</h4>
            <h4>
              -
              {formatNumber(summary.totalBeforeCoupon - summary.totalAfterCoupon)}{" "}
              {t("product.currency")}
            </h4>
          </div>
        )}
      </div>

      <div className={`flex justify-between mt-4 text-wine text-base font-medium font-Poppins ${isArabic ? 'flex-row-reverse' : ''}`}>
        <h4>{t("orderSummary.total")}</h4>
        <h4>{formatNumber(summary.totalAfterCoupon)} {t("product.currency")}</h4>
      </div>

      <div className={`flex justify-between mt-4 text-wine text-base font-medium font-Poppins ${isArabic ? 'flex-row-reverse' : ''}`}>
        <h4>{t("orderSummary.estimatedDelivery")}</h4>
        <h4>{summary.deliveryDate}</h4>
      </div>

      {orderError && (
        <p className="text-red-600 text-sm mt-2">{orderError}</p>
      )}
      <div className="flex flex-col gap-4 my-4 justify-between w-full">
        <div className="mt-4 relative">
          <input
            ref={couponInputRef}
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder={t("orderSummary.couponPlaceholder")}
            className={`w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none text-center ${isArabic ? 'text-right' : 'text-left'}`}
            dir={isArabic ? "rtl" : "ltr"}
          />
          <div className="absolute right-3 bottom-2.5">
            <img src={icon} alt="Coupon Icon" />
            <img src={icon2} alt="" className="absolute top-1/3 left-1/3" />
          </div>
        </div>
        {getCouponMessage()}

        <Button
          label={t("orderSummary.applyCoupon")}
          type="secondary"
          size="medium"
          onClick={handleApplyCoupon}
        />

        {showCheckoutButton ? (
          <Button
            label={t("orderSummary.checkout")}
            type="primary"
            size="large"
            onClick={onCheckoutClick}
            disabled={isPlacingOrder}
          />
        ) : (
          <Button
            size="large"
            label={
              isPlacingOrder 
                ? t("orderSummary.processing") 
                : currentStep === "payment" 
                  ? t("orderSummary.confirmOrder") 
                  : t("orderSummary.next")
            }
            onClick={handleConfirmOrder}
            disabled={isPlacingOrder}
          />
        )}
      </div>
    </div>
  );
};

export default OrderSummary;