import axios from "axios";
import Cookies from "js-cookie";

// Add the base URL from environment variables
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: `${baseUrl}/api`,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.get(
            `${baseUrl}/api/Account/refreshToken`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          const { token, refreshToken: newRefreshToken } = response.data;
          Cookies.set("authToken", token, {
            path: "/",
            secure: true,
            expires: 7,
          }); // 7 days
          // Also update the refresh token if provided
          if (newRefreshToken) {
            Cookies.set("refreshToken", newRefreshToken, {
              path: "/",
              secure: true,
              expires: 30,
            }); // 30 days
          }
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          Cookies.remove("authToken");
          Cookies.remove("refreshToken");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
