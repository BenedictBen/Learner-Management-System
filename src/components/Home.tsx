"use client"

import Image from 'next/image'
import React, { useEffect, useState } from "react";
import { Box, Text, Image as ChakraImage, Spinner } from "@chakra-ui/react";
import Link from "next/link";


const Home = () => {
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
        <nav className="w-full bg-white border-b border-gray-100 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        {/* Logo and Branding */}
        <div className="flex-shrink-0 flex items-center">
          <Image 
            src="/logo-L.png" 
            width={180} 
            height={60} 
            alt="EduManage Logo"
            className="h-auto"
          />
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:ml-6 md:flex md:space-x-8">
          <Link href="#" className="border-casbBluePrimary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Home
          </Link>
          <Link href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Features
          </Link>
          <Link href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            About
          </Link>
          <Link href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Contact
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="-mr-2 flex items-center md:hidden">
          <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-casbBluePrimary">
            <span className="sr-only">Open main menu</span>
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  {/* Modern Hero Section */}
  <div className="">
    <div className="">
      <Image
        className=""
        src="/Home_image.png"
        width={1200}
        height={800}
        alt="Students learning"
      />
    </div>
  </div>
        <div className="portal-selection w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
  <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-900 animate-fadeIn">
    Welcome to <span className="text-casbBluePrimary">G-Client</span>
  </h1>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Admin Portal Card */}
    <div className="portal-card bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg overflow-hidden border border-blue-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="p-6 sm:p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-lg bg-blue-100 mr-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Access the administrative dashboard to manage courses, users, and system settings.
        </p>
        <Link
          href="/admin/login"
          className="w-full inline-flex cursor-pointer items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm"
        >
          Go to Admin Portal
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>

    {/* Learner Portal Card */}
    <div className="portal-card bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg overflow-hidden border border-green-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="p-6 sm:p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-lg bg-green-100 mr-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Learner Portal</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Access your courses, track progress, and engage with learning materials.
        </p>
        <button
          onClick={handleLearnerClick}
          className="w-full inline-flex cursor-pointer items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 shadow-sm"
        >
          {isLearnerLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Redirecting...
            </>
          ) : (
            <>
              Go to Learner Portal
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  </div>
</div>

{/* Modern Footer */}
<footer className="w-full bg-gradient-to-b from-white to-blue-50 border-t border-gray-100 mt-auto ">
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute -top-20 -right-20 w-72 h-72 bg-casbBluePrimary rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
    <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
      {/* Brand column */}
      <div className="md:col-span-4 lg:col-span-5">
        <div className="flex items-center">
          <Image 
            src="/logo-L.png" 
            width={200} 
            height={80} 
            alt="EduManage Logo"
            className="h-auto transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          Empowering educators and learners with cutting-edge technology solutions for the modern classroom.
        </p>
        
        {/* Social links */}
        <div className="mt-8 flex space-x-6">
        <Link 
  href="https://github.com/BenedictBen" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-casbBluePrimary transition-colors duration-300"
>
  <span className="sr-only">GitHub</span>
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
</Link>
          <Link href="#" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </Link>
          <Link href="https://www.linkedin.com/in/benedict-baah/" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
            <span className="sr-only">LinkedIn</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Navigation columns */}
      <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <span className="w-3 h-3 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            Product
          </h3>
          <ul className="mt-6 space-y-4">
            <li>
              <Link href="#" className="text-gray-600 hover:text-casbBluePrimary transition-colors duration-300 flex items-start">
                <svg className="h-5 w-5 text-emerald-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-casbBluePrimary transition-colors duration-300 flex items-start">
                <svg className="h-5 w-5 text-emerald-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-casbBluePrimary transition-colors duration-300 flex items-start">
                <svg className="h-5 w-5 text-emerald-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Updates
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <span className="w-3 h-3 bg-blue-400 rounded-full mr-2 animate-pulse animation-delay-1000"></span>
            Company
          </h3>
          <ul className="mt-6 space-y-4">
            <li>
              <Link href="#" className="text-gray-600 hover:text-casbBluePrimary transition-colors duration-300 flex items-start">
                <svg className="h-5 w-5 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-casbBluePrimary transition-colors duration-300 flex items-start">
                <svg className="h-5 w-5 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-casbBluePrimary transition-colors duration-300 flex items-start">
                <svg className="h-5 w-5 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <span className="w-3 h-3 bg-emerald-400 rounded-full mr-2 animate-pulse animation-delay-2000"></span>
            Legal
          </h3>
          <ul className="mt-6 space-y-4">
            <li>
              <Link href="#" className="text-gray-600 hover:text-casbBluePrimary transition-colors duration-300 flex items-start">
                <svg className="h-5 w-5 text-emerald-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-casbBluePrimary transition-colors duration-300 flex items-start">
                <svg className="h-5 w-5 text-emerald-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-casbBluePrimary transition-colors duration-300 flex items-start">
                <svg className="h-5 w-5 text-emerald-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom section */}
    <div className="border-t border-gray-200 mt-8 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-base text-gray-500 text-center md:text-left">
          &copy; {new Date().getFullYear()} G-Client LMS. All rights reserved. 
        </p>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <Link href="#" className="text-gray-400 hover:text-casbBluePrimary transition-colors duration-300">
            <span className="sr-only">Privacy Policy</span>
            <span className="text-sm">Privacy Policy</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-casbBluePrimary transition-colors duration-300">
            <span className="sr-only">Terms of Service</span>
            <span className="text-sm">Terms of Service</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-casbBluePrimary transition-colors duration-300">
            <span className="sr-only">Contact Us</span>
            <span className="text-sm">Contact Us</span>
          </Link>
        </div>
      </div>
      {/* Developed by */}
      <div className="developer-credit relative group mt-4">
  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition-all duration-300"></div>
  
  <div className="relative px-6 py-4 bg-white ring-1 ring-gray-200 rounded-lg leading-none flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <svg 
        className="w-8 h-8 text-emerald-500 animate-bounce" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
      
      <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
        <span className="inline-block transition-all duration-300 group-hover:translate-x-1">
          Developed by:
        </span>
        <span className="inline-block ml-2 transition-all duration-500 group-hover:scale-105 group-hover:text-emerald-600">
          Baah Benedict
        </span>
      </h1>
    </div>
    
    <div className="hidden sm:block">
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400 opacity-70"
            style={{
              animation: `pulse 1.5s infinite ${i * 0.3}s`
            }}
          />
        ))}
      </div>
    </div>
  </div>
  
  <style jsx>{`
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 0.7;
      }
      50% {
        transform: scale(1.3);
        opacity: 1;
      }
    }
  `}</style>
</div>
    </div>
    </div>

      
  </footer>

    </div>
  )
}

export default Home