// Login.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useUserAPI from '../../hooks/useUserAPI';
import { Link } from 'react-router-dom';
import ErrorPopup from '../../components/ErrorPopup';

// Define your Zod schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

// Define the type for your form data
interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);
  const { loading, error, loginUser } = useUserAPI();

  // Initialize React Hook Form with Zod resolver
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: FormData) => {
    loginUser(data);
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
      <div className="mb-14 text-white inline-flex flex-col items-start w-[30rem]">
        <h1 className="text-[50px] leading-[73px] font-['poppins'] font-bold mb-4">
          Hi there,
        </h1>
        <h2 className="font-['poppins'] text-[35px] leading-[40px]">
          Welcome to our
          <br />
          contacts portal
        </h2>
      </div>
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
          {errors.email?.message?? ''}

          <input
            {...register('password')}
            type="password"
            id="password"
            name="password"
            placeholder="password"
            className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px] font-medium p-0.5 pl-10 text-[#083F46] h-[3.4rem] w-[30rem]"
          />
          {errors.password?.message?? ''}

          <div className="flex flex-row items-center justify-start mt-14 font-['poppins'] text-[1.438rem] leading-[3.125rem] text-white">
            <button
              type="submit"
              disabled={loading}
              className="px-12 py-1 border-[2px] rounded-full"
            >
              {loading? "Wait..." : "login"}
            </button>{" "}
            <p className="mx-4">or</p>
            <Link to="/register" className="underline cursor-pointer">
              Click here to Register
            </Link>
          </div>
        </form>
      </div>
      {showErrorPopup && (
        <ErrorPopup errorMessage={error} onClose={closeErrorPopup} />
      )}
    </>
  );
};

export default Login;