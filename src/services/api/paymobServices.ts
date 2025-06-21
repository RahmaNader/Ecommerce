import axios from 'axios';

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
  orderId: string,
  userData: any,
  selectedAddress: any
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
          phone_number: selectedAddress?.phoneNumber || '01000000000',
          email: userData?.email || 'customer@example.com',
          city: selectedAddress?.city || 'Cairo',
          country: 'EG',
          street: selectedAddress?.street || 'Unknown',
          building: selectedAddress?.building || '-',
          floor: selectedAddress?.floorNumber?.toString() || '-',
          apartment: selectedAddress?.aptNo || '-',
        },
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

// 5️⃣ Verify transaction (to be implemented on the backend)
export const verifyTransaction = async (transactionId: string) => {
  // In a production app, you should verify transactions on your backend
  // For now, we'll return true for testing purposes
  return true;
};