import DefaultLayout from '@/components/DefaultLayout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useForm } from 'react-hook-form';

import loginAuth from '@/utils/authentication/loginAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { useMutation } from '@tanstack/react-query';
// import { toast } from 'react-toastify';
// import { getError } from '../../utils/error';
// import { signIn } from 'next-auth/react';

function FacultyLoginScreen() {
  // React Hook Form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // Submit Handler when click the submit button
  const submitHandler = async ({ email }) => {
    console.log('SENDING POST: ', email);
    try {
      const res = await axios.post('/api/forgot-password', {
        email,
        type: 'Teacher',
      });

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.data.message);
        // Save data in state management
      }
    } catch (error) {
      //   toast.error(getError(error));
    }
  };

  return (
    <DefaultLayout title="Faculty Portal">
      <div className=" flex h-screen w-screen items-center px-6 py-20 md:px-28 lg:w-3/6 lg:pr-0">
        <div className=" bg-black bg-opacity-80 p-10  text-center rounded-lg ">
          <Link href="/" className="text-white text-left font-medium flex">
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
              PUPQC Faculty Module
            </h1>
            <p className="text-white text-md font-poppins mt-3 mb-3 md:text-lg">
              Sign in to start your session
            </p>
          </div>

          <form
            className="flex flex-col"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="">
              <label
                htmlFor="email"
                className="flex text-left mb-2 font-medium text-white "
              >
                Your email
              </label>
              <input
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 "
                {...register('email', {
                  required: 'Please enter email',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter valid email',
                  },
                })}
              />
              {errors.email && (
                <div className="text-red-600 text-start text-sm mt-2">
                  {errors.email.message}
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
    </DefaultLayout>
  );
}

export default loginAuth(FacultyLoginScreen);