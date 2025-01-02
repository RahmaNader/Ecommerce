import axios from "axios";

export async function fetchCategories() {
  try {
    const response = await axios.get("https://www.bouraq-mt.com/royalkey/api/Categories");
    console.log(response.data.$values);
    return response.data.$values;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Error fetching categories");
  }
}
