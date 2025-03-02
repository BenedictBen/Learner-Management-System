import AdminAccount from "@/components/Admin/AdminAccount";
import UserDetails from "@/components/Admin/UserDetails";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="bg-white rounded-lg w-full md:max-w-4xl">
        <div className="flex flex-row justify-start items-center mb-6">
          <h2 className="text-lg font-bold text-black">Account</h2>
        </div>
        <div className="space-y-8 w-full">
          {/* <AdminAccount/> */}
          <UserDetails/>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
