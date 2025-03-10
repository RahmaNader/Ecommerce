import axios from 'axios';
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
  orderId: string;
  status: string;
  createdAt: string;
  totalAmount: number;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }[];
  shippingAddress: {
    id: string;
    city: string;
  };
  shippingMethod: {
    type: string;
    isFast: boolean;
  };
  paymentMethod: string;
  discountApplied?: number;
  success: boolean;
  message?: string;
}

const placeOrder = async (orderData: OrderRequest): Promise<OrderResponse> => {
  const authToken = Cookies.get('authToken');
  
  if (!authToken) {
    throw new Error('Authentication required');
  }

  try {
    const response = await axios.post<OrderResponse>(
      'https://www.bouraq-mt.com/royalkey/api/Order', 
      orderData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export default placeOrder;