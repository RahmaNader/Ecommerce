import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Breadcrumb } from "@components/molecules";
import { useTranslation } from "react-i18next";

const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleRegisterClick = () => {
    setIsLogin(false);
  };

  return (
    <div className="flex w-4/5 flex-col my-6 justify-center items-center mx-auto">
      <div className="flex justify-start w-full">
        <Breadcrumb />
      </div>

      <div className="flex w-full mt-4">
        <button
          onClick={handleLoginClick}
          className={`w-1/2 text-center font-playfair font-semibold text-[15px] md:text-[28px] pb-4 ${
            isLogin
              ? "border-b-2 border-wine text-wine"
              : "text-ThirdColor border-b-2 border-ThirdColor"
          }`}
        >
          {t("auth.login")}
        </button>
        <button
          onClick={handleRegisterClick}
          className={`w-1/2 text-center font-playfair font-semibold text-[15px] md:text-[28px] pb-4 ${
            !isLogin
              ? "border-b-2 border-wine text-wine"
              : "text-ThirdColor border-b-2 border-ThirdColor"
          }`}
        >
          {t("auth.createAccount")}
        </button>
      </div>

      <div className="w-full">
        {isLogin ? (
          <LoginForm onSwitchToSignUp={handleRegisterClick} />
        ) : (
          <SignUpForm onSwitchToLogin={handleLoginClick} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
