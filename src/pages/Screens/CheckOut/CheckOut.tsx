import { useState, useEffect } from "react";
import { getAddressesForUser, updateSavedAddresses } from '@utils/addressUtils';
import icon2 from "@assets/Vector.svg";
import icon from "@assets/discount icon.svg";
import plusIcon from "@assets/plus.svg";
import { AddressProps } from "@types";
import { Button, ToggleRadioButton, AddressModal, Category, ErrorAlert } from "@components/atoms";
import { ShippingMethod, PaymentMethod, OrderConfirmation, Breadcrumb } from "@components/molecules";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";



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
  const [addresses, setAddresses] = useState<AddressProps[]>([]); 
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null); 
  const [showShippingMethod, setShowShippingMethod] = useState(false); 
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>(""); 
  const [showPaymentMethod, setShowPaymentMethod] = useState(false); 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: "error"; message: string } | null>(null);
  const [currentStep, setCurrentStep] = useState<'address' | 'shipping' | 'payment'>('address');


  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const savedAddresses = getAddressesForUser();
    setAddresses(savedAddresses);
  }, []);


  const handleEditAddress = (index: number) => {
    setEditingAddressIndex(index); 
    setShowModal(true);
  };

  const addAddress = (newAddress: AddressProps) => {
    setAddresses((prevAddresses) => {
      let updatedAddresses;
      if (editingAddressIndex !== null) {
        updatedAddresses = [...prevAddresses];
        updatedAddresses[editingAddressIndex] = newAddress;
      } else {
        updatedAddresses = [...prevAddresses, newAddress];
      }
      if (newAddress.saveAddress) {
        updateSavedAddresses(updatedAddresses);
      }
      return updatedAddresses;
    });
    setEditingAddressIndex(null);
    closeModal();
  };

  const handleRemoveAddress = (index: number) => {
    setAddresses((prevAddresses) => {
      const updatedAddresses = prevAddresses.filter((_, i) => i !== index);
      updateSavedAddresses(updatedAddresses);
      return updatedAddresses;
    });
    if (selectedAddressIndex === index) {
      setSelectedAddressIndex(null);
    }
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
      setCurrentStep('shipping');
    } else {
      setAlert({ type: "error", message: "Please select an address first." });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleShippingMethodChange = (method: string) => {
    setSelectedShippingMethod(method); 
  };


  const handlePaymentMethodClick = () => {
    if (selectedShippingMethod) {
      setShowShippingMethod(false);
      setShowPaymentMethod(true);
      setCurrentStep('payment');
    } else {
      setAlert({ type: "error", message: "Please select a shipping method first." });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method); 
  };

  const handleConfirmOrder = () => {
    if (selectedPaymentMethod) {
      setOrderConfirmed(true);
    } else {
      setAlert({ type: "error", message: "Please select a payment method." });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  //is this good?
  if (orderConfirmed) {
    return <OrderConfirmation />; 
  }

  return (
    <div className="min-h-screen w-full px-2 md:px-10">
      <div>
        <Breadcrumb />
        <Category SectionName={"CheckOut"} mdMyValue={"mt-2"} />
        {alert && <ErrorAlert message={alert.message} />}

        
        <div className="flex items-center w-full">
          <Typography
            onClick={() => setCurrentStep("address")}
            sx={{
              cursor: "pointer",
              color: currentStep === "address" ? "#721013" : "#A78E78",
              fontWeight: currentStep === "address" ? "bold" : "normal",
              fontSize: "1rem",
            }}
          >
            Address
          </Typography>

          <NavigateNextIcon fontSize="small" style={{ color: "#A78E78" }} />

          <Typography
            onClick={() => setCurrentStep("shipping")}
            sx={{
              cursor: "pointer",
              color: currentStep === "shipping" ? "#721013" : "#A78E78",
              fontWeight: currentStep === "shipping" ? "bold" : "normal",
              fontSize: "1rem",
            }}
          >
            Shipping
          </Typography>

          <NavigateNextIcon fontSize="small" style={{ color: "#A78E78" }} />

          <Typography
            onClick={() => setCurrentStep("payment")}
            sx={{
              cursor: "pointer",
              color: currentStep === "payment" ? "#721013" : "#A78E78",
              fontWeight: currentStep === "payment" ? "bold" : "normal",
              fontSize: "1rem",
            }}
          >
            Payment
          </Typography>
        </div>

        <div className="flex flex-col md:flex-row justify-between w-full gap-6">
          
          <div className="md:w-7/12 w-full">
          {currentStep === 'address' && (
              <>
                {addresses.map((address, index) => (
                  <div
                    key={index}
                    className="py-8 w-full"
                  >
                    <div className="w-full flex justify-between items-center">
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
                  className="flex flex-row border-t border-t-ForthColor/50 py-4 w-full cursor-pointer"
                  onClick={openModal}
                >

                  <img src={plusIcon} className="w-6" alt="" />
                  <p className="text-wine text-xl ps-2 ">Add New Address</p>
                </div>
              </>
            )}

            {currentStep === "shipping" && (
              <ShippingMethod
                selectedShippingMethod={selectedShippingMethod}
                onShippingMethodChange={handleShippingMethodChange}
              />
            )}

            {currentStep === "payment" && (
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
                <Button size="large" label="Next" onClick={handleNextClick} />
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