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
    placeholder: "profile.fullName",
    validation: {
      required: "profile.fullNameRequired",
      minLength: {
        value: 3,
        message: "profile.fullNameMinLength",
      },
    },
  },
  {
    id: "phoneNumber",
    type: "tel",
    placeholder: "profile.phoneNumber",
    validation: {
      required: "profile.phoneNumberRequired",
      pattern: {
        value: /^\+?[1-9]\d{1,14}$/,
        message: "profile.invalidPhoneNumber",
      },
    },
  },
  {
    id: "address",
    type: "text",
    placeholder: "profile.address",
    validation: {
      required: "profile.addressRequired",
      minLength: {
        value: 5,
        message: "profile.addressMinLength",
      },
    },
  },
  {
    id: "email",
    type: "email",
    placeholder: "profile.email",
    validation: {
      required: "profile.emailRequired",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "profile.invalidEmail",
      },
    },
  },
];

export default personalDataFields;