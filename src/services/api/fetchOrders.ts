import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { UserOrder } from '@types';

// Add the base URL from environment variables
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchUserOrders = async (isEnglish: boolean = true): Promise<UserOrder[]> => {
  console.log("[fetchUserOrders] Fetching user orders");
  const authToken = Cookies.get('authToken');
  
  if (!authToken) {
    console.error("[fetchUserOrders] No auth token found");
    throw new Error('Authentication required');
  }

  try {
    const response = await axios.get<UserOrder[]>(
      `${baseUrl}/api/Order/User-orders?isEnglish=${isEnglish}`,
      {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    
    console.log("[fetchUserOrders] API response status:", response.status);
    console.log("[fetchUserOrders] Fetched", response.data.length, "orders");
    
    return response.data;
  } catch (err) {
    console.error('[fetchUserOrders] Error occurred:', err instanceof Error ? err.message : String(err));
    
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      console.error('[fetchUserOrders] Response status:', axiosError.response?.status);
      console.error('[fetchUserOrders] Response data:', axiosError.response?.data);
      
      if (axiosError.response?.status === 401) {
        throw new Error('Authentication required. Please log in again.');
      }
    }
    
    throw new Error('Failed to fetch user orders');
  }
};


export const fetchOrderDetails = async (orderId: string, isEnglish: boolean = true): Promise<UserOrder> => {
  console.log(`[fetchOrderDetails] Fetching details for order: ${orderId}, language: ${isEnglish ? 'English' : 'Arabic'}`);
  const authToken = Cookies.get('authToken');
  
  if (!authToken) {
    console.error("[fetchOrderDetails] No auth token found");
    throw new Error('Authentication required');
  }

  try {
    const response = await axios.get<UserOrder>(
      `${baseUrl}/api/Order/${orderId}?isEnglish=${isEnglish}`,
      {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    
    console.log("[fetchOrderDetails] API response status:", response.status);
    console.log("[fetchOrderDetails] Order data structure:", 
      Object.keys(response.data).length > 0 
        ? "Valid order data received" 
        : "Empty order data");
    
    // Validate essential properties
    if (!response.data.orderId || !response.data.orderNumber) {
      console.error("[fetchOrderDetails] Invalid order data received:", response.data);
      throw new Error('Invalid order data structure');
    }
    
    return response.data;
  } catch (err) {
    console.error('[fetchOrderDetails] Error:', err instanceof Error ? err.message : String(err));
    
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      
      if (axiosError.response?.status === 404) {
        throw new Error('Order not found');
      } else if (axiosError.response?.status === 401) {
        throw new Error('Authentication expired. Please log in again.');
      }
    }
    
    throw new Error('Failed to fetch order details');
  }
};