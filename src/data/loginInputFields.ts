
import { LoginFormInputs } from "@types";

export const loginInputFields: Array<{
  id: keyof LoginFormInputs;
  type: string;
  placeholder: string;
  validation: Record<string, unknown>;
}> = [
  {
    id: "userName",
    type: "userName",
    placeholder: "User Name",
    validation: {
      required: "user name is required",
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
