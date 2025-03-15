import axios from 'axios';
import { ProductVariant, SizeQuantity } from '@types';

interface ProductVariantResponse {
  $id: string;
  $values: Array<{
    $id: string;
    productVarientId: number;
    colorNameEn: string;
    colorNameAr: string;
    colorName?: string | null;
    colorCode: string;
    sizeQuantities: {
      $id: string;
      $values: SizeQuantity[];
    };
  }>;
}

export async function fetchProductVariant(productId: number): Promise<ProductVariant[]> {
  try {
    const response = await axios.get<ProductVariantResponse>(
      `https://www.bouraq-mt.com/royalkey/api/ProductVariants/product/${productId}`
    );

    console.log("Product Variants:", response.data.$values);

    return response.data.$values.map(variant => ({
      productVarientId: variant.productVarientId,
      colorNameEn: variant.colorNameEn,
      colorNameAr: variant.colorNameAr,
      colorName: variant.colorName ?? null,
      colorCode: variant.colorCode,
      sizeQuantities: variant.sizeQuantities.$values.map((sq: SizeQuantity) => ({
        sizeId: sq.sizeId,
        quantity: sq.quantity,
        sizeLabel: sq.sizeLabel || null,
      })),
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching product variants:", error.message);
      throw new Error(error.message || "Failed to fetch product variants.");
    } else {
      console.error("Error fetching product variants:", error);
      throw new Error("Failed to fetch product variants.");
    }
  }
}