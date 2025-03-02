
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchLearners, updateLearner } from "@/features/learnerSlice";
import { fetchCourses } from "@/features/CoursesSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Spinner } from "@chakra-ui/react";
import { Learner } from "@/lib/types";
import LearnerSideProfile from "./LearnerSideProfile";
import LearnerEditor from "./Crud/LearnerEditor";
import LearnerDeleter from "./Crud/LearnerDeleter";

interface TableLearnerProps {
  learners: Learner[];
  loading: boolean;
  error: string | null;
}

export default function TableLearner({ learners, loading, error }: TableLearnerProps) {
  const [selectedLearnerId, setSelectedLearnerId] = useState<string | null>(null);
  const [deletingLearner, setDeletingLearner] = useState<Learner | null>(null);
  const [editingLearner, setEditingLearner] = useState<Learner | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dispatch = useDispatch<AppDispatch>();

  // Dispatch the Redux thunk to fetch courses on component mount.
  useEffect(() => {
    dispatch(fetchCourses({}));
  }, [dispatch]);

  // Retrieve courses and their loading status from Redux.
  const { courses } = useSelector((state: RootState) => state.adminCourses);

  // Calculate the current page items.
  const currentItems = learners.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(learners.length / itemsPerPage);

  // Updated getCourseTitle to only fetch and return the title.
  const getCourseTitle = (courseId: string) => {
    const course = courses.find((c: any) => c._id === courseId);
    return course ? course.title : "Unknown Course";
  };

  const handleViewProfile = (learnerId: string) => {
    setSelectedLearnerId(learnerId);
  };

  const closeProfile = () => {
    setSelectedLearnerId(null);
  };

  const handleUpdated = (updatedLearner: Learner) => {
    dispatch(updateLearner(updatedLearner));
    setEditingLearner(null);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <LearnerSideProfile learnerId={selectedLearnerId} onClose={closeProfile} />
      {editingLearner && (
        <LearnerEditor
          learner={editingLearner}
          onClose={() => setEditingLearner(null)}
          onUpdated={(updated) => {
            handleUpdated(updated);
            dispatch(fetchLearners({}));
          }}
        />
      )}
      {deletingLearner && (
        <LearnerDeleter
          learner={deletingLearner}
          onClose={() => {
            setDeletingLearner(null);
            dispatch(fetchLearners({}));
          }}
        />
      )}
      <div className="w-full max-w-[100vw] overflow-x-auto">
        <Table className="w-full text-black dark:text-white p-2">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Learners</TableHead>
              <TableHead className="font-bold">Course</TableHead>
              <TableHead className="font-bold">Amount</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Gender</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-black dark:text-white divide-y divide-gray-200">
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <div className="flex justify-center items-center min-h-[200px]">
                    <Spinner size="lg" color="#01589A" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((learner, index) => (
                <TableRow
                  key={`${learner._id}-${index}`}
                  className={cn("hover:bg-gray-50", index !== currentItems.length - 1 && "pb-4")}
                >
                  {/* Learner Name */}
                  <TableCell className="font-medium py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={learner.image || "/john.png"}
                          alt="Profile picture"
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/john.png";
                          }}
                        />
                      </div>
                      <span>{learner.firstname} {learner.lastname}</span>
                    </div>
                  </TableCell>

                  {/* Course Title */}
                  <TableCell>{getCourseTitle(learner.course)}</TableCell>

                  {/* Amount */}
                  <TableCell>${learner.amount}</TableCell>

                  {/* Date */}
                  <TableCell>{new Date(learner.createdAt).toLocaleDateString()}</TableCell>

                  {/* Gender */}
                  <TableCell>{learner.gender}</TableCell>

                  {/* Actions */}
                  <TableCell>
                    <div className="flex items-center justify-center gap-2 w-10 h-10 cursor-pointer">
                      <Image
                        src="/eye-profile.png"
                        width={30}
                        height={30}
                        alt="eye-profile"
                        onClick={() => handleViewProfile(learner._id)}
                      />
                      <Image
                        src="/edit.png"
                        width={30}
                        height={30}
                        alt="edit"
                        onClick={() => setEditingLearner(learner)}
                      />
                      <Image
                        src="/delete.png"
                        width={30}
                        height={30}
                        alt="delete"
                        onClick={() => setDeletingLearner(learner)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mt-8">
        <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
          <div className="bg-casbGreyPrimary dark:bg-black px-3 py-3 rounded-md">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <Image src="/less.png" alt="Previous" width={25} height={25} className="mx-auto" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-casbGreyPrimary dark:bg-black px-3 py-3 rounded-md">
              <span className="text-gray-400 text-lg">{currentPage}</span>
            </div>
            <p>{`${currentPage} of ${totalPages}`}</p>
          </div>
          <div className="bg-casbGreyPrimary dark:bg-black px-3 py-3 rounded-md">
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="disabled:opacity-50"
            >
              <Image src="/greater.png" alt="Next" width={25} height={25} className="mx-auto" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-end md:justify-start gap-2">
          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-md w-full md:w-auto">
            <p>Results per page</p>
            <p className="flex items-center justify-center gap-2 bg-casbGreyPrimary dark:bg-black px-2 py-2 rounded-md">
              {itemsPerPage}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 disabled:opacity-50"
              >
                <Image src="/chevron.png" alt="Chevron" width={30} height={30} className="mx-auto" />
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
