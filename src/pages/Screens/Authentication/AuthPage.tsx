// AuthPage.tsx

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleRegisterClick = () => {
    setIsLogin(false);
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="flex w-full max-w-md">
        <button
          onClick={handleLoginClick}
          className={`w-1/2 text-center font-playfair font-semibold text-[28px] ${
            isLogin ? 'border-b-2 border-wine text-wine' : 'text-ThirdColor border-b-2 border-ThirdColor'
          }`}
        >
        Log in
        </button>
        <button
          onClick={handleRegisterClick}
          className={`w-1/2 text-center font-playfair font-semibold text-2xl ${
            !isLogin ? 'border-b-2 border-wine text-wine' : 'text-ThirdColor border-b-2 border-ThirdColor'
          }`}
        >
          Sign Up
        </button>
      </div>
      <div className="border p-6 w-full max-w-md">
        {isLogin ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default AuthPage;