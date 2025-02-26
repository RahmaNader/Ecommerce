import React, { createContext, useState, ReactNode, useEffect } from "react";
import { loginUser, registerUser } from "@services/auth/AuthService";

interface User {
  id: string;
  userName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userName: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  };

  useEffect(() => {
    const authToken = getCookie("authToken");
    if (authToken) {;
      console.log("Token exists:", authToken);
      setUser({ id: "1", userName: "demoUser", email: "demo@example.com" });
    }
  }, []);

  const login = async (userName: string, password: string) => {
    try {
      const response = await loginUser({ userName, password });
      const { user, token } = response;
      console.log("auth user", user, token);
      setUser(user);

      if (token) {
        document.cookie = `authToken=${token}; path=/; HttpOnly; Secure;`;
      }
    } catch (error) {
      console.error("Login failed auth:", error);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await registerUser(userData);
      const { user, token } = response; 
      setUser(user);

      if (token) {
        document.cookie = `authToken=${token}; path=/; HttpOnly; Secure;`;
      }
    } catch (error) {
      console.error("Registration failed auth:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
