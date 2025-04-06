import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/useLanguage';

interface UploadIDProps {
  onUpload: (file: File) => void;
}

const UploadID: React.FC<UploadIDProps> = ({ onUpload }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === "ar";
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 md:p-6 border border-ForthColor bg-ForthColor/10 rounded-md w-full h-64 px-4 md:px-20 ${isRTL ? 'rtl' : 'ltr'}`}>
      <h2 className="text-lg md:text-xl font-semibold text-wine font-playfair text-center">
        {t('verification.uploadID.title')}
      </h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="upload-id"
      />
      <label htmlFor="upload-id" className="cursor-pointer flex flex-col gap-2 md:gap-4 items-center justify-center bg-idbg p-3 md:p-4 rounded-md mt-4 w-fit h-28 md:h-32">
        <p className="text-idbg font-extrabold text-xl md:text-2xl bg-white flex items-center justify-center p-2 rounded-md w-8 h-8 md:w-10 md:h-10">+</p>
        <span className="mt-1 md:mt-2 text-center text-white text-base md:text-xl px-2">
          {t('verification.uploadID.instructions')}
        </span>
      </label>
    </div>
  );
};

export default UploadID;