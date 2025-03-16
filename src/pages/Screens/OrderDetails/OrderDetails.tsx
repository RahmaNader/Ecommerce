import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

interface OrderData {
  orderId: string;
  orderNumber: number;
  orderDate: string;
  estimatedDelivery: string;
  steps: { label: string; date: string; completed: boolean }[];
  items: {
    name: string;
    details: string;
    price: string;
    quantity: number;
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
}

const CustomStepConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
  },
  [`&.${stepConnectorClasses.line}`]: {
    height: 10,
    backgroundColor: "#A78E78",
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
        console.log(`[OrderDetails] Fetching order: ${orderId}`);
        const order = await fetchOrderDetails(orderId, isEnglish);
        
        // Map the API response to our component's data structure
        const orderDataMapped = mapOrderToUiModel(order);
        setOrderData(orderDataMapped);
        setError(null);
      } catch (err) {
        console.error("[OrderDetails] Error fetching order:", err);
        setError(err instanceof Error ? err.message : t("orderDetails.loadError"));
      } 
    };

    fetchOrder();
  }, [orderId, isEnglish, t]);

  // Map API response to UI model
  const mapOrderToUiModel = (order: UserOrder): OrderData => {
    // Generate order steps based on dates and status
    const steps = [
      { 
        label: t("orderDetails.steps.confirmed"), 
        date: formatDate(order.orderDate), 
        completed: true 
      },
    ];
    
    // Add pre-production step if applicable
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
    
    // Create items array from order items
    const items = order.orderItems.$values.map(item => ({
      name: item.productName || t("orderDetails.unknownProduct"),
      details: `${item.productColor || ''} | ${item.productSize || ''}`,
      price: formatCurrency(item.unitPrice),
      quantity: item.quantity,
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
      total: formatCurrency(order.total)
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
    total
  } = orderData;

  const activeStepIndex = steps.findIndex((step) => !step.completed);
  const activeStep = activeStepIndex === -1 ? steps.length - 1 : activeStepIndex;

  return (
    <div className="container mx-auto mt-8 md:mt-16 px-4">
      <Breadcrumb />

      {/* Divider */}
      <Category SectionName={t("orderDetails.title")} mdMyValue={"md:my-2"} />

      <div className={`mx-2 md:mx-20 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="flex flex-col w-full">
          {/* Order ID and Return Button */}
          <div className="flex flex-col md:flex-row justify-between gap-4 my-2 items-center">
            <h2 className="text-xl md:text-2xl font-semibold font-playfair text-wine">
              {t("orderDetails.orderNumber")}: <span className="font-normal">#{orderNumber}</span>
            </h2>
            <button className="bg-wine text-mainColor font-playfair px-8 py-2 rounded-md hover:bg-ForthColor text-lg md:text-xl">
              {t("orderDetails.return")}
            </button>
          </div>

          {/* Order Status */}
          <div className="flex flex-row gap-4 w-full my-4 items-center border-b-2 border-ForthColor/50 pb-8">
            <p className="text-ForthColor font-Poppins text-xs md:text-xl font-medium">
              {t("orderDetails.orderDate")}: <span className="text-wine">{orderDate}</span>
            </p>
            <span className="text-green font-Poppins text-base md:text-xl font-medium">
              |
            </span>
            <img src={truck} alt={t("orderDetails.delivery")} className="w-6 h-6" />
            <p className="text-green font-Poppins text-xs md:text-xl font-medium">
              {t("orderDetails.estimatedDelivery")}: {estimatedDelivery}
            </p>
          </div>
          
        </div>

        {/* Timeline using Material-UI Stepper */}
        <div className="flex justify-center my-2 items-center overflow-x-auto">
          <Box
            sx={{
              width: { sm: "90%", md: "100%" },
              maxWidth: "1000px",
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              connector={<CustomStepConnector />}
              sx={{ minWidth: steps.length * 150 }}
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <CustomStepLabel>
                    <div style={{ textAlign: "center" }}>
                      <span
                        style={{
                          display: "block",
                          color:
                            index < activeStep
                              ? "#721013"
                              : index === activeStep
                              ? "#721013"
                              : "#A78E78",
                          fontFamily: "Playfair Display, serif",
                          fontSize: "0.8rem",
                          fontWeight: index === activeStep ? "500" : "normal",
                        }}
                      >
                        {step.label}
                      </span>
                      <span
                        style={{
                          display: "block",
                          color:
                            index < activeStep
                              ? "#721013"
                              : index === activeStep
                              ? "#721013"
                              : "#A78E78",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.875rem",
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
        <div className="mb-8">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/64";
                  }}
                />
                <div>
                  <h4 className="font-semibold text-wine font-playfair text-xs md:text-xl">
                    {item.name}
                  </h4>
                  <p className="text-ForthColor text-xs md:text-lg font-Poppins">
                    {item.details}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-wine font-semibold text-xs md:text-lg">{item.price}</p>
                <p className="text-ForthColor text-sm md:text-base font-Poppins">
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
    </div>
  );
};

export default OrderDetails;