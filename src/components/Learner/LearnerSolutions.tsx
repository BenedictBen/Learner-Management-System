import Image from 'next/image';
import React from 'react'

const LearnerSolutions = () => {
    const solutions = [
        { id: 1, title: "Software Development", price: "350",description: "Unlock your potential with comprehensive training in modern software development, from coding fundamentals to building complex applications", icon: "/Frame3.png", color: "#CCDEEB"},
        { id: 2, title: "Data Science Mastery", price: "300",description: "Equip yourself with the skills to analyze, interpret, and leverage data, becoming an expert in machine learning, AI, and data-driven decision-making.", icon: "/Frame2.png",color: "#EDF7E8" },
        { id: 3, title: "Cloud Computing Expertise", price: "300",description: "Gain hands-on experience in cloud architecture and deployment, preparing you to design, implement, and manage scalable cloud solutions in the real world", icon: "/Frame1.png", color: "#F7EAD0" },
      ];
  return (
    <div className='py-12'>
        <div className='flex flex-col items-center justify-center '>
            <h3 className='text-3xl font-bold'>Our solutions</h3>
            <p className='text-center px-6 mb-8'>
            Create your account quickly with just your email or social media login, then explore a wide range 
            </p>
        </div>
        <div className='flex flex-col md:flex-row gap-6 items-center justify-center'>
            {solutions.map((solution) => (
            <div key={solution.id} className='flex flex-col gap-4 py-3 px-4 w-72 rounded-md h-[350px] bg-white shadow-lg'>
                <div className={`w-20 h-20 border-2 border-gray-50 p-2 `}
                style={{ backgroundColor: solution.color }}>
  <div className={`w-full h-full flex items-center justify-center`}>
    <Image src={solution.icon} alt="hero" width={60} height={40} />
  </div>
</div>
                <h3 className='font-semi-bold text-lg'>{solution.title}</h3>
                <p> {solution.description}</p>
                    <div className='flex gap-1'>
                    <p className='text-casbDisabled'>Price: </p>
                    <span className='font-bold text-black-500'> ${solution.price}</span>
                    </div>
            </div>
            ))}
            
        </div>
    </div>
  )
}

export default LearnerSolutions