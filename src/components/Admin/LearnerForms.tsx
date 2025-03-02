"use client";
import { FieldIcons } from "@/lib/FormsIcons";
import { FormValues } from "@/lib/types";
import { Divider, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchCourses } from "@/features/CoursesSlice";


interface LearnerFormProps {
  onClose: () => void;
}

const LearnerForms = ({ onClose }: LearnerFormProps) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [focusFirstName, setFocusFirstName] = useState(false);
  const [focusLastName, setFocusLastName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focuschooseModule, setFocuschooseModule] = useState(false);
  const [focusGender, setFocusGender] = useState(false);
  const [focusDisabled, setFocusDisabled] = useState(false);
  const [focusPhone, setFocusPhone] = useState(false);
  const [focusUpload, setFocusUpload] = useState(false);
  const [focusAmount, setFocusAmount] = useState(false);
  const [focusDetail, setFocusDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCourses({}));
  }, [dispatch]);
 
  // Retrieve courses and their loading status from Redux.
  const { courses } = useSelector((state: RootState) => state.adminCourses);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
      setImageError(null);
      clearErrors("image");
    }
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
  
      const payload = {
        firstname: data.firstName.trim(),
        lastname: data.lastName.trim(),
        email: data.email.toLowerCase().trim(),
        course: data.chooseModule, // Should be course ID from fetched courses
        gender: data.gender,
        location: data.location.trim(),
        phone: data.phone.replace(/\D/g, ''), // Clean phone number
       disability: data.disabled === "true" ? "yes" : "no", // Match API boolean expectation
        image: imageUrl,
        description: data.description.trim(),
        amount: Number(data.amount),
      };

      const response = await fetch("/api/auth/learners/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Submission failed");
    }

      const result = await response.json();

      const selectedCourseId = result.course; // Extract course ID from the response
    const selectedCourse = courses?.find((course) => course._id === selectedCourseId);

    if (selectedCourse) {
      console.log("Selected Course Title:", selectedCourse.title);
      // Optionally, update the state or context with the course title for UI display
    } else {
      console.warn("Course not found for ID:", selectedCourseId);
    }
      console.log("Form submitted:", result);
      onClose(); // Close the form or modal after successful submission
      return result;
    } catch (error) {
      console.error("Error creating invoice:", error);
      // Optionally, set an error state to display a message to the user
      throw error;
    } finally {
      setLoading(false);
    }

    // Add your submission logic here
  };

        
  

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<FormValues>({});

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white dark:bg-black rounded-lg w-full max-w-screen-lg">
        <div className="flex flex-row justify-start items-center mb-6">
          <h2 className="text-casbGrayHover">Learners</h2>
          <Divider orientation="vertical" height="40px" mx={4} />
          <h2 className="text-lg font-semi-bold">Create Learners</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 gap-6 bg-casbGreyPrimary dark:bg-black p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div key="firstName" className="relative ">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="First name"
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                    onFocus={() => setFocusFirstName(true)}
                    onBlur={() => setFocusFirstName(false)}
                    className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                      errors.firstName
                        ? "!bg-red-100 border-gray-300"
                        : watch("firstName")
                       ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                          : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                    } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
                  
                  />
                  {FieldIcons.firstName && (
                    <Image
                      src={FieldIcons.firstName as string}
                      alt="firstName"
                      width={20}
                      height={20}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      style={{
                        filter: focusFirstName
                          ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)" // Blue for focus
                          : errors.firstName
                          ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
                          : watch("firstName")
                          ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
                          : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)", // Default gray
                      }}
                    />
                  )}
                  {watch("firstName") && (
                    <Image
                      src={FieldIcons.successIcon as string}
                      alt="Success"
                      width={20}
                      height={20}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    />
                  )}

                  {errors.firstName && (
                    <>
                      <Image
                        src={FieldIcons.errorIcon as string}
                        alt="Error"
                        width={20}
                        height={20}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      />
                    </>
                  )}
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div key="lastName" className="relative">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Last name"
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                    onFocus={() => setFocusLastName(true)}
                    onBlur={() => setFocusLastName(false)}
                    className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                      errors.lastName
                        ? "!bg-red-100 border-gray-300"
                        : watch("lastName")
                       ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                          : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                    } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
                  
                  />
                  {FieldIcons.lastName && (
                    <Image
                      src={FieldIcons.lastName as string}
                      alt="firstName"
                      width={20}
                      height={20}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      style={{
                        filter: focusLastName
                          ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)" // Blue for focus
                          : errors.lastName
                          ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
                          : watch("lastName")
                          ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
                          : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)", // Default gray
                      }}
                    />
                  )}
                  {watch("lastName") && (
                    <Image
                      src={FieldIcons.successIcon as string}
                      alt="Success"
                      width={20}
                      height={20}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                  {errors.lastName && (
                    <>
                      <Image
                        src={FieldIcons.errorIcon as string}
                        alt="Error"
                        width={20}
                        height={20}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      />
                    </>
                  )}
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div key="Email" className="relative">
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  onFocus={() => setFocusEmail(true)}
                  onBlur={() => setFocusEmail(false)}
                  className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                    errors.email
                      ? "!bg-red-100 border-gray-300"
                      : watch("email")
                     ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                        : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                  } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
                
                />
                <Image
                  src={FieldIcons.email as string}
                  alt="email"
                  width={20}
                  height={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{
                    filter: focusEmail
                      ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                      : errors.email
                      ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                      : watch("email")
                      ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                  }}
                />
                {watch("email") && !errors.email && (
                  <Image
                    src={FieldIcons.successIcon as string}
                    alt="Success"
                    width={20}
                    height={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                )}
                {errors.email && (
                  <Image
                    src={FieldIcons.errorIcon as string}
                    alt="Error"
                    width={20}
                    height={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                )}
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div key="Choose Module" className="relative">
                <div className="relative flex items-center">
                  <select
                    {...register("chooseModule", {
                      required: "Module is required",
                    })}
                    onFocus={() => setFocuschooseModule(true)}
                    onBlur={() => setFocuschooseModule(false)}
                    className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                      errors.chooseModule
                        ? "!bg-red-100 border-gray-300"
                        : watch("chooseModule")
                       ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                          : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                    } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300 appearance-none`}
                 
                 >
                    <option value="">Select Program</option>

                    {/* Safe array mapping */}
                    {Array.isArray(courses) &&
                      courses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.title}
                        </option>
                      ))}
                  </select>
                  <Image
                    src={FieldIcons.chooseModule as string}
                    alt="Choose Module"
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{
                      filter: focuschooseModule
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                        : errors.chooseModule
                        ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                        : watch("chooseModule")
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                        : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                    }}
                  />
                  <Image
                    src={FieldIcons.chevron as string}
                    alt="Chevron"
                    width={20}
                    height={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                </div>
                {errors.chooseModule && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.chooseModule.message}
                  </p>
                )}
              </div>
              <div key="Gender" className="relative">
                <div className="relative flex items-center">
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    onFocus={() => setFocusGender(true)}
                    onBlur={() => setFocusGender(false)}
                    className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                      errors.gender
                        ? "!bg-red-100 border-gray-300"
                        : watch("gender")
                       ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                          : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                    } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300 appearance-none`}
                 
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <Image
                    src={FieldIcons.gender as string}
                    alt="Gender"
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{
                      filter: focusGender
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                        : errors.gender
                        ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                        : watch("gender")
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                        : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                    }}
                  />
                  <Image
                    src={FieldIcons.chevron as string}
                    alt="Chevron"
                    width={20}
                    height={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div key="Location" className="relative">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Location"
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                      errors.location
                        ? "!bg-red-100 border-gray-300"
                        : watch("location")
                       ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                          : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                    } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
                  />
                  {FieldIcons.location && (
                    <Image
                      src={FieldIcons.location as string}
                      alt="location"
                      width={20}
                      height={20}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      style={{
                        filter: focus
                          ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)" // Blue for focus
                          : errors.location
                          ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
                          : watch("location")
                          ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
                          : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)", // Default gray
                      }}
                    />
                  )}

                  {watch("location") && !errors.location && (
                    <Image
                      src={FieldIcons.successIcon as string}
                      alt="Success"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                  {errors.location && (
                    <Image
                      src={FieldIcons.errorIcon as string}
                      alt="Error"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                </div>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>
              <div key="Phone" className="relative">
                <div className="relative flex items-center">
                  <input
                    type="tel"
                    placeholder="Phone"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Invalid phone number",
                      },
                    })}
                    onFocus={() => setFocusPhone(true)}
                    onBlur={() => setFocusPhone(false)}
                    className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                      errors.phone
                        ? "!bg-red-100 border-gray-300"
                        : watch("phone")
                       ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                          : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                    } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
                  />
                  <Image
                    src={FieldIcons.phone as string}
                    alt="Phone"
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{
                      filter: focusPhone
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                        : errors.phone
                        ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                        : watch("phone")
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                        : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                    }}
                  />
                  {watch("phone") && !errors.phone && (
                    <Image
                      src={FieldIcons.successIcon as string}
                      alt="Success"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                  {errors.phone && (
                    <Image
                      src={FieldIcons.errorIcon as string}
                      alt="Error"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div key="Disabled" className="relative">
              <div className="relative flex items-center">
                <select
                  {...register("disabled", {
                    required: "This field is required",
                  })}
                  onFocus={() => setFocusDisabled(true)}
                  onBlur={() => setFocusDisabled(false)}
                  className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                    errors.disabled
                      ? "!bg-red-100 border-gray-300"
                      : watch("disabled")
                     ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                        : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                  } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300 appearance-none`}
                
                >
                  <option value="">Disabled</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <Image
                  src={FieldIcons.disabled as string}
                  alt="Disabled"
                  width={20}
                  height={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{
                    filter: focusDisabled
                      ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                      : errors.disabled
                      ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                      : watch("disabled")
                      ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                  }}
                />
                <Image
                  src={FieldIcons.chevron as string}
                  alt="Chevron"
                  width={20}
                  height={20}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
              {errors.disabled && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.disabled.message}
                </p>
              )}
            </div>
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
                          ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)" // Blue for focus
                          : errors.firstName
                          ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
                          : watch("firstName")
                          ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
                          : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)", // Default gray
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
                    handleImageChange(event); // Handles the image upload and preview logic
                    clearErrors("image"); // Clears errors when an image is selected
                  }}
                  onFocus={() => setFocusUpload(true)}
                  onBlur={() => setFocusUpload(false)}
                  className="hidden"
                />
                {/* Success Icon */}
                {imagePreview && !errors.image && (
                  <Image
                    src={FieldIcons.successIcon as string}
                    alt="Success"
                    width={20}
                    height={20}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                )}
                {/* Error Icon */}
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
                {watch("detail") && !errors.detail && (
                  <Image
                    src={FieldIcons.successIcon as string}
                    alt="Success"
                    width={20}
                    height={20}
                    className="absolute right-3 top-4 transform"
                  />
                )}
                {errors.detail && (
                  <Image
                    src={FieldIcons.errorIcon as string}
                    alt="Error"
                    width={20}
                    height={20}
                    className="absolute right-3 top-4 transform"
                  />
                )}
              </div>
              {errors.detail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.detail.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <div className="flex items-center flex-row justify-center gap-2 bg-casbGreyPrimary hover:bg-gray-200 rounded-sm">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full p-2 text-gray-600   "
              >
                Cancel
              </button>
              <Image src="/chevron.png" alt="chevron" width={20} height={20} />
            </div>
            {loading ? (
              <div className="flex items-center space-x-2 casbBluePrimary">
                <Spinner size="lg" color="white" />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="flex items-center flex-row justify-center gap-1 bg-casbBluePrimary rounded-sm">
                <button
                  type="submit"
                  className="w-full p-2 text-white rounded hover:bg-casbwhite transition-colors duration-300 "
                >
                  Create Learner
                </button>
                <Image
                  src="/chevron-right-white.png"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearnerForms;
