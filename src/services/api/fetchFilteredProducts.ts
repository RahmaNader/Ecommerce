import axios from "axios";
import fallbackImage from "@assets/HP_img2.jpeg";
import { CardComponent, ProductImage, ProductVariant } from "@types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface FetchProductParams {
  parentCategories: number[];
  categoryIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  sizeLabels?: string[];
  search?: string;
  pageNumber?: number;
  pageSize?: number;
  isEnglish?: boolean;
}

interface ApiReview {
  reviewId: number;
  reviewContent: string;
  rate: number;
  createdAt: string;
  userName: string;
}

interface ApiSizeQuantity {
  sizeId: number;
  sizeLabel: string;
  quantity: number;
}

interface ApiProductVariant {
  productVarientId: number;
  colorNameEn: string;
  colorNameAr: string;
  colorName?: string;
  colorCode: string;
  sizeQuantities: {
    $values: ApiSizeQuantity[];
  };
}

interface ApiProductImage {
  imageId: number;
  imageUrl: string;
  altText: string;
}

interface ApiCategory {
  categoryID: number;
  name: string;
  nameEn: string;
  nameAr: string;
  parentCategoryID: number | null;
  createdAt: string;
}

interface ApiProduct {
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
  category: ApiCategory;
  reviews: { $values: ApiReview[] };
  productVarients: { $values: ApiProductVariant[] };
  productImages: { $values: ApiProductImage[] };
  reviewPercentages: Record<string, number>;
  created: string;
  lastUpdated: string;
  priceAfterDiscount: number;
  discountPercent: number;
  status?: string;
}

interface ApiResponse {
  products: {
    $values: ApiProduct[];
  };
  totalCount: number;
}

export const fetchFilteredProducts = async ({
  parentCategories,
  categoryIds,
  minPrice,
  maxPrice,
  sizeLabels,
  search,
  pageNumber = 1,
  pageSize = 12,
  isEnglish = true,
}: FetchProductParams): Promise<{
  products: CardComponent[];
  totalCount: number;
}> => {
  const params = new URLSearchParams();

  parentCategories.forEach((id) =>
    params.append("parentCategories", id.toString())
  );
  categoryIds?.forEach((id) => params.append("categoryIds", id.toString()));
  sizeLabels?.forEach((label) => params.append("sizeLabels", label));
  if (minPrice !== undefined) params.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined) params.append("maxPrice", maxPrice.toString());
  if (search) params.append("search", search);
  params.append("pageNumber", pageNumber.toString());
  params.append("pageSize", pageSize.toString());
  params.append("isEnglish", isEnglish.toString());

  const { data } = await axios.get<ApiResponse>(
    `${baseUrl}/api/Product?${params.toString()}`
  );

  const products: CardComponent[] = data.products.$values.map(
    (product: ApiProduct): CardComponent => ({
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
      reviews: product.reviews.$values.map((review: ApiReview) => ({
        reviewId: review.reviewId,
        reviewContent: review.reviewContent,
        rate: review.rate,
        createdAt: review.createdAt,
        userName: review.userName,
      })),
      productVarients: product.productVarients.$values.map(
        (variant: ApiProductVariant): ProductVariant => ({
          productVarientId: variant.productVarientId,
          colorNameEn: variant.colorNameEn,
          colorNameAr: variant.colorNameAr,
          colorName: variant.colorName || null,
          colorCode: variant.colorCode,
          sizeQuantities: variant.sizeQuantities.$values.map(
            (size: ApiSizeQuantity) => ({
              sizeId: size.sizeId || 0,
              sizeLabel: size.sizeLabel || null,
              quantity: size.quantity,
            })
          ),
        })
      ),
      productImages:
        product.productImages.$values.length > 0
          ? product.productImages.$values.map(
              ({
                imageId,
                imageUrl,
                altText,
              }: ApiProductImage): ProductImage => ({
                imageId,
                imageUrl: imageUrl || fallbackImage,
                altText: altText || product.name,
              })
            )
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
      status: product.status || "Available",
    })
  );

  return {
    products,
    totalCount: data.totalCount,
  };
};
