
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Learner } from "@/lib/types"; // Ensure this matches your Learner type
import { useCourseList } from "@/hooks/learner/useAuth";
import { AppDispatch } from "@/lib/store";
import { updateLearnerAsync } from "@/features/learnerSlice";
import { useDispatch } from "react-redux";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { FieldIcons } from "@/lib/FormsIcons";

// Example FieldIcons – adjust or import these from your icons file

interface LearnerEditorProps {
  learner: Learner;
  onClose: () => void;
  onUpdated: (updatedLearner: Learner) => void;
}

export default function LearnerEditor({
  learner,
  onClose,
  onUpdated,
}: LearnerEditorProps) {
  const [amount, setAmount] = useState(learner.amount);
  const [course, setCourse] = useState(learner.course);
  const [image, setImage] = useState<string>(learner.image || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For image upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(learner.image || "");
  const [imageError, setImageError] = useState<string | null>(null);
  const [focusUpload, setFocusUpload] = useState(false);

  // Flag to trigger update logic in useEffect
  const [updateRequested, setUpdateRequested] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const {
    data: coursesData,
    isLoading: coursesLoading,
    error: coursesError,
  } = useCourseList();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
      setImageError(null);
    }
  };

  // useEffect that triggers when updateRequested becomes true
  useEffect(() => {
    if (!updateRequested) return;

    const updateLearner = async () => {
      setLoading(true);
      setError(null);
      let imageUrl = image; // default to existing image

      if (imageFile) {
        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (imageFile.size > maxSize) {
          setError("File size exceeds the limit (5MB)");
          setLoading(false);
          setUpdateRequested(false);
          return;
        }
        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(imageFile.type)) {
          setError("Invalid file type (only JPEG, PNG, GIF allowed)");
          setLoading(false);
          setUpdateRequested(false);
          return;
        }
        try {
          // Upload image using your helper function (which uses env variables)
          imageUrl = await uploadImageToCloudinary(imageFile);
        } catch (uploadError: any) {
          setError(uploadError.message || "Image upload failed");
          setLoading(false);
          setUpdateRequested(false);
          return;
        }
      }

      const updatedLearner = { ...learner, amount, course, image: imageUrl };
       // Optimistically update the UI.
    onUpdated(updatedLearner);

      try {
        await dispatch(updateLearnerAsync(updatedLearner)).unwrap();
        onClose();
      } catch (err: any) {
        setError(err.message || "Update failed");
      } finally {
        setLoading(false);
        setUpdateRequested(false);
      }
    };

    updateLearner();
  }, [updateRequested, amount, course, image, imageFile, learner, dispatch, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setUpdateRequested(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Learner</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Course</label>
            {coursesLoading ? (
              <p>Loading courses...</p>
            ) : coursesError ? (
              <p>Error loading courses</p>
            ) : (
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Program</option>
                {Array.isArray(coursesData) &&
                  coursesData.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title}
                    </option>
                  ))}
              </select>
            )}
          </div>
          <div key="Image" className="relative w-full mb-4">
            <div
              className={`relative flex items-center border-b-2 p-3 bg-white rounded-sm cursor-pointer appearance-none ${
                imageError
                  ? "border-red-500"
                  : imagePreview
                  ? "border-green-500"
                  : "border-casbBluePrimary"
              }`}
            >
              <label
                htmlFor="imageUpload"
                className="flex items-center justify-center cursor-pointer"
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Image Preview"
                    width={30}
                    height={30}
                    className="mr-2 rounded"
                  />
                ) : (
                  <Image
                    src={FieldIcons.upload  as string}
                    alt="Upload Icon"
                    width={20}
                    height={20}
                    className="mr-2"
                    style={{
                      filter: focusUpload
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                        : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                    }}
                  />
                )}
                <span className="text-gray-700">
                  {imagePreview ? "Change Image" : "Upload Image"}
                </span>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                onFocus={() => setFocusUpload(true)}
                onBlur={() => setFocusUpload(false)}
                className="hidden"
              />
              {imagePreview && !imageError && (
                <Image
                  src={FieldIcons.successIcon as string}
                  alt="Success"
                  width={20}
                  height={20}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
              {imageError && (
                <Image
                  src={FieldIcons.errorIcon  as string}
                  alt="Error"
                  width={20}
                  height={20}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
            </div>
            {imageError && (
              <p className="text-red-500 text-sm mt-1 text-center">
                {imageError}
              </p>
            )}
          </div>
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
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
