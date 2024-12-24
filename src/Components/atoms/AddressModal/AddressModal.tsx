import React, { useState, useEffect } from "react";
import "./AddressModal.css";
import {Button} from "@components/atoms";
import { AddressProps } from "@types";

interface AddressModalProps {
  closeModal: () => void;
  addAddress: (newAddress: AddressProps) => void; 
  prefillData?: AddressProps; 
}

const AddressModal: React.FC<AddressModalProps> = ({
  closeModal,
  addAddress,
  prefillData,
}) => {
  const citiesOfEgypt = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Sharm El Sheikh",
    "Hurghada",
    "Luxor",
    "Aswan",
    "Asyut",
    "Beheira",
    "Beni Suef",
    "Dakahlia",
    "Damietta",
    "Faiyum",
    "Ismailia",
    "Gharbia",
    "Kafr el-Sheikh",
    "Matruh",
    "Minya",
    "Monufia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia",
    "Sharqia",
    "Sohag",
    "Suez",
  ];

  const [newAddress, setNewAddress] = useState<AddressProps>(
    prefillData || {
      building: "",
      aptNo: "",
      floor: "",
      street: "",
      phoneNumber: "",
      country: "",
      city: "",
      additionalDirections: "",
      saveAddress: false,
    }
  );
  


  const [errors, setErrors] = useState({
    building: "",
    aptNo: "",
    floor: "",
    street: "",
    phoneNumber: "",
    city: "",
  });

  const validateInput = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "building":
        if (!/^[a-zA-Z\s\d]+$/.test(value)) {
          error = "Enter a Valid Building name ";
        }
        break;
      case "aptNo":
      case "floor":
        if (!/^\d+$/.test(value)) {
          error = "This field must be a valid number.";
        }
        break;
      case "street":
        if (!/^[a-zA-Z\s\d]+$/.test(value)) {
          error = "Enter Valid street address";
        }
        break;
      case "phoneNumber":
        if (!/^\d{7,15}$/.test(value)) {
          error = "Enter a valid phone number";
        }
        break;
      case "city":
        if (!value) {
          error = "Please select a city.";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error === "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(name, value);
  };

  const validateAllInputs = () => {
    // const newErrors: typeof errors = { ...errors };

    let isValid = true;

    Object.keys(newAddress).forEach((key) => {
      if (key in errors) {
        const fieldName = key as keyof typeof errors;
        const fieldValue = newAddress[fieldName];
        const isFieldValid = validateInput(fieldName, fieldValue);
        if (!isFieldValid) isValid = false;
      }
    });

    return isValid;
  };


  useEffect(() => {
    if (prefillData) {
      setNewAddress(prefillData);
    }
  }, [prefillData]);
  
  const handleSubmit = () => {
    if (validateAllInputs()) {
      addAddress(newAddress);
      closeModal();
    }
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
            {errors.building && <p className="text-red-500">{errors.building}</p>}
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
              {errors.aptNo && <p className="text-red-500">{errors.aptNo}</p>}
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
              {errors.floor && <p className="text-red-500">{errors.floor}</p>}
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
            {errors.street && <p className="text-red-500">{errors.street}</p>}
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
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="input-group">
            <select
              className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin lg:w-1/3 md:w-full focus:border-skin focus:text-skin"
              name="city"
              value={newAddress.city}
              onChange={handleChange}
            >
              <option value="">Select City</option>
              {citiesOfEgypt.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500">{errors.city}</p>}
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
          <Button
            label="Next"
            onClick={handleSubmit}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressModal;