"use client";

import { Divider } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState, useRef, useEffect  } from "react";
import CourseRegisterModal from "./CourseRegisterModal";
import { setCourseCreated,setCourseDetails } from "@/features/courseSlice";
import { CourseDetails } from "@/features/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useCourses } from "@/hooks/learner/useAuth";
import Link from "next/link";

const LearnerApplication = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasCreatedCourse = useSelector(
    (state: RootState) => state.course.hasCreatedCourse
  );
  const courseDetails = useSelector(
    (state: RootState) => state.course.courseDetails
  );
  const [showApplication, setShowApplication] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { courses, loading, error } = useCourses();

  const getCourseDataById = (courseId: string | undefined): { title: string; stacks: string[] } | null => {
    if (!courses || courses.length === 0 || !courseId) {
      return null; // Handle case where courses array is empty or courseId is undefined
    }

    const course = courses.find((course) => course._id === courseId);
    return course ? { title: course.title, stacks: course.stacks || [] } : null;
  };

  const handleClick = () => {
    if (showApplication) {

      setShowApplication(false);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    } else {

      setShowApplication(true);

    }
  };

  const handleCourseCreated = (details: CourseDetails) => {
    dispatch(setCourseCreated(true));
    dispatch(setCourseDetails(details)); // Pass the details object here
    setShowApplication(false);
  };

  useEffect(() => {
    if (!loading && !error) {
      setIsLoaded(true);
    }
  }, [loading, error]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (loading) return <div>Loading courses...</div>;
if (error) return <div>Error loading courses: {error}</div>;
if (!courseDetails?.program) return <div>No course registered</div>;

const courseData = getCourseDataById(courseDetails.program);
if (!courseData) return <div>Course information not found</div>;

  return (
    <div>
      {!hasCreatedCourse ? (
        <>

        <div>
        <Image src="/no-application.png" alt="no-application" width={300} height={100} className="mx-auto"/>
        <p className="font-bold text-center space-y-4">!!! OOPs no application</p>
      </div>

<div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-4 mt-8">
<div className="flex items-center justify-center  cursor-pointer text-black py-3 rounded md:w-52 w-80 bg-casbGreyPrimary">
  <button type="submit" className=" ">
    Home
  </button>
  <Image
    src="/chevron.png"
    alt="chevron"
    width={20}
    height={20}
    className="text-white"
  />
</div>
<div className="flex items-center justify-center  cursor-pointer text-white py-3 rounded md:w-64 w-80  bg-casbBluePrimary">
  <button type="submit" className=" " onClick={handleClick}>
    Start new application
  </button>
  <Image
    src="/chevron-right-white.png"
    alt="chevron"
    width={20}
    height={20}
    className="text-white"
  />
</div>

{/* Registration Modal */}
</div>
{showApplication && (
            <CourseRegisterModal
              onClose={() => setShowApplication(false)}
              onSuccess={handleCourseCreated}
            />
          )}
</>
      ): (
        <div>
        <div className=" flex flex-col mt-4 items-start md:items-center justify-start  gap-4 md:flex-row">
          <div className="flex gap-2 md:block">
            <h1 className="text-casbDisabled">Program</h1>
            <h1 className="font-semi-bold">
              {courseDetails?.program}
              
</h1>
          </div>
          <span className="hidden md:block">
            <Divider orientation="vertical" height="40px" mx={4} />
          </span>
          <div className="flex gap-2 md:block">
            <h1 className="text-casbDisabled">Date registered</h1>
            <p className="font-semi-bold">{courseDetails?.dateRegistered || "N/A"}</p>
          </div>
          <span className="hidden md:block">
            <Divider orientation="vertical" height="40px" mx={4} />
          </span>

          <div className="flex gap-2 md:block">
            <h1 className="text-casbDisabled">Status</h1>
            <p className="font-semi-bold">{courseDetails?.status || "N/A"}</p>
          </div>
          <span className="hidden md:block">
            <Divider orientation="vertical" height="40px" mx={4} />
          </span>

          <div className="flex gap-2 md:block">
            <h1 className="text-casbDisabled">Paid</h1>
            <p className="font-semi-bold">${courseDetails?.amountPaid || "N/A"}</p>
          </div>
        </div>
        <Divider
          orientation="horizontal"
          height="40px"
          mx={1}
          className="mb-8"
        />
<div className="mt-4 bg-white">
<div className="grid grid-cols-3 md:grid-cols-4 gap-4 justify-items-center md:justify-items-start">
{getCourseDataById(courseDetails?.program)?.stacks?.map((stack, index) => (
      <div
        key={index}
        className="bg-casbGreyPrimary px-4 py-2 rounded-md text-sm"
      >
        {stack}
      </div>
    ))}
            </div>
</div>

        {/* Two buttons */}
        <div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-8">
          <div className="flex items-center justify-center  cursor-pointer text-black py-3 rounded md:w-52 w-full bg-casbGreyPrimary">
            <button type="submit" className=" ">
              Home
            </button>
            <Image
              src="/chevron.png"
              alt="chevron"
              width={20}
              height={20}
              className="text-white"
            />
          </div>
          <div className="flex items-center justify-center  cursor-pointer text-white py-3 rounded md:w-64 w-full  bg-casbBluePrimary">
            <button type="submit" className=" " onClick={() => setShowApplication(true)}>
              Start new application
            </button>
            <Image
              src="/chevron-right-white.png"
              alt="chevron"
              width={20}
              height={20}
              className="text-white"
            />
          </div>
        </div>
      </div>
      )}

      {/* {!showApplication ? (

      ) : (

          <CourseRegisterModal onClose={() => setShowApplication(false)} />
      )} */}
    </div>
  );
};

export default LearnerApplication;




<div className="hidden md:flex relative border-casbSeaBlueSecondary border rounded-sm hover:bg-casbBlueHover group transition-all duration-300">
  <div className="flex gap-2 py-2 px-5 items-center">
    <LoginModal />
    <div className="relative m-0 w-[20px] h-[15px]">
      {/* Default Image (Green) */}
      <Image
        src="/log-in-green.svg" // Green version of the SVG
        alt="log-in"
        width={20}
        height={15}
        className="absolute inset-0 opacity-100 transition-opacity duration-300 group-hover:opacity-0"
      />

      {/* Hover Image (White) */}
      <Image
        src="/log-in-white.svg" // White version of the SVG
        alt="log-in"
        width={20}
        height={15}
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  </div>
</div>