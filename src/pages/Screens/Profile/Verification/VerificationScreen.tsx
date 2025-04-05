import React, { useState } from 'react';
import {UploadID, ReviewUpload, PendingVerification, VerificationSuccess, VerificationFailed} from '@components/molecules';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/useLanguage';

const VerificationScreen: React.FC = () => {
  const [status, setStatus] = useState<'initial' | 'review' | 'pending' | 'success' | 'failed'>('initial');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === "ar";

  const handleUpload = (file: File) => {
    setUploadedFile(file);
    setStatus('review');
  };

  const handleSubmit = () => {
    setStatus('pending');
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      setStatus(isSuccess ? 'success' : 'failed');
    }, 2000);
  };

  const handleRetry = () => setStatus('initial');
  const handleDelete = () => {
    setUploadedFile(null);
    setStatus('initial');
  };

  return (
    <div className={`flex flex-col mt-4 md:mt-8 justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
      <h1 className="text-xl md:text-2xl font-semibold text-wine font-playfair text-center md:text-start">{t("verification.title")}</h1>
      <p className="text-ForthColor font-playfair text-lg md:text-xl mb-4 text-center md:text-start">{t("verification.subtitle")}</p>
      
      {status === 'initial' && <UploadID onUpload={handleUpload} />}
      {status === 'review' && uploadedFile && <ReviewUpload file={uploadedFile} onDelete={handleDelete} onSubmit={handleSubmit} />}
      {status === 'pending' && uploadedFile && <PendingVerification file={uploadedFile} />}
      {status === 'success' && uploadedFile && <VerificationSuccess file={uploadedFile} />}
      {status === 'failed' && uploadedFile && <VerificationFailed file={uploadedFile} onRetry={handleRetry} />}
    </div>
  );
};

export default VerificationScreen;