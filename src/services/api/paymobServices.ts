import axios from 'axios';
import { AddressProps } from '@types';

// Define proper type for user data instead of using 'any'
interface UserData {
  username?: string;
  email?: string;
  fullName?: string;
}

// Paymob API credentials
const PAYMOB_API_KEY = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRBME5qRTBOaXdpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS5TMWZ1RFJIQldxbmZYWS1oSko0OE14bzZEc2RYT2VySXlTRnBhUUt5UkREalFZR0ZGYnl5eDFfZHBsZUlCd2FlN1IyR240SlJtNUVncHBydzNTeHpIQQ==';
const INTEGRATION_ID = '5095753'; // Your Online Card integration ID
const IFRAME_ID = '923400'; // Your iframe ID

// 1️⃣ Get Authentication Token
export const getPaymobAuthToken = async () => {
  try {
    const response = await axios.post(
      'https://accept.paymob.com/api/auth/tokens',
      {
        api_key: PAYMOB_API_KEY,
      }
    );
    return response.data.token;
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
};

// 2️⃣ Create Order
export const createPaymobOrder = async (authToken: string, amount: number) => {
  try {
    const response = await axios.post(
      'https://accept.paymob.com/api/ecommerce/orders',
      {
        auth_token: authToken,
        delivery_needed: false,
        amount_cents: Math.round(amount * 100),
        currency: 'EGP',
        items: [
          {
            name: 'Web Purchase',
            amount_cents: Math.round(amount * 100),
            quantity: 1,
          },
        ],
      }
    );
    return response.data.id;
  } catch (error) {
    console.error('Order creation failed:', error);
    throw error;
  }
};

// 3️⃣ Generate Payment Key
export const generatePaymentKey = async (
  authToken: string,
  amount: number,
  orderId: number,
  userData: UserData, // Replaced 'any' with properly typed interface
  address: AddressProps,
  returnUrl?: string 
) => {
  try {
    const response = await axios.post(
      'https://accept.paymob.com/api/acceptance/payment_keys',
      {
        auth_token: authToken,
        amount_cents: Math.round(amount * 100),
        currency: 'EGP',
        order_id: orderId,
        integration_id: INTEGRATION_ID,
        expiration: 3600,
        billing_data: {
          first_name: userData?.fullName?.split(' ')?.[0] || 'Customer',
          last_name: userData?.fullName?.split(' ')?.[1] || '.',
          phone_number: address?.phoneNumber || '01000000000',
          email: userData?.email || 'customer@example.com',
          city: address?.city || 'Cairo',
          country: 'EG',
          street: address?.street || 'Unknown',
          building: address?.building || '-',
          floor: address?.floor || '-',
          apartment: address?.aptNo || '-',
        },
        return_url: returnUrl || window.location.origin,
      }
    );
    return response.data.token;
  } catch (error) {
    console.error('Payment key generation failed:', error);
    throw error;
  }
};

// 4️⃣ Generate payment URL
export const getPaymentUrl = (paymentKey: string) => {
  return `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${paymentKey}`;
};

// 5️⃣ Verify transaction
export const verifyTransaction = async (transactionId: string): Promise<{success: boolean; data?: any; message?: string}> => {
  try {
    // First, get auth token
    const authToken = await getPaymobAuthToken();
    
    // Call Paymob API to retrieve transaction details
    const response = await axios.get(
      `https://accept.paymob.com/api/acceptance/transactions/${transactionId}`,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    
    // Extract transaction data from response
    const transactionData = response.data;
    console.log('Transaction verification data:', transactionData);
    
    // Check if transaction is successful (success = true and is_refunded = false)
    // Paymob typically uses 'success' flag and transaction 'is_refunded' status
    if (transactionData && transactionData.success === true && transactionData.is_refunded === false) {
      return {
        success: true,
        data: transactionData,
        message: 'Transaction verified successfully'
      };
    } else {
      return {
        success: false,
        data: transactionData,
        message: transactionData.error_occured 
          ? `Payment failed: ${transactionData.error_occured}` 
          : 'Payment verification failed'
      };
    }
  } catch (error) {
    console.error('Transaction verification failed:', error);
    
    // Provide more detailed error information
    let errorMessage = 'Failed to verify transaction';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      message: errorMessage
    };
  }
};