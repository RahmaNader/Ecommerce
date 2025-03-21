import React, { useState } from 'react';
import { CreditCard } from '@types'; 
import visaLogo from "@assets/visa.svg";
import mastercardLogo from "@assets/mastercard.svg";
import { useTranslation } from "react-i18next";

interface AddCreditCardModalProps {
  onClose: () => void;
  onSave: (card: CreditCard) => void; 
}

const AddCreditCardModal: React.FC<AddCreditCardModalProps> = ({
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();
  
  const [cardData, setCardData] = useState<CreditCard>({
    type: '',
    number: '',
    nameOnCard: '',
    expiry: '',
    CVV: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleSave = () => {
    if (
      cardData.number &&
      cardData.nameOnCard &&
      cardData.expiry &&
      cardData.CVV
    ) {
      onSave({
        ...cardData,
        number: `**** **** **** ${cardData.number.slice(-4)}`,
      });
    } else {
      alert(t("addCreditCardModal.fillAllFields"));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-mainColor border-ForthColor border-[1px] p-6 rounded-lg max-w-md w-full">
        <h2 className="text-base font-Poppins font-medium text-wine mb-4">
          {t("addCreditCardModal.title")}
        </h2>
        <form className="space-y-4">
          <label
            htmlFor="cardType"
            className="text-xs font-Poppins flex flex-row items-center justify-between font-medium text-wine mb-4"
          >
            {t("addCreditCardModal.cardType")}
            <div className="flex space-x-2">
              <img src={mastercardLogo} alt={t("paymentCreditCard.masterCardLogoAlt")} />
              <img src={visaLogo} alt={t("paymentCreditCard.visaLogoAlt")} />
            </div>
          </label>

          <select
            id="cardType"
            name="type"
            value={cardData.type}
            onChange={(e) => setCardData({ ...cardData, type: e.target.value })}
            className="w-full px-4 py-2 mt-1 border text-wine rounded border-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
          >
            <option value="" disabled>
              {t("addCreditCardModal.selectCardType")}
            </option>
            <option value="Visa">{t("addCreditCardModal.visa")}</option>
            <option value="MasterCard">{t("addCreditCardModal.masterCard")}</option>
          </select>

          <input
            type="text"
            name="number"
            placeholder={t("addCreditCardModal.cardNumber")}
            value={cardData.number}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border text-wine rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
          />

          <input
            type="text"
            name="nameOnCard"
            placeholder={t("addCreditCardModal.nameOnCard")}
            value={cardData.nameOnCard}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border text-wine rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
          />

          <div className="flex gap-4">
            <input
              type="text"
              name="expiry"
              placeholder={t("addCreditCardModal.expiryDate")}
              value={cardData.expiry}
              onChange={handleChange}
              className="w-2/3 px-4 py-2 mt-1 border text-wine rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
            />

            <input
              type="text"
              name="CVV"
              placeholder={t("addCreditCardModal.cvv")}
              value={cardData.CVV}
              onChange={handleChange}
              className="w-1/3 px-4 py-2 mt-1 border text-center text-wine rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
            />
          </div>
        </form>
        <div className="flex justify-end mt-4 gap-2">
          <button 
            onClick={onClose} 
            className="w-1/2 px-4 py-2 border-[1px] border-wine text-wine font-playfair text-base rounded hover:text-ForthColor hover:border-ForthColor"
          >
            {t("addCreditCardModal.cancel")}
          </button>
          <button
            onClick={handleSave}
            className="w-1/2 px-4 py-2 bg-wine text-mainColor font-playfair text-base rounded hover:bg-ForthColor"
          >
            {t("addCreditCardModal.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCreditCardModal;
