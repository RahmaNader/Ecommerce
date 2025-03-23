import orderConfirmationPhoto from "@assets/order-confirmation-photo.svg";
import { Button } from "@components/atoms";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// interface Product {
//   Price: string;
//   Discount: string;
//   Shipping: string;
//   CouponApplied: string;
//   TOTAL: string;
//   EstimatedDeliveryBy: string;
// }

// const product: Product = {
//   Price: "1000 EGP",
//   Discount: "100 EGP",
//   Shipping: "50 EGP",
//   CouponApplied: "SAVE10",
//   TOTAL: "950 EGP",
//   EstimatedDeliveryBy: "20th Oct, 2023",
// };

export default function OrderConfirmation() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  
  // Handle navigation functions
  const handleTrackOrder = () => {
    navigate('/profile/orders');
  };
  
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={`py-20 w-[75%] lg:w-[90%] mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="flex flex-col justify-center lg:w-1/2 w-full">
          <img src={orderConfirmationPhoto} className="w-[90%] mx-auto" alt={t("orderConfirmation.title")} />
          <h2 className="text-center mt-5 text-wine text-4xl font-Poppins font-bold">
            {t("orderConfirmation.title")}
          </h2>
          <p className="text-center mt-4 text-skin text-lg font-Poppins">
            {t("orderConfirmation.message")}
          </p>
          <div className="mx-auto my-5 flex flex-col">
            <Button 
              label={t("orderConfirmation.trackOrder")} 
              size="medium" 
              type="primary" 
              className="mb-3.5"
              onClick={handleTrackOrder}
            />
            <Button 
              label={t("orderConfirmation.goHome")} 
              size="medium" 
              type="outlined" 
              className="border-wine text-wine"
              onClick={handleGoHome} 
            />
          </div>
        </div>
        {/* <div className="flex justify-center items-center text-wine lg:w-1/2 w-full my-0 md:my-8">
          <div className="primary flex flex-col border border-1 border-skin py-10 px-14 bg-[#A78E781C]">
            <h2 className="pb-6 w-full font-playfair text-xl font-bold">Order Summary</h2>
            <div className="flex justify-between w-full border-b border-b-gray-400">
              <div className="mb-5 font-Poppins">
                <h4 className="mb-4">Price</h4>
                <h4 className="mb-4">Discount</h4>
                <h4 className="mb-4">Shipping</h4>
                <h4 className="mb-4">Coupon Applied</h4>
              </div>
              <div className="mb-5 font-Poppins">
                <h4 className="mb-4">{product.Price}</h4>
                <h4 className="mb-4">{product.Discount}</h4>
                <h4 className="mb-4">{product.Shipping}</h4>
                <h4 className="mb-4">{product.CouponApplied}</h4>
              </div>
            </div>
            <div className="flex justify-between pt-4 w-full">
              <div className="mb-5 me-6 font-Poppins">
                <h4 className="mb-4">TOTAL</h4>
                <h4 className="mb-4">Estimated Delivery by</h4>
              </div>
              <div className="mb-5 font-Poppins">
                <h4 className="mb-4">{product.TOTAL}</h4>
                <h4 className="mb-4">{product.EstimatedDeliveryBy}</h4>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}