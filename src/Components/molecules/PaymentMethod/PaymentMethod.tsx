import React, { useState } from "react";
import { ToggleRadioButton } from "@components/atoms";
import visaLogo from "@assets/visa.svg";
import masterCardLogo from "@assets/master card.svg";
import {CardModal, PaymentCard} from "@components/molecules"; 
import addCardPlusIcon from "@assets/add-card-plus-icon.svg";
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
  
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [savedCards, setSavedCards] = useState<{ cardNumber: string; expirationDate: string }[]>([]);
  const [selectedCard, setSelectedCard] = useState<string>("");

  const openCardModal = () => {
    setCardModalOpen(true);
  };

  const closeCardModal = () => {
    setCardModalOpen(false);
  };

  const addSavedCard = (cardNumber: string, expirationDate: string) => {
    setSavedCards((prevCards) => [
      ...prevCards,
      { cardNumber, expirationDate },
    ]);
    closeCardModal(); 
  };

  const handleCardSelect = (cardNumber: string) => {
    setSelectedCard(cardNumber);
    onPaymentMethodChange("credit"); 
  };

  return (
    <div className={`py-8 w-full ${isRTL ? 'rtl' : 'ltr'}`}>

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

      <div className=" flex text-wine">
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

      {selectedPaymentMethod === "credit" && savedCards.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-wine">{t("payment.savedCards")}</h3>
          {savedCards.map((card, index) => (
            <PaymentCard
              key={index}
              cardNumber={card.cardNumber}
              expirationDate={card.expirationDate}
              isSelected={card.cardNumber === selectedCard}
              onSelect={handleCardSelect}
            />
          ))}
        </div>
      )}

      {selectedPaymentMethod === "credit" && (
        <div
          className="flex justify-between items-center mt-4 rounded-md cursor-pointer w-full bg-[#A78E7833] px-4"
          onClick={openCardModal} 
        >
          <div className="flex">
            <img
              src={addCardPlusIcon}
              className="w-6 me-1 border-2 text-[#A78E7833] border-[#A78E7833] rounded-full"
              alt={t("payment.addCard")}
            />
            <p className="text-[#A78E78] text-xl ps-2">{t("payment.addNewCard")}</p>
          </div>
          <div className="flex">
            <img src={visaLogo} className="w-14" alt="Visa" />
            <img src={masterCardLogo} className="w-14" alt="MasterCard" />
          </div>
        </div>
      )}

      {isCardModalOpen && <CardModal closeModal={closeCardModal} addSavedCard={addSavedCard} />}
    </div>
  );
};

export default PaymentMethod;