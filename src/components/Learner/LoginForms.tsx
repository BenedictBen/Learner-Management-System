import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "@/lib/types";
import { FieldIcons } from "@/lib/FormsIcons";
import { Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useLogin } from "@/hooks/learner/useAuth"

import { useRouter } from "next/navigation";

import axios from 'axios';


interface LoginFormsProps {
  onForgotPasswordClick: () => void;
  onSignupClick: () => void;
  onClose: () => void;
}

const LoginForms: React.FC<LoginFormsProps> = ({ onForgotPasswordClick, onSignupClick, onClose }) => {
  const [focus, setFocus] = React.useState<boolean>(false);
  const [focusPassword, setFocusPassword] = useState<boolean>(false);
  const [focusEmail, setFocusEmail] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const toast = useToast();
  const { mutate: login, isPending } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    login(data, {
      onError: (error) => {
        toast({
          title: "Login Failed",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };



// Set default credentials configuration


// const onSubmit = async (data: FormValues) => {
//   try {
//     const response = await axios.post(
//       'https://tmp-se-project.azurewebsites.net/api/user/auth/signin',
//       { email: data.email, password: data.password },
//       { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
//     );

//     const id = response.data.user._id; // Adjust according to API response
//     localStorage.setItem('Id', id);

//     // Set default Authorization header for subsequent requests
//     axios.defaults.headers.common['Authorization'] = `Bearer ${id}`;

//     toast({ title: "Login Successful", status: "success", ... { duration: 5000, isClosable: true } });
//     onClose();
//     console.log("Login Response:", response.data);
// router.push('/learner/dashboard');

//   } catch (error) {
//     console.error("Login Error:", error);
  
//     let errorMessage = "Login failed";
//     if (axios.isAxiosError(error)) {
//       errorMessage = error.response?.data?.message || error.message || "Login failed";
//     }
  
//     toast({
//       title: "Login Failed",
//       description: errorMessage,
//       status: "error",
//       duration: 5000,
//       isClosable: true,
//     });
//   }
  
// };


  return (
    <div>
    <h1 className="text-center font-bold text-xl text-black mb-2">Login</h1>
        
        <div className="flex items-center justify-center mb-2">
          <div className="border border-casbBluePrimary w-64 mx-auto flex items-center justify-center gap-1 ">
            <Image src="/Google.png" alt="google" width={15} height={15} />
            <button>Log in using Google</button>
          </div>
        </div>
        <p className="text-center my-1">or</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6">
        {/* Email Input */}
        <div>
          <div key="Email" className="relative">
            <div className="relative flex items-center">

            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              onFocus={() => setFocusEmail(true)}
      onBlur={() => setFocusEmail(false)}
              className={`border p-2 w-full pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
                watch("email")
                  ? "border-green-500"
                  : errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {FieldIcons.email && (
              <Image
                src={FieldIcons.email as string}
                alt="email"
                width={20}
                height={20}
                className="absolute left-2 top-5 transform -translate-y-1/2"
                style={{
                  filter: focusEmail
                  ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)" // Blue for focus
                  : errors.password
                  ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
                  : watch("password")
                  ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
                  : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",  // Default gray
                }}
              
              />
            )}
            {watch("email") && (
              <Image
                src={FieldIcons.successIcon as string}
                alt="Success"
                width={20}
                height={20}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              />
            )}
            {errors.email && (
                <>
                  <Image
                    src={FieldIcons.errorIcon as string}
                    alt="Error"
                    width={20}
                    height={20}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                </>
              )}
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Password Input */}
        <div>
          <div key="Password" className="relative">
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 8 characters",
                  },
                  // pattern: {
                  //   value:
                  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  //   message:
                  //     "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  // },
                })}
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setFocusPassword(false)}
                className={`border p-2 w-full pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
                  watch("password")
                    ? "border-green-500"
                    : errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {FieldIcons.password && (
                <Image
                  src={FieldIcons.password as string}
                  alt="password"
                  width={20}
                  height={20}
                  className="absolute left-2 top-5 transform -translate-y-1/2"
                  style={{
                    filter: focusPassword
                      ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)" // Blue for focus
                      : errors.password
                      ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
                      : watch("password")
                      ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)", // Default gray
                  }}
                />
              )}
              {watch("password") && (
                <Image
                  src={FieldIcons.successIcon as string}
                  alt="Success"
                  width={20}
                  height={20}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
              {errors.password && (
                <>
                  <Image
                    src={FieldIcons.errorIcon as string}
                    alt="Error"
                    width={20}
                    height={20}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                </>
              )}

              {/* Toggle Password Visibility Icon */}
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
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
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-left">
          <button
            type="button"
            onClick={onForgotPasswordClick}
            className="text-sm text-casbBluePrimary hover:underline"
          >
            Forgot Password?
          </button>

        </div>

        {/* Submit Button */}
        {/* <button type="submit">Login</button> */}
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
          <Spinner size="sm" color="blue-500" />
          Logging in...
        </div>
        ) : (

        <button
          type="submit"
          className="w-full bg-casbBluePrimary text-white py-2 rounded"
        >
          Login
        </button>
        )}
      </form>
      <div className="flex underline items-center justify-center gap-2 decoration-casbBluePrimary my-1">
        <p className="text-[#404040]">Need to create an account ? </p>
        <h1 onClick={onSignupClick} className='cursor-pointer text-casbBluePrimary'>Signup</h1>
      </div>
    </div>
  );
};

export default LoginForms;