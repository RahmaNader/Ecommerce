import axios from "axios";

export async function fetchProductImages(productId: number) {
  try {
    const response = await axios.get(`https://www.bouraq-mt.com/royalkey/api/ProductImages/${productId}`);
    
    if (response.data?.$values) {
      console.log("Fetched Product Images:", response.data.$values);
      return response.data.$values; 
    }

    return [];
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Error fetching product images");
  }
}
