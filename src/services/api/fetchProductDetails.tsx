// src/services/api/fetchProductDetails.ts
import axios from "axios";

// Define the interface for detailed product data
export interface DetailedProduct {
  productID: number;
  name: string;
  productDescription: string | null;
  productPrice: number;
  averageRate: number;
  productQuantity: number;
  categoryID: number;
  category: {
    categoryID: number;
    name: string;
    parentCategoryID: number | null;
    createdAt: string;
  };
  reviews: Array<{
    reviewId: number;
    reviewContent: string;
    rate: number;
    createdAt: string;
    userName: string;
  }>;
  productVarients: Array<{
    colorId: number;
    sizeId: number;
    quantity: number;
    colorName: string;
    sizeLabel: string | null;
  }>;
  productImages: Array<{
    imageId: number;
    imageUrl: string;
    altText: string;
  }>;
  created: string;
  lastUpdated: string;
  priceAfterDiscount: number;
  discountPercent: number;
}

// Function to fetch detailed product information
export async function fetchProductDetails(productId: number): Promise<DetailedProduct> {
  try {
    const response = await axios.get(`https://www.bouraq-mt.com/royalkey/api/Product/${productId}`);
    const product = response.data;

    return {
      productID: product.productID,
      name: product.name,
      productDescription: product.productDescription,
      productPrice: Number(product.productPrice),
      averageRate: Number(product.averageRate),
      productQuantity: product.productQuantity,
      categoryID: product.categoryID,
      category: {
        categoryID: product.category.categoryID,
        name: product.category.name,
        parentCategoryID: product.category.parentCategoryID,
        createdAt: product.category.createdAt,
      },
      reviews: product.reviews?.values?.map((review: any) => ({
        reviewId: review.reviewId,
        reviewContent: review.reviewContent,
        rate: review.rate,
        createdAt: review.createdAt,
        userName: review.userName,
      })) || [],
      productVarients: product.productVarients?.values?.map((variant: any) => ({
        colorId: variant.colorId,
        sizeId: variant.sizeId,
        quantity: variant.quantity,
        colorName: variant.colorName,
        sizeLabel: variant.sizeLabel,
      })) || [],
      productImages: product.productImages?.values?.map((image: any) => ({
        imageId: image.imageId,
        imageUrl: image.imageUrl,
        altText: image.altText,
      })) || [],
      created: product.created,
      lastUpdated: product.lastUpdated,
      priceAfterDiscount: Number(product.priceAfterDiscount),
      discountPercent: Number(product.discountPercent),
    };
    console.log(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw new Error("Failed to fetch product details.");
  }
}
