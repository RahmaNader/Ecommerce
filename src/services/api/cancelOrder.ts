import Cookies from "js-cookie";

export const cancelOrder = async (orderId: string): Promise<void> => {
  const authToken = Cookies.get("authToken");
  
  if (!authToken) {
    throw new Error("Authentication required");
  }

  const response = await fetch(
    `https://www.bouraq-mt.com/royalkey/api/Order/cancel-order/${orderId}`,
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