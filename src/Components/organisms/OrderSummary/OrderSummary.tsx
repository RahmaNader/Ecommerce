import React from 'react';

interface OrderSummaryProps {
  onCheckoutClick?: () => void;
  onApplyCouponClick?: () => void;
  couponCode?: string;
  setCouponCode?: (code: string) => void;
}



const OrderSummary: React.FC<OrderSummaryProps> = () => {

  return (
    <div className="w-full h-fit md:w-4/12 flex flex-col border border-ForthColor rounded-xl p-6 bg-[#A78E781C]">
      <h2 className="font-semibold font-playfair mb-4 text-wine text-lg md:text-xl">
        Order Summary
      </h2>

    </div>
  );
};

export default OrderSummary;