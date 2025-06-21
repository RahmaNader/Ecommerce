// import React, { useState } from "react";
import { ToggleRadioButton } from "@components/atoms";
import visaLogo from "@assets/visa.svg";
import masterCardLogo from "@assets/master card.svg";
// import { PaymentCard } from "@components/molecules";
// import addCardPlusIcon from "@assets/add-card-plus-icon.svg";
import { useTranslation } from "react-i18next";

interface PaymentMethodProps {
  selectedPaymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  // const [selectedCard, setSelectedCard] = useState<string>("");

  // const handleCardSelect = (cardNumber: string) => {
  //   setSelectedCard(cardNumber);
  //   onPaymentMethodChange("credit");
  // };

  return (
    <div className={`py-8 w-full ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Cash on Delivery Option */}
      <div className="py-5 flex text-wine">
        <div className="w-full flex justify-between items-center">
          <div className="w-full flex justify-between">
            <div>
              <ToggleRadioButton
                label={t("payment.cashOnDelivery")}
                isChecked={selectedPaymentMethod === "cash"}
                onChange={() => onPaymentMethodChange("cash")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Credit Card Option */}
      <div className="py-5 flex text-wine">
        <div className="w-full flex justify-between items-center">
          <div className="w-full flex justify-between items-center">
            <div>
              <ToggleRadioButton
                label={t("payment.creditCard")}
                isChecked={selectedPaymentMethod === "credit"}
                onChange={() => onPaymentMethodChange("credit")}
              />
            </div>
            <div className="flex">
              <img src={visaLogo} alt="Visa" />
              <img src={masterCardLogo} alt="MasterCard" />
            </div>
          </div>
        </div>
      </div>

      {/* Credit Card Information - only shown when credit is selected */}
      {selectedPaymentMethod === "credit" && (
        <div className="mt-4 p-4 bg-ForthColor/10 rounded-md">
          <p className="text-wine font-medium mb-2">{t("payment.creditCardInfo")}</p>
          <p className="text-ForthColor text-sm mb-4">{t("payment.secureProcessing")}</p>
          <div className="flex flex-wrap gap-2">
            <img src={visaLogo} alt="Visa" className="h-8" />
            <img src={masterCardLogo} alt="MasterCard" className="h-8" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;