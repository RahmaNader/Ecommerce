import axios from "axios";
import fallbackImage from "@assets/HP_img2.jpeg";
import { CardComponent, ProductImage, ProductVariant,  Review, Category } from "@types";

// Exact structure matching backend response
interface CategoryProductResponse {
  $id: string;
  products: {
    $id: string;
    $values: Array<{
      $id: string;
      productID: number;
      name: string;
      nameEn: string;
      nameAr: string;
      productDescription: string | null;
      productDescriptionEn: string | null;
      productDescriptionAr: string | null;
      productCode: string | null;
      productPrice: number;
      averageRate: number | null;
      productQuantity: number;
      categoryID: number;
      category: Category;
      reviews: { $id: string; $values: Review[] };
      productVarients: { $id: string; $values: ProductVariant[] };
      productImages: { $id: string; $values: Array<ProductImage & { $id: string }> };
      reviewPercentages: Record<string, number>;
      created: string;
      lastUpdated: string;
      priceAfterDiscount: number;
      discountPercent: number;
    }>;
  };
  totalCount: number;
}

export const fetchCategoryProducts = async (
  parentCategoryId: number
): Promise<CardComponent[]> => {
  try {
    const { data } = await axios.get<CategoryProductResponse>(
      `https://www.bouraq-mt.com/royalkey/api/Product/?parentCategory=${parentCategoryId}`
    );

    // Transform backend response to match CardComponent exactly
    return data.products.$values.map((product): CardComponent => ({
      productID: product.productID,
      name: product.name,
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      productDescription: product.productDescription || "",
      productDescriptionEn: product.productDescriptionEn || "",
      productDescriptionAr: product.productDescriptionAr || "",
      productCode: product.productCode || null,
      productPrice: product.productPrice,
      averageRate: product.averageRate ?? null,
      productQuantity: product.productQuantity,
      categoryID: product.categoryID,
      category: {
        categoryID: product.category.categoryID,
        name: product.category.name,
        nameEn: product.category.nameEn,
        nameAr: product.category.nameAr,
        parentCategoryID: product.category.parentCategoryID || null,
        createdAt: product.category.createdAt,
      },
      reviews: product.reviews.$values.map(review => ({
        reviewId: review.reviewId,
        reviewContent: review.reviewContent,
        rate: review.rate,
        createdAt: review.createdAt,
        userName: review.userName,
      })),
      productVarients: product.productVarients.$values.map((variant): ProductVariant => ({
        productVarientId: variant.productVarientId,
        colorNameEn: variant.colorNameEn,
        colorNameAr: variant.colorNameAr,
        colorName: variant.colorName || null,
        colorCode: variant.colorCode,
        sizeQuantities: variant.sizeQuantities,
})),
      productImages:
        product.productImages.$values.length > 0
          ? product.productImages.$values.map(({ imageId, imageUrl, altText }): ProductImage => ({
              imageId,
              imageUrl: imageUrl || fallbackImage,
              altText: altText || product.name,
            }))
          : [
              {
                imageId: 0,
                imageUrl: fallbackImage,
                altText: product.name,
              },
            ],
      reviewPercentages: product.reviewPercentages,
      created: product.created,
      lastUpdated: product.lastUpdated,
      priceAfterDiscount: product.priceAfterDiscount,
      discountPercent: product.discountPercent,
    }));
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw new Error(`Failed to fetch products for category ${parentCategoryId}`);
  }
};
