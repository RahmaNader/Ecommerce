import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.bouraq-mt.com/royalkey/api',
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
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
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.get('https://www.bouraq-mt.com/royalkey/api/Account/refreshToken', {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          const { token } = response.data;
          Cookies.set('authToken', token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
          Cookies.remove('authToken');
          Cookies.remove('refreshToken');
          window.location.href = '/authentication';
        }
      }
    }
    return Promise.reject(error);
  }
);


export default apiClient;