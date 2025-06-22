import Cookies from "js-cookie";

// Add the base URL from environment variables
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const cancelOrder = async (orderId: string): Promise<void> => {
  const authToken = Cookies.get("authToken");
  
  if (!authToken) {
    throw new Error("Authentication required");
  }

  const response = await fetch(
    `${baseUrl}/api/Order/cancel-order/${orderId}`,
    {
      method: "DELETE",
      headers: {
        "accept": "*/*",
        "Authorization": `Bearer ${authToken}`
      }
    }
  );

  if (response.status !== 204) {
    // Parse error details if available
    let errorMessage = "Failed to cancel order";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // If no JSON response, use status text
      errorMessage = `${errorMessage}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }
};