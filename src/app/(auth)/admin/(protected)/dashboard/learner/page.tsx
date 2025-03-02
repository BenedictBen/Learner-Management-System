"use client";

import LearnerDropdown from "@/components/Admin/LearnerDropdown";
import LearnerForms from "@/components/Admin/LearnerForms";
import SearchBar from "@/components/Admin/Search";
import TableLearner from "@/components/Admin/TableLearner";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchLearners } from "@/features/learnerSlice";
import { useDispatch, useSelector } from "react-redux";

const LearnerPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { learners, loading, error } = useSelector(
    (state: RootState) => state.learner
  );
  const [learnerId, setLearnerId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Add debounce for search input
    const debounceTimer = setTimeout(() => {
      dispatch(
        fetchLearners({
          course: filterStatus,
          search: searchTerm,
        })
      );
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [dispatch, filterStatus, searchTerm]);

  const sortedLearners = [...learners].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="w-full overflow-x-hidden min-h-screen box-border">
      {showForm ? (
        <LearnerForms onClose={() => setShowForm(false)} />
      ) : (
        <>
          <div className="flex flex-row flex-nowrap items-center justify-between mb-2 gap-2">
            <h1 className="text-base md:text-2xl  text-black font-bold whitespace-nowrap">
              Learners
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex lg:hidden text-white text-sm bg-casbBluePrimary items-center gap-1 p-2 md:p-3 rounded-md"
            >
              Create Learners
              <Image
                src="/plus.png"
                width={16}
                height={16}
                alt="plus"
                className="w-3 h-3 md:w-4 md:h-4"
              />
            </button>
          </div>

          <div className="flex flex-col md:gap-2 gap-4 md:flex-row items-center justify-center md:justify-start">
            <SearchBar
              placeholder="Search Learners"
              value={searchTerm}
              onChange={setSearchTerm}
            />

            <div className="">
              <LearnerDropdown
                options={[
                  { value: "all", label: "All" },
                  { value: "Software Development", label: "Software" },
                  { value: "Data Science", label: "Data" },
                  { value: "Cyber Security", label: "Cyber" },
                ]}
                selectedValue={filterStatus}
                onSelect={setFilterStatus}
                placeholder="Filter Courses"
              />
            </div>

            <div className="hidden lg:flex text-white bg-casbBluePrimary items-center gap-1 p-2 justify-center md:w-36 lg:w-48">
              <button
                onClick={() => setShowForm(true)}
                className="whitespace-nowrap"
              >
                Create Learner
              </button>
              <Image src="/plus.png" width={10} height={10} alt="plus" />
            </div>
          </div>

          <div className="mt-4">
            <TableLearner learners={sortedLearners} loading={loading} error={error} />
          </div>
        </>
      )}
    </div>
  );
};

export default LearnerPage;
