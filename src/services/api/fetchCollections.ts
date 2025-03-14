import axios from "axios";
import fallbackImage from "@assets/HP_img2.jpeg";
import { CardComponent, ProductImage, ProductVariant,  Review, Category, SizeQuantityResponse } from "@types";

// interface FetchProductsParams {
//   parentCategories: number;
//   pageNumber: number;
//   pageSize: number;
// }

interface ProductVariantResponse {
  $id: string;
  productVarientId: number;
  colorNameEn: string;
  colorNameAr: string;
  colorName?: string | null;
  colorCode: string;
  sizeQuantities: SizeQuantityResponse;
}


interface HomeCategoryResponse {
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
    category: Category | null;
    reviews: { $id: string; $values: Review[] };
    productVarients: { $id: string; $values: ProductVariantResponse[] };
    productImages: { $id: string; $values: Array<ProductImage & { $id: string }> };
    reviewPercentages: Record<string, number>;
    created: string;
    lastUpdated: string;
    priceAfterDiscount: number;
    discountPercent: number;
  }>;
}


export async function fetchHomeCategory(
  count: number,
  category: string
): Promise<CardComponent[]> {
  try {
    const { data } = await axios.get<HomeCategoryResponse>(
      `https://www.bouraq-mt.com/royalkey/api/Product/${category}?count=${count}`
    );

    // Transform backend response to match CardComponent structure
    return data.$values.map((product): CardComponent => ({
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
            name: product.category.name,
            nameEn: product.category.nameEn,
            nameAr: product.category.nameAr,
            parentCategoryID: product.category.parentCategoryID || null,
            createdAt: product.category.createdAt,
          }
        : { categoryID: 0, name: "", nameEn: "", nameAr: "", createdAt: "" },
      reviews: product.reviews.$values.map((review) => ({
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
        sizeQuantities: variant.sizeQuantities?.$values?.map((size) => ({
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
      reviewPercentages: product.reviewPercentages,
      created: product.created,
      lastUpdated: product.lastUpdated,
      priceAfterDiscount: product.priceAfterDiscount,
      discountPercent: product.discountPercent,
    }));
  } catch (error) {
    console.error("Error fetching home category products:", error);
    throw new Error(`Failed to fetch products for category ${category}`);
  }
}



// export async function fetchProducts({
//   parentCategories,
//   pageNumber,
//   pageSize,
// }: FetchProductsParams): Promise<{ products: CardComponent[]; totalCount: number }> {
//   try {
//     const response = await axios.get(
//       `https://www.bouraq-mt.com/royalkey/api/Product`,
//       {
//         params: {
//           parentCategories,
//           pageNumber,
//           pageSize,
//         },
//         headers: {
//           Accept: "text/plain",
//         },
//       }
//     );

//     const { products, totalCount } = response.data;

//     const formattedProducts: CardComponent[] =
//       products?.$values?.map((product: CardComponent) => ({
//         productID: product.productID,
//         name: product.name,
//         nameEn: product.nameEn,
//         nameAr: product.nameAr,
//         productDescription: product.productDescription,
//         productDescriptionEn: product.productDescriptionEn,
//         productDescriptionAr: product.productDescriptionAr,
//         productCode: product.productCode,
//         productPrice: product.productPrice,
//         averageRate: product.averageRate ?? null,
//         productQuantity: product.productQuantity,
//         categoryID: product.categoryID,
//         category: product.category
//           ? {
//               categoryID: product.category.categoryID,
//               name: product.category.name,
//               nameAr: product.category.nameAr,
//               nameEn: product.category.nameEn,
//               parentCategoryID: product.category.parentCategoryID ?? null,
//               createdAt: product.category.createdAt,
//             }
//           : { categoryID: 0, name: "", nameAr: "", nameEn: "", createdAt: "" },
//         reviews:
//           product.reviews?.$values?.map((review: Review) => ({
//             reviewId: review.reviewId,
//             reviewContent: review.reviewContent,
//             rate: review.rate,
//             createdAt: review.createdAt,
//             userName: review.userName,
//           })) || [],
//         productVarients:
//           product.productVarients?.$values?.map((variant: any) => ({
//             productVarientId: variant.productVarientId,
//             colorNameEn: variant.colorNameEn,
//             colorNameAr: variant.colorNameAr,
//             colorName: variant.colorName,
//             colorCode: variant.colorCode,
//             // Extract size quantities from the $values array and map if needed
//             sizeQuantities: variant.sizeQuantities?.$values?.map((size: any) => ({
//               sizeId: size.sizeId || 0,
//               sizeLabel: size.sizeLabel || null,
//               quantity: size.quantity,
//             })) || [],
//           })) || [],
//         productImages:
//           product.productImages?.$values?.map((image: any) => ({
//             imageId: image.imageId,
//             imageUrl: image.imageUrl,
//             altText: image.altText,
//           })) || [],
//         reviewPercentages: product.reviewPercentages ? { ...product.reviewPercentages } : {},
//         created: product.created,
//         lastUpdated: product.lastUpdated,
//         priceAfterDiscount: product.priceAfterDiscount,
//         discountPercent: product.discountPercent,
//       })) || [];

//     return { products: formattedProducts, totalCount };
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw new Error("Failed to fetch products.");
//   }
// }


// export async function fetchProductsByParentCategory(
//   parentCategoryId: number,
//   pageNumber: number = 1,
//   pageSize: number = 10
// ): Promise<{ products: CardComponent[], totalCount: number }> {
//   try {
//     const response = await axios.get(
//       `https://www.bouraq-mt.com/royalkey/api/Product?parentCategories=${parentCategoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
//     );
    
//     const products = response.data.products.$values.map((product: CardComponent) => ({
//       productID: product.productID,
//       name: product.name,
//       nameEn: product.nameEn,
//       nameAr: product.nameAr,
//       productDescription: product.productDescription || "",
//       productDescriptionEn: product.productDescriptionEn || "",
//       productDescriptionAr: product.productDescriptionAr || "",
//       productCode: product.productCode || null,
//       productPrice: product.productPrice,
//       averageRate: product.averageRate,
//       productQuantity: product.productQuantity,
//       categoryID: product.categoryID,
//       category: product.category,
//       reviews: product.reviews?.$values?.map((review: Review) => ({
//               reviewId: review.reviewId,
//               reviewContent: review.reviewContent,
//               rate: review.rate,
//               createdAt: review.createdAt,
//               userName: review.userName,
//             })) || [],
//             productVarients: product.productVarients?.$values?.map((variant: ProductVariant) => ({
//               productVarientId: variant.productVarientId,
//               colorNameEn: variant.colorNameEn,
//               colorNameAr: variant.colorNameAr,
//               colorName: variant.colorName,
//               colorCode: variant.colorCode,
//               sizeQuantities: variant.sizeQuantities?.values || [],
//             })) || [],
//             productImages: product.productImages?.$values?.map((image: ProductImage) => ({
//               imageId: image.imageId,
//               imageUrl: image.imageUrl,
//               altText: image.altText,
//             })) || [],
//       reviewPercentages: product.reviewPercentages || {},
//       created: product.created,
//       lastUpdated: product.lastUpdated,
//       priceAfterDiscount: product.priceAfterDiscount,
//       discountPercent: product.discountPercent,
//     }));
    
//     return {
//       products,
//       totalCount: response.data.totalCount
//     };
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(`Error fetching products for parent category ${parentCategoryId}:`, error.message);
//       throw new Error(error.message || `Failed to fetch products for parent category ${parentCategoryId}.`);
//     } else {
//       console.error(`Error fetching products for parent category ${parentCategoryId}:`, error);
//       throw new Error(`Failed to fetch products for parent category ${parentCategoryId}.`);
//     }
//   }
// }

export async function fetchRelatedProducts(
  productID: number,
  count: number
): Promise<CardComponent[]> {
  try {
    const { data } = await axios.get<RelatedProductsResponse>(
      `https://www.bouraq-mt.com/royalkey/api/Product/${productID}/related?count=${count}`
    );

    // Transform backend response to match CardComponent structure
    interface RelatedProductResponse {
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

    interface RelatedProductsResponse {
      $id: string;
      $values: RelatedProductResponse[];
    }

    return data.$values.map((product): CardComponent => ({
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
            name: product.category.name,
            nameEn: product.category.nameEn,
            nameAr: product.category.nameAr,
            parentCategoryID: product.category.parentCategoryID || null,
            createdAt: product.category.createdAt,
          }
        : { categoryID: 0, name: "", nameEn: "", nameAr: "", createdAt: "" },
      reviews: product.reviews.$values.map((review) => ({
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
        sizeQuantities: variant.sizeQuantities?.$values?.map((size) => ({
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
      reviewPercentages: product.reviewPercentages,
      created: product.created,
      lastUpdated: product.lastUpdated,
      priceAfterDiscount: product.priceAfterDiscount,
      discountPercent: product.discountPercent,
    }));
  } catch (error) {
    console.error("Error fetching related products:", error);
    throw new Error(`Failed to fetch related products for product ID ${productID}`);
  }
}


