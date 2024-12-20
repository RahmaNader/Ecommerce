// src/services/authService.ts
import apiClient from '../apiClient'

export interface RegisterData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: number;
  dateOfBirth: string;
}

export interface LoginData {
  userNameOrEmail: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await apiClient.post('/Account/register', data);
  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await apiClient.post('/Account/login', data);
  return response.data;
};