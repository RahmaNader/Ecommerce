import Cookies from "js-cookie";
import { AddressProps } from "@types";

// Add the base URL from environment variables
const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface AddressPostData {
  buildingName: string;
  street: string;
  city: number;
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
  area: string;
}

const cityIdMap: Record<string, number> = {
  Cairo: 1,
  Alexandria: 2,
  Giza: 3,
  "Sharm El Sheikh": 4,
  Hurghada: 5,
  القاهرة: 1,
  الإسكندرية: 2,
  الجيزة: 3,
  "شرم الشيخ": 4,
  الغردقة: 5,
};

export const getCityId = (cityName: string): number => {
  return cityIdMap[cityName] || 5;
};

export const postAddress = async (
  addressData: AddressPostData
): Promise<AddressResponse | null> => {
  const authToken = Cookies.get("authToken");

  if (!authToken) {
    console.log("[postAddress] No auth token available");
    return null;
  }

  try {
    let phoneNumber = addressData.phoneNumber;

    phoneNumber = phoneNumber.trim().replace(/\s+/g, "");
    if (!phoneNumber.startsWith("+")) {
      phoneNumber = `+${phoneNumber}`;
    }

    const formattedData = {
      buildingName: addressData.buildingName,
      street: addressData.street,
      city: addressData.city,
      additionalDirections: addressData.additionalDirections,
      flatNumber: addressData.flatNumber,
      floorNumber: addressData.floorNumber,
      phoneNumber: phoneNumber,
      isSaved: addressData.isSaved,
    };

    console.log(
      "[postAddress] Sending address data:",
      JSON.stringify(formattedData, null, 2)
    );

    const response = await fetch(`${baseUrl}/api/ShippingAddresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(formattedData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("[postAddress] Successfully posted address:", data);
      return data;
    } else {
      console.log("[postAddress] Failed to post address:", data);
      console.log("[postAddress] Response status:", response.status);
      return null;
    }
  } catch (err) {
    console.log("[postAddress] Error posting address:", err);
    return null;
  }
};

export const getAllShippingAddresses = async (): Promise<
  AddressResponse[] | null
> => {
  const authToken = Cookies.get("authToken");

  if (!authToken) {
    console.log("[getAllShippingAddresses] No auth token available");
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}/api/ShippingAddresses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    if (response.ok && data?.$values) {
      console.log(
        "[getAllShippingAddresses] Successfully fetched addresses:",
        data.$values
      );
      return data.$values;
    } else {
      console.log(
        "[getAllShippingAddresses] Failed to fetch addresses or no addresses found:",
        data
      );
      return [];
    }
  } catch {
    console.log("[getAllShippingAddresses] Error fetching addresses");
    return null;
  }
};

export const convertApiAddressToAddressProps = (
  apiAddress: AddressResponse
): AddressProps => {
  return {
    id: apiAddress.shippingAddressId,
    building: apiAddress.buildingName,
    aptNo: apiAddress.flatNumber.toString(),
    floor: apiAddress.floorNumber.toString(),
    street: apiAddress.street,
    phoneNumber: apiAddress.phoneNumber,
    country: "Egypt",
    city: getCityNameById(apiAddress.city),
    additionalDirections: apiAddress.additionalDirections,
    saveAddress: apiAddress.isSaved,
    shippingAddressId: apiAddress.shippingAddressId,
    area: apiAddress.area,
  };
};

export const getCityNameById = (cityId: number): string => {
  const englishCities = Object.keys(cityIdMap);
  const cityName = englishCities.find((city) => cityIdMap[city] === cityId);

  return cityName || "Cairo";
};

export const deleteAddress = async (
  shippingAddressId: string
): Promise<boolean> => {
  const authToken = Cookies.get("authToken");

  if (!authToken) {
    console.log("[deleteAddress] No auth token available");
    return false;
  }

  try {
    const response = await fetch(
      `${baseUrl}/api/ShippingAddresses/${shippingAddressId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      console.log(
        `[deleteAddress] Successfully deleted address with ID: ${shippingAddressId}`
      );
      return true;
    } else {
      console.log(
        `[deleteAddress] Failed to delete address with ID: ${shippingAddressId}`
      );
      console.log(`[deleteAddress] Response status: ${response.status}`);
      return false;
    }
  } catch (err) {
    console.log("[deleteAddress] Error deleting address:", err);
    return false;
  }
};
