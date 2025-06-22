import React from "react";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/useLanguage';

interface PendingVerificationProps {
  file: File;
}

const PendingVerification: React.FC<PendingVerificationProps> = ({ file }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === "ar";
  
  return (
    <div className={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex flex-col items-center justify-center p-4 md:p-6 h-fit border border-ForthColor bg-ForthColor/10 rounded-md w-full px-4 md:px-20">
        <h2 className="text-lg md:text-xl font-semibold text-wine font-playfair">
          {t('verification.idCard')}
        </h2>
        <img
          src={URL.createObjectURL(file)}
          alt={t('verification.pendingVerification.altText')}
          className="w-fit h-fit max-w-full md:max-w-56 object-cover mt-4"
        />
      </div>
      <div className="flex flex-col gap-3 md:gap-4 mt-4 items-center text-center justify-center px-4 md:px-40">
        <div className="flex flex-row gap-2 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8 text-white bg-green rounded-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-wine font-playfair font-medium text-lg md:text-2xl">
            {t('verification.pendingVerification.status')}
          </p>
        </div>
        <p className="text-wine font-playfair font-medium text-lg md:text-2xl">
          {t('verification.pendingVerification.message')}
        </p>
      </div>
    </div>
  );
};

export default PendingVerification;
