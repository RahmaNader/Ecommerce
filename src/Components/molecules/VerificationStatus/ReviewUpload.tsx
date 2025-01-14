import React from 'react';

interface ReviewUploadProps {
  file: File;
  onDelete: () => void;
  onSubmit: () => void;
}

const ReviewUpload: React.FC<ReviewUploadProps> = ({ file, onDelete, onSubmit }) => {
  return (
    <>
    <div className="flex flex-col items-center justify-center p-6 h-fit border border-ForthColor bg-ForthColor/10 rounded-md w-full px-20">
      <h2 className="text-xl font-semibold text-wine font-playfair">ID Card</h2>
      <img src={URL.createObjectURL(file)} alt="Uploaded ID" className="w-fit h-fit max-w-56 object-cover mt-4" />
      
    </div>
    <div className="flex gap-4 mt-4 items-center justify-center">
        <button onClick={onSubmit} className="bg-wine text-mainColor p-2 rounded-md text-xl font-playfair hover:bg-ForthColor">Send Request</button>
        <button onClick={onDelete} className="bg-red-500 text-mainColor p-2 rounded-md text-xl font-playfair ">Delete</button>
      </div>
    </>
  );
};

export default ReviewUpload;