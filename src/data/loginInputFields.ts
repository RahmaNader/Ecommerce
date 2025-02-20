import { LoginFormInputs } from "@types";

export const loginInputFields: Array<{
  id: keyof LoginFormInputs;
  type: string;
  placeholder: string;
  validation: Record<string, unknown>;
}> = [
  {
    id: "userName",
    type: "text", // "userName" is not a valid type, so changing it to "text"
    placeholder: "auth.userName", // Using translation key
    validation: {
      required: "auth.userNameRequired", // Translation key for validation
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
