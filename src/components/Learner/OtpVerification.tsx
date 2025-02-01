import React, { useState, useRef } from "react";
import { FieldIcons } from "@/lib/FormsIcons";
import Image from "next/image";

interface VerificationCodeProps {
  onClose: () => void;
  onVerify: (code: string) => void;
}

const OtpVerification: React.FC<VerificationCodeProps> = ({ onClose, onVerify }) => {
  const [code, setCode] = useState<string[]>(Array(6).fill("")); // Array to store each digit
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null)); // Refs for each input field

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Combine the digits into a single string
    const fullCode = code.join("");

    // Validate the code
    if (fullCode.length !== 6 || !/^\d+$/.test(fullCode)) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    // Clear error and call the onVerify callback
    setError(null);
    onVerify(fullCode);
  };

  return (
    <div>
      <div className="mb-2">
      <h1 className="text-center font-bold text-xl mb-2 text-black">OTP Verification</h1>

        <p className="text-center text-black">Verify your accounts using six digit sent to <p className="font-bold">test@gmail.com</p></p>
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
              ref={(el: HTMLInputElement | null) => (inputRefs.current[index] = el)} 
              className={`w-10 h-12 text-center border rounded bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
                error ? "border-red-500" : "border-gray-300"
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
            <button className="underline decoration-casbBluePrimary text-casbBluePrimary cursor-pointer">click to resend </button>
        </div>

        {/* Verify Button */}
        <div className="flex items-center justify-center hover:bg-blue-600 cursor-pointer mb-4 text-white py-2 rounded bg-casbBluePrimary">
          <button type="submit" className="">
            Verify account
          </button>
          <Image
            src="/chevron-right-white.png"
            alt="chevron"
            width={20}
            height={20}
            className="text-white"
          />
        </div>
      </form>

      
    </div>
  );
};

export default OtpVerification;