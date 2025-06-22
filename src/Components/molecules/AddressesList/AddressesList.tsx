import { useState } from "react";
import {ToggleRadioButton} from "@components/atoms";
import {AddressModal} from "@components/atoms";
import { AddressProps } from "@types";

const AddressList = () => {
  const [addresses, setAddresses] = useState<AddressProps[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressProps | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addAddress = (address: AddressProps) => {
    if (isEditing && editIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editIndex] = { ...address, saveAddress: address.saveAddress ?? false };
      setAddresses(updatedAddresses);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setAddresses([...addresses, { ...address, saveAddress: address.saveAddress ?? false }]);
    }
    setShowModal(false);
  };

  const handleEditAddress = (index: number) => {
    setEditIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  const handleSelectAddress = (address: AddressProps) => {
    setSelectedAddress(address);
  };

  return (
    <div>
      <div>
        {addresses.map((address, index) => (
          <div key={index} className="address-item flex flex-col gap-2 mb-4">
            <ToggleRadioButton
              label={`${address.building}, ${address.city}`}
              borderColor="#721013"
              onClick={() => handleSelectAddress(address)}
              isChecked={selectedAddress === address}
            />
            <div className="address-details text-gray-600">
              <p>{`${address.street}, ${address.city}`}</p>
              <p>{`Contact: ${address.phoneNumber}`}</p>
            </div>
            <div className="address-actions flex gap-4 text-sm text-blue-500 mt-2">
              <span
                onClick={() => handleEditAddress(index)}
                className="cursor-pointer hover:underline"
              >
                Edit
              </span>
              <span
                onClick={() => handleRemoveAddress(index)}
                className="cursor-pointer hover:underline text-red-500"
              >
                Remove
              </span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setShowModal(true)} className="mt-4 btn-primary">
        Add New Address
      </button>

      {showModal && (
        <AddressModal
          closeModal={() => {
            setShowModal(false);
            setIsEditing(false);
          }}
          addAddress={addAddress}
          {...(isEditing && editIndex !== null
            ? { prefillData: { ...addresses[editIndex], saveAddress: addresses[editIndex].saveAddress ?? false } }
            : {})}
        />
      )}

      {selectedAddress && (
        <div className="selected-address mt-6 p-4 border rounded">
          <h3 className="text-lg font-semibold">Selected Address:</h3>
          <p>{`${selectedAddress.building}, ${selectedAddress.city}`}</p>
          <p>{`${selectedAddress.street}, ${selectedAddress.city}`}</p>
        </div>
      )}
    </div>
  );
};

export default AddressList;

