import React from 'react';

const LearnerNextStep = () => {
  const courses = [
    { id: 1, title: "ReactJs", color: "#E6E6E6" },
    { id: 2, title: "NextJs", color: "#28ACE2" },
    { id: 3, title: "NodeJs", color: "#77C053" },
    { id: 4, title: "Django", color: "#A61D24" },
    { id: 5, title: "MongoDB", color: "#D89614" },
    { id: 6, title: "VueJs", color: "#999999" },
    { id: 7, title: "PowerBI", color: "#E6E6E6" },
    { id: 8, title: "Python", color: "#28ACE2" },
    { id: 9, title: "Excel", color: "#77C053" },
    { id: 10, title: "Tableau", color: "#A61D24" },
    { id: 11, title: "AWS", color: "#D89614" },
    { id: 12, title: "Azure", color: "#999999" },
  ];

  return (
    <div>
      <div className="bg-casbBluePrimary w-full  py-12 text-white">
        <div className='flex items-center justify-center flex-col gap-3 mb-7'>
          <h1 className='font-bold text-2xl'>What will be next step</h1>
          <p className='w-2/5 text-center text-sm'>
            Discover our diverse stack of solutions, including software development, data science, and cloud tools.
            Sign up today and kickstart your journey!
          </p>
        </div>

        <div className="container flex items-center justify-center mx-auto ">
          <div className="grid place-items-center sm:grid-cols-4 sm:grid-rows-4 lg:grid-cols-6 lg:grid-rows-2 gap-5">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-center border h-8 w-20 "
                style={{ borderColor: course.color }}
              >
                {course.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerNextStep;
