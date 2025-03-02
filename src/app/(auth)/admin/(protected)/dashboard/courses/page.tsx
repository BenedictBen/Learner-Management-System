"use client";
import CourseCard from "@/components/Admin/CourseCard";
import CourseForms from "@/components/Admin/CourseForms";
import SearchBar from "@/components/Admin/Search";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Course } from "@/lib/types";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchCourses } from "@/features/CoursesSlice";
import { useDispatch, useSelector } from "react-redux";

const CoursesPage = () => {
    const dispatch = useDispatch<AppDispatch>();

  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { courses, loading: coursesLoading, error: coursesError } = useSelector(
    (state: RootState) => state.adminCourses
  );
  const { loading: learnersLoading, error: learnersError } = useSelector(
    (state: RootState) => state.learner
  );

  // Combined loading and error states
  const loading = coursesLoading || learnersLoading;
  const error = coursesError || learnersError;

   useEffect(() => {
      // Add debounce for search input
      const debounceTimer = setTimeout(() => {
        dispatch(
          fetchCourses({
            course: filterStatus,
            search: searchTerm,
          })
        );
      }, 300);
  
      return () => clearTimeout(debounceTimer);
    }, [dispatch, filterStatus, searchTerm]);
  
    const sortedCourses = [...courses].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  return (
    <div className="w-full overflow-x-hidden min-h-screen box-border">
      {showForm ? (
        <div>
          <CourseForms  onClose={() => setShowForm(false)}/>
        </div>
      ) : (
        <>
          <div className="flex flex-row flex-nowrap items-center justify-between mb-2 gap-2">
            <h1 className="text-base md:text-2xl font-bold whitespace-nowrap">
              Courses
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex lg:hidden text-white text-sm bg-casbBluePrimary items-center gap-1 p-2 md:p-3 rounded-md"
            >
              Create Course
              <Image
                src="/plus.png"
                width={16}
                height={16}
                alt="plus"
                className="w-3 h-3 md:w-4 md:h-4"
              />
            </button>
          </div>

          <div className="flex flex-col gap-4 w-full lg:flex-row lg:justify-between lg:items-center">
           <SearchBar
                         placeholder="Search Learners"
                         value={searchTerm}
                         onChange={setSearchTerm}
                       />

            <div className="hidden lg:flex text-white bg-casbBluePrimary items-center gap-1 p-2 flex-shrink-0">
              <button
                onClick={() => setShowForm(true)}
                className="whitespace-nowrap"
              >
                Create Course
              </button>
              <Image src="/plus.png" width={10} height={10} alt="plus" />
            </div>
          </div>

          <div className="mt-12 ">
            <CourseCard courses={sortedCourses} loading={loading} error={error}/>
            
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesPage;
