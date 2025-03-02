"use client";

import { FieldIcons } from "@/lib/FormsIcons";
import { FormValues } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";


const ForgetPasswordForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues): void => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center flex-col mt-24 md:mt-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:max-w-7xl mx-auto  md:p-8 "
      >
        <h1 className="font-bold text-xl lg:text-2xl text-center md:text-left max-w-md mx-auto mb-4 text-white md:text-black dark:text-white">
          Enter your email address
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

          <div className="w-full  mx-auto">
            <button
              type="submit"
              className="w-full px-8 py-3 bg-casbGreyPrimary text-black rounded hover:bg-casbBluePrimary hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Forget password
              <Image src="/chevron.png" alt="chevron" width={20} height={20} />
            </button>
          </div>
        </div>
      </form>
      <div className="flex gap-1 mt-3">
            <p className="text-white md:text-black md:dark:text-white">Having trouble logging in? </p>
            <button className="underline decoration-casbBluePrimary text-white cursor-pointer md:text-casbBluePrimary">
              contact support{" "}
            </button>
          </div>
    </div>
  );
};

export default ForgetPasswordForm;
