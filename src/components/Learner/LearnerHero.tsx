import Image from 'next/image'
import React from 'react'

const LearnerHero = () => {
  return (
    <div>
        {/* Desktop View */}
    <div className='hidden md:block bg-casbBluePrimary'>
        <div className=' md:flex items-center justify-around px-8 py-20'>
            <div className='flex w-1/3 flex-col items-left gap-4 px-8 pt-3 lg:pl-20  text-white '>
                <h2 className='sm:text-lg lg:text-xl font-bold'>
                Unlock Your Potential with 
                Industry-Leading Courses!
                </h2>
                <p className='text-sm'>
                "Join thousands of learners gaining real-world skills and advancing their careers. 
                Our expert-led courses are designed to empower you to succeed."
                </p>
                <div className='text-left border-"#E6EFF5" border rounded-sm w-28 mt-1'>
                    <button className='py-2 px-3 text-center text-sm'>Get started</button>
                </div>
            </div>
            <div className=''>
                <Image src="/hero-pic.png" alt="hero" width={300} height={100}/>
            </div>
        </div>
    </div>

    
{/* Container for mobile view */}
<div className="flex flex-col items-center justify-center px-4 py-10 text-white bg-casbBluePrimary md:hidden">
    <div className="mb-4 py-8">
      <Image src="/hero-pic.png" alt="hero" width={300} height={100} />
    </div>
    <div className="text-center ">
      <h2 className="text-lg font-bold mb-2 min-w-44">
        Unlock Your Potential with Industry-Leading Courses!
      </h2>
      <p className="text-sm mb-4">
        "Join thousands of learners gaining real-world skills and advancing
        their careers. Our expert-led courses are designed to empower you to
        succeed."
      </p>
      <div className="border border-gray-200 rounded-sm w-28 mx-auto">
        <button className="py-2 px-3 text-sm">Get started</button>
      </div>
    </div>
  </div>
    </div>
  )
}

export default LearnerHero