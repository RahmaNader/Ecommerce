import axios from "axios";
import apiClient from "../../apiClient";
import { PasswordResetData } from "@types";
import Cookies from "js-cookie"; // Ensure this is imported

// Add the base URL from environment variables
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export interface RegisterData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: number;
  dateOfBirth: string;
  model: string;
}

export interface ConfirmPasswordResetData {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Add token expiry management
export const setAuthTokens = (
  token: string,
  refreshToken: string,
  username?: string
) => {
  // Store tokens with secure settings
  Cookies.set("authToken", token, { path: "/", secure: true });
  Cookies.set("refreshToken", refreshToken, { path: "/", secure: true });
  if (username) {
    Cookies.set("username", username, { path: "/" });
  }
};

export const clearAuthTokens = () => {
  Cookies.remove("authToken");
  Cookies.remove("refreshToken");
  Cookies.remove("username");
};

export const registerUser = async (userData: RegisterData) => {
  try {
    console.log("Request payload:", userData);

    const response = await apiClient.post("/Account/register", userData);

    // Store tokens if present
    if (response.data.token && response.data.refreshToken) {
      setAuthTokens(
        response.data.token,
        response.data.refreshToken,
        response.data.username
      );
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error response: here", error.response?.data);
      console.log("Error status:", error.response?.status);
      console.log("Error headers:", error.response?.headers);
    }
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  const response = await apiClient.post("/Account/login", data);
  const { token, username, refreshToken } = response.data;

  if (token && refreshToken) {
    setAuthTokens(token, refreshToken, username);
  }

  return response.data;
};

export const requestPasswordReset = async (data: PasswordResetData) => {
  try {
    const response = await apiClient.post(
      "/Account/requestPasswordReset",
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error response:", error.response?.data);
      console.log("Error status:", error.response?.status);
      console.log("Error headers:", error.response?.headers);
    }
    throw error;
  }
};

// Add a new function to refresh tokens
export const refreshAuthToken = async (): Promise<boolean> => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      return false;
    }

    const response = await axios.post(`${baseUrl}/api/Account/refresh-token`, {
      refreshToken,
    });

    if (response.data && response.data.token && response.data.refreshToken) {
      setAuthTokens(response.data.token, response.data.refreshToken);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    clearAuthTokens();
    return false;
  }
};
export const confirmPasswordReset = async (data: ConfirmPasswordResetData) => {
  try {
    const response = await apiClient.post(
      "/Account/confirmPasswordReset",
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error response:", error.response?.data);
      console.log("Error status:", error.response?.status);
      console.log("Error headers:", error.response?.headers);
    }
    throw error;
  }
};
