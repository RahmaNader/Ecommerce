import React, { useState } from "react";
import AddCreditCardModal from "./AddCreditCardModal";
import visaLogo from "@assets/visa.svg";
import mastercardLogo from "@assets/mastercard.svg";
import { CreditCard } from "@types";

const PaymentCreditCardScreen: React.FC = () => {
  const [cards, setCards] = useState<CreditCard[]>([
    {
      type: "Visa",
      number: "**** **** **** 1234",
      nameOnCard: "J SMITH",
      expiry: "10/27",
      CVV: 123,
    },
    {
      type: "MasterCard",
      number: "**** **** **** 3456",
      nameOnCard: "J SMITH",
      expiry: "10/27",
      CVV: 456,
    },
  ]);

  const cardLogos: Record<string, string> = {
    visa: visaLogo,
    mastercard: mastercardLogo,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCard = (newCard: CreditCard) => {
    setCards([...cards, newCard]);
    setIsModalOpen(false);
  };

  const handleRemoveCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col mt-16">
      <h1 className="text-2xl font-semibold text-wine font-playfair md:self-start ">
        Payment & Credit Card
      </h1>
      <p className="text-ForthColor font-playfair text-xl mb-4">
        Manage payment method
      </p>

      <div className="space-y-4 mt-4">
  {cards.map((card, index) => (
    <div
      key={index}
      className="flex items-center w-full p-4 h-[60px] rounded-md bg-[#A78E7833]"
    >
      {/* Card Logo */}
      <div className="flex-shrink-0 w-12">
        <img
          src={cardLogos[card.type.toLowerCase()]}
          alt={card.type}
          className="w-full"
        />
      </div>

      {/* Card Details */}
      <div className="flex flex-1 justify-between items-center px-4">
        <p className="font-bold text-left w-1/3">{card.number}</p>
        <p className="text-sm text-center w-1/3">{card.nameOnCard}</p>
        <p className="text-sm text-right w-1/3">{card.expiry}</p>
      </div>

      {/* Delete Button */}
      <div className="flex-shrink-0 ml-4">
        <button
          onClick={() => handleRemoveCard(index)}
          className="text-red-600 hover:text-red-800"
        >
          🗑️
        </button>
      </div>
    </div>
  ))}

  {/* Add New Card Button */}
  <button
    onClick={() => setIsModalOpen(true)}
    className="flex items-center justify-center w-full p-3 border rounded-lg text-gray-600 hover:bg-gray-100"
  >
    ➕ Add new card
  </button>
</div>


      {isModalOpen && (
        <AddCreditCardModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddCard}
        />
      )}
    </div>
  );
};

export default PaymentCreditCardScreen;
