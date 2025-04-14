"use client";

import { signin,loadSession  } from "@/features/authSlice";
import { RootState } from "@/lib/store";
import { FormValues } from "@/lib/types";
import { Spinner } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";


const OtpForm = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const dispatch = useDispatch();
  const router = useRouter();


  const [isLoading, setIsLoading] = useState(false);

  
  const { pendingUserEmail, verificationToken } = useSelector((state: RootState) => state.auth);
  const storedEmail = typeof window !== "undefined" ? localStorage.getItem("pendingEmail") || "" : "";
  const storedToken = typeof window !== "undefined" ? localStorage.getItem("verificationToken") || "" : "";

  console.log("Redux verificationToken:", verificationToken);
  console.log("Stored verificationToken:", storedToken);
 
  const [token, setToken] = useState<string>(verificationToken || "");


  useEffect(() => {
    dispatch(loadSession());
  }, [dispatch]);

 
 const {
   
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<FormValues>({});
 

  const handleChange = (index: number, value: string) => {
    // Allow only digits and ensure the value is a single character
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if a digit is entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Clear error when user starts typing
      setError(null);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const fullCode = code.join("");
    if (fullCode.length !== 6 || !/^\d+$/.test(fullCode)) {
      setError("Please enter a valid 6-digit code.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Call your OTP verification endpoint directly using fetch
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: fullCode.trim(),
        }), 
      });

      const result = await response.json();
      if (result.success && result.Admin) {
        // If needed, map _id to id for your signin payload:
        const adminUser = { ...result.Admin, id: result.Admin._id, role: "admin" };
        dispatch(signin(adminUser));
        // await signOut({ redirect: false });
        router.push("/admin/dashboard");
      } else {
        setError(result.message || "OTP verification failed. Please try again.");
      }
      
    } catch (err: any) {
      setError(err.message || "OTP verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="flex items-center justify-center flex-col mt-12 md:mt-0">
      <div className="text-center mb-4 text-white md:text-black">
      <span className="text-center text-black">
          Verify your accounts using six digit sent to{" "}
          <p className="font-bold">
            {pendingUserEmail || storedEmail || "your email"}
          </p>
        </span>
        <p className="text center text-red.500 mx-auto">
          {verificationToken || storedToken || "your code"}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full md:max-w-7xl mx-auto  md:p-8 "
      >
        
            <h1 className="font-bold text-xl lg:text-2xl text-center md:text-left max-w-md mx-auto mb-4 text-white md:text-black dark:text-white">OTP verification</h1>
          <div className="mx-auto space-y-6 p-4 md:p-0 bg-white dark:bg-black md:max-w-md">
            <div className="flex justify-center space-x-3">
              {code.map((digit, index) => (
                <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength={1}
                ref={(el: HTMLInputElement | null) =>
                  (inputRefs.current[index] = el)
                }
                className={`w-10 md:w-16 h-12 text-center border rounded bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
                  errors.email
                    ? "!bg-red-100 border-gray-300"
                    : watch("email")
                    ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                    : "border-blue-500 bg-white dark:bg-black dark:text-white"
                } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
              />              
              ))}
            </div>
          
          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
          )}

          
                    {isLoading ? (
                      <div className="flex items-center justify-center hover:bg-casbBlueHover cursor-pointer mb-4 text-white py-2 rounded bg-casbBluePrimary w-full  mx-auto">
                        <Spinner size="sm" color="blue-500" />
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <div className="w-full  mx-auto">
            <button
                        type="submit"
                        className="w-full px-8 py-3 bg-casbGreyPrimary text-black rounded hover:bg-casbBluePrimary hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        Verify account
                        <Image
                          src="/chevron-right-white.png"
                          alt="chevron"
                          width={20}
                          height={20}
                        />
                      </button>
          </div>
                    )}
          
          </div>
      </form>
      <div className="flex gap-1 mt-3">
            <p className="text-white md:text-black">Didn't get a code? </p>
            <button className="underline decoration-casbBluePrimary text-white cursor-pointer md:text-casbBluePrimary">
              click to resend{" "}
            </button>
          </div>
    </div>
  );
};

export default OtpForm;
