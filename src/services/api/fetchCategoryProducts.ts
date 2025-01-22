import axios from "axios";
import fallbackImage from "@assets/HP_img2.jpeg";
import { CardComponent } from "@types";

interface ProductImage {
  $id: string;
  imageId: number;
  imageUrl: string;
  altText: string;
}

interface CategoryProductResponse {
  $id: string;
  products: {
    $id: string;
    $values: Array<{
      $id: string;
      productID: number;
      name: string;
      productDescription: string | null;
      productPrice: number;
      averageRate: number | null;
      productQuantity: number;
      categoryID: number;
      productImages: {
        $id: string;
        $values: ProductImage[];
      };
      priceAfterDiscount: number;
      discountPercent: number;
    }>;
  };
  totalCount: number;
}

export const fetchCategoryProducts = async (parentCategoryId: number): Promise<CardComponent[]> => {
  try {
    const response = await axios.get<CategoryProductResponse>(
      `https://www.bouraq-mt.com/royalkey/api/Product/?parentCategory=${parentCategoryId}`
    );
    console.log(response.data.products.$values);
    return response.data.products.$values.map(product => ({
      productID: product.productID,
      src: product.productImages?.$values[0]?.imageUrl || fallbackImage,
      alt: product.productImages?.$values[0]?.altText || product.name,
      name: product.name,
      priceAfterDiscount: Number(product.priceAfterDiscount).toFixed(2), 
      rate: product.averageRate ? Number(product.averageRate.toFixed(2)) : undefined,
      description: product.productDescription || undefined,
      productQuantity: product.productQuantity,
      categoryID: product.categoryID,
      productPrice: Number(product.productPrice).toFixed(2),
      collection: undefined,
      color: [],
      size: []
    }));
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw new Error(`Failed to fetch products for category ${parentCategoryId}`);
  }
};