import axios from "axios";

export async function fetchProductImages(productId: number): Promise<{ imageId: number; imageUrl: string; altText: string } | null> {
  try {
    const response = await axios.get(`https://www.bouraq-mt.com/royalkey/api/ProductImages/${productId}`);
    
    if (response.data?.$values?.length > 0) {
      const image = response.data.$values[0]; // Retrieve only the first image
      console.log("Fetched Product Image:", image);
      return {
        imageId: image.imageId,
        imageUrl: image.imageUrl,
        altText: image.altText ?? "No description available",
      };
    }

    console.warn("No images found for product ID:", productId);
    return null; // Return null if no images are available
  } catch (error: unknown) {
    console.error("Error fetching product images:", error);
    throw new Error(
      error instanceof Error ? error.message : "Error fetching product images"
    );
  }
}
