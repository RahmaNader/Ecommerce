import axios from "axios";
import { PersonalData } from "@types";
import Cookies from "js-cookie";

// Add the base URL from environment variables
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = `${baseUrl}/api/PersonalData/personal-data`;

const getAuthToken = (): string | null => {
  return Cookies.get("authToken") || null;
};

export const fetchPersonalData = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  try {
    const response = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 401
    ) {
      console.error("401 Unauthorized - Token might be invalid or expired");
      Cookies.remove("authToken");
      window.location.href = "/authentication";
    } else {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching personal data:", error.response || error);
      } else {
        console.error("Error fetching personal data:", error);
      }
    }
    throw error;
  }
};

export const updatePersonalData = async (data: Partial<PersonalData>) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  console.log("Sending full payload to API:", data);

  try {
    const response = await axios.put(API_BASE_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Response Error:", error.response.data);
    } else {
      console.error("Error updating personal data:", error);
    }
    throw error;
  }
};
