import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Img1 from "@assets/HP_img1.jpeg";
import visaLogo from "@assets/visa.svg";
import truck from "@assets/truck.svg";
import { Breadcrumb } from "@components/molecules";
import { Category } from "@components/atoms";
import Stepper from "react-stepper-horizontal";

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
}

const fallbackImage = Img1;

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(false);

      const mockData: OrderData = {
        orderId: orderId || "Unknown",
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
            details: "Yellow | Meduim",
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
          { label: "Total", value: "214 EGP" },
        ],
      };

      setOrderData(mockData);
      setLoading(false);
    };

    fetchOrderData();
  }, [orderId]);

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
  } = orderData;

  const activeStepIndex = steps.findIndex((step) => !step.completed);
  let activeStep;
  if (activeStepIndex === steps.length - 1) {
    activeStep = steps.length - 2 >= 0 ? steps.length - 2 : 0;
  } else {
    activeStep = activeStepIndex === -1 ? steps.length - 1 : activeStepIndex;
  }

  return (
    <div className="container mx-auto mt-8 md:mt-16 px-4">
      <Breadcrumb />

      {/* Divider */}
      <Category SectionName={"Order Details"} mdMyValue={"md:my-2"} />

      <div className="mx-2 md:mx-20">
        
        <div className="flex flex-col w-full">
          {/* Order ID and Return Button */}
          <div className="flex felx-row justify-between my-4 items-center">
            <h2 className="text-2xl font-semibold font-Poppins text-wine">
              Order ID: <span className="font-normal">#33546</span>
            </h2>

            <button className="bg-wine text-mainColor font-playfair px-8 py-2 rounded-md hover:bg-ForthColor text-xl">
              Return
            </button>
          </div>

          {/* Order Status */}
          <div className="flex felx-row gap-4 w-full my-4 items-center">
            <p className="text-ForthColor font-Poppins text-xl font-medium">
              Order date: <span className="text-wine">{orderDate}</span>
            </p>
            <span className="text-green font-Poppins text-xl font-medium">
              |
            </span>
            <img src={truck} alt="Truck Icon" className="w-6 h-6" />
            <p className="text-green font-Poppins text-xl font-medium">
              Estimated delivery: {estimatedDelivery}
            </p>
          </div>
        </div>

        {/* Timeline using react-stepper-horizontal */}
        <div className="my-8 items-center">
          <Stepper
            steps={steps.map((step) => ({
              title: step.label,
              subtitle: step.date,
            }))}
            activeStep={activeStep}
            size={30}
            circleFontSize={12}
            titleFontSize={14}
            defaultColor="#A78E78"
            defaultTitleColor="#A78E78"
            completeBarColor="#721013"
            completeColor="#721013"
            activeColor="#721013"
            activeTitleColor="#721013"
            completeTitleColor="#721013"
            barStyle="solid"
          />
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
                  <h4 className="font-semibold text-wine font-playfair text-xl">
                    {item.name}
                  </h4>
                  <p className="text-ForthColor text-lg font-Poppins">
                    {item.details}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-wine font-semibold text-lg">{item.price}</p>
                <p className="text-ForthColor text-base">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment and Delivery Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div>
            <h3 className="text-xl font-Poppins font-semibold text-wine">Payment</h3>
            <p className="text-ForthColor text-base font-Poppins flex items-center">
              {payment.method} *{payment.lastFourDigits}
              {payment.icon && (
                <img src={payment.icon} alt={payment.method} className="ml-2" />
              )}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-Poppins font-semibold text-wine">Delivery</h3>
            <p className="text-wine">{delivery.address}</p>
            <p className="text-wine">{delivery.city}</p>
            <p className="text-wine">{delivery.phone}</p>
            {/* Order Summary */}
            <div className="border-t border-ForthColor mt-4 pt-2">
              <h3 className="text-xl font-Poppins font-semibold text-wine">
                Order Summary
              </h3>
              {summary.map((item, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <p className="text-wine">{item.label}</p>
                  <p className="text-wine">{item.value}</p>
                </div>
              ))}
              <div className="flex justify-between font-semibold border-ForthColor border-t border-dotted mt-4 pt-2">
                <p className="text-wine">Total</p>
                <p className="text-wine">
                  {summary.find((s) => s.label === "Total")?.value || "N/A"}
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
