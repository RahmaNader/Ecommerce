import React from "react";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/useLanguage';

interface ReviewUploadProps {
  file: File;
  onDelete: () => void;
  onSubmit: () => void;
}

const ReviewUpload: React.FC<ReviewUploadProps> = ({ file, onDelete, onSubmit }) => {
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
          alt={t('verification.reviewUpload.altText')}
          className="w-fit h-fit max-w-full md:max-w-56 object-cover mt-4"
        />
        <p className="mt-4 text-center text-wine text-sm md:text-base">
          {t('verification.reviewUpload.checkInfo')}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-4 items-center justify-center">
        <button
          onClick={onDelete}
          className="w-full sm:w-auto px-4 py-2 bg-ForthColor text-white rounded"
        >
          {t('verification.reviewUpload.delete')}
        </button>
        <button
          onClick={onSubmit}
          className="w-full sm:w-auto px-4 py-2 bg-wine text-white rounded"
        >
          {t('verification.reviewUpload.submit')}
        </button>
      </div>
    </div>
  );
};

export default ReviewUpload;