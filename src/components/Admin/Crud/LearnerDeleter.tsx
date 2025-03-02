// components/Crud/LearnerDeleter.tsx
"use client";

import React from "react";
import { Learner } from "@/lib/types";
import { RootState, AppDispatch } from "@/lib/store";
import { deleteLearnerAsync } from "@/features/learnerSlice";
import { useDispatch } from "react-redux";

interface LearnerDeleterProps {
  learner: Learner;
  onClose: () => void;
}

export default function LearnerDeleter({ learner, onClose }: LearnerDeleterProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    
    try {
      await dispatch(deleteLearnerAsync(learner._id)).unwrap();
      onClose();
    } catch (err: any) {
      setError(err.message || "Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Delete Learner</h2>
        <p className="mb-4">Are you sure you want to delete {learner.firstname} {learner.lastname}?</p>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}