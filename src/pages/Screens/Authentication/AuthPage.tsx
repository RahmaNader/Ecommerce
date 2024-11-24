// AuthPage.tsx
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleRegisterClick = () => {
    setIsLogin(false);
  };

  return (
    <div className="flex w-4/5 flex-col justify-center items-center mt-12 mx-auto">
      <div className="flex w-full">
        <button
          onClick={handleLoginClick}
          className={`w-1/2 text-center font-playfair font-semibold text-[15px] md:text-[28px] pb-4 ${
            isLogin
              ? "border-b-2 border-wine text-wine"
              : "text-ThirdColor border-b-2 border-ThirdColor"
          }`}
        >
          Log in
        </button>
        <button
          onClick={handleRegisterClick}
          className={`w-1/2 text-center font-playfair font-semibold text-[15px] md:text-[28px] pb-4 ${
            !isLogin
              ? "border-b-2 border-wine text-wine"
              : "text-ThirdColor border-b-2 border-ThirdColor"
          }`}
        >
          Create Account
        </button>
      </div>

      <div className="w-full">{isLogin ? <LoginForm /> : <SignUpForm />}</div>
    </div>
  );
};

export default AuthPage;
