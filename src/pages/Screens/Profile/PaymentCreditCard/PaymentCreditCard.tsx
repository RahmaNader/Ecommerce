import React, { useState } from "react";
import AddCreditCardModal from "./AddCreditCardModal";
import visaLogo from "@assets/visa.svg";
import mastercardLogo from "@assets/mastercard.svg";
import trash from "@assets/trash.svg";
import { CreditCard } from "@types";

const PaymentCreditCardScreen: React.FC = () => {
  const [cards, setCards] = useState<CreditCard[]>([]);

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
    <div className="flex flex-col mt-8 md:mt-16">
      <h1 className="text-2xl font-semibold text-wine font-playfair md:self-start mx-auto md:mx-0">
        Payment & Credit Card
      </h1>
      <p className="text-ForthColor font-playfair text-xl mb-4 md:self-start mx-auto md:mx-0">
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
              <img src={cardLogos[card.type.toLowerCase()]} alt={card.type} />
            </div>

            {/* Card Details */}
            <div className="flex flex-1 justify-between items-center px-4 space-x-4">
              <p className="font-normal w-1/3 text-wine font-Poppins text-base text-center ">
                {/* Full card number on larger screens */}
                <span className="hidden sm:block">{card.number}</span>

                {/* Last 4 digits only on smaller screens */}
                <span className="block sm:hidden">{card.number.slice(-4)}</span>
              </p>

              <p className="font-normal w-1/3 text-wine font-Poppins text-base text-center">
                {card.nameOnCard}
              </p>
              <p className="font-normal w-1/3 text-wine font-Poppins text-base text-center">
                {card.expiry}
              </p>
            </div>

            {/* Delete Button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleRemoveCard(index)}
                className="hover:opacity-80 transition-opacity"
              >
                <img src={trash} alt="Delete" className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {/* Add New Card Button */}
        <div className="flex items-center justify-between w-full p-4 h-[60px] rounded-md bg-[#A78E7833]">
          {/* Add New Card Section */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsModalOpen(true)} // Trigger modal on click
          >
            <button className="flex items-center justify-center w-8 h-8 border-2 border-ForthColor rounded-full">
              <span className="text-lg font-bold text-ForthColor">+</span>
            </button>
            <span className="ml-3 text-sm text-ForthColor font-Poppins font-normal">
              Add new card
            </span>
          </div>

          {/* Logos Section */}
          <div className="flex space-x-2">
            <img src={mastercardLogo} alt="MasterCard Logo" />
            <img src={visaLogo} alt="Visa Logo" />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddCreditCardModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddCard}
        />
      )}

      <button
        type="button"
        className="bg-wine text-mainColor font-playfair text-2xl rounded-md w-[50%] mx-auto mt-8 py-3 px-8 hover:bg-ForthColor transition duration-300"
      >
        Confirm
      </button>
    </div>
  );
};

export default PaymentCreditCardScreen;
