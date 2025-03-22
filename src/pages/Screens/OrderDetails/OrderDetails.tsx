import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import truck from "@assets/truck.svg";
import { Breadcrumb } from "@components/molecules";
import { Category, ErrorAlert } from "@components/atoms";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import { fetchOrderDetails } from "@services/api/fetchOrders";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { OrderStatus} from "@utils/OrderDetails";
import { UserOrder } from "@types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { cancelOrder } from "@services/api/cancelOrder";
import { refundOrder, RefundItem } from "@services/api/refundOrder";
import Checkbox from "@mui/material/Checkbox";
import { LoadingSkeleton } from "@components/molecules";
// import FormControlLabel from "@mui/material/FormControlLabel";

interface OrderStep {
  label: string;
  date: string;
  completed: boolean;
}

interface CancelledOrderStep extends OrderStep {
  isCancelled: boolean;
}

interface OrderData {
  orderId: string;
  orderNumber: number;
  orderDate: string;
  estimatedDelivery: string;
  steps: (OrderStep | CancelledOrderStep)[];
  items: {
    id: string; // Add this property
    name: string;
    details: string;
    price: string;
    quantity: number;
    quantityRefunded: number; // Add this property
    image?: string;
  }[];
  payment: { method: string; lastFourDigits: string; icon?: string };
  delivery: { 
    address: string; 
    city: string; 
    phone: string;
    flatNumber: string | number;
    floorNumber: string | number;
    additionalDirections?: string;
  };
  summary: { label: string; value: string }[];
  total: string;
  isCancelled?: boolean;
}

// Update the CustomStepConnector styles
const CustomStepConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
    '&[dir="rtl"]': {
      left: 'calc(50% + 20px)',
      right: 'calc(-50% + 20px)',
    }
  },
  [`&.${stepConnectorClasses.line}`]: {
    height: 10,
    backgroundColor: "#A78E78",
  },
}));

// Add a custom style for cancelled steps
const CancelledStepConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
  },
  [`&.${stepConnectorClasses.line}`]: {
    height: 10,
    backgroundColor: "#E53935", // Red color for cancelled
  },
}));

const CustomStepLabel = styled(StepLabel)(() => ({
  [`& .MuiStepLabel-label`]: {
    fontSize: "1rem",
    fontFamily: "Playfair Display, serif",
    color: "#A78E78",
    textAlign: "center",
    display: "block",
  },
  [`& .MuiStepLabel-label.Mui-active`]: {
    color: "#721013",
    fontWeight: "500",
  },
  [`& .MuiStepLabel-label.Mui-completed`]: {
    color: "#721013",
  },
  [`& .MuiStepLabel-iconContainer .Mui-active`]: {
    color: "#721013",
  },
  [`& .MuiStepLabel-iconContainer .Mui-completed`]: {
    color: "#721013",
  },
  [`& .MuiStepLabel-iconContainer`]: {
    color: "#A78E78",
  },
}));

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const isEnglish = !isRTL;
  
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isRefunding, setIsRefunding] = useState(false);
  const [openRefundDialog, setOpenRefundDialog] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [refundSuccess, setRefundSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Format date based on locale
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'PP', { 
        locale: isRTL ? ar : enUS 
      });
    } catch {
      return dateString;
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} ${t("product.currency")}`;
  };

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError(t("orderDetails.noOrderId"));
        return;
      }

      try {
        setLoading(true);
        console.log(`[OrderDetails] Fetching order: ${orderId}`);
        const order = await fetchOrderDetails(orderId, isEnglish);
        
        // Map the API response to our component's data structure
        const orderDataMapped = mapOrderToUiModel(order);
        setOrderData(orderDataMapped);
        setError(null);
      } catch (err) {
        console.error("[OrderDetails] Error fetching order:", err);
        setError(err instanceof Error ? err.message : t("orderDetails.loadError"));
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, isEnglish, t]);

  // Map API response to UI model
  const mapOrderToUiModel = (order: UserOrder): OrderData => {
    // Check if order is cancelled
    const isCancelled = order.status === OrderStatus.Cancelled || order.isCanceled;
    
    // Generate order steps based on dates and status
    const steps = [
      { 
        label: t("orderDetails.steps.confirmed"), 
        date: formatDate(order.orderDate), 
        completed: true 
      },
    ];
    
    // If order is cancelled, add cancelled step and skip other steps
    if (isCancelled) {
      steps.push({
        label: t("orderDetails.steps.cancelled"),
        date: formatDate(order.orderDate),
        completed: true,
        isCancelled: true
      } as CancelledOrderStep);
    } else {
      // Continue with normal steps for non-cancelled orders
      if (order.preProductionDate || order.status >= OrderStatus.PreProduction) {
        steps.push({
          label: t("orderDetails.steps.preProduction"),
          date: order.preProductionDate ? formatDate(order.preProductionDate) : t("orderDetails.processing"),
          completed: order.status >= OrderStatus.PreProduction
        });
      }
      
      // Add in-production step if applicable
      if (order.inProductionDate || order.status >= OrderStatus.InProduction) {
        steps.push({
          label: t("orderDetails.steps.inProduction"),
          date: order.inProductionDate ? formatDate(order.inProductionDate) : t("orderDetails.processing"),
          completed: order.status >= OrderStatus.InProduction
        });
      }
      
      // Add shipped step if applicable
      if (order.shippedDate || order.status >= OrderStatus.Shipped) {
        steps.push({
          label: t("orderDetails.steps.shipped"),
          date: order.shippedDate && order.shippedDate !== "0001-01-01T00:00:00" ? 
                formatDate(order.shippedDate) : t("orderDetails.processing"),
          completed: order.status >= OrderStatus.Shipped
        });
      }
      
      // Add out for delivery step if applicable
      if (order.outForDeliveryDate || order.status >= OrderStatus.OutForDelivery) {
        steps.push({
          label: t("orderDetails.steps.outForDelivery"),
          date: order.outForDeliveryDate && order.outForDeliveryDate !== "0001-01-01T00:00:00" ? 
                formatDate(order.outForDeliveryDate) : t("orderDetails.processing"),
          completed: order.status >= OrderStatus.OutForDelivery
        });
      }
      
      // Add delivered step
      steps.push({
        label: t("orderDetails.steps.delivered"),
        date: order.deliveredDate && order.deliveredDate !== "0001-01-01T00:00:00" ? 
              formatDate(order.deliveredDate) : 
              formatDate(order.estimadtedDelivereyDate),
        completed: order.status === OrderStatus.Delivered
      });
    }
    
    // Create items array from order items
    const items = order.orderItems.$values.map(item => ({
      id: item.orderItemId, // Add this line
      name: item.productName || t("orderDetails.unknownProduct"),
      details: `${item.productColor || ''} | ${item.productSize || ''}`,
      price: formatCurrency(item.unitPrice),
      quantity: item.quantity,
      quantityRefunded: item.quantityRefunded, // Add this line
      image: item.firstProductImageUrl
    }));
    
    // Create summary details
    const summary = [
      { label: t("orderDetails.subtotal"), value: formatCurrency(order.subTotal) },
    ];
    
    // Add discount if there is one
    if (order.discountAmount > 0) {
      summary.push({ 
        label: t("orderDetails.discount"), 
        value: `- ${formatCurrency(order.discountAmount)}` 
      });
    }
    
    // Add shipping cost
    summary.push({ 
      label: t("orderDetails.shipping"), 
      value: formatCurrency(order.shippingCost) 
    });

    // Extract address information
    const address = order.shippingAddress;
    
    // Create delivery object
    const delivery = {
      address: address?.buildingName 
        ? `${address.buildingName}, ${address.street || ''}` 
        : t("orderDetails.notAvailable"),
      city: getCityName(address?.city),
      phone: address?.phoneNumber || t("orderDetails.notAvailable"),
      flatNumber: address?.flatNumber || "",
      floorNumber: address?.floorNumber || "",
      additionalDirections: address?.additionalDirections || ""
    };

    return {
      orderId: order.orderId,
      orderNumber: order.orderNumber,
      orderDate: formatDate(order.orderDate),
      estimatedDelivery: formatDate(order.estimadtedDelivereyDate),
      steps,
      items,
      payment: {
        method: t("orderDetails.cashOnDelivery"),
        lastFourDigits: "",
        icon: undefined
      },
      delivery,
      summary,
      total: formatCurrency(order.total),
      isCancelled // Add this new property
    };
  };

const getCityName = (cityCode: number | undefined) => {
  if (!cityCode) return t("orderDetails.notAvailable");
  
  const cityCodes: Record<number, string> = {
    1: isRTL ? "القاهرة" : "Cairo",
    2: isRTL ? "الإسكندرية" : "Alexandria",
    3: isRTL ? "الجيزة" : "Giza",
    4: isRTL ? "شرم الشيخ" : "Sharm El Sheikh",
    5: isRTL ? "الغردقة" : "Hurghada",
    // Add more cities as needed
  };
  
  return cityCodes[cityCode] || `${t("orderDetails.city")} ${cityCode}`;
};

const handleCancelOrder = async () => {
  if (!orderId) return;
  
  setIsCancelling(true);
  try {
    await cancelOrder(orderId);
    
    // Refresh order data after cancellation
    console.log(`[OrderDetails] Order cancelled, refreshing data...`);
    const order = await fetchOrderDetails(orderId, isEnglish);
    const orderDataMapped = mapOrderToUiModel(order);
    setOrderData(orderDataMapped);
    
    // Close dialog
    setOpenConfirmDialog(false);
  } catch (err) {
    console.error("[OrderDetails] Error cancelling order:", err);
    setError(err instanceof Error ? err.message : t("orderDetails.cancelError"));
  } finally {
    setIsCancelling(false);
  }
};

const handleRefundOrder = async () => {
  if (!orderId) return;
  
  // Convert selected items to the format expected by the API
  const refundItems: RefundItem[] = Object.entries(selectedItems)
    .filter(([, quantity]) => quantity > 0)
    .map(([itemId, quantity]) => ({
      orderItemId: itemId,
      quantity
    }));
  
  if (refundItems.length === 0) {
    setError(t("orderDetails.selectItemsToRefund"));
    return;
  }
  
  setIsRefunding(true);
  try {
    const result = await refundOrder(orderId, refundItems);
    
    // Show success message
    setRefundSuccess(result.message);
    
    // Refresh order data after refund
    console.log(`[OrderDetails] Order refunded, refreshing data...`);
    const order = await fetchOrderDetails(orderId, isEnglish);
    const orderDataMapped = mapOrderToUiModel(order);
    setOrderData(orderDataMapped);
    
    // Close refund dialog
    setOpenRefundDialog(false);
    
    // Reset selected items
    setSelectedItems({});
  } catch (err) {
    console.error("[OrderDetails] Error refunding order:", err);
    setError(err instanceof Error ? err.message : t("orderDetails.refundError"));
  } finally {
    setIsRefunding(false);
  }
};

// Update the toggleItemSelection function
const toggleItemSelection = (itemId: string, refundableQuantity: number) => {
  setSelectedItems(prev => {
    const currentValue = prev[itemId] || 0;
    const newValue = currentValue === 0 ? refundableQuantity : 0;
    
    return { 
      ...prev, 
      [itemId]: newValue 
    };
  });
};

// Update the updateItemQuantity function
const updateItemQuantity = (itemId: string, quantity: number, refundableQuantity: number) => {
  if (quantity < 0 || quantity > refundableQuantity) return;
  
  setSelectedItems(prev => ({
    ...prev,
    [itemId]: quantity
  }));
};

  if (loading) {
    return (
      <div className="container mx-auto mt-8 md:mt-16 px-4">
        <Breadcrumb />
        <Category SectionName={t("orderDetails.title")} mdMyValue={"md:my-2"} />
        <LoadingSkeleton variant="order" />
      </div>
    );
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!orderData) {
    return <div className="text-center mt-10 text-wine">{t("orderDetails.notFound")}</div>;
  }

  const {
    orderNumber,
    orderDate,
    estimatedDelivery,
    steps,
    items,
    payment,
    delivery,
    summary,
    total,
    isCancelled = false // Default to false if not present
  } = orderData;

  const activeStepIndex = steps.findIndex((step) => !step.completed);
  const activeStep = activeStepIndex === -1 ? steps.length - 1 : activeStepIndex;

  return (
    <div className="container mx-auto mt-8 md:mt-16 px-4">
      <Breadcrumb />

      {/* Divider */}
      <Category SectionName={t("orderDetails.title")} mdMyValue={"md:my-2"} />

      {/* Cancelled Order Banner */}
      {isCancelled && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 mx-2 md:mx-20 rounded-md shadow-md">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 00-1.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="font-bold">{t("orderDetails.cancelledTitle")}</p>
          </div>
          <p className="text-sm mt-2">{t("orderDetails.cancelledDescription")}</p>
        </div>
      )}

      <div className={`mx-2 md:mx-20 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="flex flex-col w-full">
          {/* Order ID and Return Button */}
          <div className="flex flex-col md:flex-row justify-between gap-4 my-2 items-center">
            <h2 className="text-xl md:text-2xl font-semibold font-playfair text-wine">
              {t("orderDetails.orderNumber")}: <span className="font-normal">#{orderNumber}</span>
            </h2>
            {/* Replace the Return/Cancel button */}
            {isCancelled ? (
              <button 
                disabled 
                className="bg-gray-400 text-mainColor font-playfair px-8 py-2 rounded-md text-lg md:text-xl cursor-not-allowed opacity-70"
              >
                {t("orderDetails.cancelled")}
              </button>
            ) : orderData.steps.some(step => 'isCancelled' in step && step.isCancelled) ? (
              <button 
                disabled 
                className="bg-gray-400 text-mainColor font-playfair px-8 py-2 rounded-md text-lg md:text-xl cursor-not-allowed opacity-70"
              >
                {t("orderDetails.cancelled")}
              </button>
            ) : orderData.steps.find(step => step.label === t("orderDetails.steps.delivered"))?.completed ? (
              // Check if any items can be refunded
              orderData.items.some(item => item.quantity > item.quantityRefunded) ? (
                // Order is delivered and has refundable items - show Refund button
                <button 
                  className="bg-wine text-mainColor font-playfair px-8 py-2 rounded-md hover:bg-ForthColor text-lg md:text-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={() => setOpenRefundDialog(true)}
                  disabled={isRefunding}
                >
                  {isRefunding ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("common.processing")}
                    </span>
                  ) : (
                    t("orderDetails.refund")
                  )}
                </button>
              ) : (
                // All items already refunded - show disabled button
                <button 
                  disabled 
                  className="bg-gray-400 text-mainColor font-playfair px-8 py-2 rounded-md text-lg md:text-xl cursor-not-allowed opacity-70"
                >
                  {t("orderDetails.fullyRefunded")}
                </button>
              )
            ) : (
              // Order is still in progress - show Cancel button
              <button 
                className="bg-wine text-mainColor font-playfair px-8 py-2 rounded-md hover:bg-ForthColor text-lg md:text-xl disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={() => setOpenConfirmDialog(true)}
                disabled={isCancelling}
              >
                {isCancelling ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("common.processing")}
                  </span>
                ) : (
                  t("orderDetails.cancel")
                )}
              </button>
            )}
          </div>

          {/* Order Status */}
          <div className="flex flex-wrap gap-4 w-full my-4 items-center border-b-2 border-ForthColor/50 pb-8">
            <p className="text-ForthColor font-Poppins text-xs md:text-xl font-medium">
              {t("orderDetails.orderDate")}: <span className="text-wine">{orderDate}</span>
            </p>
            
            {isCancelled ? (
              <>
                <span className="text-red-500 font-Poppins text-base md:text-xl font-medium">|</span>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293-1.293a1 1 00-1.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-500 font-Poppins text-xs md:text-xl font-medium">
                    {t("orderDetails.cancelled")}
                  </p>
                </div>
              </>
            ) : (
              <>
                <span className="text-green font-Poppins text-base md:text-xl font-medium">|</span>
                <img src={truck} alt={t("orderDetails.delivery")} className="w-6 h-6" />
                <p className="text-green font-Poppins text-xs md:text-xl font-medium">
                  {t("orderDetails.estimatedDelivery")}: {estimatedDelivery}
                </p>
              </>
            )}
          </div>
          
        </div>

        {/* Timeline using Material-UI Stepper */}
        <div className="flex justify-center my-2 items-center overflow-x-auto no-scrollbar">
          <Box
            sx={{
              width: '100%',
              maxWidth: "1000px",
              padding: { xs: 1, sm: 2 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              connector={isCancelled ? <CancelledStepConnector /> : <CustomStepConnector />}
              sx={{ 
                minWidth: { xs: steps.length * 120, sm: steps.length * 150 },
                '& .MuiStepLabel-label': {
                  direction: isRTL ? 'rtl' : 'ltr'
                }
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <CustomStepLabel>
                    <div style={{ 
                      textAlign: "center",
                      direction: isRTL ? 'rtl' : 'ltr'
                    }}>
                      <span
                        style={{
                          display: "block",
                          color:
                            ('isCancelled' in step && step.isCancelled) ? "#E53935" :
                            index < activeStep ? "#721013" :
                            index === activeStep ? "#721013" : 
                            "#A78E78",
                          fontFamily: "Playfair Display, serif",
                          fontSize: "0.75rem",
                          fontWeight: index === activeStep ? "500" : "normal",
                        }}
                      >
                        {step.label}
                      </span>
                      <span
                        style={{
                          display: "block",
                          color:
                            ('isCancelled' in step && step.isCancelled) ? "#E53935" :
                            index < activeStep ? "#721013" : 
                            index === activeStep ? "#721013" : 
                            "#A78E78",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.7rem",
                          marginTop: "4px"
                        }}
                      >
                        {step.date}
                      </span>
                    </div>
                  </CustomStepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>

        {/* Items List */}
        <div className="mb-8 space-y-4">
          {items.map((item, index) => (
            <div key={index} className={`flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-ForthColor/30 last:border-b-0 `}>
              <div className={`flex items-center  gap-4`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/96";
                  }}
                />
                <div className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
                  <Link 
                    to={`/product/${item.id}`}
                    className="group hover:text-sixColor transition-colors"
                  >
                    <h4 className="font-semibold text-wine font-playfair text-sm sm:text-lg">
                      {item.name}
                    </h4>
                  </Link>
                  <p className="text-ForthColor text-xs sm:text-base font-Poppins mt-1">
                    {item.details}
                  </p>
                  <div className="sm:hidden mt-2">
                    <p className="text-wine font-semibold text-sm">{item.price}</p>
                    <p className="text-ForthColor text-xs">
                      {t("orderDetails.qty")}: {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <div className={`hidden sm:block ${isRTL ? 'text-left' : 'text-right'}`}>
                <p className="text-wine font-semibold text-base sm:text-lg">{item.price}</p>
                <p className="text-ForthColor text-sm sm:text-base font-Poppins">
                  {t("orderDetails.qty")}: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment and Delivery Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg md:text-xl font-Poppins font-semibold text-wine">
              {t("orderDetails.payment")}
            </h3>
            <p className="text-ForthColor text-xs md:text-base font-Poppins flex items-center">
              {payment.method} {payment.lastFourDigits}
              {payment.icon && (
                <img src={payment.icon} alt={payment.method} className="ml-2" />
              )}
            </p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-Poppins font-semibold text-wine">
              {t("orderDetails.delivery")}
            </h3>
            <p className="text-ForthColor text-base md:text-lg font-Poppins">
              {delivery.address}
            </p>
            {delivery.flatNumber && delivery.floorNumber && (
              <p className="text-ForthColor text-base md:text-lg font-Poppins">
                {t("orderDetails.flat")} {delivery.flatNumber}, {t("orderDetails.floor")} {delivery.floorNumber}
              </p>
            )}
            <p className="text-ForthColor text-base md:text-lg font-Poppins">
              {delivery.city}
            </p>
            <p className="text-ForthColor text-base md:text-lg font-Poppins">
              {t("orderDetails.phone")}: {delivery.phone}
            </p>
            {delivery.additionalDirections && (
              <p className="text-ForthColor text-base md:text-lg font-Poppins">
                {delivery.additionalDirections}
              </p>
            )}
            <div className="border-t border-ForthColor mt-4 pt-2">
              <h3 className="text-lg md:text-xl font-Poppins font-semibold text-wine">
                {t("orderDetails.orderSummary")}
              </h3>
              {summary.map((item, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <p className="text-ForthColor text-base md:text-lg font-Poppins">
                    {item.label}
                  </p>
                  <p className="text-ForthColor text-base md:text-lg font-Poppins">
                    {item.value}
                  </p>
                </div>
              ))}
              <div className="flex justify-between border-ForthColor border-t border-dotted mt-4 pt-2">
                <p className="text-lg md:text-xl font-Poppins font-semibold text-wine">
                  {t("orderDetails.total")}
                </p>
                <p className="text-ForthColor text-base md:text-lg font-Poppins">
                  {total}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="text-wine font-playfair">
          {t("orderDetails.confirmCancelTitle")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="text-ForthColor font-Poppins">
            {t("orderDetails.confirmCancelMessage")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button 
            className="px-4 py-2 text-ForthColor hover:bg-gray-100 rounded-md transition-colors font-Poppins"
            onClick={() => setOpenConfirmDialog(false)}
          >
            {t("common.no")}
          </button>
          <button 
            className="px-4 py-2 bg-wine text-white rounded-md hover:bg-wine/80 transition-colors font-Poppins"
            onClick={handleCancelOrder}
            disabled={isCancelling}
          >
            {isCancelling ? t("common.processing") : t("common.yes")}
          </button>
        </DialogActions>
      </Dialog>
      {/* Refund Dialog */}
      <Dialog
        open={openRefundDialog}
        onClose={() => {
          if (!isRefunding) setOpenRefundDialog(false);
        }}
        aria-labelledby="refund-dialog-title"
        aria-describedby="refund-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="refund-dialog-title" className="text-wine font-playfair">
          {t("orderDetails.refundTitle")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="refund-dialog-description" className="text-ForthColor font-Poppins mb-4">
            {t("orderDetails.refundInstructions")}
          </DialogContentText>
          
          {/* Refund success message */}
          {refundSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md">
              <p className="font-bold">{t("orderDetails.refundSuccess")}</p>
              <p>{refundSuccess}</p>
            </div>
          )}
          
          {/* Show message if no refundable items */}
          {!items.some(item => item.quantity > item.quantityRefunded) && (
            <div className="text-center py-8 text-ForthColor">
              {t("orderDetails.noRefundableItems")}
            </div>
          )}
          
          {/* Items for refund */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {items.map((item, index) => {
              const itemId = item.id || `item-${index}`;
              const refundableQuantity = item.quantity - item.quantityRefunded; // Calculate refundable quantity
              const selectedQuantity = selectedItems[itemId] || 0;
              
              // Skip items that are fully refunded
              if (refundableQuantity <= 0) {
                return (
                  <div key={index} className="flex items-center border-b pb-4 opacity-50">
                    <div className="flex flex-1 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/64";
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-wine font-playfair">{item.name}</h4>
                        <p className="text-ForthColor text-sm font-Poppins">{item.details}</p>
                        <p className="text-wine">{item.price}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-red-500 font-medium">
                          {t("orderDetails.fullyRefunded")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={index} className="flex items-center border-b pb-4">
                  <Checkbox 
                    checked={selectedQuantity > 0}
                    onChange={() => toggleItemSelection(itemId, refundableQuantity)}
                    className="mr-2"
                  />
                  <div className="flex flex-1 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/64";
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-wine font-playfair">{item.name}</h4>
                      <p className="text-ForthColor text-sm font-Poppins">{item.details}</p>
                      <p className="text-wine">{item.price}</p>
                      {item.quantityRefunded > 0 && (
                        <p className="text-amber-600 text-sm">
                          {t("orderDetails.partiallyRefunded", { count: item.quantityRefunded })}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-ForthColor mr-2">{t("orderDetails.quantity")}:</span>
                      <div className="flex border rounded">
                        <button
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                          onClick={() => updateItemQuantity(itemId, selectedQuantity - 1, refundableQuantity)}
                          disabled={selectedQuantity <= 0}
                        >
                          -
                        </button>
                        <span className="px-4 py-1">{selectedQuantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                          onClick={() => updateItemQuantity(itemId, selectedQuantity + 1, refundableQuantity)}
                          disabled={selectedQuantity >= refundableQuantity}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-ForthColor ml-2">/ {refundableQuantity}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <button 
            className="px-4 py-2 text-ForthColor hover:bg-gray-100 rounded-md transition-colors font-Poppins"
            onClick={() => setOpenRefundDialog(false)}
            disabled={isRefunding}
          >
            {t("common.cancel")}
          </button>
          <button 
            className="px-4 py-2 bg-wine text-white rounded-md hover:bg-wine/80 transition-colors font-Poppins"
            onClick={handleRefundOrder}
            disabled={isRefunding || Object.values(selectedItems).every(qty => qty === 0)}
          >
            {isRefunding ? t("common.processing") : t("orderDetails.submitRefund")}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderDetails;