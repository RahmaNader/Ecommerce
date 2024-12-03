// src/types/index.ts
export type SignUpFormInputs = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: string;
  day: string;
  month: string;
  year: string;
};

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type CardComponent = {
  id: number;
  src: string;
  alt: string;
  name: string;
  DisPrice: number;
  NormalPrice: number;
  rate: number;
  size: string[]; // Array of available sizes
  category: string;
  collection: number;
  description: string;
  color: string[]; // Array of available colors
  availableQuantity: number; // Stock quantity
  onClick?: () => void;
};

export type RatingDistributionItem = {
  rating: number;
  percentage: string;
  color: string;
}