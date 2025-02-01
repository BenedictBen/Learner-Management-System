"use client"

import Image from "next/image";
import React from "react";
import TabsMenu from "@/components/Learner/TabsMenu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import HomeNavbar from "@/components/Learner/HomeNavbar";
import LearnerFooter from "@/components/Learner/LearnerFooter";

const LearnerDashboard = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/learner");
    }
  }, [isAuthenticated, router]);


  return (
    <div>
      <HomeNavbar />
      <main>

    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      {/* Dashboard Content */}
      <div className="mt-8 m-auto flex flex-col justify-between w-full py-4">
        {/* Dashboard Header */}
        <div className="flex items-center gap-1 bg-casbBluePrimary justify-start h-32 w-full px-4 md:px-32 lg:px-48 xl:px-56">
          <Image src="/dashboard.png" alt="dashboard" width={30} height={20} />
          <h1 className="text-white text-2xl">Dashboard</h1>
        </div>

        {/* Dashboard Body */}
        <div className="w-full px-4 md:px-32 lg:px-48 xl:px-56">
          <div className="w-full max-w-[1400px] mx-auto -mt-10 bg-white p-4">
            <TabsMenu/>
          </div>
        </div>
      </div>
      {/* Courses */}
      
    </div>
      </main>
      <LearnerFooter/>
    </div>
  );
};

export default LearnerDashboard;
