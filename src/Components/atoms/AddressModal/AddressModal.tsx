import React, { useState } from "react";
import "./AddressModal.css";
import Button from "../Button/Button";

import { AddressProps } from "../../molecules/Address/Address"; // Adjust the import path as needed

interface AddressModalProps {
  closeModal: () => void;
  addAddress: (newAddress: AddressProps) => void;  // Use AddressProps here
}


const AddressModal: React.FC<AddressModalProps> = ({
  closeModal,
  addAddress,
}) => {
  const [newAddress, setNewAddress] = useState({
    building: "",
    aptNo: "",
    floor: "",
    street: "",
    phoneNumber: "",
    country: "",
    city: "",
    additionalDirections: "",
    saveAddress: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleSubmit = () => {
    addAddress(newAddress);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="text-wine text-2xl">Add New Address</h2>
          <button onClick={closeModal} className="close-btn">
            X
          </button>
        </div>
        <div className="modal-body">
          <h4 className="text-wine">Enter your details</h4>
          <div className="input-group">
            <input
              className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
              placeholder="Building Name"
              type="text"
              name="building"
              value={newAddress.building}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-3">
          <div className="input-group w-1/2">
            <input
              className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
              placeholder="Apt. No."
              type="text"
              name="aptNo"
              value={newAddress.aptNo}
              onChange={handleChange}
            />
          </div>
          <div className="input-group w-1/2">
            <input
              className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
              placeholder="Floor"
              type="text"
              name="floor"
              value={newAddress.floor}
              onChange={handleChange}
            />
          </div>
          </div>
         
          <div className="input-group">
            <input
              className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
              placeholder="Street"
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
              placeholder="Phone Number"
              type="text"
              name="phoneNumber"
              value={newAddress.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <select
              className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
              name="city"
              value={newAddress.city}
              onChange={handleChange}
            >
              <option value="">Select City</option>
            </select>
          </div>
          <div className="input-group">
            <input
              className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
              placeholder="Additional Directions"
              type="text"
              name="additionalDirections"
              value={newAddress.additionalDirections}
              onChange={handleChange}
            />
          </div>
          <div className="checkbox-group">
            <label className="text-wine">
              <input
                type="checkbox"
                name="saveAddress"
                checked={newAddress.saveAddress}
                onChange={() =>
                  setNewAddress((prev) => ({
                    ...prev,
                    saveAddress: !prev.saveAddress,
                  }))
                }
              />
              Save Address
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            label="Cancel"
            onClick={closeModal}
            size="large"
            type="outlined"
          />
          <Button label="Next" onClick={handleSubmit} size="large" />
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
