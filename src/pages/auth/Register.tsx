// Register.jsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useUserAPI from '../../hooks/useUserAPI';
import { Link } from 'react-router-dom';
import ErrorPopup from '../../components/ErrorPopup';

// Define your Zod schema
const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Confirm Password must be at least 8 characters' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const { loading, error, registerUser } = useUserAPI();

  // Initialize React Hook Form with Zod resolver
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: FormData) => {
    registerUser(data);
  };

  useEffect(() => {
    if (error) {
      handleError();
    }
  }, [error]);

  const handleError = () => {
    document.body.classList.add('overflow-hidden');
    setShowErrorPopup(true);
  };

  const closeErrorPopup = () => {
    document.body.classList.remove('overflow-hidden');
    setShowErrorPopup(false);
  };

  return (
    <>
      <div className="w-[30rem]">
        <h1 className="text-[50px] leading-[73px] font-['poppins'] font-bold mb-14 text-white">
          Register Now!
        </h1>

        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <input
              {...register('email')}
              type="email"
              id="email"
              name="email"
              placeholder="e-mail"
              className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px] font-medium p-0.5 pl-10 text-[#083F46] h-[3.4rem] w-[30rem]"
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
              {...register('password')}
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px] font-medium p-0.5 pl-10 text-[#083F46] h-[3.4rem] w-[30rem]"
            />
            {errors.password && <p>{errors.password.message}</p>}

            <input
              {...register('confirmPassword')}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="confirm password"
              className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px] font-medium p-0.5 pl-10 text-[#083F46] h-[3.4rem] w-[30rem]"
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

            <div className="mt-10 font-['poppins'] text-[1.438rem] leading-[3.125rem] text-white">
              <button
                disabled={loading}
                className="px-12 py-1 border-[2px] rounded-full"
              >
                {loading? "Submitting..." : "register"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showErrorPopup && (
        <ErrorPopup errorMessage={error} onClose={closeErrorPopup} />
      )}
      <Link
        to="../"
        className="font-['poppins'] text-[1.438rem] leading-[3.125rem] text-white underline cursor-pointer mt-16 w-[30rem]"
      >
        {"< "}Back to login
      </Link>
    </>
  );
};

export default Register;