import { useState } from 'react';
import ToggleRadioButton from '../../atoms/ToggleRadioButton/ToggleRadioButton'; // Import the ToggleRadioButton component
import AddressModal from '@components/atoms/AddressModal/AddressModal';

interface AddressProps {
  building: string;
  aptNo: string;
  floor: string;
  street: string;
  phoneNumber: string;
  country: string;
  city: string;
  additionalDirections?: string;
}

const AddressList = () => {
  const [addresses, setAddresses] = useState<AddressProps[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressProps | null>(null);
  const [showModal, setShowModal] = useState(false);

  const addAddress = (address: AddressProps) => {
    setAddresses([...addresses, address]);
  };

  const handleSelectAddress = (address: AddressProps) => {
    setSelectedAddress(address);
  };

  return (
    <div>
      <div>
        {addresses.map((address, index) => (
          <div key={index} className="address-item">
            <ToggleRadioButton
              label={`${address.building}, ${address.city}`}
              borderColor="#721013"
              onClick={() => handleSelectAddress(address)}
              isChecked={false}
            />
            <div className="address-details">
              <p>{`${address.street}, ${address.city}`}</p>
              <p>{`Contact: ${address.phoneNumber}`}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setShowModal(true)}>Add New Address</button>

      {showModal && (
        <AddressModal closeModal={() => setShowModal(false)} addAddress={addAddress} />
      )}

      {selectedAddress && (
        <div className="selected-address">
          <h3>Selected Address:</h3>
          <p>{`${selectedAddress.building}, ${selectedAddress.city}`}</p>
          <p>{`${selectedAddress.street}, ${selectedAddress.city}`}</p>
        </div>
      )}
    </div>
  );
};

export default AddressList;

