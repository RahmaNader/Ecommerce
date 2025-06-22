import axios from "axios";
import { Review } from "@types";
import Cookies from "js-cookie";

// Add the base URL from environment variables
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function fetchReviews(productId: number): Promise<Review[]> {
  try {
    const response = await axios.get(
      `${baseUrl}/api/Review/product/${productId}`
    );
    
    return response.data.$values.map((review: Review) => ({
      reviewId: review.reviewId,
      reviewContent: review.reviewContent,
      rate: review.rate,
      createdAt: review.createdAt,
      userName: review.userName,
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching reviews:", error.message);
      throw new Error(error.message || "Failed to fetch reviews.");
    } else {
      console.error("Error fetching reviews:", error);
      throw new Error("Failed to fetch reviews.");
    }
  }
}

export async function writeReview(
    reviewContent: string,
    rate: number,
    productID: number
  ): Promise<{ success: boolean; message: string }> {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return { success: false, message: "Authentication token not found. Please log in." };
      }
  
      const response = await axios.post(
        `${baseUrl}/api/Review`,
        {
          reviewContent,
          rate,
          productID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.status >= 200 && response.status < 300) {
        return { success: true, message: "Review submitted successfully." };
      } else {
        return { success: false, message: "Failed to submit review." };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 401) {
          return { success: false, message: "Unauthorized. Please log in to write a review." };
        }
        if (status === 500) {
        return { success: false, message: "Rate limit exceeded." };
          
        }
        const message = error.response.data?.message || "Failed to submit review.";
        return { success: false, message };
      }
      return { success: false, message: "Failed to write review." };
    }
  }