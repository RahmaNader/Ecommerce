import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import IconGoogle from "@assets/Icon-Google.svg";
import { LoginFormInputs } from "@types";
import loginInputFields from "@data/loginInputFields";
import { loginUser } from "@services/auth/AuthService";
import { SuccessAlert, ErrorAlert, Button } from "@components/atoms";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGoogleLogin } from "@react-oauth/google"; // Add this import
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
  const googleLogin = useGoogleLogin({
    flow: "implicit",
    scope: "email profile",
    onSuccess: async (response) => {
      try {
        console.log("Google OAuth Response:", response);

        if (!response.access_token) {
          throw new Error("No access token received from Google");
        }

        // Get user info using the access token
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const userInfo = userInfoResponse.data;
        console.log("Google User Data:", userInfo);

        // Send access token and user info to backend
        const backendResponse = await apiClient.post(
          "/Account/authenticateGoogle",
          {
            token: response.access_token,
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture
          }
        );

        console.log("Backend Response:", backendResponse.data);

        if (backendResponse.data && backendResponse.data.succeeded) {
          // Success handling
          setAlert({
            type: "success",
            message: t("auth.successGoogleSignUp")
          });

          // Store token from your backend
          if (backendResponse.data.token) {
            localStorage.setItem("authToken", backendResponse.data.token);
          }

          setTimeout(() => {
            setAlert(null);
            navigate("/"); // Navigate to home page after successful login
          }, 2000);
        } else {
          // API returned success=false
          throw new Error(backendResponse.data.message || "Authentication failed");
        }
      } catch (error) {
        console.error("Google sign-in error:", error);
        
        let errorMessage = t("auth.googleLoginFailed");
        
        // Get more specific error messages if available
        if (axios.isAxiosError(error) && error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        setAlert({
          type: "error",
          message: errorMessage
        });
        
        setTimeout(() => setAlert(null), 3000);
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      setAlert({
        type: "error", 
        message: t("auth.googleLoginFailed")
      });
      setTimeout(() => setAlert(null), 3000);
    }
  });

  const handleGoogleLogin = () => {
    googleLogin();
  };

  const onSubmit = async (data: LoginFormInputs) => {
    // Existing code remains the same
    try {
      const result = await loginUser({ email: data.email, password: data.password });
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
        const errorMessage = error.response?.data?.message || t("auth.loginFailed");
        setAlert({ type: "error", message: errorMessage });
      } else {
        setAlert({ type: "error", message: t("auth.loginFailed") });
      }
      setTimeout(() => {
        setAlert(null);
      }, 3000);
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
        <button
          type="button"
          className="w-4/5 md:w-2/5 py-2 px-4 flex items-center justify-center m-auto border-2 border-ForthColor rounded-lg text-black text-[10px] md:text-[16px] hover:border-wine"
          onClick={handleGoogleLogin}
        >
          <img src={IconGoogle} alt="Google Icon" className="w-4 h-4 mr-2" />
          {t("auth.loginWithGoogle")}
        </button>

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