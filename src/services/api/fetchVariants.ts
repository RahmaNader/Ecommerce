import axios from "axios";
import { ProductVariant } from "@types";
import { useContext } from "react";
import { LanguageContext } from "@context/LanguageProvider";

export async function fetchProductVariant(productId: number): Promise<ProductVariant[]> {
  try {
    const response = await axios.get(
      `https://www.bouraq-mt.com/royalkey/api/ProductVariants/product/${productId}`
    );

    return response.data.$values.map((variant: ProductVariant) => ({
      productVarientId: variant.productVarientId,
      colorNameEn: variant.colorNameEn,
      colorNameAr: variant.colorNameAr,
      colorName: variant.colorName ?? null,
      colorCode: variant.colorCode,
      sizeQuantities: variant.sizeQuantities?.values || [],
    }));
    console.log("Product Variants:", response.data.$values);

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

export async function fetchProductColors(productId: number): Promise<string[]> {
  try {
    // Get the language from LanguageContext
    const languageContext = useContext(LanguageContext);
    if (!languageContext) {
      throw new Error("LanguageContext is not available.");
    }
    
    const isEnglish = languageContext.language === "en";

    const response = await axios.get(
      `https://www.bouraq-mt.com/royalkey/api/ProductVariants/${productId}/colors?isEnglish=${isEnglish}`
    );

    const colors: string[] = response.data.$values || [];
    
    console.log("Fetched Product Colors:", colors);

    return colors;
  } catch (error) {
    console.error("Error fetching product colors:", error);
    throw new Error("Failed to fetch product colors.");
  }
}
