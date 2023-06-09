import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getError } from '@/utils/error';

function ResetPassword({ type, email }) {
  // React Hook Form
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // Submit Handler when click the submit button
  const submitHandler = async ({ password, cpassword }) => {
    if (password !== cpassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post('/api/reset-password', {
        email,
        type,
        password,
      });

      if (res.error) {
        toast.error(res.error);
      } else {
        sessionStorage.removeItem('forgotPasswordEmail');
        router.push(
          `${
            type === 'Student'
              ? '/student'
              : type === 'Admin'
              ? '/admin'
              : '/faculty'
          }`
        );
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className=" flex h-screen w-screen items-center px-6 py-20 md:px-28 lg:w-[42rem] lg:pr-0">
      <div className=" bg-black bg-opacity-80 p-10  text-center rounded-lg w-full">
        RESET
        <Link
          href={`${
            type === 'Student'
              ? '/student'
              : type === 'Admin'
              ? '/admin'
              : '/faculty'
          }`}
          className="text-white text-left font-medium flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </Link>
        {/* PUP Logo and Title */}
        <div>
          <Image
            src="/logo/puplogo.png"
            alt="PUPLogo"
            width={100}
            height={100}
            // Make the logo width responsive using Tailwind classes
            className="object-cover object-center rounded-lg mx-auto w-16 md:w-28 lg:w-32"
          />
          <h1 className="text-white font-poppins text-2xl font-bold mt-3 md:text-4xl md:mt-8">
            PUPQC {type} Module
          </h1>
          <p className="text-white text-md font-poppins mt-3 mb-3 md:text-lg">
            Reset the password below
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
          <div className="">
            <label
              htmlFor="password"
              className="flex text-left mb-2 font-medium text-white "
            >
              New Password
            </label>
            <input
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 mb-3"
              {...register('password', {
                required: 'Please enter a new password',
                minLength: {
                  value: 6,
                  message: 'Password must be more than 5 characters',
                },
              })}
            />
            {errors.password && (
              <div className="text-red-600 text-start text-sm mt-2">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="">
            <label
              htmlFor="cpassword"
              className="flex text-left mb-2 font-medium text-white "
            >
              Confirm Password
            </label>
            <input
              id="cpassword"
              name="cpassword"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 mb-1 "
              {...register('cpassword', {
                required: 'Please enter confirm password',
                minLength: {
                  value: 6,
                  message: 'Password must be more than 5 characters',
                },
              })}
            />
            {errors.cpassword && (
              <div className="text-red-600 text-start text-sm mt-2">
                {errors.cpassword.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-sky-700 hover:bg-sky-600 focus:ring-4 focus:outline-none mt-6 focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
