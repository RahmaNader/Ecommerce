import axios from "axios";

// Add the base URL from environment variables
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function fetchProductImages(productId: number): Promise<{ imageId: number; imageUrl: string; altText: string } | null> {
  try {
    const response = await axios.get(`${baseUrl}/api/ProductImages/${productId}`);
    
    if (response.data?.$values?.length > 0) {
      const image = response.data.$values[0]; 
      console.log("Fetched Product Image:", image);
      return {
        imageId: image.imageId,
        imageUrl: image.imageUrl,
        altText: image.altText ?? "No description available",
      };
    }

    console.warn("No images found for product ID:", productId);
    return null; 
  } catch (error: unknown) {
    console.error("Error fetching product images:", error);
    throw new Error(
      error instanceof Error ? error.message : "Error fetching product images"
    );
  }
}
