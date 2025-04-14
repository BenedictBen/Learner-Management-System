"use client";

import { FieldIcons } from "@/lib/FormsIcons";
import { FormValues } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = (): void => setShowConfirmPassword(!showConfirmPassword);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    getValues,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues): void => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center flex-col mt-24 md:mt-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:max-w-7xl mx-auto md:p-8"
      >
        <h1 className="font-bold text-xl lg:text-2xl text-center md:text-left max-w-md mx-auto mb-4 text-white md:text-black dark:text-white">
          Create New Password
        </h1>
        <div className="mx-auto space-y-6 p-4 md:p-0 bg-white dark:bg-black md:max-w-md">
          {/* Password Input */}
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
                    message: "Minimum 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message: "Must include uppercase, lowercase, number, and special character",
                  },
                })}
                className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                  errors.password
                    ? "!bg-red-100 border-gray-300"
                    : watch("password")
                   ? "!bg-green-100  border-gray-300"
                      : "border-blue-500 bg-white dark:text-white"
                } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
              
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
                {errors.password && (
                  <Image src={FieldIcons.errorIcon as string} alt="Error" width={20} height={20} />
                )}
                {watch("password") && !errors.password && (
                  <Image src={FieldIcons.successIcon as string} alt="Success" width={20} height={20} />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <div className="relative flex items-center">
              {FieldIcons.password && (
                <Image
                  src={FieldIcons.password as string}
                  alt="confirm password"
                  width={20}
                  height={20}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 h-5 w-5"
                />
              )}
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                  errors.confirmPassword
                    ? "!bg-red-100 border-gray-300"
                    : watch("confirmPassword")
                   ? "!bg-green-100  border-gray-300"
                      : "border-blue-500 bg-white  dark:text-white"
                } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
              
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
                <div onClick={toggleConfirmPasswordVisibility} className="cursor-pointer">
                  <Image
                    src={showConfirmPassword ? (FieldIcons.eye_close as string) : (FieldIcons.eye as string)}
                    alt={showConfirmPassword ? "Hide Password" : "Show Password"}
                    width={20}
                    height={20}
                  />
                </div>
                {errors.confirmPassword && (
                  <Image src={FieldIcons.errorIcon as string} alt="Error" width={20} height={20} />
                )}
                {watch("confirmPassword") && !errors.confirmPassword && (
                  <Image src={FieldIcons.successIcon as string} alt="Success" width={20} height={20} />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="w-full  mx-auto">
                            <button
                              type="submit"
                              className="w-full px-8 py-3 bg-casbGreyPrimary text-black rounded hover:bg-casbBluePrimary hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
                            >
                              Reset password
                              <Image src="/chevron.png" alt="chevron" width={20} height={20} />
                            </button>
                          </div>
        </div>

      </form>
      <div className="flex gap-1 mt-3">
            <p className="text-white md:text-black">Having trouble logging in? </p>
            <button className="underline decoration-casbBluePrimary text-white cursor-pointer md:text-casbBluePrimary">
              contact support{" "}
            </button>
          </div>
    </div>
  );
};

export default ResetPasswordForm;