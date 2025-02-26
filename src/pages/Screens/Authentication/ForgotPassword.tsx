import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { requestPasswordReset } from "@services/auth/AuthService";
import { SuccessAlert, ErrorAlert } from "@components/atoms";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    try {
      const result = await requestPasswordReset({ email: data.email });

      setAlert({
        type: "success",
        message: t("auth.resetPasswordSuccess"),
      });

      console.log("Password reset request sent:", result);

      setTimeout(() => {
        setAlert(null);
        navigate("/authentication");
      }, 3000);
    } catch (error) {
      console.error("Password reset error:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || t("auth.resetPasswordFailed");
        setAlert({ type: "error", message: errorMessage });
      } else {
        setAlert({ type: "error", message: t("auth.resetPasswordFailed") });
      }

      setTimeout(() => {
        setAlert(null);
      }, 4000);
    }
  };

  return (
    <div className="bg-mainColor flex flex-col gap-6 text-secondColor p-6 rounded w-full mx-auto max-w-md">
      {alert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          {alert.type === "success" ? (
            <SuccessAlert message={alert.message} />
          ) : (
            <ErrorAlert message={alert.message} />
          )}
        </div>
      )}

      <h2 className="text-2xl font-bold text-center font-playfair">{t("auth.forgotPasswordTitle")}</h2>
      <p className="text-center text-base text-gray-600">{t("auth.forgotPasswordInstructions")}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
        <div>
          <input
            type="email"
            placeholder={t("auth.enterEmail")}
            {...register("email", { required: t("auth.emailRequired") })}
            className="w-full px-4 py-2 border rounded mb-4 border-ForthColor bg-ForthColor/[0.13] focus:outline-none"
          />
          {errors.email && <p className="text-FifthColor text-sm mt-1">{t(errors.email.message as string)}</p>}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-wine text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-200"
          >
            {t("auth.sendResetLink")}
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/authentication")}
          className="text-wine border-b border-wine hover:opacity-80"
        >
          {t("auth.backToLogin")}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
