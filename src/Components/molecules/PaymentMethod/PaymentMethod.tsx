import React, { useState } from "react";
import { ToggleRadioButton } from "@components/atoms";
import visaLogo from "@assets/visa.svg";
import masterCardLogo from "@assets/master card.svg";
import CardModal from "../CardModal/CardModal"; 
import addCardPlusIcon from "@assets/add-card-plus-icon.svg";
import PaymentCard from "../PaymentCard/PaymentCard";

interface PaymentMethodProps {
  selectedPaymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
}) => {
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
    <div className="py-8 w-full">

      <div className="py-5 flex text-wine">
        <div className="w-full flex justify-between items-center">
          <div className="w-full flex justify-between">
            <div>
              <ToggleRadioButton
                label="Cash on Delivery"
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
                label="Credit Card"
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
          <h3 className="text-sm font-semibold text-wine">Saved Cards</h3>
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
              alt="Add Card"
            />
            <p className="text-[#A78E78] text-xl ps-2">Add New Card</p>
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



// import { ToggleRadioButton } from "@components/atoms";
// import visaLogo from '../../../assets/visa.svg'
// import masterCardLogo from '../../../assets/master card.svg'

// interface PaymentMethodProps {
//   selectedPaymentMethod: string;
//   onPaymentMethodChange: (method: string) => void;
// }

// const PaymentMethod: React.FC<PaymentMethodProps> = ({
//   selectedPaymentMethod,
//   onPaymentMethodChange,
// }) => {
//   return (
//     <div className="space-y-2 my-5 px-12">
//       <h2 className="text-xl font-semibold text-wine">Payment Method</h2>

//       {/* Cash on Delivery option */}
//       <div className="py-5 flex border-b border-b-gray-300 text-wine">
//         <div className="w-full flex justify-between items-center">
//           <div className="w-full flex justify-between">
//             <div>
//               <ToggleRadioButton
//                 label="Cash on Delivery"
//                 isChecked={selectedPaymentMethod === "cash"}
//                 onChange={() => onPaymentMethodChange("cash")}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Credit Card option */}
//       <div className="py-5 flex text-wine">
//         <div className="w-full flex justify-between items-center">
//           <div className="w-full flex justify-between">
//             <div>
//               <ToggleRadioButton
//                 label="Credit Card"
//                 isChecked={selectedPaymentMethod === "credit"}
//                 onChange={() => onPaymentMethodChange("credit")}
//               />
//             </div>
//             <div className="flex">
//                 <img src={visaLogo} alt="" />
//                 <img src={masterCardLogo} alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentMethod;
