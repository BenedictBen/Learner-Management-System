"use client";

import { FieldIcons } from "@/lib/FormsIcons";
import { FormValues } from "@/lib/types";
import { Divider, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LearnerSelect from "./LearnerSelect";

interface InvoiceFormProps {
  onClose: () => void;
}

export default function InvoiceForm({ onClose }: InvoiceFormProps) {
  const [selectLearner, setSelectLearner] = useState(false);
  const [focusAmount, setFocusAmount] = useState(false);
  const [focusCalender, setFocusCalender] = useState(false);
  const [selectStatus, setSelectStatus] = useState(false);
  const [selectDetail, setSelectDetail] = useState(false);
  const [focusDetail, setFocusDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [createData, setCreateData] = useState<FormValues | null>(null);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      calendar: null,
      learnerId: "", // default value for the learner selection
    },
  });

  //use useEffect
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    if (!data.calendar) {
      setError("Please select a due date");
      setLoading(false);
      return;
    }
    const payload = {
      learnerID: data.learnerId, // uppercase "ID" to match the GET response
      amount: Number(data.amount), // ensure it's a number
      status: data.status,
      paymentDetails: data.detail, // rename "detail" to "paymentDetails"
    };
    try {
      const response = await fetch("/api/auth/invoices/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      onClose(); // Close the form or modal after successful submission
      return result;
    } catch (error) {
      console.error("Error creating invoice:", error);
      // Optionally, set an error state to display a message to the user
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Calendar value:", watch("calendar"));
  }, [watch("calendar")]);

  const handleCancel = () => {
    reset();
    onClose();
  };

  const learnerIdValue = watch("learnerId") as string;

  return (
    <>
      <div className=" flex items-center justify-center">
        <div className="bg-white dark:bg-black rounded-lg w-full max-w-screen-lg">
          <div className="flex flex-row justify-start items-center mb-6">
            <h2 className="text-casbGrayHover">Invoices</h2>
            <Divider orientation="vertical" height="40px" mx={4} />
            <h2 className="text-lg font-semi-bold">Create Invoice</h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-7xl mx-auto"
          >
            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-4 bg-casbGreyPrimary dark:bg-black p-5">
              <div key="Select Learner" className="relative">
                <LearnerSelect
                  value={learnerIdValue}
                  onChange={(val) => setValue("learnerId", val)}
                  error={errors.learnerId?.message}
                />
              </div>

              <div key="Amount" className="relative">
                <div className="relative flex items-center">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter amount in USD"
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

              <div key="Calendar" className="relative">
                <div className="relative flex items-center">
                  <DatePicker
                    selected={watch("calendar")}
                    onChange={(date: Date | null) => {
                      setValue("calendar", date);
                    }}
                    onFocus={() => setFocusCalender(true)}
                    onBlur={() => setFocusCalender(false)}
                    minDate={new Date()}
                    placeholderText="Select due date"
                    dateFormat="MMM dd, yyyy"
                    className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                      errors.calendar
                        ? "!bg-red-100 border-gray-300"
                        : watch("calendar")
                       ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                          : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                    } placeholder-gray-400 dark:placeholder-white placeholder-opacity-100 focus:border-casbBluePrimary focus:outline-none transition-colors duration-300`}
                    wrapperClassName="w-full"
                  />
                  <Image
                    src={FieldIcons.calender as string}
                    alt="Calendar"
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    style={{
                      filter: focusCalender
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                        : errors.calendar
                        ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                        : watch("calendar")
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                        : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                    }}
                  />
                  {watch("calendar") && !errors.calendar && (
                    <Image
                      src={FieldIcons.successIcon as string}
                      alt="Success"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                  {errors.calendar && (
                    <Image
                      src={FieldIcons.errorIcon as string}
                      alt="Error"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                </div>
                {errors.calendar && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.calendar.message}
                  </p>
                )}
              </div>

              <div key="Status" className="relative">
                <div className="relative flex items-center">
                  <select
                    {...register("status", {
                      required: "Status field is required",
                    })}
                    onFocus={() => setSelectStatus(true)}
                    onBlur={() => setSelectStatus(false)}
                    className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                      errors.email
                        ? "!bg-red-100 border-gray-300"
                        : watch("status")
                       ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                          : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                    }  focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
                  >
                    <option value="">Status</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                  <Image
                    src={FieldIcons.status as string}
                    alt="Select Status"
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{
                      filter: selectStatus
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                        : errors.status
                        ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                        : watch("status")
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                        : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                    }}
                  />
                  <Image
                    src={FieldIcons.arrowdown as string}
                    alt="arrowdown"
                    width={10}
                    height={10}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                </div>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div key="Detail" className="relative">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Enter details"
                    {...register("detail", {
                      required: "Payment detail is required",
                    })}
                    onFocus={() => setFocusDetail(true)}
                    onBlur={() => setFocusDetail(false)}
                    className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                      errors.email
                        ? "!bg-red-100 border-gray-300"
                        : watch("detail")
                       ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                          : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
                    } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
                  />
                  <Image
                    src={FieldIcons.detail as string}
                    alt="Detail"
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{
                      filter: focusDetail
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(190deg) brightness(100%) contrast(102%)"
                        : errors.detail
                        ? "invert(19%) sepia(86%) saturate(4962%) hue-rotate(0deg) brightness(90%) contrast(96%)"
                        : watch("detail")
                        ? "invert(19%) sepia(96%) saturate(4962%) hue-rotate(90deg) brightness(100%) contrast(102%)"
                        : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                    }}
                  />
                  {watch("detail") && !errors.detail && (
                    <Image
                      src={FieldIcons.successIcon as string}
                      alt="Success"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    />
                  )}
                  {errors.detail && (
                    <Image
                      src={FieldIcons.errorIcon as string}
                      alt="Error"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
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
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <div className="flex items-center flex-row justify-center gap-2 bg-casbGreyPrimary hover:bg-gray-200 rounded-sm">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full p-2 text-gray-600   "
                >
                  Cancel
                </button>
                <Image
                  src="/chevron.png"
                  alt="chevron"
                  width={20}
                  height={20}
                />
              </div>
              <div className="flex items-center justify-center bg-casbBluePrimary rounded p-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white rounded disabled:opacity-70 flex items-center justify-center transition-opacity"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Spinner size="lg" color="white" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <>
                      <span>Create Invoice</span>
                      <Image
                        src="/chevron-right-white.png"
                        alt="Chevron Right"
                        width={20}
                        height={20}
                        className="ml-2"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
