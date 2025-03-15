import React from "react";
import { useNavigate } from "react-router-dom";
import noOrder from "@assets/noorders.svg";
import { orders } from "@data/orders";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/useLanguage";

const OrdersScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === "ar";

  const handleRowClick = () => {
    navigate(`/order-details`);
  };

  // Function to translate order status
  const getTranslatedStatus = (status: string) => {
    return t(`orders.status_${status.toLowerCase().replace(/\s+/g, '_')}`);
  };

  return (
    <div className={`flex flex-col mt-8 md:mt-16 justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
      <h1 className="text-2xl font-semibold text-wine font-playfair md:self-start mx-auto md:mx-0">
        {t("orders.orderHistory")}
      </h1>
      <p className="text-ForthColor font-playfair text-xl mb-4 md:self-start mx-auto md:mx-0">
        {t("orders.trackOrder")}
      </p>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center mt-8">
          <img src={noOrder} alt={t("orders.noOrders")} className="w-70 h-auto" />
          <p className="mt-4 text-xl font-semibold text-ForthColor font-playfair">
            {t("orders.noOrdersPlaced")}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rtl:md:self-stretch ">
          <table className={`w-full border-collapse ${isRTL ? 'text-right' : 'text-left'}`}>
            <thead>
              <tr className={`${isRTL ? 'text-right' : 'text-left'} text-wine text-base font-playfair`}>
                <th className="p-2 border-b border-tableDivider">
                  {t("orders.orderNumber")}
                </th>
                <th className="p-2 border-b border-tableDivider">{t("orders.total")}</th>
                <th className="p-2 border-b border-tableDivider">{t("orders.date")}</th>
                <th className="p-2 border-b border-tableDivider">{t("orders.status")}</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="text-sm h-14 text-wine font-Poppins cursor-pointer transition"
                  onClick={() => handleRowClick()}
                >
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
                      } `}
                    >
                      {getTranslatedStatus(order.status)}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className={`w-4 h-4 ${isRTL ? 'ml-1' : 'ml-1'}`}
                        style={{ 
                          transform: isRTL ? 'rotate(180deg)' : 'none',
                          margin: isRTL ? '0 0.25rem 0 0' : '0 0 0 0.25rem'
                        }}
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
