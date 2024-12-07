// src/data/inputFields.ts
import { LoginFormInputs } from "@types";

export const loginInputFields: Array<{
  id: keyof LoginFormInputs;
  type: string;
  placeholder: string;
  validation: Record<string, unknown>;
}> = [
  {
    id: "email",
    type: "email",
    placeholder: "Email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email address",
      },
    },
  },
  {
    id: "password",
    type: "password",
    placeholder: "Password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },
];

export default loginInputFields;
