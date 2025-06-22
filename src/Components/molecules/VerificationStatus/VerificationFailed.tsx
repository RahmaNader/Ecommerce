import React from "react";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/useLanguage';

interface VerificationFailedProps {
  file: File;
  onRetry: () => void;
}

const VerificationFailed: React.FC<VerificationFailedProps> = ({
  file,
  onRetry,
}) => {
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
          alt={t('verification.verificationFailed.altText')}
          className="w-fit h-fit max-w-full md:max-w-56 object-cover mt-4"
        />
        <div className="flex flex-row gap-2 mt-4 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8 text-white bg-red-600 rounded-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <p className="my-2 md:my-4 text-wine font-playfair font-medium text-lg md:text-2xl">
            {t('verification.verificationFailed.message')}
          </p>
        </div>
      </div>
      <div className="flex mt-4 items-center justify-center">
        <button
          onClick={onRetry}
          className="w-full sm:w-auto px-4 py-2 bg-wine text-white rounded"
        >
          {t('verification.verificationFailed.tryAgain')}
        </button>
      </div>
    </div>
  );
};

export default VerificationFailed;
