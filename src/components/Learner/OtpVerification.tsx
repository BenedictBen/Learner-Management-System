import React, { useState, useRef, useEffect } from "react";
import { useOtpVerify } from "@/hooks/learner/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector,  shallowEqual, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { Spinner } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { learnerLoadSession, signin } from "@/features/learnerAuthSlice";


interface VerificationCodeProps {
  onClose: () => void;
  onVerify: (code: string) => void;
}

const OtpVerification: React.FC<VerificationCodeProps> = ({
  onClose,
  onVerify,
}) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const { pendingUserEmail } = useSelector((state: RootState) => state.learnerAuth);
  const { verificationToken } = useSelector((state: RootState) => state.learnerAuth);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: verifyOtp, isPending } = useOtpVerify();
  const [isLoading, setIsLoading] = useState(false);
  const storedEmail = localStorage.getItem("pendingEmail") || "";
  const storedToken = localStorage.getItem("verificationToken") || "";

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(learnerLoadSession());
  }, [dispatch]);




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

  useEffect(() => {
    return () => {
      // Clear loading states when component unmounts
      setIsLoading(false);
      setIsSubmitting(false);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    const fullCode = code.join("");
    if (fullCode.length !== 6 || !/^\d+$/.test(fullCode)) {
      setError("Please enter a valid 6-digit code.");
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await fetch("/api/auth/otp/learner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', // Added for cookies
        body: JSON.stringify({ token: fullCode.trim() }),
      });
  
      const result = await response.json();
      
      if (result.success && result.user) {
  
        const learnerUser = { 
          ...result.user,
          id: result.user._id, 
          role: "learner" 
        };
        
        dispatch(signin(learnerUser));
  
        router.push("/learner");
      } else {
        setError(result.message || "Verification failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const fullCode = code.join("");

  //   if (fullCode.length !== 6 || !/^\d+$/.test(fullCode)) {
  //     setError("Please enter a valid 6-digit code.");
  //     return;
  //   }


    

  //   verifyOtp(fullCode.trim());
  // };

  return (
    <div>
      <div className="flex flex-col mb-2">
        <h1 className="text-center font-bold text-xl mb-2 text-black">
          OTP Verification
        </h1>
 
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

      <form onSubmit={handleSubmit} className="space-y-6 px-6">
        {/* Code Input Fields */}
        <div className="flex justify-center space-x-2">
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
              className={`w-10 h-12 text-center border rounded bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
                error ? "border--red-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
        )}

        <div className="flex gap-1">
          <p className="text-[#404040]">Didn't get a code? </p>
          <button className="underline decoration-casbBluePrimary text-casbBluePrimary cursor-pointer">
            click to resend{" "}
          </button>
        </div>

        {/* Verify Button */}
        {isLoading ? (
          <div className="flex items-center justify-center hover:bg-casbBlueHover cursor-pointer mb-4 text-white py-2 rounded bg-casbBluePrimary">
            <Spinner size="sm" color="blue-500" />
            <span>Verifying...</span>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full bg-casbBluePrimary text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-casbBlueHover"
          >
            Verify account
            <Image
              src="/chevron-right-white.png"
              alt="chevron"
              width={20}
              height={20}
            />
          </button>
        )}
      </form>
    </div>
  );
};

export default OtpVerification;
