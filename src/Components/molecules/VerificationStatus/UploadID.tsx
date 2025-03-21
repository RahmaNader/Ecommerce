import React from 'react';
import { useTranslation } from 'react-i18next';

interface UploadIDProps {
  onUpload: (file: File) => void;
}

const UploadID: React.FC<UploadIDProps> = ({ onUpload }) => {
  const { t } = useTranslation();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border border-ForthColor bg-ForthColor/10 rounded-md w-full h-64 px-20">
      <h2 className="text-xl font-semibold text-wine font-playfair">
        {t('verification.uploadID.title')}
      </h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="upload-id"
      />
      <label htmlFor="upload-id" className="cursor-pointer flex flex-col gap-4 items-center justify-center bg-idbg p-4 rounded-md mt-4 w-fit h-32">
        <p className="text-idbg font-extrabold text-2xl bg-white flex items-center justify-center p-2 rounded-md w-10 h-10">+</p>
        <span className="mt-2 text-center text-white text-xl">
          {t('verification.uploadID.instructions')}
        </span>
      </label>
    </div>
  );
};

export default UploadID;