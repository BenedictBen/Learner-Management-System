import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { FormValues } from "@/lib/types";
import { FieldIcons } from "@/lib/FormsIcons";
import Image from 'next/image';
import {useToast } from '@chakra-ui/react'
import ResetPassword from './ResetPassword';

interface ForgetPasswordProps {
  onClose: () => void; // To close the Forget Password form and return to Login
  onResetPasswordClick: () => void;
  openSignup: () => void;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ onClose, onResetPasswordClick, openSignup  }) => {
      const [focus, setFocus] = React.useState<boolean>(false);
      const [focusEmail, setFocusEmail] = useState(false);
      const [isSubmitted, setIsSubmitted] = useState(false);

      const toast = useToast();

      const {
          handleSubmit,
          control,
          register,
          formState: { errors },
          watch,
          
        } = useForm<FormValues>();


        const onSubmit = (data: FormValues) => {
          // Simulate a successful submission
          console.log(data);
          if (data.email) {
            toast({
              title: 'Email sent successfully.',
              description: 'Please check your email for the reset link.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
             // Set submission status to true
             setIsSubmitted(true);
            onResetPasswordClick(); // Open the Reset Password form
          } else {
            toast({
              title: 'Error',
              description: 'Please enter a valid email address.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        };
      
  return (
    <div>
    <div>
    <h1 className="text-center font-bold text-xl mb-1 text-black">Forget Password</h1>
    <p className='text-center text-black pb-2'>Enter your email address to reset your password</p>

    </div>
    {!isSubmitted ? (

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6">
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
                            : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)", // Default gray
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

                    <div className='flex items-center justify-center hover:bg-blue-600 cursor-pointer text-white py-2 rounded w-full bg-casbBluePrimary'>
                            <button type="submit" className=" ">Forget password</button>
                            <Image src="/chevron-right-white.png" alt="chevron" width={20} height={20} className="text-white"/>
                    </div>
    </form>
    ) : (
      <ResetPassword onClose={onClose} onSignupClick={openSignup}/>
    )}
    
    </div>
  )
}

export default ForgetPassword