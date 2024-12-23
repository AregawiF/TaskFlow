// @ts-nocheck
import React, { forwardRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../services/authApi';
import TaskFlowLogo from '../assets/taskflow-logo.png';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation(); // Initialize the mutation
  const [customError, setCustomError] = React.useState<string | null>(null); // Custom error state


  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      // console.log(data)
      const response = await login(data).unwrap();
      localStorage.setItem('token', response.token);
      navigate('/dashboard');                         // Redirect to dashboard after successful login
    } catch (err:any) {
      console.error('Login failed:', err);
      if (err.status === 401) {
        const message = err.data?.message || 'Login failed. Please try again.';

        setCustomError(message);
      } else {
        setCustomError('An unexpected error occurred. Please try again later.');
      }
    }
  };


  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 '>
    <div className=" mx-auto p-4 mt-20 bg-white shadow-md rounded-md flex">
      <div className='w-96 mx-auto mt-10'>
        <img src={TaskFlowLogo} alt="TaskFlow" className="mx-auto" />
      </div>
      <div className='login-form p-4 max-w-md mx-auto'>

      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {customError && (
        <div className="text-red-500 text-sm mb-4 text-center">
          {customError}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "invalid email address"}
          })} type="text" placeholder='Enter your email' className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5 h-10'
          />
          {errors.email && <p className='text-red-500 ml-10 aria-live="polite text-sm'>{errors.email.message}</p>}

        <input {...register("password", {
          required: "Password is required",
          minLength: {value: 6, message: "password must be at least 6 characters"}
        })} type="password" placeholder='Password' className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5 h-10'
        />
        {errors.password && <p className='text-red-500 ml-10 aria-live="polite" text-sm'>{errors.password.message}</p>}

        <button type='submit' className={`p-3 rounded-lg bg-blue-700 text-white font-semibold mt-7 w-full ${isSubmitting ? 'bg-blue-400': ''}`} disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Login'}</button>

      </form>
      <p className="mt-4 text-sm text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
