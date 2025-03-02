import AdminDetails from "@/components/Admin/AdminDetails";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="bg-white dark:bg-black rounded-lg w-full md:max-w-4xl">
        <div className="flex flex-row justify-start items-center mb-6">
          <h2 className="text-lg font-bold">Account</h2>
        </div>
        <div className="space-y-8 w-full">
          <AdminDetails/>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
