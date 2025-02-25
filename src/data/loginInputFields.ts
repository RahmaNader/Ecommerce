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
    placeholder: "auth.email",
    validation: {
      required: "auth.emailRequired",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "auth.invalidEmail",
      },
    },
  },
  {
    id: "password",
    type: "password",
    placeholder: "auth.password",
    validation: {
      required: "auth.passwordRequired",
      minLength: {
        value: 6,
        message: "auth.passwordMinLength",
      },
    },
  },
];

export default loginInputFields;
