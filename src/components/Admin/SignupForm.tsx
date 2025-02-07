"use client"

import { FieldIcons } from "@/lib/FormsIcons";
import { FormValues } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const [focusFirstName, setFocusFirstName] = useState(false);
  const [focusLastName, setFocusLastName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
    const [focusPassword, setFocusPassword] = useState<boolean>(false);
    const [focusConfirmPassword, setFocusConfirmPassword] = useState<boolean>(false);
  const [focusPhone, setFocusPhone] = useState(false);



  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);


    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
      };
    
      const toggleConfirmPasswordVisibility = (): void => {
        setShowConfirmPassword(!showConfirmPassword);

      };


  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues): void => {
    console.log(data);
  };
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const validatePasswordMatch = (value: string) => {
    return value === watch('password') || 'Passwords do not match';
  };

  return (
<div className="flex items-center justify-center flex-col">

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto px-4 md:px-8">
      <h1 className="font-bold text-lg lg:text-2xl text-left py-2 mb-4 w-full  ">Register to get started</h1>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <div className="relative">
    <div className="relative flex items-center">
      {FieldIcons.firstName && (
        <Image
          src={FieldIcons.firstName as string}
          alt="firstName"
          width={20}
          height={20}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
        />
      )}
      <input
        type="text"
        placeholder="First name"
        {...register("firstName", {
          required: "First name is required",
          minLength: { value: 2, message: "Minimum 2 characters" }
        })}
        className={`w-full p-2 pl-8 pr-8 border-b-2 ${
            errors.firstName 
            ? '!bg-red-100 border-gray-300' 
            : watch("firstName") 
            ? '!bg-green-100 border-gray-300' 
            : 'border-blue-500 bg-[#E6E6E6]'
        } placeholder:text-black focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
        {errors.firstName && <Image src={FieldIcons.errorIcon as string} alt="Error" width={20} height={20} />}
        {watch("firstName") && !errors.firstName && <Image src={FieldIcons.successIcon as string} alt="Success" width={20} height={20} />}
      </div>
    </div>
    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
  </div>

  {/* Last Name */}
  <div className="relative">
    <div className="relative flex items-center">
      {FieldIcons.lastName && (
        <Image
          src={FieldIcons.lastName as string}
          alt="lastName"
          width={20}
          height={20}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
        />
      )}
      <input
        type="text"
        placeholder="Last name"
        {...register("lastName", {
          required: "Last name is required",
          minLength: { value: 2, message: "Minimum 2 characters" }
        })}
        className={`w-full p-2 pl-8 pr-8 border-b-2 ${
          errors.lastName 
            ? '!bg-red-100 border-gray-300' 
            : watch("lastName") 
            ? '!bg-green-100 border-gray-300' 
            : 'border-blue-500 bg-[#E6E6E6]'
        } placeholder:text-black focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
        {errors.lastName && <Image src={FieldIcons.errorIcon as string} alt="Error" width={20} height={20} />}
        {watch("lastName") && !errors.lastName && <Image src={FieldIcons.successIcon as string} alt="Success" width={20} height={20} />}
      </div>
    </div>
    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
  </div>
</div>

{/* Email */}
<div className="mb-8">
  <div className="relative flex items-center">
    {FieldIcons.email && (
      <Image
        src={FieldIcons.email as string}
        alt="email"
        width={20}
        height={20}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 h-5 w-5"
      />
    )}
    <input
      type="email"
      placeholder="Email"
      {...register("email", {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })}
      className={`w-full p-2 pl-8 pr-8 border-b-2 ${
        errors.email 
          ? '!bg-red-100 border-gray-300' 
          : watch("email") 
          ? '!bg-green-100 border-gray-300' 
          : 'border-blue-500 bg-[#E6E6E6]'
      } placeholder:text-black focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
    />
    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
      {errors.email && <Image src={FieldIcons.errorIcon as string} alt="Error" width={20} height={20} className="h-5 w-5"/>}
      {watch("email") && !errors.email && <Image src={FieldIcons.successIcon as string} alt="Success" width={20} height={20} className="h-5 w-5"/>}
    </div>
  </div>
    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
</div>



{/* Password Fields */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  {/* Password */}
  <div className="relative">
    <div className="relative flex items-center">

    
    {FieldIcons.password && (
      <Image
        src={FieldIcons.password as string}
        alt="password"
        width={20}
        height={20}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 h-5 w-5"
      />
    )}
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      {...register("password", {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Minimum 8 characters"
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          message: "Must include uppercase, lowercase, number, and special character"
        }
      })}
      className={`w-full p-2 pl-8 pr-16 border-b-2 ${
        errors.password 
          ? '!bg-red-100 border-gray-300' 
          : watch("password") 
          ? '!bg-green-100 border-gray-300' 
          : 'border-blue-500 bg-[#E6E6E6]'
      } placeholder:text-black focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
    />
    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
      <div onClick={togglePasswordVisibility} className="cursor-pointer">
        <Image
          src={showPassword ? (FieldIcons.eye_close as string) : (FieldIcons.eye as string)}
          alt={showPassword ? "Hide Password" : "Show Password"}
          width={20}
          height={20}
        />
      </div>
      {errors.password && <Image src={FieldIcons.errorIcon as string} alt="Error" width={20} height={20} />}
      {watch("password") && !errors.password && <Image src={FieldIcons.successIcon as string} alt="Success" width={20} height={20} />}
    </div>
    </div>
    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
  </div>

  {/* Confirm Password */}
  <div className="relative ">
    <div className="relative flex items-center">

    
    {FieldIcons.password && (
      <Image
        src={FieldIcons.password as string}
        alt="password"
        width={20}
        height={20}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10  h-5 w-5"
      />
    )}
    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm Password"
      {...register("confirmPassword", {
        required: "Please confirm your password",
        validate: value => value === watch("password") || "Passwords do not match"
      })}
      className={`w-full p-2 pl-8 pr-16 border-b-2 ${
        errors.confirmPassword 
          ? '!bg-red-100 border-gray-300' 
          : watch("confirmPassword") 
          ? '!bg-green-100 border-gray-300' 
          : 'border-blue-500 bg-[#E6E6E6]'
      } placeholder:text-black focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
    />
    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
      <div onClick={toggleConfirmPasswordVisibility} className="cursor-pointer">
        <Image
          src={showConfirmPassword ? (FieldIcons.eye_close as string) : (FieldIcons.eye as string)}
          alt={showConfirmPassword ? "Hide Password" : "Show Password"}
          width={20}
          height={20}
        />
      </div>
      {errors.confirmPassword && <Image src={FieldIcons.errorIcon as string} alt="Error" width={20} height={20} />}
      {watch("confirmPassword") && !errors.confirmPassword && <Image src={FieldIcons.successIcon as string} alt="Success" width={20} height={20} />}
    </div>
    </div>
    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
  </div>
</div>

{/* Phone */}
<div className="mb-8 relative">
  <div className="relative flex items-center">
    {FieldIcons.phone && (
      <Image
        src={FieldIcons.phone as string}
        alt="Phone"
        width={20}
        height={20}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 h-5 w-5"
      />
    )}
    <input
      type="tel"
      placeholder="Contact"
      {...register("phone", {
        required: "Phone number is required",
        pattern: {
          value: /^[0-9]+$/,
          message: "Invalid phone number format"
        }
      })}
      className={`w-full p-2 pl-8 pr-8 border-b-2 ${
        errors.phone 
          ? '!bg-red-100 border-gray-300' 
          : watch("phone") 
          ? '!bg-green-100 border-gray-300' 
          : 'border-blue-500 bg-[#E6E6E6]'
      } placeholder:text-black focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
    />
    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
      {errors.phone && <Image src={FieldIcons.errorIcon as string} alt="Error" width={20} height={20} />}
      {watch("phone") && !errors.phone && <Image src={FieldIcons.successIcon as string} alt="Success" width={20} height={20} />}
    </div>
  </div>
    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
</div>

{/* Submit Button */}
<div className="w-full  mx-auto">
  <button
    type="submit"
    className="w-full px-8 py-3 bg-casbGreyPrimary text-black rounded hover:bg-casbBluePrimary hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
  >
    Create account
    <Image src="/chevron.png" alt="chevron" width={20} height={20} />
  </button>
</div>
</form> 

<div className="w-full flex items-center justify-center flex-col mt-8">
    <p>
    By confirming your email, you agree to our Terms of Service
    </p>
    <p> and that you have read and understood our Privacy Policy</p>
</div>
    </div>
  );
};

export default SignupForm;
