import React from "react";
import { ToggleRadioButton } from "@components/atoms";

// Define the structure of the PaymentCard props
interface PaymentCardProps {
  cardNumber: string;
  expirationDate: string;
  isSelected: boolean;
  onSelect: (cardNumber: string) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  cardNumber,
  expirationDate,
  isSelected,
  onSelect,
}) => {
  // Mask the first 12 digits of the card number
  const maskedCardNumber = `**** **** **** ${cardNumber.slice(-4)}`;

  return (
    <div className="flex bg-[#A78E7833] justify-between items-center py-3 px-3 border-b border-gray-300 mb-2 rounded-md">
      <div className="flex justify-center items-center">
        <ToggleRadioButton
          label={maskedCardNumber}
          isChecked={isSelected}
          onChange={() => onSelect(cardNumber)} // Pass the card number back to parent on toggle
        />
      </div>

      <div className="text-sm text-wine">{expirationDate}</div>
    </div>
  );
};

export default PaymentCard;
