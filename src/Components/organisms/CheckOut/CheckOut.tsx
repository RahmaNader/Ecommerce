import React, { useState } from "react";
import cartIcon from "../../../assets/cart-icon.svg";
import cartIcon2 from "../../../assets/cart-icon2.png";
import icon from "../../../assets/discount icon.svg";
import icon2 from "../../../assets/Vector.svg";
import plusIcon from "../../../assets/plus.svg";
import { Button, ToggleRadioButton } from "@components/atoms";
import { Address } from "@components/molecules";
import AddressModal from "../../atoms/AddressModal/AddressModal"; // Import the AddressModal component
import ShippingMethod from "../../molecules/ShippingMethod/ShippingMethod"; // ShippingMethod component
import PaymentMethod from "../../molecules/PaymentMethods/PaymentMethods"; // PaymentMethod component
import OrderConfirmation from "@components/molecules/OrderConfirmation/OrderConfirmation";

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
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [addresses, setAddresses] = useState<Address[]>([]); // List of addresses
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null); // Track selected address
  const [showShippingMethod, setShowShippingMethod] = useState(false); // Track if shipping methods are visible
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>(""); // Track selected shipping method
  const [showPaymentMethod, setShowPaymentMethod] = useState(false); // Track if payment methods are visible
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(""); // Track selected payment method
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [couponCode, setCouponCode] = useState<string>("");

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(null);

  const handleEditAddress = (index: number) => {
    setEditingAddressIndex(index); // Track which address is being edited
    setShowModal(true);
  };

  const addAddress = (newAddress: Address) => {
    setAddresses((prevAddresses) => {
      if (editingAddressIndex !== null) {
        // Replace the existing address
        const updatedAddresses = [...prevAddresses];
        updatedAddresses[editingAddressIndex] = newAddress;
        return updatedAddresses;
      }
      // Add a new address
      return [...prevAddresses, newAddress];
    });
    setEditingAddressIndex(null); // Reset after editing
    closeModal();
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle address selection
  const handleAddressSelection = (index: number) => {
    setSelectedAddressIndex(index); // Update selected address index
  };

  // Handle next button click (proceed to shipping method)
  const handleNextClick = () => {
    if (selectedAddressIndex !== null) {
      setShowShippingMethod(true); // Show the shipping method section
    } else {
      alert("Please select an address first.");
    }
  };

  // Handle shipping method change
  const handleShippingMethodChange = (method: string) => {
    setSelectedShippingMethod(method); // Update selected shipping method
  };

  // Handle next button click for shipping method (proceed to payment method)
  const handlePaymentMethodClick = () => {
    if (selectedShippingMethod) {
      setShowShippingMethod(false); // Hide the shipping method section
      setShowPaymentMethod(true); // Show payment method section
    } else {
      alert("Please select a shipping method first.");
    }
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method); // Update selected payment method
  };

  // Handle confirm order (final step)
  const handleConfirmOrder = () => {
    if (selectedPaymentMethod) {
      setOrderConfirmed(true); // Set order confirmation state to true
    } else {
      alert("Please select a payment method.");
    }
  };

  if (orderConfirmed) {
    return <OrderConfirmation />; // Render OrderConfirmation when the order is confirmed
  }

  return (
    <div className="py-8 lg:px-12 md:px-5 max-sm:px-2.5 relative">
      <div className="pt-16 w-full">
        <div className="flex flex-col items-center mb-10">
          <img src={cartIcon} alt="" className="" />
          <h1 className="text-center w-full text-wine font-playfair text-5xl">
            Checkout
          </h1>
          <img src={cartIcon2} alt="" className="w-25 mt-2.5" />
        </div>
        <div className="flex justify-between flex-col lg:flex-row px-8 w-full md:flex-row">
          <div className="lg:w-3/4 md:w-1/2 w-full">
            {/* Render the address section or shipping methods */}
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
                      {/* Add spans for Edit and Remove */}
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

                {/* "Add New Address" Button */}
                <div
                  className="flex my-4 px-8 cursor-pointer"
                  onClick={openModal} // Opens the modal when clicked
                >
                  <img src={plusIcon} className="w-6" alt="" />
                  <p className="text-wine text-xl ps-2 ">Add New Address</p>
                </div>
              </>
            )}

            {/* Render the shipping method section */}
            {showShippingMethod && (
              <ShippingMethod
                selectedShippingMethod={selectedShippingMethod}
                onShippingMethodChange={handleShippingMethodChange}
              />
            )}

            {/* Render the payment method section */}
            {showPaymentMethod && (
              <PaymentMethod
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodChange={handlePaymentMethodChange}
              />
            )}
          </div>

          {/* Order Summary Section */}
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

      {/* Address Modal */}
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