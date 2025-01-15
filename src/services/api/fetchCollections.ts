import axios from "axios";
import fallbackImage from "@assets/HP_img2.jpeg";
import {FetchProduct} from "@types"

export async function fetchNewArrivals(count: number = 4) {
  try {
    const response = await axios.get(
      `https://www.bouraq-mt.com/royalkey/api/Product/new-arrivals?count=${count}`
    );

    return response.data.$values.map((product: FetchProduct) => ({
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

export async function fetchBestSelling(count: number = 4) {
  try {
    const response = await axios.get(
      `https://www.bouraq-mt.com/royalkey/api/Product/best-selling?count=${count}`
    );

    if (!response.data.$values || response.data.$values.length === 0) return [];

    return response.data.$values.map((product: FetchProduct) => ({
      id: product.productID,
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
      collection: "Best Sellers",
    }));
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    throw new Error("Failed to fetch best sellers.");
  }
}

export async function fetchHighestDiscount(count: number = 4) {
  try {
    const response = await axios.get(
      `https://www.bouraq-mt.com/royalkey/api/Product/highest-discount?count=${count}`
    );

    if (!response.data.$values || response.data.$values.length === 0) return [];

    return response.data.$values.map((product: FetchProduct) => ({
      id: product.productID,
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
      collection: "Highest Discount",
    }));
  } catch (error) {
    console.error("Error fetching highest discount products:", error);
    throw new Error("Failed to fetch highest discount products.");
  }
}