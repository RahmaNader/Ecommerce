// src/pages/Auth/LoginForm.tsx
import { useForm } from "react-hook-form";
import { Button } from "@components/atoms";
import IconGoogle from "@assets/Icon-Google.svg";
import { LoginFormInputs } from "@types";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Sign Up Data:", data);
    alert(`Sign-up successful! Welcome, ${data.email}`);
  };

  return (
    <div className="bg-mainColor text-secondColor p-6 rounded shadow-lg w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div>
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
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

        {/* Password Field */}
        <div>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
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

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <Button
            type="primary"
            size="login-register"
            label="Login"
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
              Or Log In With{" "}
            </span>
          </div>
        </div>

        {/* Login with Google Button */}
        <button
          type="button"
          className="w-4/5 md:w-2/5 py-2 px-4 flex items-center justify-center m-auto border-2 border-ForthColor rounded-lg text-black text-[10px] md:text-[16px] hover:border-wine"
          onClick={() => {}}
        >
          <img src={IconGoogle} alt="Google Icon" className="w-4 h-4 mr-2" />
          Log In with Google
        </button>

        <div className="relative flex items-center justify-center w-3/4 mx-auto">
          <p className="font-playfair text-[10px] md:text-[28px] text-sixColor flex justify-center">
            Don't have an account? &nbsp;
            <a
              href="/auth"
              className="text-wine border-b-2 border-wine text-[10px] md:text-[28px]"
            >
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
