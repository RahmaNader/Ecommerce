import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { LoginFormInputs } from "@types";
import loginInputFields from "@data/loginInputFields";
import { loginUser, setAuthTokens } from "@services/auth/AuthService";
import { SuccessAlert, ErrorAlert, Button } from "@components/atoms";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"; // Add this import
import apiClient from "../../../apiClient"; // Add this import

interface LoginFormProps {
  onSwitchToSignUp: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignUp }) => {
  const { t } = useTranslation();

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  // Add Google login functionality
  const onSubmit = async (data: LoginFormInputs) => {
    // Existing code remains the same
    try {
      const result = await loginUser({
        email: data.email,
        password: data.password,
      });
      setAlert({
        type: "success",
        message: t("auth.successLogin", { userName: data.email }),
      });
      console.log("Login response:", result);
      setTimeout(() => {
        setAlert(null);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || t("auth.loginFailed");
        setAlert({ type: "error", message: errorMessage });
      } else {
        setAlert({ type: "error", message: t("auth.loginFailed") });
      }
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };
  const handleSuccess = async (resp: CredentialResponse) => {
    try {
      console.log("respasdasdasdasd", resp);
      const idToken = resp.credential;
      if (!idToken) throw new Error("Missing Google credential");

      const { data } = await apiClient.post("/Account/authenticateGoogle", {
        token: idToken,
      });
      console.log("DATTAAAAAA", data);
      if (data.token) {
        setAlert({ type: "success", message: t("auth.successGoogleSignUp") });
        setAuthTokens(data.token, data.refreshToken, data.username);
        setTimeout(() => {
          setAlert(null);
          navigate("/");
        }, 2000);
      } else {
        // fall back to whatever field your backend sends
        const msg = data.message || "Authentication failed";
        throw new Error(msg);
      }
    } catch (err) {
      // show a user-friendly alert
      setAlert({
        type: "error",
        message: err instanceof Error ? err.message : t("auth.registerFailed"),
      });
      console.error("Google login flow failed:", err);
    }
  };
  // Update the Google button's onClick handler
  return (
    <div className="bg-mainColor text-secondColor p-6 rounded w-full mx-auto">
      {/* Existing JSX */}
      {alert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          {alert.type === "success" ? (
            <SuccessAlert message={alert.message} />
          ) : (
            <ErrorAlert message={alert.message} />
          )}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Existing form fields */}
        {loginInputFields.map((field) => (
          <div key={field.id}>
            <input
              id={field.id}
              type={field.type}
              placeholder={t(`${field.placeholder}`)}
              {...register(field.id, field.validation)}
              className={`w-full px-4 py-2 mt-1 border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none`}
            />
            {errors[field.id] && (
              <p className="text-FifthColor text-sm mt-1">
                {t(errors[field.id]?.message as string)}
              </p>
            )}
          </div>
        ))}

        {/* Forgot Password Link */}
        <div className="flex justify-end mx-auto">
          <a href="/forgot-password" className="text-blue-600 text-sm mt-2">
            {t("auth.forgotPassword")}
          </a>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <Button
            type="primary"
            size="login-register"
            label={t("auth.loginButton")}
            onClick={() => {}}
          />
        </div>

        {/* Separator with Text */}
        <div className="relative flex items-center justify-center w-3/4 mx-auto">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ForthColor"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-mainColor px-2 text-ForthColor">
              {t("auth.orLoginWith")}
            </span>
          </div>
        </div>

        {/* Login with Google Button */}
        <div className="max-w-60 mx-auto">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() =>
              setAlert({ type: "error", message: t("auth.googleFailed") })
            }
          />
        </div>

        {/* Sign Up Link */}
        <div className="relative flex items-center justify-center w-3/4 mx-auto">
          <p className="font-playfair text-[10px] md:text-[28px] text-sixColor flex justify-center">
            {t("auth.noAccount")} &nbsp;
            <button
              onClick={onSwitchToSignUp}
              className="text-wine border-b-2 border-wine text-[10px] md:text-[28px]"
            >
              {t("auth.signUp")}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
