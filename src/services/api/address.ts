import Cookies from 'js-cookie';
import { AddressProps } from '@types';

interface AddressPostData {
  buildingName: string;
  street: string;
  city: number; // Note: city is a number in the API
  additionalDirections: string;
  flatNumber: number;
  floorNumber: number;
  phoneNumber: string;
  isSaved: boolean;
}

interface AddressResponse {
  $id: string;
  shippingAddressId: string;
  buildingName: string;
  street: string;
  city: number;
  additionalDirections: string;
  flatNumber: number;
  floorNumber: number;
  phoneNumber: string;
  isSaved: boolean;
  isDefault: boolean;
}

// City name to ID mapping based on the example
const cityIdMap: Record<string, number> = {
  // English names
  "Cairo": 1,
  "Alexandria": 2,
  "Giza": 3,
  "Sharm El Sheikh": 4,
  "Hurghada": 5,
  // Arabic names
  "القاهرة": 1,
  "الإسكندرية": 2,
  "الجيزة": 3,
  "شرم الشيخ": 4,
  "الغردقة": 5,
  // Add more mappings as needed
};

export const getCityId = (cityName: string): number => {
  return cityIdMap[cityName] || 5; // Default to 5 if not found
};

export const postAddress = async (addressData: AddressPostData): Promise<AddressResponse | null> => {
  const authToken = Cookies.get('authToken');
  
  if (!authToken) {
    console.log('[postAddress] No auth token available');
    return null;
  }
  
  try {
    // Format phone number to EXACTLY match the working format
    // Remove any spaces, dashes or other non-standard characters
    let phoneNumber = addressData.phoneNumber;
    
    // Ensure it has a + prefix and no spaces or other characters
    phoneNumber = phoneNumber.trim().replace(/\s+/g, '');
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = `+${phoneNumber}`;
    }
    
    // Create an exact copy of the structure that works in Swagger
    const formattedData = {
      buildingName: addressData.buildingName,
      street: addressData.street,
      city: addressData.city,
      additionalDirections: addressData.additionalDirections,
      flatNumber: addressData.flatNumber,
      floorNumber: addressData.floorNumber,
      phoneNumber: phoneNumber,
      isSaved: addressData.isSaved
    };
    
    console.log('[postAddress] Sending address data:', JSON.stringify(formattedData, null, 2));
    
    const response = await fetch('https://www.bouraq-mt.com/royalkey/api/ShippingAddresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(formattedData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('[postAddress] Successfully posted address:', data);
      return data;
    } else {
      console.log('[postAddress] Failed to post address:', data);
      console.log('[postAddress] Response status:', response.status);
      return null;
    }
  } catch (err) {
    console.log('[postAddress] Error posting address:', err);
    return null;
  }
};

// Add this function to fetch all shipping addresses

export const getAllShippingAddresses = async (): Promise<AddressResponse[] | null> => {
  const authToken = Cookies.get('authToken');
  
  if (!authToken) {
    console.log('[getAllShippingAddresses] No auth token available');
    return null;
  }
  
  try {
    const response = await fetch('https://www.bouraq-mt.com/royalkey/api/ShippingAddresses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    const data = await response.json();
    
    if (response.ok && data?.$values) {
      console.log('[getAllShippingAddresses] Successfully fetched addresses:', data.$values);
      return data.$values;
    } else {
      console.log('[getAllShippingAddresses] Failed to fetch addresses or no addresses found:', data);
      return [];
    }
  } catch{
    console.log('[getAllShippingAddresses] Error fetching addresses');
    return null;
  }
};

// Create a function to convert API address format to our AddressProps format
export const convertApiAddressToAddressProps = (apiAddress: AddressResponse): AddressProps => {
  return {
    id: apiAddress.shippingAddressId,
    building: apiAddress.buildingName,
    aptNo: apiAddress.flatNumber.toString(),
    floor: apiAddress.floorNumber.toString(),
    street: apiAddress.street,
    phoneNumber: apiAddress.phoneNumber,
    country: "Egypt", // Assuming Egypt as default
    city: getCityNameById(apiAddress.city),
    additionalDirections: apiAddress.additionalDirections,
    saveAddress: apiAddress.isSaved,
    shippingAddressId: apiAddress.shippingAddressId
  };
};

// Helper function to get city name from ID (reverse of getCityId)
export const getCityNameById = (cityId: number): string => {
  const englishCities = Object.keys(cityIdMap);
  const cityName = englishCities.find(city => cityIdMap[city] === cityId);
  
  // Default to first city if not found
  return cityName || "Cairo";
};

// Add this new delete function after your other API functions

export const deleteAddress = async (shippingAddressId: string): Promise<boolean> => {
  const authToken = Cookies.get('authToken');
  
  if (!authToken) {
    console.log('[deleteAddress] No auth token available');
    return false;
  }
  
  try {
    const response = await fetch(`https://www.bouraq-mt.com/royalkey/api/ShippingAddresses/${shippingAddressId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    if (response.ok) {
      console.log(`[deleteAddress] Successfully deleted address with ID: ${shippingAddressId}`);
      return true;
    } else {
      console.log(`[deleteAddress] Failed to delete address with ID: ${shippingAddressId}`);
      console.log(`[deleteAddress] Response status: ${response.status}`);
      return false;
    }
  } catch (err) {
    console.log('[deleteAddress] Error deleting address:', err);
    return false;
  }
};