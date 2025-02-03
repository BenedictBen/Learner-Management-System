import { FormValues } from '@/lib/types';
import { FieldIcons } from "@/lib/FormsIcons";
import Image from 'next/image';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSignup } from "@/hooks/learner/useAuth"
import { Spinner, useToast } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { setPendingEmail,setVerificationToken } from "@/features/authSlice";


interface SignupFormProps {
    onVerificationClick: () => void;
    onClose: () => void; 
  }
  const SignUpForm: React.FC<SignupFormProps> = ({ onClose, onVerificationClick }) => {

      const [focus, setFocus] = React.useState<boolean>(false);
      const [focusPassword, setFocusPassword] = useState<boolean>(false);
      const [focusEmail, setFocusEmail] = useState<boolean>(false);
      const [showPassword, setShowPassword] = useState<boolean>(false);
        
        const [focusConfirmPassword, setFocusConfirmPassword] = useState<boolean>(false);
      
        const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

      

      const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
      };
    
      const toggleConfirmPasswordVisibility = (): void => {
        setShowConfirmPassword(!showConfirmPassword);

      };

        const { mutate: signup, isPending } = useSignup();
        const toast = useToast();
        const dispatch = useDispatch();

      const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
      } = useForm<FormValues>();
    
      const onSubmit = (data: FormValues): void => {
        const payload = {
          email: data.email,
          password: data.password 
        };
        signup(payload, {
          onSuccess: (responseData) => {
            // Store email in Redux and localStorage
            const { email, verificationToken } = responseData.user;
            dispatch(setPendingEmail(email));
            dispatch(setVerificationToken(verificationToken))
            console.log('Stored email:', email);
      console.log('Stored verification token:', verificationToken);
            // Trigger verification modal
            onVerificationClick();
          },
          onError: (error) => {
            toast({
              title: "Login Failed",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        })
       
      };

      const password = watch('password');
      const confirmPassword = watch('confirmPassword');

      const validatePasswordMatch = (value: string) => {
        return value === watch('password') || 'Passwords do not match';
      };

  return (
    <div>
        <h1 className="text-center font-bold text-xl text-black mb-2">Signup</h1>
                
                <div className="flex items-center justify-center mb-2">
                  <div className="border border-casbBluePrimary w-80 mx-auto py-1 flex items-center justify-center gap-1 ">
                    <Image src="/Google.png" alt="google" width={15} height={15} />
                    <button>Signup using Google</button>
                  </div>
                </div>
                <p className="text-center my-1 text-black">or</p>

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
                                  // pattern: {
                                  //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  //   message: "Invalid email address",
                                  // },
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
                
                        {/* Password Input */}
<div>
          <div key="Password" className="relative">
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                  },
                })}
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setFocusPassword(false)}
                className={`border p-2 w-full pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
                  password
                    ? 'border-green-500'
                    : errors.password
                    ? 'border-red-500'
                    : 'border-gray-300'
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
                      ? 'invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)' // Blue for focus
                      : errors.password
                      ? 'invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)' // Red for error
                      : password
                      ? 'invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)' // Green for success
                      : 'invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)', // Default gray
                  }}
                />
              )}
              {password && (
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
                  alt={showPassword ? 'Hide Password' : 'Show Password'}
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

        {/* Confirm Password Field */}
        <div>
          <div key="ConfirmPassword" className="relative">
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: validatePasswordMatch
                })}
                onFocus={() => setFocusConfirmPassword(true)}
                onBlur={() => setFocusConfirmPassword(false)}
                className={`border p-2 w-full pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
                  confirmPassword
                    ? 'border-green-500'
                    : errors.confirmPassword
                    ? 'border-red-500'
                    : 'border-gray-300'
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
                    filter: focusConfirmPassword
                      ? 'invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)' // Blue for focus
                      : errors.confirmPassword
                      ? 'invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)' // Red for error
                      : confirmPassword
                      ? 'invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)' // Green for success
                      : 'invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)', // Default gray
                  }}
                />
              )}
              {confirmPassword && (
                <Image
                  src={FieldIcons.successIcon as string}
                  alt="Success"
                  width={20}
                  height={20}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
              {errors.confirmPassword && (
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
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <Image
                  src={
                    showConfirmPassword
                      ? (FieldIcons.eye_close as string)
                      : (FieldIcons.eye as string)
                  }
                  alt={showConfirmPassword ? 'Hide Password' : 'Show Password'}
                  width={20}
                  height={20}
                />
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
                
                    {/* Submit Button */}
                        {isPending ? (
          <div className="flex items-center justify-center gap-2 w-full bg-casbBluePrimary text-white py-2 rounded hover:bg-blue-600">
            <Spinner size="sm" color="blue-500" />
            <span>Registering...</span>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full bg-casbBluePrimary text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600"
          >
            Register
            <Image src="/chevron-right-white.png" alt="chevron" width={20} height={20} />
          </button>
        )}
                      </form>

                      <div className="flex underline items-center justify-center gap-2 decoration-casbBluePrimary my-1">
        <h1 className='text-black'>Already have an account ? </h1>
        <h1 onClick={onClose} className='cursor-pointer text-casbBluePrimary'>Log in</h1>
      </div>
    </div>
  )
}

export default SignUpForm