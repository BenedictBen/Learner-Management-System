"use client";

import { FieldIcons } from "@/lib/FormsIcons";
import { FormValues } from "@/lib/types";
import Image from "next/image";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {signOut  } from "next-auth/react";
import { Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { AdminUser, signin } from "@/features/authSlice";

// src/lib/types.ts

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  // const loginMutation = useLogin();
  // const isLoading = loginMutation.isPending;
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const handleLogin = async (data: FormValues) => {
    const loginEndpoint = "/api/auth/login";
    setIsLoading(true);
    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const result = await response.json();
  
      if (result.success && result.Admin) {
        // Transform the API response to match your AdminUser interface
        const adminUser: AdminUser = {
          id: result.Admin._id, // Map _id to id
          email: result.Admin.email,
          role: "admin", // Explicitly set role
          first_name: result.Admin.first_name,
          last_name: result.Admin.last_name,
          contact: result.Admin.contact,
          // Optionally include name, though your reducer will compute it
          name: `${result.Admin.first_name} ${result.Admin.last_name}`,
        };
  
        // Dispatch the signin action with the correctly formatted adminUser
        dispatch(signin(adminUser));
        await signOut({ redirect: false });
      

        toast({
          title: "Login Successful",
          description: result.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/admin/dashboard");
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    } finally {
      setIsLoading(false); // Reset loading state in all cases
    }
  };

  return (
    <div className="flex items-center justify-center flex-col mt-24 md:mt-0">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full md:max-w-7xl mx-auto  md:p-8 "
      >
        <h1 className="font-bold text-xl lg:text-2xl text-center md:text-left max-w-md mx-auto mb-4 text-white md:text-black dark:text-white">
          Login into your account
        </h1>
        <div className="mx-auto space-y-6 p-4 md:p-0 bg-white dark:bg-black md:max-w-md">
          <div className="mb-4 md:mb-6 lg:mb-8 ">
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
                    message: "Invalid email address",
                  },
                })}
                className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                  errors.email
                    ? "!bg-red-100 border-gray-300"
                    : watch("email")
                   ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                      : "border-blue-500 bg-white dark:bg-black dark:text-white"
                } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
              
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
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message:
                      "Must include uppercase, lowercase, number, and special character",
                  },
                })}
                className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                  errors.password
                    ? "!bg-red-100 border-gray-300"
                    : watch("password")
                   ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                      : "border-blue-500 bg-white dark:bg-black dark:text-white"
                } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
              
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
                <div
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer relative h-5 w-5"
                >
                  <Image
                    src={
                      showPassword
                        ? (FieldIcons.eye_close as string)
                        : (FieldIcons.eye as string)
                    }
                    alt={showPassword ? "Hide Password" : "Show Password"}
                    fill
                    className="object-contain"
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

          <div className="text-casbBluePrimary underline decoration-casbBluePrimary my-6">
            <button
              type="button"
              onClick={() => router.push("/admin/forget-password")}
            >
              Forget password
            </button>
          </div>

          {isLoading ? (
            <div className="w-full bg-casbGreyPrimary dark: p-2 mx-auto flex items-center justify-center space-x-2">
              <Spinner size="md" color="blue-500" />
              <span>Logging in...</span>
            </div>
          ) : (
            <div className="w-full bg-casbGreyPrimary  mx-auto">
              <button
                type="submit"
                className="w-full px-8 py-3  text-black rounded hover:bg-casbBluePrimary hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Login
                <Image
                  src="/chevron.png"
                  alt="chevron"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
