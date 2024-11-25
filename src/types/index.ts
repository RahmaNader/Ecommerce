// src/types/index.ts
export interface CardProps {
    id: number;
    src: string;
    alt: string;
    name: string;
    DisPrice: number;
    NormalPrice: number;
    rate: number;
    size: string;
    category: string;
    collection: number;
    price: number;
  };

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
  
  