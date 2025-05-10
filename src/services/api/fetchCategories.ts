import axios from "axios";

// Add the base URL from environment variables
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function fetchCategories() {
  try {
    const response = await axios.get(`${baseUrl}/api/Categories`);
    console.log(response.data.$values);
    return response.data.$values;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Error fetching categories");
  }
}
