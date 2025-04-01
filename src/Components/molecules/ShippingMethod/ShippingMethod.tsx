import { ToggleRadioButton } from "@components/atoms";
import { useTranslation } from "react-i18next";
import { format, addDays } from "date-fns";
import { arEG, enUS } from "date-fns/locale";

interface ShippingMethodProps {
  selectedShippingMethod: string;
  onShippingMethodChange: (method: string) => void;
  isArabic?: boolean;
}

const ShippingMethod: React.FC<ShippingMethodProps> = ({
  selectedShippingMethod,
  onShippingMethodChange,
  isArabic = false,
}: ShippingMethodProps) => {
  const { t, i18n } = useTranslation();
  
  const today = new Date();
  const regularDeliveryDate = addDays(today, 5);
  const fastDeliveryDate = addDays(today, 2);
  
  const locale = isArabic || i18n.language === 'ar' ? arEG : enUS;
  const dateFormat = isArabic || i18n.language === 'ar' ? "d MMMM، yyyy" : "d MMM, yyyy";
  
  const formattedRegularDate = format(regularDeliveryDate, dateFormat, { locale });
  const formattedFastDate = format(fastDeliveryDate, dateFormat, { locale });

  return (
    <div className={`py-8 w-full ${isArabic ? 'rtl' : 'ltr'}`}>
      <h2 className="text-xl font-semibold text-wine">
        {t("shipping.title")}
      </h2>

      {/* Delivery Regular option */}
      <div className="py-5 flex border-b border-b-gray-300 text-wine">
        <div className="w-full flex justify-between items-center">
          <div className={`w-full flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div>
              <ToggleRadioButton
                label={t("shipping.regularDelivery")}
                isChecked={selectedShippingMethod === "regular"}
                onChange={() => onShippingMethodChange("regular")}
              />
            </div>
            <div className="text-lg text-wine px-8 font-semibold">
              <p>{t("shipping.regularDatePrefix", { date: formattedRegularDate })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fast Delivery option */}
      <div className="py-5 flex text-wine">
        <div className="w-full flex justify-between items-center">
          <div className={`w-full flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div>
              <ToggleRadioButton
                label={t("shipping.fastDelivery")}
                isChecked={selectedShippingMethod === "fast"}
                onChange={() => onShippingMethodChange("fast")}
              />
            </div>
            <div className="text-lg text-wine px-8 font-semibold">
              <p>{t("shipping.fastDatePrefix", { date: formattedFastDate })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingMethod;