// "use client";

// import { Divider, Spinner } from "@chakra-ui/react";
// import Image from "next/image";
// import React, { useState, useRef, useEffect } from "react";
// import CourseRegisterModal from "./CourseRegisterModal";
// import { setCourseCreated, setCourseDetails } from "@/features/courseSlice";
// import { CourseDetails } from "@/features/courseSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/lib/store";
// import { fetchLearnerCourses } from "@/features/courseSlice";

// interface Course {
//   _id: string;
//   title: string;
//   stacks: string[];
//   // Add other course properties as needed
// }

// const LearnerApplication = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [showApplication, setShowApplication] = useState(false);
//   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // Redux state for course application details
//   const {
//     hasCreatedCourse,
//     courseDetails,
//     learnerCourses,
//     loading: coursesLoading,
//     error: coursesError
//   } = useSelector((state: RootState) => state.course);

//   useEffect(() => {
//     dispatch(fetchLearnerCourses());
//   }, [dispatch]);



//   // Helper: Get course by name using the program title
//   const getCourseDataByName = (
//     programName: string | undefined
//   ): Course | null => {
//     if (!learnerCourses || !programName) return null;
//     return learnerCourses.find((course) => course.title === programName) || null;
//   };

//   // Derived course data using the courseDetails.program field
//   const courseData = courseDetails?.program
//     ? getCourseDataByName(courseDetails.program)
//     : null;

//   const handleClick = () => {
//     setShowApplication((prev) => !prev);
//     if (timerRef.current) clearTimeout(timerRef.current);
//   };

//   const handleCourseCreated = (details: CourseDetails) => {
//     dispatch(setCourseCreated(true));
//     dispatch(setCourseDetails(details));
//     dispatch(fetchLearnerCourses()); // Refresh course list
//     setShowApplication(false);
//   };

//   if (coursesLoading)
//     return (
//       <div className="p-4 text-center">
//         <Spinner size="lg" style={{ color: "#186788" }} />
//       </div>
//     );
//   if (coursesError)
//     return <div className="p-4 text-red-500">Error: {coursesError}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       {!hasCreatedCourse ? (
//         <div className="text-center">
//           <Image
//             src="/no-application.png"
//             alt="no-application"
//             width={300}
//             height={100}
//             className="mx-auto"
//           />
//           <p className="font-bold mt-4 text-lg">!!! OOPS, no application</p>

//           <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
//             <button className="flex items-center bg-casbGreyPrimary text-black py-3 px-6 rounded w-80 md:w-52 justify-center transition-colors duration-200 hover:bg-casbGrayHover">
//               Home
//               <Image
//                 src="/chevron.png"
//                 alt="chevron"
//                 width={20}
//                 height={20}
//                 className="ml-2"
//               />
//             </button>

//             <div className="flex items-center bg-casbBluePrimary text-white py-3 px-6 rounded w-80 md:w-64 justify-center hover:bg-casbBlueHover">
//               <button onClick={handleClick} className="whitespace-nowrap">
//                 Start new application
//               </button>
//               <Image
//                 src="/chevron-right-white.png"
//                 alt="chevron"
//                 width={20}
//                 height={20}
//                 className="ml-2"
//               />
//             </div>
//           </div>

//           {showApplication && (
//             <CourseRegisterModal
//               onClose={() => setShowApplication(false)}
//               onSuccess={handleCourseCreated}
//             />
//           )}
//         </div>
//       ) : (
//         <div>
//           <div className="flex flex-col mt-4 items-start md:items-center justify-start gap-6 md:flex-row">
//             <div className="flex gap-2 md:block">
//               <h1 className="text-casbDisabled text-base lg:text-md">Program</h1>
//               <h1 className="font-semi-bold">{courseDetails?.program}</h1>
//             </div>
//             <span className="hidden md:block">
//               <Divider orientation="vertical" height="40px" mx={1} />
//             </span>
//             <div className="flex gap-2 md:block">
//               <h1 className="text-casbDisabled text-sm whitespace-nowrap">
//                 Date registered
//               </h1>
//               <p className="font-semi-bold">
//                 {courseDetails?.dateRegistered || "N/A"}
//               </p>
//             </div>
//             <span className="hidden md:block">
//               <Divider orientation="vertical" height="40px" mx={4} />
//             </span>
//             <div className="flex gap-2 md:block">
//               <h1 className="text-casbDisabled">Status</h1>
//               <p className="font-semi-bold">
//                 {courseDetails?.status || "N/A"}
//               </p>
//             </div>
//             <span className="hidden md:block">
//               <Divider orientation="vertical" height="40px" mx={4} />
//             </span>
//             <div className="flex gap-2 md:block">
//               <h1 className="text-casbDisabled">Paid</h1>
//               <span className="font-semi-bold flex">
//                 <p>&#162;</p>
//                 {courseDetails?.amountPaid || "N/A"}
//               </span>
//             </div>
//           </div>

//           <Divider className="my-8" />

//           {courseData && courseData.stacks && courseData.stacks.length > 0 && (
//             <div className="mt-8 flex flex-col md:flex-row gap-4">
//               {courseData.stacks.map((stack, index) => {
//                 const borderColors = [
//                   "#28ACE2",
//                   "#77C053",
//                   "#A61D24",
//                   "#D89614",
//                   "#999999",
//                 ];
//                 return (
//                   <div
//                     key={index}
//                     className="p-3 rounded-lg border w-[100px] h-[50px] flex items-center justify-center transition-all hover:shadow-md"
//                     style={{
//                       borderColor: borderColors[index % borderColors.length],
//                       transition: "border-color 0.3s ease",
//                     }}
//                   >
//                     <span className="font-medium text-gray-700 text-center">
//                       {stack}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-8">
//             <div className="flex items-center justify-center cursor-pointer text-black py-3 rounded md:w-52 w-full bg-casbGreyPrimary">
//               <button type="submit">Home</button>
//               <Image
//                 src="/chevron.png"
//                 alt="chevron"
//                 width={20}
//                 height={20}
//                 className="ml-2"
//               />
//             </div>
//             <div className="flex items-center justify-center cursor-pointer text-white py-3 rounded md:w-64 w-full bg-casbBluePrimary">
//               <button type="submit" onClick={() => setShowApplication(true)}>
//                 Start new application
//               </button>
//               <Image
//                 src="/chevron-right-white.png"
//                 alt="chevron"
//                 width={20}
//                 height={20}
//                 className="ml-2"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LearnerApplication;


"use client";

import { Divider, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import CourseRegisterModal from "./CourseRegisterModal";
import { setCourseCreated, setCourseDetails } from "@/features/courseSlice";
import { CourseDetails } from "@/features/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchLearnerCourses } from "@/features/courseSlice";

interface Course {
  _id: string;
  title: string;
  stacks: string[];
  // Add other course properties as needed
}

const LearnerApplication = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showApplication, setShowApplication] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Redux state for course application details
  const hasCreatedCourse = useSelector(
    (state: RootState) => state.course.hasCreatedCourse
  );
  const courseDetails = useSelector(
    (state: RootState) => state.course.courseDetails
  );

  // Local state for fetched courses
  const [learnerCourses, setLearnerCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState<string | null>(null);

  useEffect(() => {
    setCoursesLoading(true);
    dispatch(fetchLearnerCourses())
      .unwrap()
      .then((data: Course[]) => {
        setLearnerCourses(data);
        setCoursesLoading(false);
      })
      .catch((err) => {
        setCoursesError(err);
        setCoursesLoading(false);
      });
  }, [dispatch]);

  // Helper: Get course by name using the program title
  const getCourseDataByName = (
    programName: string | undefined
  ): Course | null => {
    if (!learnerCourses || !programName) return null;
    return learnerCourses.find((course) => course.title === programName) || null;
  };

  // Derived course data using the courseDetails.program field
  const courseData = courseDetails?.program
    ? getCourseDataByName(courseDetails.program)
    : null;

  const handleClick = () => {
    setShowApplication((prev) => !prev);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleCourseCreated = (details: CourseDetails) => {
    dispatch(setCourseCreated(true));
    dispatch(setCourseDetails(details));
    setShowApplication(false);
  };

  if (coursesLoading)
    return (
      <div className="p-4 text-center">
        <Spinner size="lg" style={{ color: "#186788" }} />
      </div>
    );
  if (coursesError)
    return <div className="p-4 text-red-500">Error: {coursesError}</div>;

  return (
    <div className="container mx-auto p-4">
      {!hasCreatedCourse ? (
        <div className="text-center">
          <Image
            src="/no-application.png"
            alt="no-application"
            width={300}
            height={100}
            className="mx-auto"
          />
          <p className="font-bold mt-4 text-lg">!!! OOPS, no application</p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <button className="flex items-center bg-casbGreyPrimary text-black py-3 px-6 rounded w-80 md:w-52 justify-center transition-colors duration-200 hover:bg-casbGrayHover">
              Home
              <Image
                src="/chevron.png"
                alt="chevron"
                width={20}
                height={20}
                className="ml-2"
              />
            </button>

            <div className="flex items-center bg-casbBluePrimary text-white py-3 px-6 rounded w-80 md:w-64 justify-center hover:bg-casbBlueHover">
              <button onClick={handleClick} className="whitespace-nowrap">
                Start new application
              </button>
              <Image
                src="/chevron-right-white.png"
                alt="chevron"
                width={20}
                height={20}
                className="ml-2"
              />
            </div>
          </div>

          {showApplication && (
            <CourseRegisterModal
              onClose={() => setShowApplication(false)}
              onSuccess={handleCourseCreated}
            />
          )}
        </div>
      ) : (
        <div>
          <div className="flex flex-col mt-4 items-start md:items-center justify-start gap-6 md:flex-row">
            <div className="flex gap-2 md:block">
              <h1 className="text-casbDisabled text-base lg:text-md">Program</h1>
              <h1 className="font-semi-bold">{courseDetails?.program}</h1>
            </div>
            <span className="hidden md:block">
              <Divider orientation="vertical" height="40px" mx={1} />
            </span>
            <div className="flex gap-2 md:block">
              <h1 className="text-casbDisabled text-sm whitespace-nowrap">
                Date registered
              </h1>
              <p className="font-semi-bold">
                {courseDetails?.dateRegistered || "N/A"}
              </p>
            </div>
            <span className="hidden md:block">
              <Divider orientation="vertical" height="40px" mx={4} />
            </span>
            <div className="flex gap-2 md:block">
              <h1 className="text-casbDisabled">Status</h1>
              <p className="font-semi-bold">
                {courseDetails?.status || "N/A"}
              </p>
            </div>
            <span className="hidden md:block">
              <Divider orientation="vertical" height="40px" mx={4} />
            </span>
            <div className="flex gap-2 md:block">
              <h1 className="text-casbDisabled">Paid</h1>
              <span className="font-semi-bold flex">
                <p>&#162;</p>
                {courseDetails?.amountPaid || "N/A"}
              </span>
            </div>
          </div>

          <Divider className="my-8" />

          {courseData && courseData.stacks && courseData.stacks.length > 0 && (
            <div className="mt-8 flex flex-col md:flex-row gap-4">
              {courseData.stacks.map((stack, index) => {
                const borderColors = [
                  "#28ACE2",
                  "#77C053",
                  "#A61D24",
                  "#D89614",
                  "#999999",
                ];
                return (
                  <div
                    key={index}
                    className="p-3 rounded-lg border w-[100px] h-[50px] flex items-center justify-center transition-all hover:shadow-md"
                    style={{
                      borderColor: borderColors[index % borderColors.length],
                      transition: "border-color 0.3s ease",
                    }}
                  >
                    <span className="font-medium text-gray-700 text-center">
                      {stack}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-8">
            <div className="flex items-center justify-center cursor-pointer text-black py-3 rounded md:w-52 w-full bg-casbGreyPrimary">
              <button type="submit">Home</button>
              <Image
                src="/chevron.png"
                alt="chevron"
                width={20}
                height={20}
                className="ml-2"
              />
            </div>
            <div className="flex items-center justify-center cursor-pointer text-white py-3 rounded md:w-64 w-full bg-casbBluePrimary">
              <button type="submit" onClick={() => setShowApplication(true)}>
                Start new application
              </button>
              <Image
                src="/chevron-right-white.png"
                alt="chevron"
                width={20}
                height={20}
                className="ml-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnerApplication;