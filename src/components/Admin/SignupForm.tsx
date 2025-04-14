"use client";

import { FieldIcons } from "@/lib/FormsIcons";
import { FormValues } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "@/hooks/learner/useAuth";
import { Spinner, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  setPendingEmail,
  setTemporaryPassword,
  setVerificationToken,
} from "@/features/authSlice";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [focusFirstName, setFocusFirstName] = useState(false);
  const [focusLastName, setFocusLastName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [focusPassword, setFocusPassword] = useState<boolean>(false);
  const [focusConfirmPassword, setFocusConfirmPassword] =
    useState<boolean>(false);
  const [focusPhone, setFocusPhone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  // const onSubmit = async (data: FormValues): Promise<void> => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch("/api/auth/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         first_name: data.firstName,
  //         last_name: data.lastName,
  //         email: data.email,
  //         password: data.password,
  //         contact: data.contact,
  //       }),
  //     });

  //     const result = await response.json();

  //     if (!response.ok || !result.success) {
  //       // You can inspect the structure of result here if needed
  //       const errorMessage = result.message || "Signup failed. Please try again.";
  //       throw new Error(errorMessage);
  //     }

  //     if(result.success) {
  //       if(result.user) { 
  //         const { email, verificationToken } = result.user;
  //         dispatch(setPendingEmail(email));
  //         dispatch(setVerificationToken(verificationToken));
  //         console.log("Stored email:", email);
  //         console.log("Stored verification token:", verificationToken);
  //       }
  //       router.push("/admin/otp");
  //     }else {
  //       throw new Error(result.message || "Signup failed");
  //     } 
  //   } catch (error: any) {
  //     toast({
  //       title: "Signup Failed",
  //       description: error.message,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     console.error("Signup error:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onSubmit = async (data: FormValues): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
          contact: data.contact,
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok || !result.success) {
        // You can inspect the structure of result here if needed
        const errorMessage = result.message || "Signup failed. Please try again.";
        throw new Error(errorMessage);
      }
  
      // Proceed if signup is successful
      const { email, verificationToken } = result.user;
      dispatch(setPendingEmail(email));
      dispatch(setVerificationToken(verificationToken));
      toast({
        title: "Signup successful",
        description: result.message || "Sign up sucessfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log("Stored email:", email);
      console.log("Stored verification token:", verificationToken);
      router.push("/admin/otp");
      
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  


  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
<div className="flex items-center justify-center flex-col">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="mx-auto md:px-8 md:max-w-7xl text-black"
  >
    <h1 className="font-bold text-xl lg:text-2xl text-center md:text-left p-2 mb-4 text-white md:text-black ">
      Register to get started
    </h1>
    <div className="max-w-md mx-auto space-y-6 p-4 md:p-0 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-4 md:mb-6 lg:mb-8">
        {/* First Name */}
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
            {!watch("firstName") && (
              <span 
                className="absolute left-10 text-black pointer-events-none"
                style={{ transform: 'translateY(-50%)', top: '50%' }}
              >
                First name
              </span>
            )}
            <input
              type="text"
              {...register("firstName", {
                required: "First name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
              className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                errors.firstName
                  ? "bg-red-100 border-gray-300"
                  : watch("firstName")
                  ? "bg-green-100 border-gray-300"
                  : "border-blue-500 "
              } text-gray-900 focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
              placeholder=" "
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
              {errors.firstName && (
                <Image
                  src={FieldIcons.errorIcon as string}
                  alt="Error"
                  width={20}
                  height={20}
                />
              )}
              {watch("firstName") && !errors.firstName && (
                <Image
                  src={FieldIcons.successIcon as string}
                  alt="Success"
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
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
            {!watch("lastName") && (
              <span 
                className="absolute left-10 text-black pointer-events-none"
                style={{ transform: 'translateY(-50%)', top: '50%' }}
              >
                Last name
              </span>
            )}
            <input
              type="text"
              {...register("lastName", {
                required: "Last name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
              className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                errors.lastName
                  ? "bg-red-100 border-gray-300"
                  : watch("lastName")
                  ? "bg-green-100 border-gray-300"
                  : "border-blue-500 bg-white"
              } text-gray-900 focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
              placeholder=" "
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
              {errors.lastName && (
                <Image
                  src={FieldIcons.errorIcon as string}
                  alt="Error"
                  width={20}
                  height={20}
                />
              )}
              {watch("lastName") && !errors.lastName && (
                <Image
                  src={FieldIcons.successIcon as string}
                  alt="Success"
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mb-4 md:mb-6 lg:mb-8">
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
          {!watch("email") && (
            <span 
              className="absolute left-10 text-black pointer-events-none"
              style={{ transform: 'translateY(-50%)', top: '50%' }}
            >
              Email
            </span>
          )}
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full p-2 pl-10 pr-8 border-b-2 ${
              errors.email
                ? "bg-red-100 border-gray-300"
                : watch("email")
                ? "bg-green-100 border-gray-300"
                : "border-blue-500 bg-white"
            } text-gray-900 focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
            placeholder=" "
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
            {errors.email && (
              <Image
                src={FieldIcons.errorIcon as string}
                alt="Error"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            )}
            {watch("email") && !errors.email && (
              <Image
                src={FieldIcons.successIcon as string}
                alt="Success"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            )}
          </div>
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 md:mb-6 lg:mb-8">
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
            {!watch("password") && (
              <span 
                className="absolute left-10 text-black pointer-events-none"
                style={{ transform: 'translateY(-50%)', top: '50%' }}
              >
                Password
              </span>
            )}
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message:
                    "Must include uppercase, lowercase, number, and special character",
                },
              })}
              className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                errors.password
                  ? "bg-red-100 border-gray-300"
                  : watch("password")
                  ? "bg-green-100 border-gray-300"
                  : "border-blue-500 bg-white"
              } text-gray-900 focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
              placeholder=" "
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
              <div
                onClick={togglePasswordVisibility}
                className="cursor-pointer"
              >
                <Image
                  src={
                    showPassword
                      ? (FieldIcons.eye_close as string)
                      : (FieldIcons.eye as string)
                  }
                  alt={showPassword ? "Hide Password" : "Show Password"}
                  width={20}
                  height={20}
                />
              </div>
              {errors.password && (
                <Image
                  src={FieldIcons.errorIcon as string}
                  alt="Error"
                  width={20}
                  height={20}
                />
              )}
              {watch("password") && !errors.password && (
                <Image
                  src={FieldIcons.successIcon as string}
                  alt="Success"
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
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
            {!watch("confirmPassword") && (
              <span 
                className="absolute left-10 text-black pointer-events-none"
                style={{ transform: 'translateY(-50%)', top: '50%' }}
              >
                Confirm Password
              </span>
            )}
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                errors.confirmPassword
                  ? "bg-red-100 border-gray-300"
                  : watch("confirmPassword")
                  ? "bg-green-100 border-gray-300"
                  : "border-blue-500 bg-white"
              } text-gray-900 focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
              placeholder=" "
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
              <div
                onClick={toggleConfirmPasswordVisibility}
                className="cursor-pointer"
              >
                <Image
                  src={
                    showConfirmPassword
                      ? (FieldIcons.eye_close as string)
                      : (FieldIcons.eye as string)
                  }
                  alt={
                    showConfirmPassword ? "Hide Password" : "Show Password"
                  }
                  width={20}
                  height={20}
                />
              </div>
              {errors.confirmPassword && (
                <Image
                  src={FieldIcons.errorIcon as string}
                  alt="Error"
                  width={20}
                  height={20}
                />
              )}
              {watch("confirmPassword") && !errors.confirmPassword && (
                <Image
                  src={FieldIcons.successIcon as string}
                  alt="Success"
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="mb-4 md:mb-6 lg:mb-8 relative">
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
          {!watch("contact") && (
            <span 
              className="absolute left-10 text-black pointer-events-none"
              style={{ transform: 'translateY(-50%)', top: '50%' }}
            >
              Contact
            </span>
          )}
          <input
            type="tel"
            {...register("contact", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Invalid phone number format",
              },
            })}
            className={`w-full p-2 pl-10 pr-8 border-b-2 ${
              errors.contact
                ? "bg-red-100 border-gray-300"
                : watch("contact")
                ? "bg-green-100 border-gray-300"
                : "border-blue-500 bg-white"
            } text-gray-900 focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
            placeholder=" "
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
            {errors.contact && (
              <Image
                src={FieldIcons.errorIcon as string}
                alt="Error"
                width={20}
                height={20}
              />
            )}
            {watch("contact") && !errors.contact && (
              <Image
                src={FieldIcons.successIcon as string}
                alt="Success"
                width={20}
                height={20}
              />
            )}
          </div>
        </div>
        {errors.contact && (
          <p className="text-red-500 text-sm mt-1">
            {errors.contact.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="w-full mx-auto">
        {isLoading ? (
          <div 
          className="w-full px-8 py-3 bg-casbGreyPrimary text-black rounded hover:bg-casbBluePrimary hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Spinner size="md" color="blue-500" />
            <span>Creating account...</span>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full px-8 py-3 bg-casbGreyPrimary text-black rounded hover:bg-casbBluePrimary hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
          >
            Create account
            <Image
              src="/chevron.png"
              alt="chevron"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
    </div>
  </form>
  <div className="max-w-lg mx-auto space-y-4 flex items-center justify-center text-center px-6 flex-col mt-8 text-black">
    <p>
      By confirming your email, you agree to our Terms of Service and that
      you have read and understood our Privacy Policy
    </p>
  </div>
</div>
  );
};

export default SignupForm;
