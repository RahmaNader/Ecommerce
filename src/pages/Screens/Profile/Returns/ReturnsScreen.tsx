import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Breadcrumb } from "@components/molecules";
import { Category, ErrorAlert } from "@components/atoms";
import { fetchRefundedOrders, RefundedItem } from "@services/api/refundOrder";
import { fetchProductImages } from "@services/api/fetchProductImages";
import { Link } from "react-router-dom";
import { LoadingSkeleton } from "@components/molecules";

const ReturnScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const isEnglish = !isRTL;

  const [refundedItems, setRefundedItems] = useState<RefundedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<Record<number, string>>({});

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

  const loadProductImage = async (productId: number) => {
    try {
      const imageData = await fetchProductImages(productId);
      if (imageData) {
        setProductImages(prev => ({
          ...prev,
          [productId]: imageData.imageUrl
        }));
      }
    } catch (error) {
      console.error(`[Returns] Error fetching image for product ${productId}:`, error);
    }
  };

  useEffect(() => {
    const loadRefundedOrders = async () => {
      try {
        const items = await fetchRefundedOrders(isEnglish);
        setRefundedItems(items);
        
        // Fetch images for all items
        items.forEach(item => {
          loadProductImage(item.productId);
        });
        
        setError(null);
      } catch (err) {
        console.error("[Returns] Error fetching refunded orders:", err);
        setError(err instanceof Error ? err.message : t("returns.loadError"));
      } finally {
        setLoading(false);
      }
    };

    loadRefundedOrders();
  }, [isEnglish, t]);

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (loading) {
    return (
      <div className="container mx-auto mt-8 md:mt-16 px-4">
        <Breadcrumb />
        <Category SectionName={t("returns.title")} mdMyValue={"md:my-2"} />
        <LoadingSkeleton variant="return" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 md:mt-16 px-4">
      <Breadcrumb />
      <Category SectionName={t("returns.title")} mdMyValue={"md:my-2"} />

      {refundedItems.length === 0 ? (
        <div className="text-center mt-10 text-wine font-playfair">
          {t("returns.noRefunds")}
        </div>
      ) : (
        <div className="mx-2 md:mx-20">
          {refundedItems.map((item, index) => (
            <div 
              key={`${item.orderItemId}-${index}`}
              className="border-b border-ForthColor/30 py-4 first:pt-0 last:border-b-0"
            >
              {/* Main content container */}
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                  <img
                    src={productImages[item.productId] || item.firstProductImageUrl}
                    alt={item.productName}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/96";
                    }}
                  />
                </div>

                {/* Details container */}
                <div className="flex-1">
                  {/* Top section: Title and Price */}
                  <div className="flex justify-between items-start mb-2">
                    <Link 
                      to={`/product-details/${item.productId}`}
                      className="group"
                    >
                      <h3 className="text-sm sm:text-lg font-playfair text-wine group-hover:text-sixColor transition-colors">
                        {item.productName}
                      </h3>
                    </Link>
                    <div className="text-end">
                      <p className="text-wine font-medium text-sm sm:text-base">
                        {formatCurrency(item.unitPrice)}
                      </p>
                      <p className="text-ForthColor text-xs sm:text-sm">
                        {t("returns.quantity")}: {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Bottom section: Order details */}
                  <div className="flex flex-col text-xs sm:text-sm space-y-1">
                    <p className="text-ForthColor">
                      {t("returns.orderId")}: <span className="text-wine">{item.orderId}</span>
                    </p>
                    <p className="text-ForthColor">
                      {t("returns.refundConfirmed")}: <span className="text-wine">{formatDate(item.refundConfirmed)}</span>
                    </p>
                    <p className="text-ForthColor">
                      {item.productColor} | {item.productSize}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReturnScreen;