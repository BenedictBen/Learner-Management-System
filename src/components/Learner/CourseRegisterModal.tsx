"use client";

import { useForm } from "react-hook-form";
import {  Course, FormValues } from "@/lib/types";
import { FieldIcons } from "@/lib/FormsIcons";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRegisterCourse, useCourseList } from "@/hooks/learner/useAuth";
import { Spinner, useToast } from "@chakra-ui/react";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { setCourseDetails,clearCourseState,fetchLearnerCourses } from "@/features/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";


// Add debug logging interface
interface DebugInfo {
  coursesLoaded: boolean;
  selectedCourse: Course | null;
  apiPayload: any;
}

interface CourseRegister{
  onClose: () => void;
  onSuccess: (details: CourseDetails) => void;
}
interface CourseDetails {
  program: string;
  dateRegistered: string;
  status: string;
  amountPaid: number;
  firstname: string; // First name of the learner
  lastname: string; // Last name of the learner
  email: string; // Email address of the learner
  gender: string; // Gender of the learner
  location: string; // Location of the learner
  phone: string; // Phone number of the learner
  image: string; // URL of the uploaded image
}

const CourseRegisterModal: React.FC<CourseRegister> = ({ onSuccess, onClose }) => {
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
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const toast = useToast();
  const { mutate: registerCourse, isPending } = useRegisterCourse();
  // const { data: courses, isLoading: coursesLoading, error: coursesError } = useCourseList();
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    coursesLoaded: false,
    selectedCourse: null,
    apiPayload: null
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    watch, clearErrors
  } = useForm<FormValues>();

  // Add Redux course state access
  const { learnerCourses, loading: coursesLoading, error: coursesError } = useSelector(
    (state: RootState) => state.course
  );

  // Enhanced course logging
  useEffect(() => {
    console.log("[Debug] Current courses:", learnerCourses);
    setDebugInfo(prev => ({
      ...prev,
      coursesLoaded: learnerCourses.length > 0,
      selectedCourse: (learnerCourses as Course[]).find(c => c._id === watch("chooseModule")) || null
    }));
  }, [learnerCourses, watch("chooseModule")]);


   const [imagePreview, setImagePreview] = useState<string | null>(null);

   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
      setImageError(null);
      clearErrors("image");
    }
   
  };

 
  const { courseDetails } = useSelector((state: RootState) => state.course);

 
   // Handle image preview

//    const onSubmit = async (formData: FormValues) => {
//     console.groupCollapsed("[Debug] Form Submission");
//     try {
//       // Validate courses first
//       if (!Array.isArray(learnerCourses)) {
//         console.error("Courses not loaded properly");
//         toast({
//           title: "Course Load Error",
//           description: "Please refresh and try again",
//           status: "error",
//         });
//         return;
//       }

//       const selectedCourse = learnerCourses.find(c => c._id === formData.chooseModule);
//       console.log("[Debug] Selected Course:", selectedCourse);

//       if (!selectedCourse) {
//         console.error("Invalid course selection");
//         toast({
//           title: "Invalid Course",
//           description: "Please select a valid course",
//           status: "error",
//         });
//         return;
//       }

//       // Enhanced image validation
//       if (!imageFile) {
//         console.warn("[Validation] Image missing");
//         setImageError("Image is required");
//         return;
//       }

//       // Upload image
//       console.log("[Debug] Starting image upload...");
//       const imageUrl = await uploadImageToCloudinary(imageFile);
//       console.log("[Debug] Image upload result:", imageUrl);

//       // Construct API payload
//       // const apiData = {
//       //   ...formData,
//       //   course: selectedCourse._id,
//       //   program: selectedCourse.title,
//       //   image: imageUrl,
//       //   amount: Number(formData.amount),
//       //   phone: formData.phone.replace(/\D/g, '')
//       // };

//       // Before
// // const apiData = {
// //   ...formData,
// //   course: selectedCourse._id,
// //   program: selectedCourse.title,
// //   image: imageUrl,
// //   amount: Number(formData.amount),
// //   phone: formData.phone.replace(/\D/g, '')
// // };

// // After (fix field names)
// const apiData = {
//   firstname: formData.firstName, // Convert to snake_case
//   lastname: formData.lastName,   // Convert to snake_case
//   email: formData.email,
//   location: formData.location,
//   course: selectedCourse._id,
//   program: selectedCourse.title,
//   image: imageUrl,
//   amount: Number(formData.amount),
//   phone: formData.phone.replace(/\D/g, ''),
//   gender: formData.gender,
//   disabled: formData.disabled === "true" // Convert to boolean if needed
// };

//       console.log("[Debug] Final API Payload:", apiData);
//       setDebugInfo(prev => ({ ...prev, apiPayload: apiData }));

//       // Dispatch registration
//       registerCourse(apiData, {
//         onSuccess: (response) => {
//           console.log("[Debug] Registration success:", response);
//           const details: CourseDetails = {
//             program: selectedCourse.title,
//             dateRegistered: new Date().toISOString().split("T")[0],
//             status: "Registered",
//             amountPaid: Number(formData.amount),
//             firstname: formData.firstName.trim(),
//             lastname: formData.lastName.trim(),
//             email: formData.email.toLowerCase().trim(),
//             gender: formData.gender,
//             location: formData.location.trim(),
//             phone: formData.phone.replace(/\D/g, ""),
//             image: imageUrl,
//           };

//           console.log("[Debug] Dispatching course details:", details);
//           dispatch(setCourseDetails(details));
//           onSuccess(details);

//           toast({
//             title: "Registration Successful",
//             description: `Enrolled in ${selectedCourse.title}`,
//             status: "success",
//           });
//           onClose();
//         },
//         onError: (error) => {
//           console.error("[Debug] Registration error:", error);
//           toast({
//             title: "Registration Failed",
//             description: error.message,
//             status: "error",
//           });
//         }
//       });
//     } catch (error) {
//       console.error("[Debug] Unexpected error:", error);
//     } finally {
//       console.groupEnd();
//     }
//   };

// const onSubmit = async (formData: FormValues) => {
//   try {
//     if (!Array.isArray(learnerCourses)) {
//       console.error("Courses not loaded properly");
//       toast({
//         title: "Course Load Error",
//         description: "Please refresh and try again",
//         status: "error",
//       });
//       return;
//     }

//     const selectedCourse = learnerCourses.find(c => c._id === formData.chooseModule);
//     if (!selectedCourse) {
//       console.error("Invalid course selection");
//       toast({
//         title: "Invalid Course",
//         description: "Please select a valid course",
//         status: "error",
//       });
//       return;
//     }

//     if (courseDetails && courseDetails.program === selectedCourse.title) {
//       toast({
//         title: "Already Registered",
//         description: "You are already enrolled in this course.",
//         status: "warning",
//       });
//       return;
//     }

//     if (!imageFile) {
//       setImageError("Image is required");
//       return;
//     }

//     const imageUrl = await uploadImageToCloudinary(imageFile);
//     const apiData = {
//       firstname: formData.firstName,
//       lastname: formData.lastName,
//       email: formData.email,
//       location: formData.location,
//       course: selectedCourse._id,
//       program: selectedCourse.title,
//       image: imageUrl,
//       amount: Number(formData.amount),
//       phone: formData.phone.replace(/\D/g, ''),
//       gender: formData.gender,
//       disabled: formData.disabled === "true",
//     };

//     registerCourse(apiData, {
//       onSuccess: (response) => {
//         const details: CourseDetails = {
//           program: selectedCourse.title,
//           dateRegistered: new Date().toISOString().split("T")[0],
//           status: "Registered",
//           amountPaid: Number(formData.amount),
//           firstname: formData.firstName.trim(),
//           lastname: formData.lastName.trim(),
//           email: formData.email.toLowerCase().trim(),
//           gender: formData.gender,
//           location: formData.location.trim(),
//           phone: formData.phone.replace(/\D/g, ""),
//           image: imageUrl,
//         };
//         dispatch(setCourseDetails(details));
//         onSuccess(details);
//         toast({
//           title: "Registration Successful",
//           description: `Enrolled in ${selectedCourse.title}`,
//           status: "success",
//         });
//         onClose();
//       },
//       onError: (error) => {
//         console.error("[Debug] Registration error:", error);
//         toast({
//           title: "Registration Failed",
//           description: error.message || "An unexpected error occurred",
//           status: "error",
//         });
//         dispatch(clearCourseState()); // Clear course details
//         onClose(); 
//       },
//     });
//   } catch (error) {
//     console.error("[Debug] Unexpected error:", error);
//   }
// };
const onSubmit = async (formData: FormValues) => {
  console.log("Form Data Submitted:", formData);

// Validate required fields
if (!formData.firstName || !formData.lastName || !formData.email || !formData.location || !formData.phone || !formData.gender || !formData.chooseModule || !formData.amount) {
  console.error("Missing required fields in form data");
  return;
}
const selectedCourse = learnerCourses.find(c => c._id === formData.chooseModule);
    if (!selectedCourse) {
      console.error("Invalid course selection");
      toast({
        title: "Invalid Course",
        description: "Please select a valid course",
        status: "error",
      });
      return;
    }
    
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


    // Transform data to match API expectations
    const apiData = {
      firstname: formData.firstName.trim(),
      lastname: formData.lastName.trim(),
      email: formData.email.toLowerCase().trim(),
      course: selectedCourse._id,
      program: selectedCourse.title, // Should be course ID from fetched courses
      gender: formData.gender,
      location: formData.location.trim(),
      phone: formData.phone.replace(/\D/g, ''), // Clean phone number
     disability: formData.disabled === "true" ? "yes" : "no", // Match API boolean expectation
      image: imageUrl,
      description: formData.description.trim(),
      amount: Number(formData.amount),
    };


    console.log('API Data:', apiData);

    const today = new Date().toISOString().split("T")[0]; // Get today's date
    // const details: CourseDetails = {
    //   program: formData.chooseModule, // Assuming this is the program name
    //   dateRegistered: today,
    //   status: "Registered",
    //   amountPaid: Number(formData.amount),
    //   firstname: formData.firstName.trim(), // Add first name
    //   lastname: formData.lastName.trim(), // Add last name
    //   email: formData.email.toLowerCase().trim(), // Add email
    //   gender: formData.gender, // Add gender
    //   location: formData.location.trim(), // Add location
    //   phone: formData.phone.replace(/\D/g, ""), // Add phone number
    //   image: imageUrl, // Add image URL
    // };

    const details: CourseDetails = {
      program: selectedCourse.title,
      dateRegistered: new Date().toISOString().split("T")[0],
      status: "Registered",
      amountPaid: Number(formData.amount),
      firstname: formData.firstName.trim(),
      lastname: formData.lastName.trim(),
      email: formData.email.toLowerCase().trim(),
      gender: formData.gender,
      location: formData.location.trim(),
      phone: formData.phone.replace(/\D/g, ""),
      image: imageUrl,
    };
    
    console.log("Final Course Details:", details);
    dispatch(setCourseDetails(details));
    onSuccess(details);

    registerCourse(apiData, {
      onSuccess: () => {
        toast({
          title: "Registration Successful",
          description: "Course registration completed",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        // onSuccess(details);
      },

      
      onError: (error: any) => {
        toast({
          title: "Registration Failed",
          description: error.message || "Please check your input and try again",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  } catch (error) {
    console.error("Registration Error:", error); // Log the error for debugging
    toast({
      title: "Registration Error",
      description: "An unexpected error occurred",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
};


  return (
    <div className="animate-fade-in px-4 sm:px-6 lg:px-8">
      <div className="mt-1 md:mt-8">
        <h1 className="text-left text-lg md:text-center mb-8 md:text-2xl font-bold">Start a new application</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto">
          {/* Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
          <div key="firstName" className="relative ">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="First name"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 4, message: 'Minimum length should be 4' },
                })}
                onFocus={() => setFocusFirstName(true)} 
          onBlur={() => setFocusFirstName(false)} 
                className={`border p-3 w-full  pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none rounded-lg ${
                  watch("firstName")
                    ? "border-green-500"
                    : errors.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
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
                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" // Default gray
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
                  minLength: { value: 4, message: 'Minimum length should be 4' },
                })}
                onFocus={() => setFocusLastName(true)} 
          onBlur={() => setFocusLastName(false)} 
                className={`border p-3 w-full pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none rounded-lg ${
                  watch("lastName")
                    ? "border-green-500"
                    : errors.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
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
                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" // Default gray
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

            {/* Email */}
            <div className="relative">
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
                  className={`border p-3 w-full pr-10 pl-10 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none rounded-lg ${
                    watch("email")
                      ? "border-green-500"
                      : errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
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
                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
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
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Location"
                  {...register("location", { required: "Location is required" })}
                  className={`border p-3 w-full pr-10 pl-10 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none rounded-lg ${
                    watch("location")
                      ? "border-green-500"
                      : errors.location
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
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
                                    : errors.firstName
                                    ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
                                    : watch("firstName")
                                    ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
                                    : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" // Default gray
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
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            {/* Choose Module */}
            <div className="relative">
              <div className="relative flex items-center">
                <select
                  {...register("chooseModule", { required: "Module is required" })}
                  onFocus={() => setFocuschooseModule(true)}
      onBlur={() => setFocuschooseModule(false)}
                  className={`border p-3 w-full pr-10 pl-10 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none rounded-lg appearance-none ${
                    watch("chooseModule")
                      ? "border-green-500"
                      : errors.chooseModule
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
 
  
  <option value="">Choose Course</option>
    {learnerCourses.map(course => (
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
                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
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
                <p className="text-red-500 text-sm mt-1">{errors.chooseModule.message}</p>
              )}
            </div>

            {/* Gender */}
            <div className="relative">
              <div className="relative flex items-center">
                <select
                  {...register("gender", { required: "Gender is required" })}
                  onFocus={() => setFocusGender(true)}
      onBlur={() => setFocusGender(false)}
                  className={`border p-3 w-full pr-10 pl-10 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none rounded-lg appearance-none ${
                    watch("gender")
                      ? "border-green-500"
                      : errors.gender
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
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
                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
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
                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>

            {/* Disabled */}
            <div className="relative">
              <div className="relative flex items-center">
                <select
                  {...register("disabled", { required: "This field is required" })}
                  onFocus={() => setFocusDisabled(true)}
                  onBlur={() => setFocusDisabled(false)}
                  className={`border p-3 w-full pr-10 pl-10 bg-gray-200 focus:border-casbBluePrimary focus:outline-none rounded-lg appearance-none ${
                    watch("disabled")
                      ? "border-green-500"
                      : errors.disabled
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
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
                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
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
                <p className="text-red-500 text-sm mt-1">{errors.disabled.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
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
                  className={`border p-3 w-full pr-10 pl-10 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none rounded-lg ${
                    watch("phone")
                      ? "border-green-500"
                      : errors.phone
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
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
                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
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
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div className="relative w-full">
            <div
              className={`relative flex items-center border p-3 bg-[#F5F5F5] focus:border-casbBluePrimary rounded-lg focus:outline-none cursor-pointer appearance-none ${
                errors.image
                  ? "border-red-500"
                  : imagePreview
                  ? "border-green-500"
                  : "border-gray-300"
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
                                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" // Default gray
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
      <p className="text-red-500 text-sm mt-1 text-center">{imageError}</p>
    )}
            {errors.image && (
              <p className="text-red-500 text-sm mt-1 text-center">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div className="relative">
            <div className="relative flex items-center">
              <input
                type="number"
                step="0.01"
                placeholder="Amount"
                {...register("amount", {
                  required: "Amount is required",
                  min: { value: 0.01, message: "Amount must be greater than 0" },
                })}
                onFocus={() => setFocusAmount(true)}
      onBlur={() => setFocusAmount(false)}
                className={`border p-3 w-full pr-10 pl-10 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none rounded-lg ${
                  watch("amount")
                    ? "border-green-500"
                    : errors.amount
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
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
                    : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
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
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="relative">
            <div className="relative flex items-center">
              <textarea
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                  maxLength: {
                    value: 500,
                    message: "Description cannot exceed 500 characters",
                  },
                })}
                className={`border p-3 w-full pr-10 pl-10 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none rounded-lg resize-none ${
                  watch("description")
                    ? "border-green-500"
                    : errors.description
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                rows={4}
              />
              {FieldIcons.description &&(

              <Image
                src={FieldIcons.description as string}
                alt="Description"
                width={20}
                height={20}
                className="absolute left-3 top-4 transform"
                style={{
                  filter: focus
                    ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                    : errors.description
                    ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                    : watch("description")
                    ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                    : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
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
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Form Buttons */}
          <div className="flex flex-col md:flex-row items-start justify-start  gap-4 mt-12">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full md:w-48 px-6 py-3 bg-casbGreyPrimary rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Image src="/back.png" alt="Back" width={20} height={20} />
              Back
            </button>
            {isPending ? (
              <div className="flex items-center justify-center gap-2 w-full bg-casbBluePrimary text-white py-2 rounded hover:bg-blue-600">
                          <Spinner size="sm" color="blue-500" />
                          <span>Registering...</span>
                        </div>
            ): (

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full md:w-48 px-6 py-3 bg-casbBluePrimary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Register
              <Image src="/chevron-right-white.png" alt="Submit" width={20} height={20} />
            </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseRegisterModal;