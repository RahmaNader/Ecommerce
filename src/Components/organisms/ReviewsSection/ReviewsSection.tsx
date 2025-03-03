import React, { useState } from "react";
import { ReviewCard } from "@components/atoms";
import { WriteReview } from "@components/molecules";

const ReviewsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialReviews = [
    {
      reviewerName: "Samantha D.",
      datePosted: "August 14, 2023",
      reviewText:
        "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It’s become my favorite go-to shirt.",
      rating: 4.5,
    },
    {
      reviewerName: "Michael B.",
      datePosted: "August 10, 2023",
      reviewText:
        "Good quality but a bit overpriced. The design is great though.",
      rating: 3.5,
    },
    {
      reviewerName: "Emily R.",
      datePosted: "August 8, 2023",
      reviewText: "Amazing product! Will definitely buy again.",
      rating: 5,
    },
  ];

  const [reviews, setReviews] = useState(initialReviews);

  const handleReviewSubmit = (rating: number, review: string) => {
    const newReview = {
      reviewerName: "Anonymous",
      datePosted: new Date().toLocaleDateString(),
      reviewText: review,
      rating: rating,
    };

    setReviews([newReview, ...reviews]);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="flex flex-wrap w-full justify-between mb-4">
        <h2 className="text-3xl font-bold text-wine font-playfair mb-4">
          All Reviews{" "}
          <span className="text-base font-Poppins font-normal text-ForthColor">
            ({reviews.length})
          </span>
        </h2>
        <button
          className="bg-wine text-mainColor p-2 rounded-md text-xl font-playfair hover:bg-ForthColor"
          onClick={() => setIsModalOpen(true)}
        >
          Write a review
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
      {reviews.length > 3 && (
        <div className="flex justify-center mt-8">
          <button className="bg-wine text-mainColor font-playfair text-2xl rounded-md w-[50%] py-3 px-8 hover:bg-ForthColor transition duration-300">
            See All
          </button>
        </div>
      )}
      {isModalOpen && (
        <WriteReview
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleReviewSubmit}
          deliveryInfo="Jonah Noah delivered your order from Nanica Homemade Pies, today at 19:47 (7 min ahead schedule)."
        />
      )}
    </div>
  );
};

export default ReviewsSection;