import React, { useState } from 'react';
import { CreditCard } from '@types'; 

interface AddCreditCardModalProps {
  onClose: () => void;
  onSave: (card: CreditCard) => void; 
}

const AddCreditCardModal: React.FC<AddCreditCardModalProps> = ({
  onClose,
  onSave,
}) => {
  const [cardData, setCardData] = useState<CreditCard>({
    type: 'Visa',
    number: '',
    nameOnCard: '',
    expiry: '',
    CVV: 0,
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
        number: `**** **** **** ${cardData.number.slice(-4)}`, // Mask card number
      });
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add your payment method</h2>
        <form className="space-y-4">
          <select
            name="type"
            value={cardData.type}
            onChange={(e) => setCardData({ ...cardData, type: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="Amex">Amex</option>
          </select>
          <input
            type="text"
            name="number"
            placeholder="Card number"
            value={cardData.number}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="nameOnCard"
            placeholder="Name on card"
            value={cardData.nameOnCard}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <div className="flex space-x-4">
            <input
              type="text"
              name="expiry"
              placeholder="Expiration date (MM/YY)"
              value={cardData.expiry}
              onChange={handleChange}
              className="w-1/2 border p-2 rounded"
            />
            <input
              type="text"
              name="CVV"
              placeholder="CVV"
              value={cardData.CVV}
              onChange={handleChange}
              className="w-1/2 border p-2 rounded"
            />
          </div>
        </form>
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCreditCardModal;
