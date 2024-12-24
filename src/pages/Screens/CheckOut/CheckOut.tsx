import { useState } from "react";
import icon2 from "@assets/Vector.svg";
import icon from "@assets/discount icon.svg";
import plusIcon from "@assets/plus.svg";
import { Button, ToggleRadioButton, AddressModal } from "@components/atoms";
import { Address, ShippingMethod, PaymentMethod, OrderConfirmation } from "@components/molecules";

interface Address {
  building: string;
  aptNo: string;
  floor: string;
  street: string;
  phoneNumber: string;
  country: string;
  city: string;
  additionalDirections?: string;
  saveAddress: boolean;
}

interface Product {
  Price: string;
  Discount: string;
  Shipping: string;
  CouponApplied: string;
  TOTAL: string;
  EstimatedDeliveryBy: string;
}

const product: Product = {
  Price: "1000 EGP",
  Discount: "100 EGP",
  Shipping: "50 EGP",
  CouponApplied: "SAVE10",
  TOTAL: "950 EGP",
  EstimatedDeliveryBy: "20th Oct, 2023",
};

export default function CheckOut() {
  const [showModal, setShowModal] = useState(false); 
  const [addresses, setAddresses] = useState<Address[]>([]); 
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null); 
  const [showShippingMethod, setShowShippingMethod] = useState(false); 
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>(""); 
  const [showPaymentMethod, setShowPaymentMethod] = useState(false); 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [couponCode, setCouponCode] = useState<string>("");

  const openModal = () => {
    setShowModal(true);
  };

  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(null);

  const handleEditAddress = (index: number) => {
    setEditingAddressIndex(index); 
    setShowModal(true);
  };

  const addAddress = (newAddress: Address) => {
    setAddresses((prevAddresses) => {
      if (editingAddressIndex !== null) {
        const updatedAddresses = [...prevAddresses];
        updatedAddresses[editingAddressIndex] = newAddress;
        return updatedAddresses;
      }
      return [...prevAddresses, newAddress];
    });
    setEditingAddressIndex(null); 
    closeModal();
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddressSelection = (index: number) => {
    setSelectedAddressIndex(index); 
  };

  const handleNextClick = () => {
    if (selectedAddressIndex !== null) {
      setShowShippingMethod(true); 
    } else {
      alert("Please select an address first.");
    }
  };

  const handleShippingMethodChange = (method: string) => {
    setSelectedShippingMethod(method); 
  };


  const handlePaymentMethodClick = () => {
    if (selectedShippingMethod) {
      setShowShippingMethod(false); 
      setShowPaymentMethod(true); 
    } else {
      alert("Please select a shipping method first.");
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method); 
  };

  const handleConfirmOrder = () => {
    if (selectedPaymentMethod) {
      setOrderConfirmed(true);
    } else {
      alert("Please select a payment method.");
    }
  };

  if (orderConfirmed) {
    return <OrderConfirmation />; 
  }

  return (
    <div className="py-8 lg:px-12 md:px-5 max-sm:px-2.5 relative">
      <div className="pt-16 w-full">

        {/* <div className="flex flex-col items-center mb-10">
          <img src={cartIcon} alt="" className="" />
          <h1 className="text-center w-full text-wine font-playfair text-5xl">
            Checkout
          </h1>
          <img src={cartIcon2} alt="" className="w-25 mt-2.5" />
        </div> */}

        <div className="flex justify-between flex-col lg:flex-row px-8 w-full md:flex-row">
          <div className="lg:w-3/4 md:w-1/2 w-full">
            {!showShippingMethod && !showPaymentMethod && (
              <>
                {addresses.map((address, index) => (
                  <div
                    key={index}
                    className="py-5 flex border-b border-b-gray-300 text-mainColor w-[95%]"
                  >
                    <div className="ms-5 w-full flex justify-between items-center">
                      <div className="w-4/5">
                        <ToggleRadioButton
                          label={`${address.building}, ${address.city}`}
                          isChecked={selectedAddressIndex === index}
                          onChange={() => handleAddressSelection(index)}
                        />
                        <div className="text-addressDetails text-lg px-8">
                          <p>
                            {address.building} {address.aptNo}, {address.floor}{" "}
                            Floor, {address.street}
                          </p>
                          <p>Contact - {address.phoneNumber}</p>
                          <p>
                            {address.city}, {address.country}
                          </p>
                          {address.additionalDirections && (
                            <p>{address.additionalDirections}</p>
                          )}
                        </div>
                      </div>
                      <div className="address-actions flex gap-4 text-sm text-wine mt-2">
                        <span
                          onClick={() => handleEditAddress(index)}
                          className="cursor-pointer hover:underline"
                        >
                          Edit
                        </span>
                        <span className="w-0.5 h-5 bg-[#D1D1D8]"></span>
                        <span
                          onClick={() => handleRemoveAddress(index)}
                          className="cursor-pointer hover:underline text-removeButton"
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  className="flex my-4 px-8 cursor-pointer"
                  onClick={openModal} 
                >
                  <img src={plusIcon} className="w-6" alt="" />
                  <p className="text-wine text-xl ps-2 ">Add New Address</p>
                </div>
              </>
            )}

            {showShippingMethod && (
              <ShippingMethod
                selectedShippingMethod={selectedShippingMethod}
                onShippingMethodChange={handleShippingMethodChange}
              />
            )}

            {showPaymentMethod && (
              <PaymentMethod
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodChange={handlePaymentMethodChange}
              />
            )}
          </div>

          <div className="primary lg:w-1/4 md:w-1/2 w-[80%] mx-auto my-4 flex flex-col border border-1 border-skin p-12 bg-[#A78E781C] ">
            <h2 className="pb-4 w-full">Order Summary</h2>
            <div className="flex justify-between w-full border-b border-b-gray-400">
              <div className="mb-5">
                <h4 className="mb-4">Price</h4>
                <h4 className="mb-4">Discount</h4>
                <h4 className="mb-4">Shipping</h4>
                <h4 className="mb-4">Coupon Applied</h4>
              </div>
              <div className="mb-5">
                <h4 className="mb-4">{product.Price}</h4>
                <h4 className="mb-4">{product.Discount}</h4>
                <h4 className="mb-4">{product.Shipping}</h4>
                <h4 className="mb-4">{product.CouponApplied}</h4>
              </div>
            </div>
            <div className="flex justify-between pt-4 w-full">
              <div className="mb-5">
                <h4 className="mb-4">TOTAL</h4>
                <h4 className="mb-4">Estimated Delivery by</h4>
              </div>
              <div className="mb-5">
                <h4 className="mb-4">{product.TOTAL}</h4>
                <h4 className="mb-4">{product.EstimatedDeliveryBy}</h4>
              </div>
            </div>
            <div className="mb-4 relative">
              <input
                type="text"
                name="discount coupon"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full py-2 px-3.5 rounded-sm placeholder-[#A78E78] border border-[#A78E78]"
              />
              <div className="absolute right-3.5 bottom-2.5">
                <img src={icon} alt="" className="relative" />
                <img
                  src={icon2}
                  alt=""
                  className="absolute top-1/3 left-1/3 "
                />
              </div>
            </div>
            <div className="">
              {showPaymentMethod ? (
                <Button
                  size="large"
                  label="Confirm Order"
                  onClick={handleConfirmOrder}
                />
              ) : showShippingMethod ? (
                <Button
                  size="large"
                  label="Next"
                  onClick={handlePaymentMethodClick}
                />
              ) : (
                <Button
                  size="large"
                  label="Next"
                  onClick={handleNextClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AddressModal
          closeModal={closeModal}
          addAddress={addAddress}
          prefillData={
            editingAddressIndex !== null
              ? addresses[editingAddressIndex]
              : undefined
          }
        />
      )}
    </div>
  );
}