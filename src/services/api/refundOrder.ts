import Cookies from "js-cookie";

// Add the base URL from environment variables
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export interface RefundItem {
  orderItemId: string;
  quantity: number;
}

export const refundOrder = async (
  orderId: string,
  items: RefundItem[]
): Promise<{ message: string }> => {
  const authToken = Cookies.get("authToken");
  
  if (!authToken) {
    throw new Error("Authentication required");
  }

  if (!items || items.length === 0) {
    throw new Error("No items selected for refund");
  }

  const response = await fetch(
    `${baseUrl}/api/Order/refund/${orderId}`,
    {
      method: "POST",
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify(items)
    }
  );

  if (!response.ok) {
    // Parse error details if available
    let errorMessage = "Failed to process refund";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // If no JSON response, use status text
      errorMessage = `${errorMessage}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
};

export interface RefundedItem {
  orderItemId: string;
  orderId: string;
  orderNumber: number;
  productId: number;
  productName: string;
  quantity: number;
  quantityRefunded: number;
  unitPrice: number;
  productColor: string;
  productSize: string;
  firstProductImageUrl: string;
  refundConfirmed: string;
  refundDate: string;
}

export interface RefundedOrdersResponse {
  $values: RefundedItem[];
}

export const fetchRefundedOrders = async (isEnglish: boolean): Promise<RefundedItem[]> => {
  const authToken = Cookies.get("authToken");
  
  if (!authToken) {
    throw new Error("Authentication required");
  }

  const response = await fetch(
    `${baseUrl}/api/Order/refunded-items?isEnglish=${isEnglish}`,
    {
      method: "GET",
      headers: {
        "accept": "*/*",
        "Authorization": `Bearer ${authToken}`
      }
    }
  );

  if (!response.ok) {
    let errorMessage = "Failed to fetch refunded orders";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = `${errorMessage}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  const data = await response.json() as RefundedOrdersResponse;
  console.log("Refunded orders:", data.$values);
  return data.$values;
};