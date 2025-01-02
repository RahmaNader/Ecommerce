import axios from "axios";
import fallbackImage from "@assets/HP_img2.jpeg";
import {Product} from "@types"

export async function fetchNewArrivals(count: number = 4) {
  try {
    const response = await axios.get(
      `https://www.bouraq-mt.com/royalkey/api/Product/new-arrivals?count=${count}`
    );

    return response.data.$values.map((product: Product) => ({
      id: product.productID,
    //   src: product.productImages?.$values[0]?.imageUrl || fallbackImage,
      src: fallbackImage,
      alt: product.productImages?.$values[0]?.altText || "No Image Available",
      name: product.name,
      DisPrice: Number(product.priceAfterDiscount).toFixed(2), 
      NormalPrice: Number(product.productPrice).toFixed(2), 
      rate: Number(product.averageRate).toFixed(2), 
      description: product.productDescription,
      availableQuantity: product.productQuantity,
      size: "Default",
      category: product.categoryID,
      collection: "New Arrivals",
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
