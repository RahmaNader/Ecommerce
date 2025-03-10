import { useState, useEffect } from "react";
import { getAddressesForUser, updateSavedAddresses } from "@utils/addressUtils";
import Cookies from "js-cookie";
import plusIcon from "@assets/plus.svg";
import { AddressProps } from "@types";
import { Product } from "@types";
import { OrderSummary } from "@components/organisms";
import { useTranslation } from "react-i18next"; 

import {
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

export default function CheckOut() {
  const { t, i18n } = useTranslation(); 
  const isRTL = i18n.language === 'ar'; 
  
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

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const savedAddresses = getAddressesForUser();
    setAddresses(savedAddresses);
  }, []);

  useEffect(() => {
    const cartData = Cookies.get("cart");
    
    if (cartData) {
      setProducts(JSON.parse(cartData));
    }
    
    // Ensure we have previous cart state
    if (!Cookies.get('previousCart') && cartData) {
      Cookies.set('previousCart', JSON.stringify(JSON.parse(cartData).map((p: Product) => ({ 
        id: p.id, 
        quantity: p.quantity 
      }))));
    }
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
    if (currentStep === "address") {
      if (selectedAddressIndex !== null) {
        setCurrentStep("shipping");
      } else {
        setAlert({ type: "error", message: t("checkout.selectAddress") });
        setTimeout(() => setAlert(null), 3000);
      }
    } else if (currentStep === "shipping") {
      if (selectedShippingMethod) {
        setCurrentStep("payment");
      } else {
        setAlert({
          type: "error",
          message: t("checkout.selectShipping"),
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
      setAlert({ type: "error", message: t("checkout.selectAddress") });
      setTimeout(() => setAlert(null), 3000);
      return;
    }
    if (!selectedShippingMethod) {
      setAlert({ type: "error", message: t("checkout.selectShipping") });
      setTimeout(() => setAlert(null), 3000);
      return;
    }
    if (!selectedPaymentMethod) {
      setAlert({ type: "error", message: t("checkout.selectPayment") });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    setOrderConfirmed(true);
  };

  if (orderConfirmed) {
    return <OrderConfirmation 
    // isArabic={isRTL}
     />;
  }

  return (
    <div className={`min-h-screen w-full px-2 md:px-10`}>
      <div>
        <Breadcrumb />
        <Category SectionName={t("checkout.title")} mdMyValue={"mt-2"} />

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

        <div className={`flex flex-row gap-4 items-center w-full `}>
          <Typography
            onClick={() => setCurrentStep("address")}
            sx={{
              cursor: "pointer",
              color: currentStep === "address" ? "#721013" : "#A78E78",
              fontWeight: currentStep === "address" ? "bold" : "normal",
              fontSize: "1rem",
            }}
          >
            {t("checkout.address")}
          </Typography>

          <NavigateNextIcon fontSize="small" style={{ 
            color: "#A78E78", 
            transform: isRTL ? 'rotate(180deg)' : 'none' 
          }} />

          <Typography
            onClick={() => setCurrentStep("shipping")}
            sx={{
              cursor: "pointer",
              color: currentStep === "shipping" ? "#721013" : "#A78E78",
              fontWeight: currentStep === "shipping" ? "bold" : "normal",
              fontSize: "1rem",
            }}
          >
            {t("checkout.shipping")}
          </Typography>

          <NavigateNextIcon fontSize="small" style={{ 
            color: "#A78E78",
            transform: isRTL ? 'rotate(180deg)' : 'none'
          }} />

          <Typography
            onClick={() => setCurrentStep("payment")}
            sx={{
              cursor: "pointer",
              color: currentStep === "payment" ? "#721013" : "#A78E78",
              fontWeight: currentStep === "payment" ? "bold" : "normal",
              fontSize: "1rem",
            }}
          >
            {t("checkout.payment")}
          </Typography>
        </div>

        <div className={`flex flex-col md:flex-row justify-between w-full gap-6 `}>
          <div className="md:w-7/12 w-full">
            {currentStep === "address" && (
              <>
                {addresses.map((address, index) => (
                  <div key={index} className="py-8 w-full">
                    <div className={`w-full flex justify-between items-center `}>
                      <div className={`w-4/5 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <ToggleRadioButton
                          label={`${address.building}, ${address.city}`}
                          isChecked={selectedAddressIndex === index}
                          onChange={() => handleAddressSelection(index)}
                        />
                        <div className={`text-addressDetails text-lg px-8 `}>
                          <p>
                            {address.building} {address.aptNo}, {address.floor}{" "}
                            {isRTL ? t("checkout.floor") : "Floor"}, {address.street}
                          </p>
                          <p>{t("checkout.contact")} - {address.phoneNumber}</p>
                          <p>
                            {address.city}, {address.country}
                          </p>
                          {address.additionalDirections && (
                            <p>{address.additionalDirections}</p>
                          )}
                        </div>
                      </div>
                      <div className={`address-actions flex gap-4 text-sm text-wine mt-2`}>
                        <span
                          onClick={() => handleEditAddress(index)}
                          className="cursor-pointer hover:underline"
                        >
                          {t("checkout.edit")}
                        </span>
                        <span className="w-0.5 h-5 bg-[#D1D1D8]"></span>
                        <span
                          onClick={() => handleRemoveAddress(index)}
                          className="cursor-pointer hover:underline text-removeButton"
                        >
                          {t("checkout.remove")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  className={`flex flex-row border-t border-t-ForthColor/50 py-4 w-full cursor-pointer `}
                  onClick={openModal}
                >
                  <img src={plusIcon} className="w-6" alt="" />
                  <p className={`text-wine text-xl ${isRTL ? 'pr-2' : 'ps-2'}`}>
                    {t("checkout.addAddress")}
                  </p>
                </div>
              </>
            )}

            {currentStep === "shipping" && (
              <ShippingMethod
                selectedShippingMethod={selectedShippingMethod}
                onShippingMethodChange={handleShippingMethodChange}
                // isArabic={isRTL}
              />
            )}

            {currentStep === "payment" && (
              <PaymentMethod
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodChange={handlePaymentMethodChange}
                // isArabic={isRTL}
              />
            )}
          </div>

          {/* Order Summary */}
          <OrderSummary
            products={products}
            currentStep={currentStep}
            onNextClick={handleNextClick}
            selectedPaymentMethod={selectedPaymentMethod}
            selectedAddress={selectedAddressIndex !== null ? addresses[selectedAddressIndex] : null}
            selectedShippingMethod={selectedShippingMethod}
            // isArabic={isRTL}
          />
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
          isArabic={isRTL}
        />
      )}
    </div>
  );
}