import { RatingDistributionItem } from "@types";

export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
    if (originalPrice <= 0) {
      throw new Error("Original price must be greater than 0");
    }
    if (discountedPrice < 0 || discountedPrice > originalPrice) {
      throw new Error("Discounted price must be between 0 and the original price");
    }
  
    const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discountPercentage * 100) / 100; 
  };
  

export const calculateRatingDistribution = (ratings: number[]): RatingDistributionItem[] => {
  
  const totalRatings = ratings.length;
  const distribution = [0, 0, 0, 0, 0]; 

  ratings.forEach((rating) => {
    if (rating >= 1 && rating <= 5) {
      distribution[rating - 1] += 1;
    }
  });

  return distribution.map((count, index) => ({
    rating: index + 1,
    percentage: ((count / totalRatings) * 100).toFixed(2),
    color: getColorForRating(index + 1), 
  }));
};

export const getColorForRating = (rating: number) => {
  switch (rating) {
    case 5:
      return '#fbbf24'; 
    case 4:
      return '#22c55e'; 
    case 3:
      return '#fde047'; 
    case 2:
      return '#fb923c'; 
    case 1:
      return '#ef4444'; 
    default:
      return '#6b7280';
  }
};
