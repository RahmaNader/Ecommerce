import React from 'react';

interface VerificationSuccessProps {
  file: File;
}

const VerificationSuccess: React.FC<VerificationSuccessProps> = ({ file }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 h-fit border border-ForthColor bg-ForthColor/10 rounded-md w-full px-20">
      <h2 className="text-xl font-semibold text-wine font-playfair">ID Card</h2>
      <img src={URL.createObjectURL(file)} alt="Verified ID" className="w-fit h-fit max-w-56 object-cover mt-4" />
      <div className="flex flex-row gap-2 mt-4 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white bg-green rounded-full"
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
          <p className="text-wine font-playfair font-medium text-2xl">Your verification succeeded</p>
        </div>
    </div>
  );
};

export default VerificationSuccess;