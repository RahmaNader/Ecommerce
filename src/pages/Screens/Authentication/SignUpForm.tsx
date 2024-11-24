import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { SignUpFormInputs } from '@types';


const SignUpForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<SignUpFormInputs>();

  const password = watch('password');

  const onSubmit = (data: SignUpFormInputs) => {
    console.log('Sign Up Data:', data);
    alert(`Sign-up successful! Welcome, ${data.fullName}`);
  };


  return (
    <div className='App bg-mainColor text-secondColor p-6 rounded shadow-lg w-full max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-wine'>Sign Up Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Full Name Field */}
        <div>
          <input
            id='fullName'
            type='text'
            placeholder='Full Name'
            {...register('fullName', { required: 'Full name is required' })}
            className={`w-full px-4 py-2 mt-1 border rounded border-forthColor placeholder-forthColor bg-forthColor-opacity input-focus`}
          />
          {errors.fullName && (
            <p className='text-fifthColor text-sm mt-1'>
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            id='email'
            type='email'
            placeholder='Email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            className={`w-full px-4 py-2 mt-1 border rounded border-forthColor placeholder-forthColor bg-forthColor-opacity input-focus`}
          />
          {errors.email && (
            <p className='text-fifthColor text-sm mt-1'>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Number Field with Country Code */}
        <div>
          <Controller
            name='phoneNumber'
            control={control}
            rules={{ required: 'Phone number is required' }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={'us'}
                placeholder='Phone Number'
                containerClass='w-full'
                inputStyle={{
                  width: '100%',
                  borderColor: 'var(--forthColor)',
                  backgroundColor: 'rgba(167, 142, 120, 0.13)',
                  color: 'var(--forthColor)',
                }}
                buttonStyle={{
                  borderColor: 'var(--forthColor)',
                }}
              />
            )}
          />
          {errors.phoneNumber && (
            <p className='text-fifthColor text-sm mt-1'>
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <input
            id='password'
            type='password'
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className={`w-full px-4 py-2 mt-1 border rounded border-forthColor placeholder-forthColor bg-forthColor-opacity input-focus`}
          />
          {errors.password && (
            <p className='text-fifthColor text-sm mt-1'>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <input
            id='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: value => value === password || 'Passwords do not match',
            })}
            className={`w-full px-4 py-2 mt-1 border rounded border-forthColor placeholder-forthColor bg-forthColor-opacity input-focus`}
          />
          {errors.confirmPassword && (
            <p className='text-fifthColor text-sm mt-1'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Gender, Day, Month, Year Fields */}
        <div className='flex space-x-4'>
          {/* Gender Dropdown */}
          <div>
            <select
              id='gender'
              {...register('gender', { required: 'Gender is required' })}
              className='w-full px-4 py-2 mt-1 border rounded border-forthColor placeholder-forthColor bg-forthColor-opacity input-focus'
            >
              <option value=''>Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
            {errors.gender && (
              <p className='text-fifthColor text-sm mt-1'>
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Day Dropdown */}
          <div>
            <select
              id='day'
              {...register('day', { required: 'Day is required' })}
              className='w-full px-4 py-2 mt-1 border rounded border-forthColor placeholder-forthColor bg-forthColor-opacity input-focus'
            >
              <option value=''>Day</option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {errors.day && (
              <p className='text-fifthColor text-sm mt-1'>
                {errors.day.message}
              </p>
            )}
          </div>

          {/* Month Dropdown */}
          <div>
            <select
              id='month'
              {...register('month', { required: 'Month is required' })}
              className='w-full px-4 py-2 mt-1 border rounded border-forthColor placeholder-forthColor bg-forthColor-opacity input-focus'
            >
              <option value=''>Month</option>
              {[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ].map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            {errors.month && (
              <p className='text-fifthColor text-sm mt-1'>
                {errors.month.message}
              </p>
            )}
          </div>

          {/* Year Dropdown */}
          <div>
            <select
              id='year'
              {...register('year', { required: 'Year is required' })}
              className='w-full px-4 py-2 mt-1 border rounded border-forthColor placeholder-forthColor bg-forthColor-opacity input-focus'
            >
              <option value=''>Year</option>
              {Array.from(
                { length: 100 },
                (_, i) => new Date().getFullYear() - i
              ).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.year && (
              <p className='text-fifthColor text-sm mt-1'>
                {errors.year.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full py-2 px-4 bg-primary text-white font-semibold rounded hover:opacity-90'
        >
          Sign Up
        </button>

        {/* Separator */}
        <div className='border-t border-gray-300 my-4'></div>

        {/* Login with Google Button */}
        <button
          type='button'
          className='w-full py-2 px-4 bg-red-500 text-white font-semibold rounded hover:opacity-90'
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
