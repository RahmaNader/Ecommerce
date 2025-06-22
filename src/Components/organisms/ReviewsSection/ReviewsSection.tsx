import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { WriteReview } from "@components/molecules";
import { fetchReviews, writeReview } from "@services/api/fetchReviews";
import { Review } from "@types";
import { SuccessAlert, ErrorAlert, ReviewCard } from "@components/atoms";

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews: initialReviews }) => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation(); 
  const isRTL = i18n.language === 'ar'; 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const authToken = Cookies.get("authToken");
  const isAuthenticated = authToken && authToken.trim().length > 0;

  useEffect(() => {
    const loadReviews = async () => {
      try {
        if (!id) return;
        setIsLoading(true);
        const fetchedReviews = await fetchReviews(Number(id));
        setReviews(fetchedReviews);
      } catch {
        setError(t("reviews.failedToLoad"));
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [id, t]);

  const handleReviewSubmit = async (rating: number, reviewText: string) => {
    if (!id) return;
    try {
      const productID = Number(id);
      const result = await writeReview(reviewText, rating, productID);
      const userName = "Anonymous"; 
      if (result.success) {
        const newReview: Review = {
          reviewId: Date.now(), 
          reviewContent: reviewText,
          rate: rating,
          createdAt: new Date().toISOString(),
          userName: userName,
        };
        setReviews([newReview, ...reviews]);
        setAlert({ type: "success", message: t("reviews.submitSuccess") });
      } else {
        setAlert({ type: "error", message: result.message });
      }
    } catch {
       setAlert({ type: "error", message: t("reviews.submitFailed") });
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 0);
      setIsModalOpen(false);
    }
  };
  
  const handleWriteReviewClick = () => {
    if (!isAuthenticated) {
      setAlert({ type: "error", message: t("reviews.loginRequired") });
      setTimeout(() => setAlert(null), 3000);
    } else {
      setIsModalOpen(true);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">{t("reviews.loading")}</div>;
  }

  if (error) {
    return <div className="text-center mt-20">{error}</div>;
  }

  return (
    <div className={`w-full mx-auto px-4 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      {alert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          {alert.type === "error" ? (
            <ErrorAlert message={alert.message} />
          ) : (
            <SuccessAlert message={alert.message} />
          )}
        </div>
      )}
      <div className={`flex flex-wrap w-full justify-between mb-4 `}>
        <h2 className="text-3xl font-bold text-wine font-playfair mb-4">
          {t("reviews.allReviews")}{" "}
          <span className="text-base font-Poppins font-normal text-ForthColor">
            ({reviews.length})
          </span>
        </h2>
        <button
          className="bg-wine text-mainColor p-2 rounded-md text-xl font-playfair hover:bg-ForthColor"
          onClick={handleWriteReviewClick}
        >
          {t("reviews.writeReview")}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review.reviewId}
            reviewerName={review.userName}
            datePosted={new Date(review.createdAt).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')}
            reviewText={review.reviewContent}
            rating={review.rate}
          />
        ))}
      </div>
      {reviews.length > 3 && (
        <div className="flex justify-center mt-8">
          <button className="bg-wine text-mainColor font-playfair text-2xl rounded-md w-[50%] py-3 px-8 hover:bg-ForthColor transition duration-300">
            {t("reviews.seeAll")}
          </button>
        </div>
      )}
      {isModalOpen && (
        <WriteReview
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleReviewSubmit}
          deliveryInfo=""
        />
      )}
    </div>
  );
};

export default ReviewsSection;