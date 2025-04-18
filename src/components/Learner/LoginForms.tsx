"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "@/lib/types";
import { FieldIcons } from "@/lib/FormsIcons";
import { Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
// import { useLogin } from "@/hooks/learner/useAuth"
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";




import { signin } from "@/features/learnerAuthSlice";
import { fetchLearnerCourses } from "@/features/courseSlice";
import { signIn } from "next-auth/react";


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
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const toast = useToast();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormValues>();


  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signIn("google", {
      callbackUrl: "/learner",
    }).finally(() => setIsGoogleLoading(false));
  };
  

  const handleLogin = async (data: FormValues) => {
    const loginEndpoint = "/api/auth/login/learner";
    setIsLoading(true);
  
    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
  
      const responseText = await response.text();
  
      // Handle case where API returns plain text like "Success!"
      if (responseText.trim() === "Success!") {
        throw new Error("The email or password you entered is incorrect");
      }
  
      // Try to parse response as JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error("We're having trouble processing your login.");
      }
  
      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(
          result?.message ||
          (response.status === 400 ? "Invalid email or password" : "Login failed")
        );
      }
  
      // Handle successful login
      if (result.success && result.user) {
        dispatch(signin({
          email: result.user.email,
          id: result.user._id,
        }));
  
        toast({
          title: "Login Successful",
          description: "You're now logged in as a learner",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
  
        router.push("/learner");
      } else {
        throw new Error(result?.message || "Authentication failed");
      }
  
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
    <h1 className="text-center font-bold text-xl text-black mb-2">Login</h1>
        
        <div className="flex items-center justify-center mb-2">
          <div className="border border-casbBluePrimary w-80 !px-6 !py-2 flex items-center justify-center gap-1 ">
            <Image src="/Google.png" alt="google" width={15} height={15} />
            {isGoogleLoading ? (
  <Spinner size="sm" color="blue.500" thickness="4px" speed="0.65s" />
) : (
  <button onClick={handleGoogleSignIn}>Log in using Google</button>
)}

          </div>
        </div>
        <p className="text-center my-1">or</p>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6 px-6">

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
                  : errors.email
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
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
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
                className="absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer"
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

     
        {isLoading  ? (
          <div className="flex items-center justify-center gap-2">
          <Spinner size="sm" color="blue-500" />
          Logging in...
        </div>
        ) : (

        <button
          type="submit"
          className="w-full bg-casbBluePrimary text-white py-2 rounded hover:bg-casbBlueHover"
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