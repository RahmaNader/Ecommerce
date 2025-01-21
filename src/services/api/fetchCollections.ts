import axios from "axios";
import fallbackImage from "@assets/HP_img2.jpeg";
import {CardComponent} from "@types"

export async function fetchHomeCategory(count: number , category: string, collection: string) {
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
      collection: collection,
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

