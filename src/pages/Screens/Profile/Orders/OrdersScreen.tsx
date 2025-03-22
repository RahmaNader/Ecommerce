import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noOrder from "@assets/noorders.svg";
import { fetchUserOrders } from "@services/api/fetchOrders";
import { UserOrder } from "@types";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { ErrorAlert} from "@components/atoms";
import { getOrderStatusText } from "@utils/OrderDetails";
import { LoadingSkeleton } from "@components/molecules";

const OrdersScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const isEnglish = !isRTL;

  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const userOrders = await fetchUserOrders(isEnglish);
        setOrders(userOrders);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [isEnglish]);

  const handleRowClick = (orderId: string) => {
    navigate(`/order-details/${orderId}`);
  };

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

  if (loading) {
    return (
      <div className="container mx-auto mt-8 md:mt-16 px-4">
        <h1 className="text-2xl font-semibold text-wine font-playfair md:self-start mx-auto md:mx-0">
          {t("orders.orderHistory")}
        </h1>
        <LoadingSkeleton variant="order" />
      </div>
    );
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

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
        <div className="overflow-x-auto rtl:md:self-stretch">
          <table className={`w-full border-collapse ${isRTL ? 'text-right' : 'text-left'}`}>
            <thead>
              <tr className={`text-wine text-base font-playfair`}>
                <th className="p-2 border-b border-tableDivider">{t("orders.orderNumber")}</th>
                <th className="p-2 border-b border-tableDivider">{t("orders.total")}</th>
                <th className="p-2 border-b border-tableDivider">{t("orders.date")}</th>
                <th className="p-2 border-b border-tableDivider">{t("orders.status")}</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="text-sm h-14 text-wine font-Poppins cursor-pointer hover:bg-ForthColor/10 transition"
                  onClick={() => handleRowClick(order.orderId)}
                >
                  <td className="p-2 border-b border-tableDivider">
                    #{order.orderNumber}
                  </td>
                  <td className="p-2 border-b border-tableDivider">
                    {order.total} EGP
                  </td>
                  <td className="p-2 border-b border-tableDivider">
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="p-2 border-b border-tableDivider">
                    <span
                      className={`flex items-center ${
                        order.status < 5 ? "text-green" : "text-ForthColor"
                      } `}
                    >
                      {t(`orders.status_${getOrderStatusText(order.status).toLowerCase().replace(/\s+/g, '_')}`)}
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
