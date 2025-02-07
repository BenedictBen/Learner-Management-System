import SignupForm from "@/components/Admin/SignupForm";

import Image from "next/image";
import React from "react";

const SignUpPage = () => {
  return (
<div>
  {/* Tablet & Desktop */}
<div className="hidden md:flex h-screen">
  {/* Left Section */}
  <div className="relative flex-1 h-full">
    <Image
      src="/left-design.png"
      alt="left-design"
      className="h-full "
      width={534}
      height={912}
    />
  </div>

  {/* Right Section */}
  <div className="flex flex-col flex-[2] justify-center px-10 relative">
    {/* Login Button (Top-Right) */}
    <div className="absolute top-4 right-10 flex items-center gap-2">
      <h1 className="text-casbDisabled underline decoration-casbDisabled ">
        Already have an account?
      </h1>
      <div className="bg-casbBluePrimary text-white flex items-center gap-2 px-4 py-2">
        <button>Login</button>
        <Image src="/chevron-right-white.png" width={20} height={20} alt="arrow-right" />
      </div>
    </div>

    {/* Signup Form (Centered) */}
    <SignupForm />
  </div>
</div>

    </div>
  );
};

export default SignUpPage;
