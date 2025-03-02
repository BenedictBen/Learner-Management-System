"use client";

import React, { useEffect, useState } from "react";
import { FormValues, Learner } from "@/lib/types";
import { useForm } from "react-hook-form";

interface LearnerSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function LearnerSelect({ value, onChange, error }: LearnerSelectProps) {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [focusAmount, setFocusAmount] = useState(false);


  const {
      register,
      setValue,
      watch,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FormValues>({
      defaultValues: {
       
      },
    });

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const res = await fetch("/api/auth/learners");
        const data = await res.json();
        setLearners(data);
      } catch (err) {
        console.error("Error fetching learners:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLearners();
  }, []);

  // Filter learners based on search term
  const filteredLearners = learners.filter((learner) => {
    const fullName = `${learner.firstname} ${learner.lastname}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get the selected learner's name
  const selectedLearner = learners.find((learner) => learner._id === value);
  const selectedText = selectedLearner ? `${selectedLearner.firstname} ${selectedLearner.lastname}` : "Select learner";

  return (
    <div className="relative w-full">
      {/* Selected Dropdown */}
      <div
        className={`w-full p-2 border-b-2 cursor-pointer ${error ? "border-red-500" : "border-blue-500"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedText}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute w-full mt-1 bg-gray-200 border border-gray-300 shadow-lg z-10">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search learner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setFocusAmount(true)}
                    onBlur={() => setFocusAmount(false)}
                    className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                      errors.amount
                        ? "!bg-red-100 border-gray-300"
                        : watch("amount")
                       ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                          : "border-blue-500 bg-white dark:bg-black dark:text-white"
                    } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
          />

          {/* Learner Options */}
          <ul className="max-h-48 overflow-y-auto">
            {loading ? (
              <li className="p-2 text-gray-500">Loading...</li>
            ) : filteredLearners.length > 0 ? (
              filteredLearners.map((learner) => (
                <li
                  key={learner._id}
                  className="p-2 cursor-pointer hover:bg-gray-100 dark:bg-black dark:text-white"
                  onClick={() => {
                    onChange(learner._id);
                    setIsOpen(false);
                    setSearchTerm(""); // Clear search after selection
                  }}
                >
                  {learner.firstname} {learner.lastname} 
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No learners found</li>
            )}
          </ul>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
