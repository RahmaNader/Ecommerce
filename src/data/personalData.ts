import { PersonalData } from "@types";

export const personalDataFields: Array<{
  id: keyof PersonalData;
  type: string;
  placeholder: string;
  validation: Record<string, unknown>;
}> = [
  {
    id: "fullName",
    type: "text",
    placeholder: "Rahma Nader",
    validation: {
      required: "Full Name is required",
      minLength: {
        value: 3,
        message: "Full Name must be at least 3 characters",
      },
    },
  },
  {
    id: "phoneNumber",
    type: "tel",
    placeholder: "012345678912",
    validation: {
      required: "Phone Number is required",
      pattern: {
        value: /^\+?[1-9]\d{1,14}$/,
        message: "Invalid phone number format",
      },
    },
  },
  {
    id: "address",
    type: "text",
    placeholder: "Cairo",
    validation: {
      required: "Address is required",
      minLength: {
        value: 5,
        message: "Address must be at least 5 characters",
      },
    },
  },
  {
    id: "email",
    type: "email",
    placeholder: "r@gmail.com",
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

export default personalDataFields;