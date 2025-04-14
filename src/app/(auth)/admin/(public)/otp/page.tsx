"use client"

import OtpForm from '@/components/Admin/OtpForm'
import Image from 'next/image'
import React from 'react'
import { useRouter } from "next/navigation";


const OtpPage = () => {
      const router = useRouter();
  
  return (
    <div>
        <div className="hidden md:flex h-screen">
  {/* Left Section */}
  <div className="relative flex-1 h-full">
    <Image
      src="/otp-left-section.png"
      alt="left-design"
      className="h-full "
      width={534}
      height={912}
    />
  </div>
 

  
  {/* Right Section */}
  <div className="flex flex-col flex-[2] justify-center px-10 relative bg-white">
   
  <div className="absolute top-8 left-16 border border-casbBluePrimary rounded-sm flex items-center gap-2 p-2 cursor-pointer">
    {/* Image */}
    <Image 
      src="/back-blue.png"
      width={15}
      height={5}
      alt="logo"
      className="inline-block" // Ensures the image behaves as an inline element
    />
    {/* Button */}
    <button className="text-casbBluePrimary font-medium text-sm" onClick={()=> router.back()}>
      Back
    </button>
  </div>

    {/* Signup Form (Centered) */}
    <OtpForm />
  </div>

</div>


<div className="block bg-casbBluePrimary py-4 px-4 h-screen md:hidden">
      <div className="flex flex-col gap-6">
        <div>
          <Image 
          src="/logo.png"
          width={100}
          height={50}
          alt="logo"/>
        </div>

        <div className='border border-white rounded-sm flex text-white  items-center justify-start gap-4 w-24 p-2 cursor-pointer'>
        <Image 
          src="/back-white.png"
          width={15}
          height={5}
          alt="logo"/>
            <button onClick={()=> router.back()}>
                Back
            </button>
        </div>
      </div>


    <div >
        
      <OtpForm />

    </div>


    </div>
    </div>
  )
}

export default OtpPage