import { useState, useEffect, useRef } from "react";
import { getAddressesForUser, updateSavedAddresses } from "@utils/addressUtils";
import {
  getAllShippingAddresses,
  convertApiAddressToAddressProps,
  deleteAddress,
} from "@services/api/address";
import Cookies from "js-cookie";
import plusIcon from "@assets/plus.svg";
import { AddressProps } from "@types";
import { Product } from "@types";
import { OrderSummary } from "@components/organisms";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import placeOrder from "@services/api/placeOrder";
import {
  getPaymobAuthToken,
  createPaymobOrder,
  generatePaymentKey,
  getPaymentUrl,
} from "@services/api/paymobServices";

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
  PaymentModal,
} from "@components/molecules";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";

// Define proper types instead of using 'any'
interface OrderItem {
  productId: number;
  quantity: number;
  color: string;
  sizeLabel: string;
}

interface OrderData {
  city: string;
  shippingAddressId: string;
  isFastShipping: boolean;
  couponCode: string;
  shoppingItems: OrderItem[];
  orderId?: string; // Optional since it gets populated after order creation
}

interface OrderResponse {
  success: boolean;
  message?: string;
}

interface OrderSummaryData {
  subtotal: number;
  shipping: number;
  totalAfterCoupon: number;
}

export default function CheckOut() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query parameters for payment callbacks
  const queryParams = new URLSearchParams(location.search);
  const paymentStatus = queryParams.get("payment_status");
  const transactionId = queryParams.get("transaction_id");

  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState<AddressProps[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<string>("regular");
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

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    fullName: "",
  });

  // Store order data for payment callbacks - replace 'any' with proper type
  const orderDataRef = useRef<OrderData | null>(null);

  // Handle payment return from external gateway
  useEffect(() => {
    if (paymentStatus) {
      const handlePaymentReturn = async () => {
        // Clear query params to avoid processing the same payment again on refresh
        navigate('/cart/checkout', { replace: true });
        
        if (paymentStatus === "success" && transactionId && orderDataRef.current) {
          try {
            // Process the successful order first
            await processOrder(orderDataRef.current);
            
            // Display success message
            showAlertMessage("success", t("payment.successMessage"), 3000);
            
            // Perform any additional post-payment actions here
            // For example: analytics tracking, loyalty points, etc.
            
            // Redirect to home page after a short delay (allows user to see the success message)
            setTimeout(() => {
              navigate('/');
            }, 3000);
            
          } catch (error) {
            console.error("[CheckOut] Error processing returned payment:", error);
            setAlert({ 
              type: "error", 
              message: t("payment.verificationError") 
            });
            setTimeout(() => setAlert(null), 5000);
          }
        } else if (paymentStatus === "failed") {
          handlePaymentFailure(t("payment.rejectedByGateway"));
        }
      };
      
      handlePaymentReturn();
    }
  }, [paymentStatus, transactionId, navigate, t]);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const savedAddresses = getAddressesForUser();
        const apiAddresses = await getAllShippingAddresses();

        if (apiAddresses && apiAddresses.length > 0) {
          const convertedAddresses = apiAddresses.map(
            convertApiAddressToAddressProps
          );
          setAddresses(convertedAddresses);
        } else {
          setAddresses(savedAddresses);
        }
      } catch (error) {
        console.error("[CheckOut] Error fetching addresses:", error);
        // Fall back to local addresses if API fails
        setAddresses(getAddressesForUser());
      }
    };

    loadAddresses();
  }, []);

  useEffect(() => {
    const cartData = Cookies.get("cart");
    if (cartData) {
      try {
        setProducts(JSON.parse(cartData));
      } catch (error) {
        console.error("[CheckOut] Error parsing cart data:", error);
        setAlert({ 
          type: "error", 
          message: t("checkout.invalidCartData") 
        });
        setTimeout(() => setAlert(null), 3000);
      }
    }

    // Save current cart as previous cart for recovery
    if (!Cookies.get("previousCart") && cartData) {
      try {
        const parsedCart = JSON.parse(cartData);
        Cookies.set(
          "previousCart",
          JSON.stringify(
            parsedCart.map((p: Product) => ({
              id: p.id,
              quantity: p.quantity,
            }))
          ),
          { expires: 7 }
        );
      } catch (error) {
        console.error("[CheckOut] Error saving previous cart:", error);
      }
    }
  }, [t]);

  // Load user data from cookies
  useEffect(() => {
    setUserData({
      username: Cookies.get("username") || "",
      email: Cookies.get("email") || "",
      fullName: Cookies.get("fullName") || "",
    });
  }, []);

  const showAlertMessage = (type: "success" | "error", message: string, duration = 3000) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), duration);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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

  const handleRemoveAddress = async (index: number) => {
    const addressToDelete = addresses[index];

    if (addressToDelete.shippingAddressId) {
      try {
        const success = await deleteAddress(addressToDelete.shippingAddressId);
        if (!success) {
          console.error(`[CheckOut] Failed to delete address with ID: ${addressToDelete.shippingAddressId}`);
        }
      } catch (error) {
        console.error(`[CheckOut] Error deleting address:`, error);
      }
    }

    setAddresses((prevAddresses) => {
      const updatedAddresses = prevAddresses.filter((_, i) => i !== index);
      updateSavedAddresses(updatedAddresses);
      return updatedAddresses;
    });

    if (selectedAddressIndex === index) {
      setSelectedAddressIndex(null);
    }
  };

  const handleAddressSelection = (index: number) => {
    setSelectedAddressIndex(index);
  };

  const handleNextClick = () => {
    if (currentStep === "address") {
      if (selectedAddressIndex !== null) {
        setCurrentStep("shipping");
      } else {
        showAlertMessage("error", t("checkout.selectAddress"));
      }
    } else if (currentStep === "shipping") {
      if (selectedShippingMethod) {
        setCurrentStep("payment");
      } else {
        showAlertMessage("error", t("checkout.selectShipping"));
      }
    } else if (currentStep === "payment") {
      handlePlaceOrder();
    }
  };

  const handleShippingMethodChange = (method: string) => {
    setSelectedShippingMethod(method);
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    if (selectedAddressIndex === null) {
      showAlertMessage("error", t("checkout.selectAddress"));
      return;
    }
    if (!selectedShippingMethod) {
      showAlertMessage("error", t("checkout.selectShipping"));
      return;
    }
    if (!selectedPaymentMethod) {
      showAlertMessage("error", t("checkout.selectPayment"));
      return;
    }

    const selectedAddress = addresses[selectedAddressIndex];
    setIsPlacingOrder(true);

    try {
      const shoppingItems: OrderItem[] = products.map((product) => {
        const variantId = product?.productVarientId;
        
        if (!variantId) {
          throw new Error(`Missing variant ID for ${product.name || 'unnamed product'}`);
        }

        return {
          productId: typeof variantId === "string" ? parseInt(variantId, 10) : variantId,
          quantity: product.quantity,
          color: product.color || "Default",
          sizeLabel: product.size || "Default",
        };
      });

      const orderData: OrderData = {
        city: selectedAddress.city,
        shippingAddressId: String(
          selectedAddress.shippingAddressId ||
          selectedAddress.id ||
          Date.now().toString()
        ),
        isFastShipping: selectedShippingMethod === "fast",
        couponCode: Cookies.get("appliedCoupon") || "",
        shoppingItems: shoppingItems,
      };

      // Store order data for payment callbacks
      orderDataRef.current = orderData;

      if (selectedPaymentMethod === "cash") {
        // Cash on delivery - direct order placement
        await processOrder(orderData);
      } else if (selectedPaymentMethod === "credit") {
        // Credit card payment via Paymob
        await processCardPayment();
      }
    } catch (error) {
      console.error("[CheckOut] Order error:", error);
      showAlertMessage("error", t("checkout.orderError"), 5000);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const processOrder = async (orderData: OrderData) => {
    try {
      const response = await placeOrder(orderData) as OrderResponse;

      if (response && response.success) {
        // Clear cart data after successful order
        cleanupCartData();
        setOrderConfirmed(true);
      } else {
        showAlertMessage("error", response?.message || t("checkout.orderError"), 5000);
      }
    } catch (error) {
      throw error;
    }
  };

  const cleanupCartData = () => {
    Cookies.remove("cart");
    Cookies.remove("appliedCoupon");
    Cookies.remove("orderSummary");
  };

  const processCardPayment = async () => {
    try {
      setIsProcessingPayment(true);

      // Calculate total from cart summary
      const summary = calculateOrderSummary();
      const totalAmount = summary.totalAfterCoupon;

      // Create Payment Flow
      const authToken = await getPaymobAuthToken();
      const orderId = await createPaymobOrder(authToken, totalAmount);

      // Generate current page URL as return URL
      const baseUrl = window.location.origin;
      const returnUrl = `${baseUrl}/cart/checkout`;

      const selectedAddress = addresses[selectedAddressIndex!];
      
      // Include return URLs in payment key generation
      const paymentKey = await generatePaymentKey(
        authToken,
        totalAmount,
        orderId,
        userData,
        selectedAddress,
        returnUrl // Add return URL
      );

      // Get payment URL and redirect
      const url = getPaymentUrl(paymentKey);
      setPaymentUrl(url);
    } catch (error) {
      console.error("[CheckOut] Payment processing error:", error);
      showAlertMessage("error", t("payment.processingError"), 5000);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Calculate order summary from cart data or products
  const calculateOrderSummary = (): OrderSummaryData => {
    const cart = Cookies.get("orderSummary");
    if (cart) {
      try {
        return JSON.parse(cart);
      } catch (error) {
        console.error("[CheckOut] Error parsing order summary:", error);
      }
    }
    
    // Fallback calculation
    const subtotal = products.reduce((acc, item) => {
      return acc + (Number(item.DisPrice || item.NormalPrice) * item.quantity);
    }, 0);
    const shipping = selectedShippingMethod === "fast" ? 50 : 0;
    return {
      subtotal,
      shipping,
      totalAfterCoupon: subtotal + shipping,
    };
  };

  const handlePaymentSuccess = async () => {
    setPaymentUrl(null);

    try {
      // Process the order after successful payment
      if (orderDataRef.current) {
        await processOrder(orderDataRef.current);
        
        // Show success message
        showAlertMessage("success", t("payment.successMessage"), 3000);
        
        // Perform additional actions after successful payment
        // Example: Record analytics event
        console.log("[CheckOut] Recording successful payment");
        
        // Example: Save order ID for order tracking
        const orderId = orderDataRef.current.orderId || 'unknown';
        Cookies.set("lastCompletedOrder", orderId, { expires: 1 });
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        throw new Error("Missing order data");
      }
    } catch (error) {
      console.error("[CheckOut] Error processing order after payment:", error);
      showAlertMessage("error", t("payment.orderProcessingError"), 5000);
    }
  };

  const handlePaymentFailure = (message: string) => {
    setPaymentUrl(null);
    showAlertMessage("error", message || t("payment.failed"), 5000);
  };

  // Render payment modal when needed
  if (paymentUrl) {
    return (
      <PaymentModal
        paymentUrl={paymentUrl}
        onClose={() => setPaymentUrl(null)}
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
      />
    );
  }

  if (orderConfirmed) {
    return <OrderConfirmation />;
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

          <NavigateNextIcon
            fontSize="small"
            style={{
              color: "#A78E78",
              transform: isRTL ? "rotate(180deg)" : "none",
            }}
          />

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

          <NavigateNextIcon
            fontSize="small"
            style={{
              color: "#A78E78",
              transform: isRTL ? "rotate(180deg)" : "none",
            }}
          />

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

        <div
          className={`flex flex-col md:flex-row justify-between w-full gap-6 `}
        >
          <div className="md:w-7/12 w-full">
            {currentStep === "address" && (
              <>
                {addresses.map((address, index) => (
                  <div key={index} className="py-8 w-full">
                    <div
                      className={`w-full flex justify-between items-center `}
                    >
                      <div
                        className={`w-4/5 ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      >
                        <ToggleRadioButton
                          label={`${address.building}, ${address.city}`}
                          isChecked={selectedAddressIndex === index}
                          onChange={() => handleAddressSelection(index)}
                        />
                        <div className={`text-addressDetails text-lg px-8 `}>
                          <p>
                            {address.building} {address.aptNo}, {address.floor}{" "}
                            {isRTL ? t("checkout.floor") : "Floor"},{" "}
                            {address.street}
                          </p>
                          <p>
                            {t("checkout.contact")} - {address.phoneNumber}
                          </p>
                          <p>
                            {address.city}, {address.country}
                          </p>
                          {address.additionalDirections && (
                            <p>{address.additionalDirections}</p>
                          )}
                        </div>
                      </div>
                      <div
                        className={`address-actions flex gap-4 text-sm text-wine mt-2`}
                      >
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
                  <p className={`text-wine text-xl ${isRTL ? "pr-2" : "ps-2"}`}>
                    {t("checkout.addAddress")}
                  </p>
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
          <OrderSummary
            products={products}
            currentStep={currentStep}
            onNextClick={handleNextClick}
            selectedPaymentMethod={selectedPaymentMethod}
            selectedAddress={
              selectedAddressIndex !== null
                ? addresses[selectedAddressIndex]
                : null
            }
            selectedShippingMethod={selectedShippingMethod}
            isPlacingOrder={isPlacingOrder || isProcessingPayment}
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
