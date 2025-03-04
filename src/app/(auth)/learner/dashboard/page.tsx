// src/app/(auth)/learner/dashboard/page.tsx
"use client";
import Image from "next/image";
import TabsMenu from "@/components/Learner/TabsMenu";

const LearnerDashboard = () => {
  return (
    <div className="bg-white overflow-x-hidden">
      <div className="mt-8 m-auto flex flex-col justify-between w-full py-4">
        <div className="flex items-center gap-1 bg-casbBluePrimary justify-start h-32 w-full px-4 md:px-32 lg:px-48 xl:px-56">
          <Image src="/dashboard.png" alt="dashboard" width={30} height={20} />
          <h1 className="text-white text-2xl">Dashboard</h1>
        </div>

        <div className="w-full px-4 md:px-32 lg:px-48 xl:px-56">
          <div className="w-full max-w-[1400px] mx-auto -mt-10 bg-white p-4">
            <TabsMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;