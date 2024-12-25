import { useState, useEffect, useRef } from "react";
import { getAddressesForUser, updateSavedAddresses } from "@utils/addressUtils";
import Cookies from "js-cookie";
import icon2 from "@assets/Vector.svg";
import icon from "@assets/discount icon.svg";
import plusIcon from "@assets/plus.svg";
import { AddressProps } from "@types";
import { Product } from "@types";
import {
  Button,
  ToggleRadioButton,
  AddressModal,
  Category,
  ErrorAlert,
  SuccessAlert,
} from "@components/atoms";
import {
  ShippingMethod,
  PaymentMethod,
  OrderConfirmation,
  Breadcrumb,
} from "@components/molecules";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";

const validCoupons = {
  SAVE10: 0.1,
  SAVE20: 0.2,
};

export default function CheckOut() {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState<AddressProps[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(
    null
  );
  const [alert, setAlert] = useState<{
      type: "success" | "error";
      message: string;
    } | null>(null);
  const [currentStep, setCurrentStep] = useState<
    "address" | "shipping" | "payment"
  >("address");
  const couponInputRef = useRef<HTMLInputElement>(null);

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const savedAddresses = getAddressesForUser();
    setAddresses(savedAddresses);
  }, []);

  const getDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7);
    return deliveryDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const cartData = Cookies.get("cart");
    if (cartData) {
      setProducts(JSON.parse(cartData));
    }
  }, []);

  const calculateSummary = () => {
    return products.reduce(
      (summary, product) => {
        summary.Total += product.NormalPrice * product.quantity;
        summary.subTotal += product.DisPrice * product.quantity;
        summary.shipping += 50;
        return summary;
      },
      { subTotal: 0, shipping: 0, Total: 0 }
    );
  };

  const applyCoupon = () => {
    if (couponCode in validCoupons) {
      setCouponDiscount(validCoupons[couponCode as keyof typeof validCoupons]);
      setAlert({ type: "success", message: "Coupon applied successfully!" });
    } else {
      setCouponDiscount(0);
      setAlert({ type: "error", message: "Invalid coupon code!" });
    }

    // Clear the input field
    if (couponInputRef.current) {
      couponInputRef.current.value = "";
      setCouponCode("");
    }

    setTimeout(() => setAlert(null), 3000);
  };

  const summary = calculateSummary();
  const totalBeforeCoupon = summary.subTotal + summary.shipping;
  const totalAfterCoupon = totalBeforeCoupon * (1 - couponDiscount);

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
    if (currentStep === "address") {
      if (selectedAddressIndex !== null) {
        setCurrentStep("shipping");
      } else {
        setAlert({ type: "error", message: "Please select an address first." });
        setTimeout(() => setAlert(null), 3000);
      }
    } else if (currentStep === "shipping") {
      if (selectedShippingMethod) {
        setCurrentStep("payment");
      } else {
        setAlert({
          type: "error",
          message: "Please select a shipping method.",
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } else if (currentStep === "payment") {
      handleConfirmOrder();
    }
  };

  const handleShippingMethodChange = (method: string) => {
    setSelectedShippingMethod(method);
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmOrder = () => {
    if (selectedAddressIndex === null) {
      setAlert({ type: "error", message: "Please select an address first." });
      setTimeout(() => setAlert(null), 3000);
      return;
    }
    if (!selectedShippingMethod) {
      setAlert({ type: "error", message: "Please select a shipping method." });
      setTimeout(() => setAlert(null), 3000);
      return;
    }
    if (!selectedPaymentMethod) {
      setAlert({ type: "error", message: "Please select a payment method." });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    setOrderConfirmed(true);
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

        {alert && (
                <div
                  className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
                  role="alert"
                >
                  {alert.type === "success" ? (
                    <SuccessAlert message={alert.message} />
                  ) : (
                    <ErrorAlert message={alert.message} />
                  )}
                </div>
              )}

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
            {currentStep === "address" && (
              <>
                {addresses.map((address, index) => (
                  <div key={index} className="py-8 w-full">
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

          {/* Order Summary */}
          <div className="w-full h-fit md:w-4/12 flex flex-col border border-ForthColor rounded-xl p-6 bg-[#A78E781C]">
            
            <h2 className="font-semibold font-playfair mb-4 text-wine text-lg md:text-xl">
              Order Summary
            </h2>

            <div className="flex flex-col gap-4 border-b border-b-gray-400 pb-4">
              <div className="flex justify-between text-wine text-base font-medium font-Poppins">
                <h4>Price</h4>
                <h4>{summary.Total.toFixed(2)} EGP</h4>
              </div>

              <div className="flex justify-between text-wine text-base font-medium font-Poppins">
                <h4>Discount</h4>
                <h4>{summary.subTotal.toFixed(2)} EGP</h4>
              </div>

              <div className="flex justify-between text-wine text-base font-medium font-Poppins">
                <h4>Shipping</h4>
                <h4>{summary.shipping.toFixed(2)} EGP</h4>
              </div>
              <div className="flex justify-between text-wine text-base font-medium font-Poppins">
                <h4>Coupon Discount</h4>
                <h4>
                  -{(totalBeforeCoupon - totalAfterCoupon).toFixed(2)} EGP
                </h4>
              </div>
            </div>

            <div className="flex justify-between mt-4 text-wine text-base font-medium font-Poppins">
            <h4>TOTAL</h4>
            <h4>{totalAfterCoupon.toFixed(2)} EGP</h4>
          </div>

          <div className="flex justify-between mt-4 text-wine text-base font-medium font-Poppins">
            <h4>Estimated Delivery by</h4>
            <h4>{getDeliveryDate()}</h4>
          </div>

          <div className="flex flex-col gap-4 my-4 justify-between w-full">
          <div className="mt-4 relative">
              <input
                ref={couponInputRef}
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon Code"
                className="w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
              />
              <div className="absolute right-3 bottom-2.5">
                <img src={icon} alt="Coupon Icon" />
                <img src={icon2} alt="" className="absolute top-1/3 left-1/3" />
              </div>
            </div>

              <Button
                label={"Apply Coupon"}
                type="secondary"
                size="medium"
                onClick={applyCoupon}
              />
              <Button
                size="large"
                label={currentStep === "payment" ? "Confirm Order" : "Next"}
                onClick={handleNextClick}
              />
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
