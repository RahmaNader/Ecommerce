import axios from "axios";
import fallbackImage from "@assets/HP_img2.jpeg";
import { CardComponent, Review, ProductImage, ProductVariant } from "@types";

interface FetchProductsParams {
  parentCategories: number;
  pageNumber: number;
  pageSize: number;
}

export async function fetchProducts({
  parentCategories,
  pageNumber,
  pageSize,
}: FetchProductsParams): Promise<{ products: CardComponent[]; totalCount: number }> {
  try {
    const response = await axios.get(
      `https://www.bouraq-mt.com/royalkey/api/Product`,
      {
        params: {
          parentCategories,
          pageNumber,
          pageSize,
        },
        headers: {
          Accept: "text/plain",
        },
      }
    );

    const { products, totalCount } = response.data;

    const formattedProducts: CardComponent[] =
      products?.$values?.map((product: CardComponent) => ({
        productID: product.productID,
        name: product.name,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        productDescription: product.productDescription,
        productDescriptionEn: product.productDescriptionEn,
        productDescriptionAr: product.productDescriptionAr,
        productCode: product.productCode,
        productPrice: product.productPrice,
        averageRate: product.averageRate ?? null,
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
        reviews:
          product.reviews?.$values?.map((review: Review) => ({
            reviewId: review.reviewId,
            reviewContent: review.reviewContent,
            rate: review.rate,
            createdAt: review.createdAt,
            userName: review.userName,
          })) || [],
        productVarients:
          product.productVarients?.$values?.map((variant: ProductVariant) => ({
            productVarientId: variant.productVarientId,
            colorNameEn: variant.colorNameEn,
            colorNameAr: variant.colorNameAr,
            colorName: variant.colorName,
            colorCode: variant.colorCode,
            sizeQuantities: variant.sizeQuantities?.$values || [],
          })) || [],
        productImages:
          product.productImages?.$values?.map((image: ProductImage) => ({
            imageId: image.imageId,
            imageUrl: image.imageUrl,
            altText: image.altText,
          })) || [],
        reviewPercentages: product.reviewPercentages ? { ...product.reviewPercentages } : {},
        created: product.created,
        lastUpdated: product.lastUpdated,
        priceAfterDiscount: product.priceAfterDiscount,
        discountPercent: product.discountPercent,
      })) || [];

    return { products: formattedProducts, totalCount };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
}


export async function fetchHomeCategory(count: number , category: string) {
  try {
    const response = await axios.get(
      `https://www.bouraq-mt.com/royalkey/api/Product/${category}?count=${count}`
    );

    return response.data.$values.map((product: CardComponent) => ({
      productID: product.productID,
      src: product.productImages?.[0]?.imageUrl || fallbackImage,
      alt: product.name,
      name: product.name,
      priceAfterDiscount: Number(product.priceAfterDiscount).toFixed(2), 
      productPrice: Number(product.productPrice).toFixed(2), 
      averageRate: Number(product.averageRate).toFixed(2), 
      productDescription: product.productDescription,
      productQuantity: product.productQuantity,
      size: "Default",
      category: product.categoryID,
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching new arrivals:", error.message);
      throw new Error(error.message || "Failed to fetch new arrivals.");
    } else {
      console.error("Error fetching new arrivals:", error);
      throw new Error("Failed to fetch new arrivals.");
    }
  }
}

export async function fetchProductsByParentCategory(
  parentCategoryId: number,
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<{ products: CardComponent[], totalCount: number }> {
  try {
    const response = await axios.get(
      `https://www.bouraq-mt.com/royalkey/api/Product?parentCategories=${parentCategoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    
    const products = response.data.products.$values.map((product: CardComponent) => ({
      productID: product.productID,
      name: product.name,
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      productDescription: product.productDescription || "",
      productDescriptionEn: product.productDescriptionEn || "",
      productDescriptionAr: product.productDescriptionAr || "",
      productCode: product.productCode || null,
      productPrice: product.productPrice,
      averageRate: product.averageRate,
      productQuantity: product.productQuantity,
      categoryID: product.categoryID,
      category: product.category,
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
    if (error instanceof Error) {
      console.error(`Error fetching products for parent category ${parentCategoryId}:`, error.message);
      throw new Error(error.message || `Failed to fetch products for parent category ${parentCategoryId}.`);
    } else {
      console.error(`Error fetching products for parent category ${parentCategoryId}:`, error);
      throw new Error(`Failed to fetch products for parent category ${parentCategoryId}.`);
    }
  }
}

export async function fetchRelatedProducts(productID: number, count: number): Promise<CardComponent[]> {
  try {
    const response = await axios.get(
      `https://www.bouraq-mt.com/royalkey/api/Product/${productID}/related?count=${count}`
    );
    
    return response.data.$values.map((product: CardComponent) => ({
      productID: product.productID,
      src: product.productImages?.[0]?.imageUrl || fallbackImage,
      alt: product.name,
      name: product.name,
      priceAfterDiscount: Number(product.priceAfterDiscount).toFixed(2),
      productPrice: Number(product.productPrice).toFixed(2),
      averageRate: product.averageRate ? Number(product.averageRate).toFixed(2) : "0.00",
      productDescription: product.productDescription,
      productQuantity: product.productQuantity,
      size: "Default",
      category: product.categoryID,
      collection: "related",
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching related products:", error.message);
      throw new Error(error.message || "Failed to fetch related products.");
    } else {
      console.error("Error fetching related products:", error);
      throw new Error("Failed to fetch related products.");
    }
  }
}

