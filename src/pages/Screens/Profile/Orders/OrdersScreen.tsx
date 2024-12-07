import React from "react";
import noOrder from "@assets/noorders.svg";
import { orders } from "@data/orders";

const OrdersScreen: React.FC = () => {
  return (
    <div className="flex flex-col mt-8 md:mt-16 justify-center">
      <h1 className="text-2xl font-semibold text-wine font-playfair md:self-start mx-auto md:mx-0">
        Order History
      </h1>
      <p className="text-ForthColor font-playfair text-xl mb-4 md:self-start mx-auto md:mx-0">
        Track your order
      </p>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center mt-8">
          <img src={noOrder} alt="No orders" className="w-70 h-auto" />
          <p className="mt-4 text-xl font-semibold text-ForthColor font-playfair">
            You have not placed any orders yet
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-wine text-base font-playfair">
                <th className="p-2 border-b border-tableDivider">
                  Order Number
                </th>
                <th className="p-2 border-b border-tableDivider">Total</th>
                <th className="p-2 border-b border-tableDivider">Date</th>
                <th className="p-2 border-b border-tableDivider">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="text-sm h-14 text-wine font-Poppins cursor-pointer">
                  <td className="p-2 border-b border-tableDivider">
                    {order.orderNumber}
                  </td>
                  <td className="p-2 border-b border-tableDivider">
                    {order.total}
                  </td>
                  <td className="p-2 border-b border-tableDivider">
                    {order.date}
                  </td>
                  <td className="p-2 border-b border-tableDivider">
                    <span
                      className={`flex items-center ${
                        order.status === "Active"
                          ? "text-green"
                          : "text-ForthColor"
                      }`}
                    >
                      {order.status}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-4 h-4 ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersScreen;
