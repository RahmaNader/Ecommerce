import React, { useState } from "react";

type WriteReviewProps = {
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
  deliveryInfo: string;
};

const WriteReview: React.FC<WriteReviewProps> = ({
  onClose,
  onSubmit,
  deliveryInfo,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleReviewSubmit = () => {
    if (rating > 0 && review.trim()) {
      onSubmit(rating, review);
      setReview("");
      setRating(0);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-mainColor rounded-xl p-8 w-[90%] max-w-lg relative shadow-lg">
        <button
          onClick={onClose}
          aria-label="Close"
          className="rounded-full border-[2px] p-[5px] my-2 border-wine absolute right-4 top-2 text-wine hover:text-ForthColor hover:border-ForthColor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold font-playfair text-wine text-center mt-8">
          How many stars would you give to them?
        </h2>
        <p className="text-center font-normal font-playfair text-ForthColor text-sm my-3">{deliveryInfo}</p>
        
        <div className="flex justify-center items-center space-x-4 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingClick(star)}
              className={`text-2xl ${
                star <= rating ? "text-wine" : "text-ForthColor"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <div className="flex items-center bg-[#A78E788A] rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Add review...."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="flex-1 bg-transparent text-sm text-wine placeholder-mainColor focus:outline-none"
          />
          <button
            onClick={handleReviewSubmit}
            disabled={rating === 0 || review.trim() === ""}
            className={`ml-4 px-6 py-1 rounded-full text-sm font-semibold ${
              rating === 0 || review.trim() === ""
                ? "bg-mainColor text-ForthColor cursor-not-allowed"
                : "bg-wine text-white hover:bg-ForthColor"
            }`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
