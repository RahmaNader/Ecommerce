import React, { useState } from "react";
import Button from "../../atoms/Button/Button";
import visaLogo from "../../../assets/visa.svg";
import masterCardLogo from "../../../assets/master card.svg";

interface CardModalProps {
  closeModal: () => void;
  addSavedCard: (cardNumber: string, expirationDate: string) => void; // New prop to add the card
}

const CardModal: React.FC<CardModalProps> = ({ closeModal, addSavedCard }) => {
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    saveCard: false,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (newCard.cardNumber && newCard.expirationDate) {
      addSavedCard(newCard.cardNumber, newCard.expirationDate); // Add the card to saved cards
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="text-wine text-2xl">Add your payment method</h2>
          <button onClick={closeModal} className="close-btn">
            X
          </button>
        </div>
        <div className="modal-body">
          <div className="flex justify-between">
            <div>
              <p className="text-wine">Credit or debit cards</p>
              <p className="text-wine">
                Tech Heim accepts major credit and debit cards.
              </p>
            </div>
            <div className="flex ">
              <img src={visaLogo} className="w-14" alt="Visa" />
              <img src={masterCardLogo} className="w-14" alt="MasterCard" />
            </div>
          </div>

          <div className="input-group">
            <input
              className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
              placeholder="Card Number"
              type="text"
              name="cardNumber"
              value={newCard.cardNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
              placeholder="Name on card"
              type="text"
            />
          </div>
          <div className="flex gap-3">
            <div className="input-group w-1/2">
              <input
                className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
                placeholder="Expiration date (MM/YY)"
                type="text"
                name="expirationDate"
                value={newCard.expirationDate}
                onChange={handleChange}
              />
            </div>
            <div className="input-group w-1/2">
              <input
                className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
                placeholder="CVV"
                type="number"

              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            onClick={closeModal}
            label="Cancel"
            type="outlined"
            size="large"
          />
          <Button onClick={handleSubmit} label="Add Card" size="large" />
        </div>
      </div>
    </div>
  );
};

export default CardModal;

// import React, { useState } from "react";
// import Button from "../../atoms/Button/Button";
// import visaLogo from "../../../assets/visa.svg";
// import masterCardLogo from "../../../assets/master card.svg";

// interface CardModalProps {
//   closeModal: () => void;
// }

// const CardModal: React.FC<CardModalProps> = ({ closeModal }) => {
//   const [newCard, setNewCard] = useState({
//     cardNumber: "",
//     cardholderName: "",
//     expirationDate: "",
//     cvv: "",
//     saveCard: false,
//   });

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewCard((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission (you can replace this with actual API calls or state updates)
//   const handleSubmit = () => {
//     console.log("Card details:", newCard);
//     closeModal(); // Close the modal after submission
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal-container">
//         <div className="modal-header">
//           <h2 className="text-wine text-2xl">Add your payment method</h2>
//           <button onClick={closeModal} className="close-btn">
//             X
//           </button>
//         </div>
//         <div className="flex">
//             <div className="text-wine font-Poppins text-sm">
//             <p>Credit or debit cards</p>
//             <p>Tech Heim accepts major credit and debit cards.</p>
//             </div>
//             <div className="flex">
//             <img src={masterCardLogo} className="w-14" alt="" />
//             <img src={visaLogo} className="w-14" alt="" />
//             </div>

//         </div>
//         <div className="modal-body">
//           <h4 className="text-wine">Enter Card Details</h4>
//           <div className="input-group">
//             <input
//               className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
//               placeholder="Card Number"
//               type="text"
//               name="cardNumber"
//               value={newCard.cardNumber}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="input-group">
//             <input
//               className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
//               placeholder="Cardholder Name"
//               type="text"
//               name="cardholderName"
//               value={newCard.cardholderName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex justify-between gap-3">
//             <div className="input-group w-1/2">
//               <input
//                 className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
//                 placeholder="Expiration Date (MM/YY)"
//                 type="text"
//                 name="expirationDate"
//                 value={newCard.expirationDate}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="input-group w-1/2">
//               <input
//                 className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
//                 placeholder="CVV"
//                 type="text"
//                 name="cvv"
//                 value={newCard.cvv}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="checkbox-group">
//             <label className="text-wine">
//               <input
//                 type="checkbox"
//                 name="saveCard"
//                 checked={newCard.saveCard}
//                 onChange={() =>
//                   setNewCard((prev) => ({
//                     ...prev,
//                     saveCard: !prev.saveCard,
//                   }))
//                 }
//               />
//               Save Payment Method
//             </label>
//           </div>
//         </div>
//         <div className="modal-footer">
//           <Button
//             label="Cancel"
//             onClick={closeModal}
//             size="large"
//             type="outlined"
//           />
//           <Button label="Next" onClick={handleSubmit} size="large" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardModal;
