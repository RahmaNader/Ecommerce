import React, { useState, useEffect } from "react";
import Img1 from "@assets/HP_img1.jpeg";
import visaLogo from "@assets/visa.svg";
import truck from "@assets/truck.svg";
import { Breadcrumb } from "@components/molecules";
import { Category } from "@components/atoms";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

interface OrderData {
  orderId: string;
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
  delivery: { address: string; city: string; phone: string };
  summary: { label: string; value: string }[];
  total: string;
}

const fallbackImage = Img1;

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
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      const mockData: OrderData = {
        orderId: "15456", // Hardcoded Order ID
        orderDate: "Feb 16, 2022",
        estimatedDelivery: "May 16, 2022",
        steps: [
          { label: "Order Confirmed", date: "Wed, 11th Jan", completed: true },
          { label: "Shipped", date: "Wed, 11th Jan", completed: true },
          { label: "Out For Delivery", date: "Wed, 11th Jan", completed: true },
          {
            label: "Delivered",
            date: "Expected by Mon, 16th",
            completed: false,
          },
        ],
        items: [
          {
            name: "Leather Jacket",
            details: "Brown | Small",
            price: "200EGP",
            quantity: 5,
            image: Img1,
          },
          {
            name: "One Life Graphic T-shirt",
            details: "Black | Small",
            price: "200EGP",
            quantity: 2,
            image: Img1,
          },
          {
            name: "Classic Jacket",
            details: "Yellow | Medium",
            price: "200EGP",
            quantity: 1,
            image: Img1,
          },
        ],
        payment: {
          method: "Visa",
          lastFourDigits: "5656",
          icon: visaLogo,
        },
        delivery: {
          address: "847 Jewess Bridge Apt.",
          city: "174 London, UK",
          phone: "474-769-3919",
        },
        summary: [
          { label: "Discount", value: "180 EGP" },
          { label: "Discount (20%)", value: "20 EGP" },
          { label: "Delivery", value: "20 EGP" },
          { label: "Tax", value: "14 EGP" },
        ],
        total: "214 EGP",
      };

      setOrderData(mockData);
      setLoading(false);
    };

    fetchOrderData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-wine">Loading...</div>;
  }

  if (!orderData) {
    return <div className="text-center mt-10 text-wine">Order not found.</div>;
  }

  const {
    orderDate,
    estimatedDelivery,
    steps,
    items,
    payment,
    delivery,
    summary,
    orderId,
  } = orderData;

  const activeStepIndex = steps.findIndex((step) => !step.completed);
  const activeStep =
    activeStepIndex === -1 ? steps.length - 1 : activeStepIndex;

  return (
    <div className="container mx-auto mt-8 md:mt-16 px-4">
      <Breadcrumb />

      {/* Divider */}
      <Category SectionName={"Order Details"} mdMyValue={"md:my-2"} />

      <div className="mx-2 md:mx-20">
        <div className="flex flex-col w-full">
          {/* Order ID and Return Button */}
          <div className="flex flex-col md:flex-row justify-between gap-4 my-2 items-center">
            <h2 className="text-xl md:text-2xl font-semibold font-playfair text-wine">
              Order ID: <span className="font-normal">{orderId}</span>
            </h2>
            <button className="bg-wine text-mainColor font-playfair px-8 py-2 rounded-md hover:bg-ForthColor text-lg md:text-xl">
              Return
            </button>
          </div>

          {/* Order Status */}
          <div className="flex flex-row gap-4 w-full my-4 items-center  border-b-2 border-ForthColor/50 pb-8">
            <p className="text-ForthColor font-Poppins text-xs md:text-xl font-medium">
              Order date: <span className="text-wine">{orderDate}</span>
            </p>
            <span className="text-green font-Poppins text-base md:text-xl font-medium">
              |
            </span>
            <img src={truck} alt="Truck Icon" className="w-6 h-6" />
            <p className="text-green font-Poppins text-xs md:text-xl font-medium">
              Estimated delivery: {estimatedDelivery}
            </p>
          </div>
        </div>

        {/* Timeline using Material-UI Stepper */}
        <div className="flex justify-center my-2 items-center">
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
                  src={item.image || fallbackImage}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
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
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment and Delivery Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg md:text-xl font-Poppins font-semibold text-wine">
              Payment
            </h3>
            <p className="text-ForthColor text-xs md:text-base font-Poppins flex items-center">
              {payment.method} *{payment.lastFourDigits}
              {payment.icon && (
                <img src={payment.icon} alt={payment.method} className="ml-2" />
              )}
            </p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-Poppins font-semibold text-wine">
              Delivery
            </h3>
            <p className="text-ForthColor text-base md:text-lg font-Poppins">
              {delivery.address}
            </p>
            <p className="text-ForthColor text-base md:text-lg font-Poppins">
              {delivery.city}
            </p>
            <p className="text-ForthColor text-base md:text-lg font-Poppins">
              {delivery.phone}
            </p>
            <div className="border-t border-ForthColor mt-4 pt-2">
              <h3 className="text-lg md:text-xl font-Poppins font-semibold text-wine">
                Order Summary
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
                  Total
                </p>
                <p className="text-ForthColor text-base md:text-lg font-Poppins">
                  {orderData.total || "N/A"}
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
