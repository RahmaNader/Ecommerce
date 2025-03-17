import React from "react";
import { useTranslation } from 'react-i18next';

interface ReviewUploadProps {
  file: File;
  onDelete: () => void;
  onSubmit: () => void;
}

const ReviewUpload: React.FC<ReviewUploadProps> = ({ file, onDelete, onSubmit }) => {
  const { t } = useTranslation();
  
  return (
    <>
      <div className="flex flex-col items-center justify-center p-6 h-fit border border-ForthColor bg-ForthColor/10 rounded-md w-full px-20">
        <h2 className="text-xl font-semibold text-wine font-playfair">
          {t('verification.idCard')}
        </h2>
        <img
          src={URL.createObjectURL(file)}
          alt={t('verification.reviewUpload.altText')}
          className="w-fit h-fit max-w-56 object-cover mt-4"
        />
        <p className="mt-4 text-center text-wine">
          {t('verification.reviewUpload.checkInfo')}
        </p>
      </div>
      <div className="flex gap-4 mt-4 items-center justify-center">
        <button
          onClick={onDelete}
          className="mt-4 px-4 py-2 bg-ForthColor text-white rounded"
        >
          {t('verification.reviewUpload.delete')}
        </button>
        <button
          onClick={onSubmit}
          className="mt-4 px-4 py-2 bg-wine text-white rounded"
        >
          {t('verification.reviewUpload.submit')}
        </button>
      </div>
    </>
  );
};

export default ReviewUpload;