import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

export interface OrderItem {
  productId: number;
  quantity: number;
  color: string;
  sizeLabel: string;
}

export interface OrderRequest {
  city: string;
  shippingAddressId: string;
  isFastShipping: boolean;
  couponCode?: string;
  shoppingItems: OrderItem[];
}

export interface OrderResponse {
  orderId?: string;
  status?: string;
  createdAt?: string;
  totalAmount?: number;
  items?: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }>;
  shippingAddress?: {
    id: string;
    city: string;
  };
  shippingMethod?: {
    type: string;
    isFast: boolean;
  };
  paymentMethod?: string;
  discountApplied?: number;
  success: boolean;
  message?: string;
}

const placeOrder = async (orderData: OrderRequest): Promise<OrderResponse> => {
  console.log("[placeOrder] Starting order placement with data:", orderData);
  const authToken = Cookies.get('authToken');
  
  if (!authToken) {
    console.error("[placeOrder] No auth token found");
    return {
      success: false,
      message: 'Authentication required'
    };
  }

  if (!orderData.shoppingItems || orderData.shoppingItems.length === 0) {
    console.error("[placeOrder] No items in shopping cart");
    return {
      success: false,
      message: 'Shopping cart is empty'
    };
  }

  const validatedItems = orderData.shoppingItems.map(item => ({
    ...item,
    productId: typeof item.productId === 'string' ? parseInt(item.productId, 10) : item.productId
  }));

  const invalidItems = validatedItems.filter(item => 
    !item.productId || item.productId === 0 || !item.quantity || item.quantity <= 0
  );

  if (invalidItems.length > 0) {
    console.error("[placeOrder] Invalid items found:", invalidItems);
    return {
      success: false,
      message: 'Invalid product data'
    };
  }

  const validatedOrderData = {
    ...orderData,
    shoppingItems: validatedItems
  };

  console.log("[placeOrder] Auth token found, proceeding with API call");
  try {
    console.log("[placeOrder] Sending request to API endpoint");
    const response = await axios.post<OrderResponse>(
      'https://www.bouraq-mt.com/royalkey/api/Order', 
      validatedOrderData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    
    console.log("[placeOrder] API response status:", response.status);
    console.log("[placeOrder] API response data:", response.data);
    
    return {
      ...response.data,
      success: true 
    };
  } catch (err) {
    console.error('[placeOrder] Error occurred:', err instanceof Error ? err.message : String(err));
    
    let errorMessage = 'An error occurred while placing your order';
    let responseData = null;
    
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      console.error('[placeOrder] Response status:', axiosError.response?.status);
      console.error('[placeOrder] Response data:', axiosError.response?.data);
      
      responseData = axiosError.response?.data;
      interface ApiErrorResponse {
        message?: string;
        error?: string;
        [key: string]: unknown;
      }
      
      if (typeof responseData === 'string') {
        errorMessage = responseData;
      } else if (responseData && typeof responseData === 'object') {
        const typedResponse = responseData as ApiErrorResponse;
        errorMessage = typedResponse.message || 
                      typedResponse.error ||
                      'Product variant not found. Please try a different color or size.';
      }
      
      if (axiosError.response?.status === 400) {
        if (String(axiosError.response.data).includes("product variant doesn't exist")) {
          errorMessage = "One or more product variants don't exist. Please check your selections.";
        }
      } else if (axiosError.response?.status === 401) {
        errorMessage = "Authentication required. Please log in again.";
      } else if (axiosError.response?.status === 404) {
        errorMessage = "Product not found. It may have been removed.";
      }
    }
    
    return {
      success: false,
      message: errorMessage
    };
  }
};

export default placeOrder;