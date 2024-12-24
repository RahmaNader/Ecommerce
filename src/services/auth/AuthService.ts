// src/services/authService.ts
import axios from 'axios';
import apiClient from '../../apiClient';

export interface RegisterData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: number;
  dateOfBirth: string;
  model: string,
}

export interface LoginData {
  userName: string;
  password: string;
}

export const registerUser = async (userData: RegisterData) => {
  try {
    console.log('Request payload:', userData);
    
    const response = await apiClient.post('/Account/register', userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Error response: here', error.response?.data);
      console.log('Error status:', error.response?.status);
      console.log('Error headers:', error.response?.headers);
    }
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  const response = await apiClient.post('/Account/login', data);
  const { token, username } = response.data;
  if (token) {
    document.cookie = `authToken=${token}; path=/;`;
    document.cookie = `username=${username}; path=/;`;
  }
  return response.data;
};