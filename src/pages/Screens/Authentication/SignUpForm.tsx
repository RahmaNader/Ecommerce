import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SignUpFormInputs } from "@types";
import IconGoogle from "@assets/Icon-Google.svg";
import { registerUser } from "@services/auth/AuthService";
import { ErrorAlert, SuccessAlert, Button } from "@components/atoms";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useGoogleLogin } from "@react-oauth/google";
import apiClient from "../../../apiClient";

interface SignUpFormProps {
  onSwitchToLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToLogin }) => {
  const { t } = useTranslation();
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<SignUpFormInputs>();

  const password = watch("password");
  
  // Use the Google login hook
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
            onSwitchToLogin();
          }, 2000);
        } else {
          // API returned success=false
          throw new Error(backendResponse.data.message || "Authentication failed");
        }
      } catch (error) {
        console.error("Google sign-in error:", error);
        
        let errorMessage = t("auth.googleSignUpFailed");
        
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
        message: t("auth.googleSignUpFailed")
      });
      setTimeout(() => setAlert(null), 3000);
    }
  });

  const handleGoogleSignUp = () => {
    googleLogin();
  };

  const onSubmit = async (formData: SignUpFormInputs) => {
    try {
      const paddedMonth = formData.month.padStart(2, "0");
      const paddedDay = formData.day.padStart(2, "0");
      const dateOfBirth = `${formData.year}-${paddedMonth}-${paddedDay}`;
      const genderValue = parseInt(formData.gender, 10);

      const result = await registerUser({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phoneNumber: formData.phoneNumber,
        gender: genderValue,
        dateOfBirth: dateOfBirth,
        model: "web",
      });

      console.log("Registration response:", result);
      setAlert({
        type: "success",
        message: t("auth.registersuccess"),
      });

      setTimeout(() => {
        setAlert(null);
        onSwitchToLogin();
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data;

        if (
          errorMessage.toLowerCase().includes("already registered") ||
          errorMessage.toLowerCase().includes("already exists")
        ) {
          setAlert({
            type: "error",
            message: t("auth.usernameTaken"),
          });
        } else {
          setAlert({
            type: "error",
            message: errorMessage,
          });
        }
      }
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="bg-mainColor text-secondColor p-6 rounded w-full mx-auto">
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
        {/* Full Name Field */}
        <div>
          <input
            id="userName"
            type="text"
            placeholder={t("auth.userName")}
            {...register("userName", { required: t("auth.userNameRequired") })}
            className={`w-full px-4 py-2 mt-1 border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none`}
          />
          {errors.userName && (
            <p className="text-FifthColor text-sm mt-1">
              {errors.userName.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            id="email"
            type="email"
            placeholder={t("auth.email")}
            {...register("email", {
              required: t("auth.emailRequired"),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t("auth.invalidEmail"),
              },
            })}
            className={`w-full px-4 py-2 mt-1 border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none`}
          />
          {errors.email && (
            <p className="text-FifthColor text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Number Field with Country Code */}
        <div>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ 
              required: t("auth.phoneRequired"),
              pattern: {
                value: /^[0-9]+$/,
                message: t("auth.invalidPhone"),
              },
              minLength: {
                value: 11,
                message: t("auth.phoneMinLength"),
              }
            }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={"eg"}
                placeholder={t("auth.phoneNumber")}
                containerClass="w-full ltr:text-left rtl:text-right"
                inputStyle={{
                  width: "100%",
                  borderColor: "#A78E78",
                  backgroundColor: "rgba(167, 142, 120, 0.13)",
                  color: "#A78E78",
                  alignItems: "center",
                }}
                buttonStyle={{
                  borderColor: "#A78E78",
                }}
                dropdownStyle={{
                  width: "250px",
                }}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="text-FifthColor text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <input
            id="password"
            type="password"
            placeholder={t("auth.password")}
            {...register("password", {
              required: t("auth.passwordRequired"),
              minLength: {
                value: 6,
                message: t("auth.passwordMinLength"),
              },
            })}
            className={`w-full px-4 py-2 mt-1 border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none`}
          />
          {errors.password && (
            <p className="text-FifthColor text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <input
            id="confirmPassword"
            type="password"
            placeholder={t("auth.confirmPassword")}
            {...register("confirmPassword", {
              required: t("auth.confirmPasswordRequired"),
              validate: (value) =>
                value === password || t("auth.passwordsNotMatch"),
            })}
            className={`w-full px-4 py-2 mt-1 border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none`}
          />
          {errors.confirmPassword && (
            <p className="text-FifthColor text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Gender and Dates Row */}
        <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Gender Dropdown */}
          <div className="w-full md:w-1/2">
            <select
              id="gender"
              {...register("gender", { required: t("auth.genderRequired") })}
              className="w-full py-2 mt-1 border rounded text-ForthColor text-[15px] border-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
            >
              <option value="">{t("auth.gender")}</option>
              <option value="0">{t("auth.male")}</option>
              <option value="1">{t("auth.female")}</option>
            </select>
            {errors.gender && (
              <p className="text-FifthColor text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Dates Dropdowns */}
          <div className="flex flex-wrap md:flex-nowrap justify-between md:justify-end space-x-0 md:space-x-2 w-full md:w-1/2 ltr:gap-0 rtl:gap-4">
            {/* Day Dropdown */}
            <div className="w-1/4">
              <select
                id="day"
                {...register("day", { required: t("auth.dayRequired") })}
                className="w-full py-2 mt-1 border rounded text-ForthColor text-[15px] border-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
              >
                <option value="">{t("auth.day")}</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {errors.day && (
                <p className="text-FifthColor text-sm mt-1">
                  {errors.day.message}
                </p>
              )}
            </div>

            {/* Month Dropdown */}
            <div className="w-1/4">
              <select
                id="month"
                {...register("month", { required: t("auth.monthRequired") })}
                className="w-full py-2 mt-1 border rounded text-ForthColor text-[15px] border-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
              >
                <option value="">{t("auth.month")}</option>
                {[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                ].map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              {errors.month && (
                <p className="text-FifthColor text-sm mt-1">
                  {errors.month.message}
                </p>
              )}
            </div>

            {/* Year Dropdown */}
            <div className="w-1/4">
              <select
                id="year"
                {...register("year", { required: t("auth.yearRequired") })}
                className="w-full py-2 mt-1 border rounded text-ForthColor text-[15px] border-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
              >
                <option value="">{t("auth.year")}</option>
                {Array.from(
                  { length: 100 },
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.year && (
                <p className="text-FifthColor text-sm mt-1">
                  {errors.year.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <Button
            type="primary"
            size="login-register"
            label={t("auth.register")}
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
            {t("auth.orSignUpWith")}
            </span>
          </div>
        </div>

        {/* Login with Google Button */}
        <button
          type="button"
          className="w-4/5 md:w-2/5 py-2 px-4 flex items-center justify-center m-auto border-2 border-ForthColor rounded-lg text-black text-[10px] md:text-[16px] hover:border-wine"
          onClick={handleGoogleSignUp}
        >
          <img src={IconGoogle} alt="Google Icon" className="w-4 h-4 mr-2" />
          {t("auth.signUpWithGoogle")}
        </button>

        <div className="relative flex items-center justify-center w-3/4 mx-auto">
          <p className="font-playfair text-[10px] md:text-[28px] text-sixColor flex justify-center">
          {t("auth.haveAccount")} &nbsp;
            <button
              onClick={onSwitchToLogin}
              className="text-wine border-b-2 border-wine text-[10px] md:text-[28px]"
            >
              {t("auth.login")}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
