"use client"
import { Divider } from "@chakra-ui/react";
import Image from "next/image";
import { notFound,useRouter } from "next/navigation";
import React, { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useParams } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { fetchCourses } from "@/features/CoursesSlice";
import { Course } from "@/lib/types";
import SD from "../../../../../../../../public/SD.png";
import CCE from "../../../../../../../../public/CCE.png";
import DS from "../../../../../../../../public/DS.png";



interface Params {
  id: string;
}





export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading, error } = useSelector((state: RootState) => state.adminCourses);

  // Find the course using actual API _id format
  const course = courses.find(c => c._id === params.id);
  useEffect(() => {
    // Refresh courses if not already loaded
    if (courses.length === 0) {
      dispatch(fetchCourses({}));
    }
  }, [dispatch, courses.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return notFound();

  const formattedDate = new Date(course.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fallbackImages = [ SD, CCE,DS,];

  const [imageSrc, setImageSrc] = useState(course.image || fallbackImages[0]);

  const list = [
    { id: 1,  color: "#E6E6E6" },
    { id: 2,  color: "#28ACE2" },
    { id: 3,  color: "#77C053" },
    { id: 4,  color: "#A61D24" },
    { id: 5,  color: "#D89614" },
    { id: 6, color: "#999999" },
    { id: 7,  color: "#E6E6E6" },
    { id: 8,  color: "#28ACE2" },
    { id: 9, color: "#77C053" },
    { id: 10, color: "#A61D24" },
    { id: 11, color: "#D89614" },
    { id: 12, color: "#999999" },
  ];

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white dark:bg-black rounded-lg w-full max-w-screen-lg">
          <div className="flex flex-row justify-start items-center mb-6">
            <h2 className="text-casbGrayHover">Courses</h2>
            <Divider orientation="vertical" height="40px" mx={4} />
            <h2 className="text-lg font-bold">details</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-4 md:gap-8 h-full ">
          <div className="border-8 border-casbGreyBorder ">
            <div className="">
              <Image
                src={imageSrc}
                alt={course.title}
                width={500}
                height={300}
                onError={() => setImageSrc(fallbackImages[0])}
              />
              <h1 className="font-bold py-4 px-4">{course.title}</h1>
            </div>

            <div className="flex gap-4 flex-col border-t-8 border-casbGreyBorder">
              <div className="py-4 px-4">
                <h2 className="font-bold text-lg">About Course</h2>
                <p className="py-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus, corporis?
                </p>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p>Price:</p>
                    <p className="font-bold">{course.price}</p>
                  </div>
                  <Divider className="mx-auto" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p>Duration:</p>
                    <p className="font-bold">{course.duration}</p>
                  </div>
                  <Divider className="mx-auto" />
                </div>

                <div className="">
                  <div className="flex items-center justify-between mb-2">
                    <p>Instructor:</p>
                    <p className="font-bold">{course.instructor}</p>
                  </div>
                  <Divider className="mx-auto" />
                </div>

                <div className="">
                  <div className="flex items-center justify-between mb-2">
                    <p>Date:</p>
                    <p className="font-bold">{formattedDate}</p>
                  </div>
                  <Divider className="mx-auto" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-2 border-8 border-casbGreyBorder ">
            <div className="px-3 py-2">
              <h2 className="font-bold">Description</h2>
              <p className="py-4">
              {course.descriptions || "No description available"}
              </p>

              <div className="flex flex-row md:flex-row items-center gap-4">
  <p className="font-bold">Stacks:</p>
  <div className="flex flex-wrap gap-2">
    {Array.isArray(course.stacks)
      ? course.stacks.map((stack, index) => (
          <span
            key={index}
            className="px-2 py-1 border rounded text-sm"
            style={{ borderColor: list[index % list.length].color }}
          >
            {stack}
          </span>
        ))
      : (
          <span
            className="px-2 py-1 border rounded text-sm"
            style={{ borderColor: list[0].color }}
          >
            {course.stacks}
          </span>
        )}
  </div>
</div>

              {/* buttons */}
              <div className="flex justify-start md:justify-end gap-3 mt-6">
                <div className="flex items-center flex-row justify-center gap-2 bg-casbGreyPrimary hover:bg-gray-200 rounded-sm">
                  <button
                    type="button"
                    //   onClick={handleCancel}
                    className="w-full p-2 text-gray-600   "
                    onClick={() => router.back()}
                  >
                    Back
                  </button>
                  <Image
                    src="/chevron.png"
                    alt="chevron"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="flex items-center flex-row justify-center gap-1 bg-casbBluePrimary rounded-sm">
                  <button
                    type="submit"
                    className="w-full p-2 text-white rounded hover:bg-casbwhite transition-colors duration-300 "
                  >
                    Update
                  </button>
                  <Image
                    src="/chevron-right-white.png"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}
