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

export default apiClient;