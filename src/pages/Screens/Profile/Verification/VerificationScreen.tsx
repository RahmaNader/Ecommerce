import React, { useState } from 'react';
import {UploadID,ReviewUpload,PendingVerification,VerificationSuccess, VerificationFailed  } from '@components/molecules';

const VerificationScreen: React.FC = () => {
  const [status, setStatus] = useState<'initial' | 'review' | 'pending' | 'success' | 'failed'>('initial');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
    <div className="flex flex-col mt-8 md:mt-16 justify-center">
      <h1 className="text-2xl font-semibold text-wine font-playfair">Verification</h1>
      <p className="text-ForthColor font-playfair text-xl mb-4">Add your ID card</p>
      {status === 'initial' && <UploadID onUpload={handleUpload} />}
      {status === 'review' && uploadedFile && <ReviewUpload file={uploadedFile} onDelete={handleDelete} onSubmit={handleSubmit} />}
      {status === 'pending' && uploadedFile && <PendingVerification file={uploadedFile} />}
      {status === 'success' && uploadedFile && <VerificationSuccess file={uploadedFile} />}
      {status === 'failed' && uploadedFile && <VerificationFailed file={uploadedFile} onRetry={handleRetry} />}
    </div>
  );
};

export default VerificationScreen;