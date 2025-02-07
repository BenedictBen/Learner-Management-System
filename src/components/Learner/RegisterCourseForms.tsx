"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "@/lib/types";
import { FieldIcons } from "@/lib/FormsIcons";



const RegisterCourseForms = () => {
  const [focus, setFocus] = React.useState<boolean>(false);
  const [focusFirstName, setFocusFirstName] = useState(false);
  const [focusLastName, setFocusLastName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focuschooseModule, setFocuschooseModule] = useState(false);
  const [focusGender, setFocusGender] = useState(false);
  const [focusDisabled, setFocusDisabled] = useState(false);
  const [focusPhone, setFocusPhone] = useState(false);
  const [focusUpload, setFocusUpload] = useState(false);
  const [focusAmount, setFocusAmount] = useState(false);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    watch, clearErrors
  } = useForm<FormValues>();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  // Handle image preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mt-12">
      <h1 className="text-center mb-8 text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto ">
        {/* Input Fields */}

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-8 md:px-0 ">
          <div key="firstName" className="relative flex-1 max-w-[300px] items-center">
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
                className={`border p-2 w-full  pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
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
          <div key="lastName" className="relative flex-1 max-w-[300px] items-center">
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
                className={`border p-2 w-full pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
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

        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-8 md:px-0">
          <div key="Email" className="relative flex-1 max-w-[300px] items-center">
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
              className={`border p-2 w-full pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
                watch("email")
                  ? "border-green-500"
                  : errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {FieldIcons.email && (
              <Image
                src={FieldIcons.email as string}
                alt="email"
                width={20}
                height={20}
                className="absolute left-2 top-5 transform -translate-y-1/2"
                style={{
                  filter: focusEmail
                    ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)" // Blue for focus
                    : errors.firstName
                    ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
                    : watch("firstName")
                    ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
                    : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" // Default gray
                }}
              
              />
            )}
            {watch("email") && (
              <Image
                src={FieldIcons.successIcon as string}
                alt="Success"
                width={20}
                height={20}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              />
            )}
            {errors.email && (
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                {errors.email.message}
              </p>
            )}
          </div>

          <div key="Location" className="relative flex-1 max-w-[300px] items-center">
            <div className="relative flex items-center">

            <input
              type="text"
              placeholder="Location"
              {...register("location", {
                required: "Location is required",
              })}
              
              className={`border p-2 w-full pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
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
            {watch("location") && (
              <Image
                src={FieldIcons.successIcon as string}
                alt="Success"
                width={20}
                height={20}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              />
            )}
            {errors.location && (
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
            {errors.location && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-8 md:px-0 ">
          {/* Choose Module */}
          <div key="chooseModule" className="relative flex-1 max-w-[300px] items-center ">
            <div className="relative flex items-center">
              <select
                {...register("chooseModule", {
                  required: "Module is required",
                })}
                onFocus={() => setFocuschooseModule(true)}
      onBlur={() => setFocuschooseModule(false)}
                className={`border p-2 w-[255px] md:w-[15vw] pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none text-[#7e7979] appearance-none ${
                  watch("chooseModule")
                    ? "border-green-500"
                    : errors.chooseModule
                    ? "border-red-500"
                    : "border-gray-300"
                } `}
              >
                <option value="">Choose module</option>
                <option value="module1">Module 1</option>
                <option value="module2">Module 2</option>
                <option value="module3">Module 3</option>
              </select>
              {FieldIcons.chooseModule && (
                <Image
                  src={FieldIcons.chooseModule as string}
                  alt="Choose Module"
                  width={20}
                  height={20}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2"
                  style={{
                    filter: focuschooseModule
                      ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)" // Blue for focus
                      : errors.firstName
                      ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
                      : watch("firstName")
                      ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" // Default gray
                  }}
                />
              )}
              {watch("chooseModule") && (
                <Image
                  src={FieldIcons.successIcon as string}
                  alt="Success"
                  width={20}
                  height={20}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
              
              
              {FieldIcons.chevron && (
                <Image
                  src={FieldIcons.chevron as string}
                  alt="Chevron"
                  width={20}
                  height={20}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
             {errors.chooseModule && (
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
            {errors.chooseModule && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                {errors.chooseModule.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div key="gender" className="relative ">
            <div className="relative flex items-center">
              <select
                {...register("gender", {
                  required: "Gender is required",
                })}
                onFocus={() => setFocusGender(true)}
      onBlur={() => setFocusGender(false)}
                className={`border p-2 w-[255px] md:w-[15vw] pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none text-[#7e7979] appearance-none ${
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
              {FieldIcons.gender && (
                <Image
                  src={FieldIcons.gender as string}
                  alt="Gender"
                  width={20}
                  height={20}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2"
                  style={{
                    filter: focusGender
                      ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)" // Blue for focus
                      : errors.gender
                      ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
                      : watch("firstName")
                      ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
                      : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" // Default gray
                  }}
                />
              )}
              {watch("gender") && (
                <Image
                  src={FieldIcons.successIcon as string}
                  alt="Success"
                  width={20}
                  height={20}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
              
              {/* Chevron Icon (custom image) */}
              {FieldIcons.chevron && (
                <Image
                  src={FieldIcons.chevron as string}
                  alt="Chevron"
                  width={20}
                  height={20}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
             {errors.gender && (
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
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

  <div className="flex flex-col md:flex-row items-center justify-center gap-8">
  {/* Disabled Input Field */}
  <div className="relative" key="disabled">
  <div className="relative flex items-center">
    <select
      {...register("disabled", {
        required: "This field is required",
      })}
      onFocus={() => setFocusDisabled(true)}
      onBlur={() => setFocusDisabled(false)}
      className={`border p-2 w-[255px] md:w-[15vw]  pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none appearance-none text-gray-500  ${
        watch("disabled")
          ? "border-green-500"
          : errors.disabled
          ? "border-red-500"
          : "border-gray-300"
      }`}
    >
      <option value="" >Disabled </option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
    {/* Left Icon (Optional) */}
    {FieldIcons.disabled && (
      <Image
        src={FieldIcons.disabled as string}
        alt="Disabled Option"
        width={20}
        height={20}
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
        style={{
          filter: focusDisabled
            ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)" // Blue for focus
            : errors.disabled
            ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
            : watch("firstName")
            ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
            : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" // Default gray
        }}
      />
    )}
    {/* Right Icons */}
    {watch("disabled") && !errors.disabled && (
      <Image
        src={FieldIcons.successIcon as string}
        alt="Success"
        width={20}
        height={20}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      />
    )}
    {errors.disabled && (
      <Image
        src={FieldIcons.errorIcon as string}
        alt="Error"
        width={20}
        height={20}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      />
    )}
    {/* Chevron Icon */}
    {FieldIcons.chevron && (
      <Image
        src={FieldIcons.chevron as string}
        alt="Chevron"
        width={20}
        height={20}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      />
    )}
  </div>
  {errors.disabled && (
    <p className="text-red-500 text-sm mt-1 flex items-center">
      {errors.disabled.message}
    </p>
  )}
</div>


  {/* Phone Input Field */}
  <div key="phone" className="relative">
    <div className="relative flex items-center">
      <input
        type="tel"
        {...register("phone", {
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Invalid phone number",
          },
        })}
        onFocus={() => setFocusPhone(true)}
      onBlur={() => setFocusPhone(false)}
        className={`border p-2 w-[255px] md:w-[15vw] pr-10 pl-8 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
          watch("phone")
            ? "border-green-500"
            : errors.phone
            ? "border-red-500"
            : "border-gray-300"
        }`}
        placeholder="Phone"
      />
      {FieldIcons.phone && (
        <Image
          src={FieldIcons.phone as string}
          alt="Phone"
          width={20}
          height={20}
          className="absolute left-2 top-1/2 transform -translate-y-1/2"
          style={{
            filter: focusPhone
              ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)" // Blue for focus
              : errors.firstName
              ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
              : watch("firstName")
              ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
              : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" // Default gray
          }}
        />
      )}
      {watch("phone") && !errors.phone && (
        <Image
          src={FieldIcons.successIcon as string}
          alt="Success"
          width={20}
          height={20}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        />
      )}
      {errors.phone && (
        <Image
          src={FieldIcons.errorIcon as string}
          alt="Error"
          width={20}
          height={20}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        />
      )}
    </div>
    {errors.phone && (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        {errors.phone.message}
      </p>
    )}
  </div>
</div>


        {/* Image Upload */}

        <div className="flex justify-center items-center w-full">
  <div className="relative" key="Image">
    <div className="relative flex items-center justify-center w-full">
      <div
        className={`relative flex items-center border w-[255px] max-w-[500px] sm:max-w-[80%] md:min-w-[32vw] p-2 bg-[#F5F5F5] focus:border-casbBluePrimary focus:outline-none cursor-pointer appearance-none ${
          errors.image
            ? "border-red-500" // Error state
            : imagePreview // Check if imagePreview exists to decide success state
            ? "border-green-500" // Success state
            : "border-gray-300" // Default state
        }`}
      >
        <label
          htmlFor="imageUpload"
          className="flex items-center bg-[#E6E6E6] px-3 py-1 rounded-l"
        >
          {/* Icon or Image Preview */}
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
          <span className="text-gray-700">Upload Image</span>
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

    </div>
      {errors.image && (
        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
      )}
  </div>
</div>


<div className="flex justify-center items-center w-full">
<div key="Amount" className="relative">
    <div className="relative flex items-center justify-center w-full">
      <input
        id="amountInput"
        type="number"
        step="0.01"
        placeholder="Amount"
        {...register("amount", {
          required: "Amount is required",
          min: { value: 0.01, message: "Amount must be greater than 0" },
        })}
        onFocus={() => setFocusAmount(true)}
      onBlur={() => setFocusAmount(false)}
        className={`border p-2 w-full max-w-[500px] sm:max-w-[80%] md:min-w-[32vw] flex-grow px-10 bg-[#E6E6E6] focus:border-casbBluePrimary focus:outline-none ${
          watch("amount")
            ? "border-green-500"
            : errors.amount
            ? "border-red-500"
            : "border-gray-300"
        }`}
        
      />
      {FieldIcons.amount && (
        <Image
          src={FieldIcons.amount as string}
          alt="amount"
          width={20}
          height={20}
          className="absolute left-2 top-1/2 transform -translate-y-1/2"
          style={{
            filter: focusAmount
              ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)" // Blue for focus
              : errors.amount
              ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)" // Red for error
              : watch("firstName")
              ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)" // Green for success
              : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" // Default gray
          }}
        />
      )}
      {watch("amount") && !errors.amount && (
        <Image
          src={FieldIcons.successIcon as string}
          alt="Success"
          width={20}
          height={20}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        />
      )}
      {errors.amount && (
        <Image
          src={FieldIcons.errorIcon as string}
          alt="Error"
          width={20}
          height={20}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        />
      )}
    </div>
    {errors.amount && (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        {errors.amount.message}
      </p>
    )}
  </div>
</div>



<div className="flex justify-center items-center w-full">
<div key="Description" className="relative">
    <div className="relative flex items-center justify-center w-full">
    <textarea
        id="description"
        placeholder="Description"
        {...register("description", {
          required: "Description is required",
          maxLength: {
            value: 500,
            message: "Description cannot be more than 500 characters",
          },
        })}
        className={`border  w-[255px] max-w-[500px] sm:max-w-[100%] md:min-w-[32vw]  outline-none  flex-grow p-4 bg-[#E6E6E6] focus:border-casbBluePrimary  focus:outline-none resize-none ${
          watch("description")
            ? "border-green-500"
            : errors.description
            ? "border-red-500"
            : "border-gray-300"
        }`}
        
        rows={3} 
        
        
      />
      {FieldIcons.description && (
        <Image
          src={FieldIcons.description as string}
          alt="description"
          width={20}
          height={20}
          className="absolute left-2 top-1/2 transform -translate-y-1/2"
        />
      )}
      {watch("description") && !errors.description && (
        <Image
          src={FieldIcons.successIcon as string}
          alt="Success"
          width={20}
          height={20}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        />
      )}
      {errors.description && (
        <Image
          src={FieldIcons.errorIcon as string}
          alt="Error"
          width={20}
          height={20}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        />
      )}
    </div>
    {errors.description && (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        {errors.description.message}
      </p>
    )}
  </div>
</div>

        {/* Submit Button */}

  <div className="flex items-center justify-center m-auto md:m-0 bg-casbBluePrimary text-white p-2 rounded hover:bg-blue-600 cursor-pointer w-[255px]  md:w-full">
        <button
          type="submit"
          className=""
        >
          Register
        </button>
        <Image src="/chevron-right-white.png" alt="chevron" width={20} height={20} className="text-white"/>

        </div>
      </form>
    </div>
  );
};

export default RegisterCourseForms;







