import React, { useState } from "react";
import { Button } from "@components/atoms";
import visaLogo from "@assets/visa.svg";
import masterCardLogo from "@assets/mastercard.svg";

interface CardModalProps {
  closeModal: () => void;
  addSavedCard: (cardNumber: string, expirationDate: string) => void; 
}

const CardModal: React.FC<CardModalProps> = ({ closeModal, addSavedCard }) => {
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    saveCard: false,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleSubmit = () => {
    if (newCard.cardNumber && newCard.expirationDate) {
      addSavedCard(newCard.cardNumber, newCard.expirationDate); 
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