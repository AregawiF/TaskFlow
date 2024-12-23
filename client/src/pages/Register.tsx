
import React from 'react';
import {SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../services/authApi';

interface RegisterFormInputs {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;  

}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterMutation();          // Initialize the mutation

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error && 'status' in error ? (
          <div>Error: {error.status}</div>
        ) : (
          <div>Error: {error.message}</div>
        )}
      </div>
    );
  }

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (formdata: RegisterFormInputs) => {
    console.log(formdata);
    if (formdata.password !== formdata.confirmPassword) {
      console.log('Passwords do not match');
    } else {
      try {
        console.log(formdata);
        const response = await registerUser(formdata).unwrap();
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
        console.log('User registered successfully');
      } catch (err) {
        console.error('Registration failed:', err);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('name', { required: 'Name is required' })}
          type="name"
          placeholder="Enter your name" className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5 h-10'
        />
        {errors.name && <p className='text-red-500 ml-10 aria-live="polite text-sm'>{errors.name.message}</p>}


        <input {...register("email", {
          required: "Email is required",
          pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address"}
          })} type="text" placeholder='Enter your email' className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5 h-10'
        />
          {errors.email && <p className='text-red-500 ml-10 aria-live="polite text-sm'>{errors.email.message}</p>}


        <input {...register('username', { required: 'Username is required' })}
          type="text" placeholder="Enter your username" className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5 h-10'
          />
        {errors.username && <p className='text-red-500 ml-10 aria-live="polite text-sm'>{errors.username.message}</p>}


        <input {...register("password", {
                required: "Password is required",
                minLength: {value: 6, message: "password must be at least 6 characters"}
            })} type="password" placeholder='Password' className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5 h-10'
        />
        {errors.password && <p className='text-red-500 ml-10 aria-live="polite" text-sm'>{errors.password.message}</p>}

        <input {...register("confirmPassword", {
                required: "Confirm your password",
                minLength: {value: 6, message: "password must be at least 6 characters"}
            })} type="password" placeholder='Confirm your password' className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5 h-10'
        />
        {errors.password && <p className='text-red-500 ml-10 aria-live="polite" text-sm'>{errors.password.message}</p>}

        <div className='text-center'>
            <div className='text-2xl my-4'>What will you be doing?</div>
            <input
                {...register("role", { required: "Please select an option" })}
                type="radio"
                value="owner"
                className="mx-2"
            />  Business Owner
            <input
                {...register("role", { required: "Please select an option" })}
                type="radio"
                value="member"
                className="mx-10 mr-2"
            />  Team Member
            {errors.role && <p className='text-red-500 ml-7 text-sm'>{errors.role.message}</p>}
            
        </div>

        <button 
            type='submit' 
            className={`p-3 rounded-lg bg-blue-700 text-white font-semibold w-full ${isLoading ? 'bg-blue-400' : ''}`} 
            disabled={isLoading}
        >
            {isLoading ? 'Loading...' : 'Register'}
        </button>

      </form>
      <p className="mt-4 text-sm text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
