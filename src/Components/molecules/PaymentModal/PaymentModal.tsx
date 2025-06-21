import React, {  useState } from "react";
import { useTranslation } from "react-i18next";

interface PaymentModalProps {
  paymentUrl: string;
  onClose: () => void;
  onSuccess: () => void;
  onFailure: (message: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  paymentUrl,
  onClose,
  onSuccess,
  onFailure,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  // Handle iframe navigation events to detect payment status
  const handleIframeLoad = (event: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      // Get access to iframe content to check URL changes
      const iframe = event.currentTarget;
      
      // Attempt to check iframe URL to detect success/failure
      // Note: This may be limited by CORS policies
      try {
        const currentUrl = iframe.contentWindow?.location.href;
        
        // Check if the URL contains success indicators
        if (currentUrl && (currentUrl.includes('success=true') || currentUrl.includes('status=success'))) {
          console.log("[PaymentModal] Detected success URL:", currentUrl);
          onSuccess();
        } 
        // Check if the URL contains failure indicators
        else if (currentUrl && (currentUrl.includes('success=false') || currentUrl.includes('status=fail') || currentUrl.includes('error'))) {
          console.log("[PaymentModal] Detected failure URL:", currentUrl);
          onFailure(t("payment.failed"));
        }
      } catch{
        // CORS might prevent reading the URL
        console.log("[PaymentModal] Could not access iframe URL due to CORS");
      }
    } catch (err) {
      console.error("[PaymentModal] Error in iframe handling:", err);
    }
    
    // Hide loading indicator when iframe loads
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-wine">{t("payment.secureCheckout")}</h2>
          <button 
            onClick={onClose}
            className="text-wine hover:text-ForthColor"
          >
            ✕
          </button>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center absolute inset-0 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wine"></div>
          </div>
        )}
        
        <iframe
          src={paymentUrl}
          className="w-full flex-grow border-none"
          onLoad={handleIframeLoad}
          title="Payment Gateway"
        />
      </div>
    </div>
  );
};

export default PaymentModal;