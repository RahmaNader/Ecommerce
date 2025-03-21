import axios from "axios";
import { CardComponent, Review, ProductImage, ProductVariant } from "@types";

export async function fetchProductDetails(productId: number): Promise<CardComponent> {
  try {
    const response = await axios.get(`https://www.bouraq-mt.com/royalkey/api/Product/${productId}`);
    const product = response.data;
    console.log("product", product);
    return {
      productID: product.productID,
      name: product.name,
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      productDescription: product.productDescription,
      productDescriptionEn: product.productDescriptionEn,
      productDescriptionAr: product.productDescriptionAr,
      productCode: product.productCode,
      productPrice: product.productPrice,
      averageRate: product.averageRate !== undefined ? product.averageRate : null,
      productQuantity: product.productQuantity,
      categoryID: product.categoryID,
      category: product.category
        ? {
            categoryID: product.category.categoryID,
            name: product.category.name,
            nameAr: product.category.nameAr,
            nameEn: product.category.nameEn,
            parentCategoryID: product.category.parentCategoryID ?? null,
            createdAt: product.category.createdAt,
          }
        : { categoryID: 0, name: "", nameAr: "", nameEn: "", createdAt: "" },
      reviews: product.reviews?.$values?.map((review: Review) => ({
        reviewId: review.reviewId,
        reviewContent: review.reviewContent,
        rate: review.rate,
        createdAt: review.createdAt,
        userName: review.userName,
      })) || [],
      productVarients: product.productVarients?.$values?.map((variant: ProductVariant) => ({
        productVarientId: variant.productVarientId,
        colorNameEn: variant.colorNameEn,
        colorNameAr: variant.colorNameAr,
        colorName: variant.colorName,
        colorCode: variant.colorCode,
        sizeQuantities: variant.sizeQuantities?.values || [],
      })) || [],
      productImages: product.productImages?.$values?.map((image: ProductImage) => ({
        imageId: image.imageId,
        imageUrl: image.imageUrl,
        altText: image.altText,
      })) || [],
      reviewPercentages: product.reviewPercentages ? { ...product.reviewPercentages } : {},
      created: product.created,
      lastUpdated: product.lastUpdated,
      priceAfterDiscount: product.priceAfterDiscount,
      discountPercent: product.discountPercent,
    };
    
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw new Error("Failed to fetch product details.");
  }
}
