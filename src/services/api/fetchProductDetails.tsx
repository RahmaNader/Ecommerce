// src/services/api/fetchProductDetails.ts
import axios from "axios";
import { CardComponent, Review, ProductVariant, ProductImage } from "@types";

// Function to fetch detailed product information
export async function fetchProductDetails(productId: number): Promise<CardComponent> {
  try {
    const response = await axios.get(`https://www.bouraq-mt.com/royalkey/api/Product/${productId}`);
    const product = response.data;

    return {
      productID: product.productID,
      name: product.name,
      productDescription: product.productDescription ?? null,
      productPrice: Number(product.productPrice).toFixed(2), 
      averageRate: Number(product.averageRate).toFixed(2) !== undefined ? Number(product.averageRate).toFixed(2) : undefined,
      productQuantity: product.productQuantity,
      categoryID: product.categoryID,
      category: product.category
        ? {
            categoryID: product.category.categoryID,
            name: product.category.name,
            parentCategoryID: product.category.parentCategoryID ?? null,
            parentCategory: product.category.parentCategory ?? null,
            createdAt: product.category.createdAt,
          }
        : undefined,
      reviews: product.reviews?.values?.map((review: Review) => ({
        reviewId: review.reviewId,
        reviewContent: review.reviewContent,
        rate: review.rate,
        createdAt: review.createdAt,
        userName: review.userName,
      })) || [],
      productVarients: product.productVarients?.values?.map((variant: ProductVariant) => ({
        colorId: variant.colorId,
        sizeId: variant.sizeId,
        quantity: variant.quantity,
        colorName: variant.colorName,
        sizeLabel: variant.sizeLabel ?? null,
      })) || [],
      productImages: product.productImages?.values?.map((image: ProductImage) => ({
        imageId: image.imageId,
        imageUrl: image.imageUrl,
        altText: image.altText,
      })) || [],
      created: product.created,
      lastUpdated: product.lastUpdated,
      priceAfterDiscount: Number(product.priceAfterDiscount).toFixed(2)  !== undefined ? Number(product.priceAfterDiscount).toFixed(2) : undefined,
      discountPercent: Number(product.discountPercent).toFixed(2) !== undefined ? Number(product.discountPercent).toFixed(2)  : undefined,
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw new Error("Failed to fetch product details.");
  }
}
