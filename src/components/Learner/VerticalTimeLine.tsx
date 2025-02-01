import React from "react";

const VerticalTimeline = () => {
  
  const timelineSteps = [
    { id: 1, title: "Sign Up and Choose Your Course", description: "Create your account quickly with just your email or social media login, then explore a wide range." },
    { id: 2, title: "Onboarding", description: "Create your account quickly with just your email or social media login, then explore a wide range." },
    { id: 3, title: "Start Learning", description: "Create your account quickly with just your email or social media login, then explore a wide range." },
  ];

  return (
    <div className="flex flex-col items-center ">
      {timelineSteps.map((step, index) => (
        <div key={step.id} className="flex items-start w-full">
          {/* Timeline (Circle and Line) */}
          <div className="flex flex-col items-center">
            {/* Circle */}
            <div className="min-w-8 min-h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="min-w-4 min-h-4 bg-white rounded-full"></div>
            </div>

            {/* Line (for all except the last item) */}
            {index < timelineSteps.length - 1 && (
              <div className="min-h-24 min-w-0.5 bg-blue-300"></div>
            )}
          </div>

          {/* Text on the Right Side */}
          <div className="ml-4">
            <h3 className="md:text-md font-bold text-gray-700">{step.title}</h3>
            <p className="text-sm text-gray-500 w-64">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalTimeline;
