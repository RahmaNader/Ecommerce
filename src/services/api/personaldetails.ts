import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://www.bouraq-mt.com/royalkey/api/PersonalData/personal-data";

// Function to retrieve the Bearer token
const getAuthToken = (): string | null => {
  return Cookies.get("authToken") || null;
};

// Function to fetch personal data
export const fetchPersonalData = async () => {
    const token = getAuthToken();
    console.log("Token:", token);
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
    } catch {
      if (error.response && error.response.status === 401) {
        console.error("401 Unauthorized - Token might be invalid or expired");
        Cookies.remove("authToken");
        window.location.href = "/authentication";
      } else {
        console.error("Error fetching personal data:", error.response || error);
      }
      throw error;
    }
  };
  
  

// Function to update personal data
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
    } catch {
      if (error.response) {
        console.error("API Response Error:", error.response.data);
      } else {
        console.error("Error updating personal data:", error);
      }
      throw error;
    }
  };
