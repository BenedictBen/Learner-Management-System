"use client";
import React, { useEffect, useState } from "react";
import { Box, Text, Image as ChakraImage, Spinner } from "@chakra-ui/react";
import Link from "next/link";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true); // Global loading state
  const [isLearnerLoading, setIsLearnerLoading] = useState(false); // Loading state for learner navigation

  // Simulate global loading for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3-second global loading animation

    return () => clearTimeout(timer);
  }, []);

  // Handle learner link click with a loading animation
  const handleLearnerClick = () => {
    setIsLearnerLoading(true); // Start learner loading animation
    setTimeout(() => {
      window.location.href = "/learner"; // Navigate after 2 seconds
    }, 2000); // Simulate navigation delay
  };

  

  if (isLearnerLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
        {/* Learner Navigation Loading Animation */}
        <Box className="flex flex-col items-center space-y-4">
          
          
          {/* Learner Logo with Bold Appearance */}
          <ChakraImage
            src="/logo.png" // Replace with your learner logo path
            alt="Learner Logo"
            width="300px" // Increased width for bold appearance
            height="auto" // Maintain aspect ratio
            objectFit="contain"
            className="border-4 border-emerald-600 rounded-lg shadow-lg transform scale-110 bg-casbBluePrimary"
          />
          {/* Spinner for Loading Indication */}
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#01589A"
            size="xl"
            className="mb-4"
          />
          {/* Redirecting Message */}
          <Text className="text-3xl font-bold text-emerald-600">Redirecting to Learner Portal...</Text>
        </Box>
      </div>
    );
  }
  return (
    <div className="home-container min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 animate-fadeIn">
        Welcome to the Platform
      </h1>
      <div className="flex items-center justify-center flex-col space-y-6">
        <Link
          href="/admin/login"
          className="admin-link px-6 py-3 bg-blue-600 text-white rounded-lg 
            transform transition-all duration-300 hover:scale-105 hover:bg-blue-700 shadow-lg"
        >
          Go to Admin Portal
        </Link>
        <button
          onClick={handleLearnerClick}
          className="learner-link px-6 py-3 bg-emerald-600 text-white rounded-lg
            transform transition-all duration-300 hover:scale-105 hover:bg-emerald-700 shadow-lg mt-4"
        >
          Go to Learner Portal
        </button>
      </div>
    </div>
  );
};

export default HomePage;