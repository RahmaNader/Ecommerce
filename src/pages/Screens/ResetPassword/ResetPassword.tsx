import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { SuccessAlert, ErrorAlert } from "@components/atoms";
import { useTranslation } from "react-i18next";
import { confirmPasswordReset } from "@services/auth/AuthService";

type FormValues = {
  password: string;
  confirmPassword: string;
};

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const email = params.get("email");
  const token = params.get("token");

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  /* 🔒 If the link is malformed, bounce to “Forgot Password” */
  useEffect(() => {
    if (!email || !token) navigate("/forgot-password", { replace: true });
  }, [email, token, navigate]);

  const onSubmit = async ({ password, confirmPassword }: FormValues) => {
    try {
      await confirmPasswordReset({
        email: email!,
        token: token!,
        newPassword: password,
        confirmPassword, // same key the API expects
      });

      setAlert({ type: "success", message: t("auth.resetPasswordDone") });
      setTimeout(() => {
        setAlert(null);
        navigate("/authentication");
      }, 3000);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || t("auth.resetPasswordFailed")
        : t("auth.resetPasswordFailed");

      setAlert({ type: "error", message: errorMessage });
      setTimeout(() => setAlert(null), 4000);
    }
  };

  return (
    <div className="bg-mainColor flex flex-col gap-6 text-secondColor p-6 rounded w-full mx-auto max-w-md">
      {/* Toast */}
      {alert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          {alert.type === "success" ? (
            <SuccessAlert message={alert.message} />
          ) : (
            <ErrorAlert message={alert.message} />
          )}
        </div>
      )}

      {/* Heading + instructions — identical spacing to ForgotPassword */}
      <h2 className="text-2xl font-bold text-center font-playfair">
        {t("auth.resetPasswordTitle")}
      </h2>
      <p className="text-center text-base text-gray-600">
        {t("auth.resetPasswordInstructions")}
      </p>

      {/* Form — same wrapper classes */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
        {/* Password */}
        <div>
          <input
            type="password"
            placeholder={t("auth.newPassword")}
            {...register("password", {
              required: t("auth.passwordRequired"),
              minLength: { value: 6, message: t("auth.passwordMinLength") },
            })}
            className="w-full px-4 py-2 border rounded mb-4 border-ForthColor bg-ForthColor/[0.13] focus:outline-none"
          />
          {errors.password && (
            <p className="text-FifthColor text-sm mt-1">
              {errors.password.message as string}
            </p>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <input
            type="password"
            placeholder={t("auth.confirmPassword")}
            {...register("confirmPassword", {
              validate: (val) =>
                val === watch("password") || t("auth.passwordsDontMatch"),
            })}
            className="w-full px-4 py-2 border rounded mb-4 border-ForthColor bg-ForthColor/[0.13] focus:outline-none"
          />
          {errors.confirmPassword && (
            <p className="text-FifthColor text-sm mt-1">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-wine text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-50 transition duration-200"
          >
            {t("auth.saveNewPassword")}
          </button>
        </div>
      </form>

      {/* Back link */}
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

export default ResetPassword;
