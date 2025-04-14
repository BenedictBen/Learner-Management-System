"use client"
import React from 'react'
import LoginForm from "@/components/Admin/LoginForm";
import Image from 'next/image';
import { useRouter } from "next/navigation";


const LoginPage = () => {

const router = useRouter();
  
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
  <div className="flex flex-col flex-[2] justify-center px-10 relative bg-white">
    {/* Login Button (Top-Right) */}
    <div className="absolute top-4 right-10 flex items-center gap-2">
      <h1 className="text-casbDisabled underline decoration-casbDisabled ">
        Need to create an account ?
      </h1>
      <div className="bg-casbBluePrimary text-white flex items-center gap-2 px-4 py-2">
        <button onClick={() => router.push("/admin/signup")}>Sign up</button>
        <Image src="/chevron-right-white.png" width={20} height={20} alt="arrow-right" />
      </div>
    </div>

    {/* Login Form (Centered) */}
    <LoginForm />
  </div>
</div>

{/* Mobile  */}
    <div className="block bg-casbBluePrimary py-4 px-4 h-screen md:hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Image 
          src="/logo.png"
          width={100}
          height={100}
          alt="logo"/>
        </div>

        <div className="bg-white text-casbBluePrimary flex items-center p-2 justify-center gap-4 w-28">
          <button type="submit" className="font-bold" onClick={() => router.push("/admin/signup")}>
            Sign up
          </button>
          <Image src="/chevron-blue.png"
          width={10}
          height={5}
          alt="chevron"
          />
        </div>
      </div>


    <div className=' '>
      <LoginForm />

    </div>


    </div>




    </div>
  )
}

export default LoginPage