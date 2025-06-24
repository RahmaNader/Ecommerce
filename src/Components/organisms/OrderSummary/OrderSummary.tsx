import React, { useState, useRef, useEffect } from "react";
import { Button } from "@components/atoms";
import Cookies from "js-cookie";
import { OrderSummaryProps, CouponStatus } from "@types";
import { calculateSummary, saveOrderSummary } from "@utils/OrderSummaryUtils";
import { validateCoupon, Coupon } from "@services/api/fetchCoupons";
import icon from "@assets/discount icon.svg";
import icon2 from "@assets/Vector.svg";
import { useTranslation } from "react-i18next";
import type { OrderSummaryData } from "@types";
type SummaryState = Omit<OrderSummaryData, "deliveryDate">;

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
  isPlacingOrder = false,
  orderError = null,
  fastShippingCost = 0,
  regularShippingCost = 0,
}) => {
  const { t } = useTranslation();
  const shippingReady = Boolean(selectedAddress);
  const effectiveShipping = !shippingReady
    ? 0
    : selectedShippingMethod === "fast"
    ? fastShippingCost
    : regularShippingCost;
  const showShippingInfo =
    shippingReady && (currentStep === "shipping" || currentStep === "payment");

  const [couponCode, setCouponCode] = useState<string>("");
  const [summary, setSummary] = useState<SummaryState>(() => {
    const saved = Cookies.get("orderSummary");
    const initial = saved
      ? JSON.parse(saved)
      : (calculateSummary(products) as SummaryState);

    initial.shipping = effectiveShipping; // ← single source of truth

    initial.totalBeforeCoupon = initial.subTotal + initial.shipping;
    initial.totalAfterCoupon =
      initial.totalBeforeCoupon - (initial.couponDiscount ?? 0);

    return initial;
  });

  const [couponStatus, setCouponStatus] = useState<CouponStatus>(() => {
    const appliedCoupon = Cookies.get("appliedCoupon");
    console.log(
      "[OrderSummary] Initial coupon status:",
      appliedCoupon ? "success" : "none"
    );
    return appliedCoupon ? "success" : "none";
  });

  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const couponInputRef = useRef<HTMLInputElement>(null);

  // Update shipping cost based on selected shipping method
  useEffect(() => {
    setSummary((prev) => {
      const next: SummaryState = {
        ...prev,
        shipping: effectiveShipping,
        totalBeforeCoupon: prev.subTotal + effectiveShipping,
        totalAfterCoupon:
          prev.subTotal + effectiveShipping - (prev.couponDiscount ?? 0),
      };

      saveOrderSummary(next); // persists fine – cookie doesn’t care
      return next;
    });
  }, [effectiveShipping]);

  useEffect(() => {
    console.log("[OrderSummary] Component mounted with props:", {
      productsCount: products.length,
      currentStep,
      selectedPaymentMethod,
      selectedAddress: selectedAddress ? "Present" : "Missing",
      selectedShippingMethod,
    });
  }, [
    products.length,
    currentStep,
    selectedPaymentMethod,
    selectedAddress,
    selectedShippingMethod,
  ]);

  useEffect(() => {
    const next = calculateSummary(products) as SummaryState;
    next.shipping = effectiveShipping;
    next.totalBeforeCoupon = next.subTotal + next.shipping;
    next.totalAfterCoupon = next.totalBeforeCoupon - (next.couponDiscount ?? 0);
    setSummary(next);

    setCouponStatus(Cookies.get("appliedCoupon") ? "success" : "none");
  }, [products, effectiveShipping]);

  useEffect(() => {
    saveOrderSummary(summary);
  }, [summary]);

  const applyDiscount = (validCoupon: Coupon) => {
    const newSummary = { ...summary };

    newSummary.totalBeforeCoupon =
      newSummary.totalAfterCoupon || newSummary.total;

    if (validCoupon.type === 0) {
      newSummary.couponDiscount = validCoupon.value;
    } else {
      newSummary.couponDiscount =
        (newSummary.totalBeforeCoupon * validCoupon.value) / 100;
    }

    newSummary.totalAfterCoupon = Math.max(
      0,
      newSummary.totalBeforeCoupon - newSummary.couponDiscount
    );

    if (validCoupon.allowFreeShipping) {
      newSummary.shipping = 0;
    }

    const couponData = {
      code: validCoupon.couponCode,
      value: validCoupon.value,
      type: validCoupon.type,
      freeShipping: validCoupon.allowFreeShipping,
    };

    Cookies.set("appliedCoupon", JSON.stringify(couponData), { expires: 1 });

    return newSummary;
  };

  const handleApplyCoupon = async () => {
    console.log("[OrderSummary] Attempting to apply coupon:", couponCode);
    if (!couponCode) {
      console.log("[OrderSummary] No coupon code entered");
      return;
    }

    const existingCouponJson = Cookies.get("appliedCoupon");
    if (existingCouponJson) {
      try {
        const existingCoupon = JSON.parse(existingCouponJson);
        console.log("[OrderSummary] Found existing coupon:", existingCoupon);

        if (
          existingCoupon.code &&
          existingCoupon.code.toLowerCase() === couponCode.toLowerCase()
        ) {
          console.log("[OrderSummary] User tried to apply same coupon again");
          setCouponStatus("already_applied");
          return;
        }

        setCouponStatus("already_applied");
        return;
      } catch (e) {
        console.error("[OrderSummary] Error parsing existing coupon:", e);
        Cookies.remove("appliedCoupon");
      }
    }

    setIsApplyingCoupon(true);

    try {
      const { fetchCoupons } = await import("@services/api/fetchCoupons");
      const allCoupons = await fetchCoupons();
      console.log("[OrderSummary] Available coupons:", allCoupons);
      console.log("[OrderSummary] Entered coupon code:", couponCode);

      const validCoupon = await validateCoupon(couponCode);
      console.log("[OrderSummary] Coupon validation result:", validCoupon);

      if (validCoupon) {
        console.log("[OrderSummary] Valid coupon found:", validCoupon);
        setCouponStatus("success");

        const updatedSummary = applyDiscount(validCoupon);
        console.log(
          "[OrderSummary] Updated summary after coupon:",
          updatedSummary
        );
        setSummary(updatedSummary);
        setCouponCode("");
      } else {
        console.log(
          "[OrderSummary] Invalid coupon - not found in available coupons"
        );
        setCouponStatus("invalid");
      }
    } catch (error) {
      console.error("[OrderSummary] Error validating coupon:", error);
      setCouponStatus("invalid");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleConfirmOrder = () => {
    if (onNextClick) {
      onNextClick();
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
        return (
          <p className="text-red-600 text-sm mt-2">
            {t("orderSummary.couponInvalid")}
          </p>
        );
      default:
        return null;
    }
  };

  const formatNumber = (num: number | null | undefined) => {
    return num !== null && num !== undefined ? num.toFixed(2) : "0.00";
  };

  return (
    <div
      className={`w-full h-fit md:w-4/12 flex flex-col border border-ForthColor rounded-xl p-6 bg-[#A78E781C] ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <h2 className="font-semibold font-playfair mb-4 text-wine text-lg md:text-xl">
        {t("orderSummary.title")}
      </h2>
      <div className="flex flex-col gap-4 border-b border-b-gray-400 pb-4">
        <div
          className={`flex justify-between text-wine text-base font-medium font-Poppins ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <h4>{t("orderSummary.price")}</h4>
          <h4>
            {formatNumber(summary.total)} {t("product.currency")}
          </h4>
        </div>
        <div
          className={`flex justify-between text-wine text-base font-medium font-Poppins ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <h4>{t("orderSummary.discount")}</h4>
          <h4>
            {formatNumber(summary.total - summary.subTotal)}{" "}
            {t("product.currency")}
          </h4>
        </div>
        {showShippingInfo && (
          <div
            className={`flex justify-between text-wine text-base font-medium font-Poppins ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <h4>{t("orderSummary.shipping")}</h4>
            <h4>
              {formatNumber(summary.shipping)} {t("product.currency")}
            </h4>
          </div>
        )}
        {summary.couponDiscount > 0 && (
          <div
            className={`flex justify-between text-wine text-base font-medium font-Poppins ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <h4>{t("orderSummary.couponDiscount")}</h4>
            <h4>
              -
              {formatNumber(
                summary.totalBeforeCoupon - summary.totalAfterCoupon
              )}{" "}
              {t("product.currency")}
            </h4>
          </div>
        )}
      </div>
      {showShippingInfo && (
        <div
          className={`flex justify-between mt-4 text-wine text-base font-medium font-Poppins ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <h4>{t("orderSummary.total")}</h4>
          <h4>
            {formatNumber(summary.totalAfterCoupon)} {t("product.currency")}
          </h4>
        </div>
      )}
      {orderError && <p className="text-red-600 text-sm mt-2">{orderError}</p>}
      <div className="flex flex-col gap-4 my-4 justify-between w-full">
        <div className="mt-4 relative">
          <input
            ref={couponInputRef}
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder={t("orderSummary.couponPlaceholder")}
            className={`w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none text-center ${
              isArabic ? "text-right" : "text-left"
            }`}
            dir={isArabic ? "rtl" : "ltr"}
          />
          <div className="absolute right-3 bottom-2.5">
            <img src={icon} alt="Coupon Icon" />
            <img src={icon2} alt="" className="absolute top-1/3 left-1/3" />
          </div>
        </div>
        {getCouponMessage()}

        <Button
          label={
            isApplyingCoupon
              ? t("orderSummary.checking")
              : t("orderSummary.applyCoupon")
          }
          type="secondary"
          size="medium"
          onClick={handleApplyCoupon}
          isDisabled={isApplyingCoupon || !couponCode}
        />

        {showCheckoutButton ? (
          <Button
            label={t("orderSummary.checkout")}
            type="primary"
            size="large"
            onClick={onCheckoutClick}
            isDisabled={isPlacingOrder}
          />
        ) : (
          <Button
            size="large"
            label={
              isPlacingOrder
                ? t("common.processing")
                : currentStep === "payment"
                ? t("orderSummary.confirmOrder")
                : t("orderSummary.next")
            }
            onClick={handleConfirmOrder}
            isDisabled={isPlacingOrder}
          />
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
