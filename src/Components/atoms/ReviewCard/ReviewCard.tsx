import React from 'react';
import {CustomRating} from "@components/atoms";
import {ReviewCardProps} from "@types"


const ReviewCard: React.FC<ReviewCardProps> = ({ reviewerName, datePosted, reviewText, rating }) => {
  return (
    <div className="bg-mainColor border-[1px] border-ForthColor p-6 rounded-lg  max-w-lg mb-6 font-sans">
      <div className="flex items-center mb-2">
        <CustomRating rate={rating} mode="hide" />
      </div>

      <div className="w-full font-bold text-lg text-wine font-Poppins">
        {reviewerName}
        <span className="bg-green w-5 h-5 inline-flex p-2 items-center justify-center rounded-full text-base text-mainColor ml-2">
          &#x2714;
        </span>
      </div>

      <div className="font-Poppins text-ForthColor my-3 text-base">{`"${reviewText}"`}</div>
      <div className="text-sm font-Poppins text-ForthColor">Posted on {datePosted}</div>
    </div>
  );
};

export default ReviewCard;
