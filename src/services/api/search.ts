import axios from 'axios';
import Cookies from 'js-cookie';
import fallbackImage from "@assets/HP_img2.jpeg";
import { CardComponent, ProductImage, ProductVariant, Review, Category } from "@types";

interface ProductVariantResponse {
  $id: string;
  productVarientId: number;
  colorNameEn: string;
  colorNameAr: string;
  colorName?: string | null;
  colorCode: string;
  sizeQuantities: {
    $id: string;
    $values: Array<{
      $id: string;
      sizeId?: number;
      sizeLabel?: string | null;
      quantity: number;
    }>;
  };
}

interface SearchProductResponse {
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
  category: Category | null;
  reviews: { $id: string; $values: Review[] };
  productVarients: { $id: string; $values: ProductVariantResponse[] };
  productImages: { $id: string; $values: Array<ProductImage & { $id: string }> };
  reviewPercentages: Record<string, number>;
  created: string;
  lastUpdated: string;
  priceAfterDiscount: number;
  discountPercent: number;
}

export interface SearchResponse {
  $id: string;
  products: {
    $id: string;
    $values: SearchProductResponse[];
  };
  totalCount: number;
}


export const searchProducts = async (
  query: string,
  isEnglish: boolean = true
): Promise<{ products: CardComponent[], totalCount: number }> => {
  try {
    // Basic headers for all requests - no auth required for search
    const headers: Record<string, string> = {
      'accept': 'text/plain',
    };
    
    // Optionally add auth token if available (but don't require it)
    const authToken = Cookies.get('authToken');
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    // Make API request - now using the isEnglish parameter 
    const response = await axios.get<SearchResponse>(
      `https://www.bouraq-mt.com/royalkey/api/Product?search=${encodeURIComponent(query)}&isEnglish=${isEnglish}`,
      { headers }
    );

    // Map API response to our application's CardComponent format
    const products = response.data.products.$values.map((product): CardComponent => ({
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
      category: product.category
        ? {
            categoryID: product.category.categoryID,
            name: product.category.name || "",
            nameEn: product.category.nameEn || "",
            nameAr: product.category.nameAr || "",
            parentCategoryID: product.category.parentCategoryID || null,
            createdAt: product.category.createdAt || "",
          }
        : { categoryID: 0, name: "", nameEn: "", nameAr: "", createdAt: "" },
      reviews: product.reviews?.$values?.map((review) => ({
        reviewId: review.reviewId,
        reviewContent: review.reviewContent,
        rate: review.rate,
        createdAt: review.createdAt,
        userName: review.userName,
      })) || [],
      productVarients: product.productVarients.$values.map((variant): ProductVariant => ({
        productVarientId: variant.productVarientId,
        colorNameEn: variant.colorNameEn,
        colorNameAr: variant.colorNameAr,
        colorName: variant.colorName || null,
        colorCode: variant.colorCode,
        sizeQuantities: variant.sizeQuantities.$values.map((size) => ({
          sizeId: size.sizeId || 0,
          sizeLabel: size.sizeLabel || null,
          quantity: size.quantity,
        })) || [],
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
      reviewPercentages: product.reviewPercentages || {},
      created: product.created,
      lastUpdated: product.lastUpdated,
      priceAfterDiscount: product.priceAfterDiscount,
      discountPercent: product.discountPercent,
    }));

    return {
      products,
      totalCount: response.data.totalCount
    };
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Failed to search products');
  }
};