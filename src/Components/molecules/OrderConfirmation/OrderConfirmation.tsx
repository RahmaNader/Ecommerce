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
    <div className={`min-h-[80vh] flex items-center justify-center px-4 py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          {/* Left side with confirmation message */}
          <div className="flex flex-col items-center justify-center w-full lg:w-1/2 px-4">
            <img 
              src={orderConfirmationPhoto} 
              className="w-full max-w-sm mx-auto" 
              alt={t("orderConfirmation.title")} 
            />
            <h2 className="text-center mt-6 text-wine text-3xl md:text-4xl font-Poppins font-bold">
              {t("orderConfirmation.title")}
            </h2>
            <p className="text-center mt-4 text-skin text-base md:text-lg font-Poppins">
              {t("orderConfirmation.message")}
            </p>
            <div className="w-full max-w-xs mx-auto my-6 flex flex-col">
              <Button 
                label={t("orderConfirmation.trackOrder")} 
                size="medium" 
                type="primary" 
                className="mb-4"
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
          
          {/* Keep the commented right side with order summary */}
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
    </div>
  );
}