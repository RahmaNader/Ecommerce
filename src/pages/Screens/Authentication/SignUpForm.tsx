import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MuiTelInput } from "mui-tel-input";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "react-phone-input-2/lib/style.css";
import { SignUpFormInputs } from "@types";
import { registerUser, setAuthTokens } from "@services/auth/AuthService";
import { ErrorAlert, SuccessAlert, Button } from "@components/atoms";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { CredentialResponse } from "@react-oauth/google";
import apiClient from "../../../apiClient";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
interface SignUpFormProps {
  onSwitchToLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToLogin }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    setError,
  } = useForm<SignUpFormInputs>();

  const password = watch("password");

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
      console.log(result);
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
        const errorData = error.response?.data;

        // CASE 1: Plain string error like "Email is already registered!"
        if (typeof errorData === "string") {
          // Try to map it to a specific field if possible
          if (errorData.toLowerCase().includes("email")) {
            setError("email", {
              type: "manual",
              message: errorData,
            });
            return;
          }

          // Fallback to general alert
          setAlert({
            type: "error",
            message: errorData,
          });
          return;
        }

        // CASE 2: Validation object with `errors` dictionary
        if (errorData?.errors && typeof errorData.errors === "object") {
          Object.entries(errorData.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              setError(field as keyof SignUpFormInputs, {
                type: "manual",
                message: messages[0],
              });
            }
          });
          return;
        }
      }

      setAlert({
        type: "error",
        message: t("auth.registerFailed"), // fallback translation
      });

      setTimeout(() => setAlert(null), 3000);
    }

    setTimeout(() => setAlert(null), 3000);
  };

  // Create a custom theme to match your website's styling
  const phoneInputTheme = createTheme({
    palette: {
      primary: {
        main: "#A78E78", // wine color from your app
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "0.25rem",
            backgroundColor: "rgba(167, 142, 120, 0.13)",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#A78E78",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#A78E78",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#A78E78",
            },
          },
          input: {
            color: "#A78E78",
            "&::placeholder": {
              color: "#A78E78",
              opacity: 0.7,
            },
          },
        },
      },
    },
  });

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
          {/* <p className="mt-2 text-xs text-gray-500 ms-2">
            email must be unique. you cant use the same email to register
            multiple accounts.
          </p> */}

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
              validate: (value) => {
                // Basic validation for phone format
                if (!value || value.trim().length < 11) {
                  return t("auth.phoneMinLength");
                }
                return true;
              },
            }}
            render={({ field }) => (
              <ThemeProvider theme={phoneInputTheme}>
                <MuiTelInput
                  {...field}
                  value={field.value || ""}
                  onChange={(newValue) => field.onChange(newValue)}
                  defaultCountry="EG"
                  placeholder={t("auth.phoneNumber")}
                  className="w-full"
                  focusOnSelectCountry
                  langOfCountryName="en"
                  forceCallingCode={true}
                  // Add RTL support
                  dir={document.dir || "ltr"}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: document.dir === "rtl" ? "right" : "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: document.dir === "rtl" ? "right" : "left",
                    },
                  }}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      width: "100%",
                      height: "45px",
                      backgroundColor: "rgba(167, 142, 120, 0.13)",
                      color: "#A78E78",
                      borderColor: "#A78E78",
                      textAlign: document.dir === "rtl" ? "right" : "left",
                      fontFamily: "Poppins, sans-serif", // Match other inputs font
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "11px",
                      padding: "14px",
                      textAlign: document.dir === "rtl" ? "right" : "left",
                      fontFamily: "Poppins, sans-serif", // Match other inputs font
                      fontSize: "15px", // Match text size with other form fields
                    },
                    "& input::placeholder": {
                      textAlign: document.dir === "rtl" ? "right" : "left",
                      fontFamily: "Poppins, sans-serif", // Match placeholder font
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#A78E78",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#A78E78",
                    },
                    "& .MuiTelInput-Flag": {
                      marginRight: document.dir === "rtl" ? "0" : "8px",
                      marginLeft: document.dir === "rtl" ? "8px" : "0",
                      order: document.dir === "rtl" ? "1" : "0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#A78E78",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#A78E78",
                    },
                    // Apply font to the dropdown menu as well
                    "& .MuiMenu-paper": {
                      fontFamily: "Poppins, sans-serif",
                    },
                  }}
                />
              </ThemeProvider>
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
          {/* <p className="mt-2 text-xs text-gray-500 ms-2">
            Password must contain at least one uppercase letter, one lowercase
            letter, one digit, and one special character.
          </p> */}
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
        <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 ltr:md:space-x-4 w-full">
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
          <div className="flex flex-wrap md:flex-nowrap justify-between md:justify-end space-x-0 ltr:md:space-x-2 w-full md:w-1/2 ltr:gap-0 rtl:gap-4">
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
        <div className="max-w-60 mx-auto">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() =>
              setAlert({ type: "error", message: t("auth.googleFailed") })
            }
          />
        </div>
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
