import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SignUpFormInputs } from "@types";
import { Button } from "@components/atoms";
import IconGoogle from "@assets/Icon-Google.svg";

const SignUpForm = () => {
  
  const { 
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<SignUpFormInputs>();

  const password = watch("password");

  const onSubmit = (data: SignUpFormInputs) => {
    console.log("Sign Up Data:", data);
    alert(`Sign-up successful! Welcome, ${data.fullName}`);
  };

  return (
    <div className="bg-mainColor text-secondColor p-6 rounded shadow-lg w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name Field */}
        <div>
          <input
            id="fullName"
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: "Full name is required" })}
            className={`w-full px-4 py-2 mt-1 border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none`}
          />
          {errors.fullName && (
            <p className="text-FifthColor text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

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

        {/* Phone Number Field with Country Code */}
        <div>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={"eg"}
                placeholder="Phone Number"
                containerClass="w-full"
                inputStyle={{
                  width: "100%",
                  borderColor: "#A78E78",
                  backgroundColor: "rgba(167, 142, 120, 0.13)",
                  color: "#A78E78",
                }}
                buttonStyle={{
                  borderColor: "#A78E78",
                }}
                dropdownStyle={{
                  width: "250px",
                }}
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

        {/* Confirm Password Field */}
        <div>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
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
        <div className="flex items-center justify-between space-x-4">
          {/* Gender Dropdown */}
          <div className="w-1/2">
            <div>
              <select
                id="gender"
                {...register("gender", { required: "Gender is required" })}
                className="w-full py-2 mt-1 border rounded text-ForthColor text-[15px] border-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-FifthColor text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          {/* Dates Dropdowns */}
          <div className="flex justify-end space-x-2 w-1/2">
            {/* Day Dropdown */}
            <div className="w-1/4">
              <select
                id="day"
                {...register("day", { required: "Day is required" })}
                className="w-full py-2 mt-1 border rounded text-ForthColor text-[15px] border-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
              >
                <option value="">DD</option>
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
                {...register("month", { required: "Month is required" })}
                className="w-full py-2 mt-1 border rounded text-ForthColor text-[15px] border-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
              >
                <option value="">MM</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
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
                {...register("year", { required: "Year is required" })}
                className="w-full py-2 mt-1 border rounded text-ForthColor text-[15px] border-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none"
              >
                <option value="">YYYY</option>
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
        <Button type="primary" size="login-register" label="Register" onClick={() => {}} />
        </div>

        {/* Separator with Text */}
        <div className="relative flex items-center justify-center w-3/4 mx-auto">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ForthColor"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-mainColor px-2 text-ForthColor">Or Sign Up With </span>
          </div>
        </div>

        {/* Login with Google Button */}
        <button
          type='button'
          className='w-4/5 md:w-2/5 py-2 px-4 flex items-center justify-center m-auto border-2 border-ForthColor rounded-lg text-black text-[10px] md:text-[16px] hover:border-wine'
          onClick={() => {}}
        >
          <img src={IconGoogle} alt="Google Icon" className="w-4 h-4 mr-2" />
          Sign Up with Google
        </button>
        
        <div className="relative flex items-center justify-center w-3/4 mx-auto">
        <p className="font-playfair text-[10px] md:text-[28px] text-sixColor flex justify-center">
          Already have an account?  &nbsp;
          <a href="/auth" className="text-wine border-b-2 border-wine text-[10px] md:text-[28px]">
            Log in
          </a>
        </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
