

"use client";

import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { FieldIcons } from "@/lib/FormsIcons";
// import { FormValues } from "@/lib/types";
import { Divider } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { createCourseAsync } from "@/features/CoursesSlice";

interface FormValues {
  course: string;
  amount: number;
  instructor: string;
  duration: string;
  stacks: string[]; // change this from string to string[]
  image: string;
  description: string;
}

interface CourseFormProps {
  onClose: () => void;
}

export default function CourseForms({ onClose }: CourseFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [focusCourse, setFocusCourse] = useState(false);
  const [focusAmount, setFocusAmount] = useState(false);
  const [focusInstructor, setFocusInstructor] = useState(false);
  const [focusUpload, setFocusUpload] = useState(false);
  const [focusDetail, setFocusDetail] = useState(false);
  const [focusStack, setFocusStack] = useState(false);
  const [focusDuration, setFocusDuration] = useState(false);
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);


  const [customStack, setCustomStack] = useState<string>("");



  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      amount: 0, // set a default number instead of leaving it empty
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
      setImageError(null);
      clearErrors("image");
    }
  };

  const handleAddCustomStack = () => {
    const trimmed = customStack.trim();
    if (trimmed) {
      // Get current stacks (if any) and add the new one if it isn't already included
      const currentStacks = (watch("stacks") as string[]) || [];
      if (!currentStacks.includes(trimmed)) {
        setValue("stacks", [...currentStacks, trimmed]);
      }
      setCustomStack("");
    }
  };

  const handleRemoveStack = (stack: string) => {
    const currentStacks = (watch("stacks") as string[]) || [];
    const newStacks = currentStacks.filter((s) => s !== stack);
    setValue("stacks", newStacks);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      // Validate image
      if (!imageFile) {
        setImageError("Image is required");
        return;
      }

      if (!(imageFile instanceof File)) {
        setImageError("Invalid file type");
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (imageFile.size > maxSize) {
        setImageError("File size exceeds the limit (5MB)");
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(imageFile.type)) {
        setImageError("Invalid file type (only JPEG, PNG, GIF allowed)");
        return;
      }

      // Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(imageFile);

      // Build payload for creating a course
      const payload = {
        title: data.course.trim(),
        price: data.amount,
        instructor: data.instructor.trim(),
        duration: data.duration.trim(),
        // For stacks, if you expect multiple values separated by commas:
        stacks: data.stacks, 
        image: imageUrl,
        descriptions: data.description.trim(),
      };

      // Dispatch createCourseAsync thunk
      await dispatch(createCourseAsync(payload));

      reset();
      onClose();
      alert("Course created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
      // Optionally set an error state here
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white dark:bg-black rounded-lg w-full max-w-screen-lg">
        <div className="flex flex-row justify-start items-center mb-6">
          <h2 className="text-casbGrayHover">Courses</h2>
          <Divider orientation="vertical" height="40px" mx={4} />
          <h2 className="text-lg font-semi-bold">Create Course</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 gap-6 bg-casbGreyPrimary dark:bg-black p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Title */}
              <div key="Course Title" className="relative">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Course Title"
                    {...register("course", {
                      required: "Course Title is required",
                    })}
                    onFocus={() => setFocusCourse(true)}
                    onBlur={() => setFocusCourse(false)}
                    className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                      errors.course
                        ? "!bg-red-100 border-gray-300"
                        : watch("course")
                       ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                          : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                    } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
                  />
                  {FieldIcons.course && (
                    <Image
                      src={FieldIcons.course as string}
                      alt="course"
                      width={20}
                      height={20}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      style={{
                        filter: focusCourse
                          ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                          : errors.course
                          ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                          : watch("course")
                          ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                          : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                      }}
                    />
                  )}
                  {watch("course") && !errors.course && (
                    <Image
                      src={FieldIcons.successIcon as string}
                      alt="Success"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                  {errors.course && (
                    <Image
                      src={FieldIcons.errorIcon as string}
                      alt="Error"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                </div>
                {errors.course && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.course.message}
                  </p>
                )}
              </div>

              {/* Amount (Price) */}
              <div key="Amount" className="relative">
                <div className="relative flex items-center">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    {...register("amount", {
                      required: "Amount is required",
                      min: {
                        value: 0.01,
                        message: "Amount must be greater than 0",
                      },
                      valueAsNumber: true,
                    })}
                    onFocus={() => setFocusAmount(true)}
                    onBlur={() => setFocusAmount(false)}
                    className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                      errors.amount
                        ? "!bg-red-100 border-gray-300"
                        : watch("amount")
                       ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                          : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                    } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
                  />
                  <Image
                    src={FieldIcons.amount as string}
                    alt="Amount"
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{
                      filter: focusAmount
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                        : errors.amount
                        ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                        : watch("amount")
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                        : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                    }}
                  />
                  {watch("amount") && !errors.amount && (
                    <Image
                      src={FieldIcons.successIcon as string}
                      alt="Success"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                  {errors.amount && (
                    <Image
                      src={FieldIcons.errorIcon as string}
                      alt="Error"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>
            </div>

            {/* Instructor */}
            <div key="Instructor" className="relative">
              <div className="relative flex items-center">
                <input
                  placeholder="Instructor"
                  {...register("instructor", {
                    required: "Instructor is required",
                  })}
                  onFocus={() => setFocusInstructor(true)}
                  onBlur={() => setFocusInstructor(false)}
                  className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                    errors.instructor
                      ? "!bg-red-100 border-gray-300"
                      : watch("instructor")
                     ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                        : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                  } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
                />
                {FieldIcons.detail && (
                  <Image
                    src={FieldIcons.gender as string}
                    alt="instructor"
                    width={20}
                    height={20}
                    className="absolute left-3 top-4 transform"
                    style={{
                      filter: focusInstructor
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                        : errors.instructor
                        ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                        : watch("instructor")
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                        : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                    }}
                  />
                )}
                {watch("instructor") && !errors.instructor && (
                  <Image
                    src={FieldIcons.successIcon as string}
                    alt="Success"
                    width={20}
                    height={20}
                    className="absolute right-3 top-4 transform"
                  />
                )}
                {errors.instructor && (
                  <Image
                    src={FieldIcons.errorIcon as string}
                    alt="Error"
                    width={20}
                    height={20}
                    className="absolute right-3 top-4 transform"
                  />
                )}
              </div>
              {errors.instructor && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.instructor.message}
                </p>
              )}
            </div>

            {/* Duration */}
            <div key="Duration" className="relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Duration"
                  {...register("duration", {
                    required: "Duration is required",
                  })}
                  onFocus={() => setFocusDuration(true)}
                  onBlur={() => setFocusDuration(false)}
                  className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                    errors.duration
                      ? "!bg-red-100 border-gray-300"
                      : watch("duration")
                     ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                        : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                  } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
                
                />
                {FieldIcons.status && (
                  <Image
                    src={FieldIcons.status as string}
                    alt="duration"
                    width={20}
                    height={20}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2"
                    style={{
                      filter: focusDuration
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                        : errors.duration
                        ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                        : watch("duration")
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                        : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                    }}
                  />
                )}
                {watch("duration") && (
                  <Image
                    src={FieldIcons.successIcon as string}
                    alt="Success"
                    width={20}
                    height={20}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                )}
                {errors.duration && (
                  <Image
                    src={FieldIcons.errorIcon as string}
                    alt="Error"
                    width={20}
                    height={20}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                )}
              </div>
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
              )}
            </div>

            {/* Stacks */}

             <div key="Stacks" className="relative">
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Stacks</label> */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add a stack"
                value={customStack}
                onChange={(e) => setCustomStack(e.target.value)}
                onFocus={() => setFocusStack(true)}
                    onBlur={() => setFocusStack(false)}
                className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                  errors.stacks
                    ? "!bg-red-100 border-gray-300"
                    : watch("stacks")
                   ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                      : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
              
              />
              <button
                type="button"
                onClick={handleAddCustomStack}
                className="bg-blue-500 text-white px-2 py-2 rounded"
              >
                Add
              </button>
            </div>
            {errors.stacks && <p className="text-red-500 text-sm mt-1">{errors.stacks.message}</p>}
            <div className="mt-2 flex flex-wrap gap-2">
              {(watch("stacks") as string[] || []).map((stack, index) => (
                <div key={index} className="flex items-center  px-2 py-1 rounded border-4 p-2 border-casbBlueHover">
                  <span>{stack}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStack(stack)}
                    className="ml-1 text-red-500"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

            {/* Image Upload */}
            <div key="Image" className="relative w-full">
              <div
                className={`relative flex items-center border-b-2 p-3 placeholder-gray-400 dark:placeholder-white bg-white focus:border-casbBluePrimary rounded-sm focus:outline-none cursor-pointer appearance-none ${
                  errors.image
                    ? "!bg-red-100 border-gray-300"
                    : imagePreview
                    ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                    : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
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
                      src={FieldIcons.upload as string}
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
                  <span className="text-gray-700 dark:text-white">
                    {imagePreview ? "Change Image" : "Upload Image"}
                  </span>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Image is required" })}
                  onChange={(event) => {
                    handleImageChange(event);
                    clearErrors("image");
                  }}
                  onFocus={() => setFocusUpload(true)}
                  onBlur={() => setFocusUpload(false)}
                  className="hidden"
                />
                {imagePreview && !errors.image && (
                  <Image
                    src={FieldIcons.successIcon as string}
                    alt="Success"
                    width={20}
                    height={20}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                )}
                {errors.image && (
                  <Image
                    src={FieldIcons.errorIcon as string}
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
              {errors.image && (
                <p className="text-red-500 text-sm mt-1 text-center">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div key="Detail" className="relative">
              <div className="relative flex items-center">
                <input
                  placeholder="Description"
                  {...register("description", {
                    required: "Description is required",
                    maxLength: {
                      value: 500,
                      message: "Description cannot exceed 500 characters",
                    },
                  })}
                  onFocus={() => setFocusDetail(true)}
                  onBlur={() => setFocusDetail(false)}
                  className={`border-b-2 p-3 w-full pr-10 pl-10 placeholder-gray-400 dark:placeholder-white bg-white focus:border-casbBluePrimary placeholder:text-gray-300 focus:outline-none rounded-sm resize-none appearance-none ${
                    watch("description")
                      ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                      : errors.description
                      ? "!bg-red-100 border-gray-300"
                      : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                  }`}
               />
                {FieldIcons.detail && (
                  <Image
                    src={FieldIcons.detail as string}
                    alt="Description"
                    width={20}
                    height={20}
                    className="absolute left-3 top-4 transform"
                    style={{
                      filter: focusDetail
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                        : errors.description
                        ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                        : watch("description")
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                        : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                    }}
                  />
                )}
                {watch("description") && !errors.description && (
                  <Image
                    src={FieldIcons.successIcon as string}
                    alt="Success"
                    width={20}
                    height={20}
                    className="absolute right-3 top-4 transform"
                  />
                )}
                {errors.description && (
                  <Image
                    src={FieldIcons.errorIcon as string}
                    alt="Error"
                    width={20}
                    height={20}
                    className="absolute right-3 top-4 transform"
                  />
                )}
              </div>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <div className="flex items-center flex-row justify-center gap-2 bg-casbGreyPrimary hover:bg-gray-200 rounded-sm">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full p-2 text-gray-600"
              >
                Cancel
              </button>
              <Image src="/chevron.png" alt="chevron" width={20} height={20} />
            </div>
            <div className="flex items-center flex-row justify-center gap-1 bg-casbBluePrimary rounded-sm">
              <button
                type="submit"
                className="w-full p-2 text-white rounded hover:bg-casbwhite transition-colors duration-300"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Course"}
              </button>
              <Image
                src="/chevron-right-white.png"
                alt="chevron-right"
                width={20}
                height={20}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
