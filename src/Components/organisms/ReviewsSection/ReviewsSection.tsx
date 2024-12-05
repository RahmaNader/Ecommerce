import React from 'react';
import {ReviewCard} from '@components/atoms';

const ReviewsSection: React.FC = () => {
  
    const reviewData = {
    reviewerName: 'Samantha D.',
    datePosted: 'August 14, 2023',
    reviewText:
      'I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It’s become my favorite go-to shirt.',
    rating: 4.5,
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="flex flex-wrap w-full justify-between mb-4">
        <h2 className="text-3xl font-bold text-wine font-playfair mb-4">
          All Reviews <span className="text-base font-Poppins font-normal text-ForthColor">(451)</span>
        </h2>
        <button className="bg-wine text-mainColor p-2 rounded-md text-xl font-playfair hover:bg-ForthColor ">
          Write a review
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <ReviewCard key={index} {...reviewData} />
          ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-wine text-mainColor  font-playfair text-2xl rounded-md w-[50%] py-3 px-8  hover:bg-ForthColor transition duration-300">
          See All
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
