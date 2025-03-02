"use client";

import { Chart } from "@/components/Admin/Chart";
import { LatestInvoices } from "@/components/Admin/LatestInvoices";
import Image from "next/image";
import React from "react";
import AdminDashboard from "./page";
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { AdminUser } from "@/features/authSlice";

const DashboardHome = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const getDisplayName = () => {
    if (!user) return "Guest";
    if (user.role === "admin") {
      // Tell TypeScript this is an AdminUser
      const admin = user as AdminUser;
      return `${admin.first_name} ${admin.last_name}`;
    }

    return user.email?.split("@")[0] || "User";
  };

  const getInitials = (name: string) => {
    return name
      .split(/[\s_]+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");
  };

  const lists = [
    {
      id: 1,
      name: "Collected",
      image: "/collected.png",
      count: "$ 200000",
    },
    {
      id: 2,
      name: "Pending",
      image: "/pending.png",
      count: "$ 10000",
    },
    {
      id: 3,
      name: "Total invoices",
      image: "/tinvoices.png",
      count: "35",
    },
    {
      id: 4,
      name: "Total Learners",
      image: "/total.png",
      count: "50",
    },
  ];
  return (
    <div className="w-full max-w-screen-2xl mx-auto ">
      <div className="mb-4">
        <h1 className="text-lg md:text-2xl">Dashboard</h1>
        <div className="flex items-center justify-start gap-4 flex-col md:flex-row">
          <p className="text-sm text-casbDisabled">Welcome back,</p>
          <p className="text-md font-bold uppercase text-casbSeaBlueSecondary">
            {getDisplayName()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Grid Items */}
        {lists.map((list) => (
          <div
            key={list.id}
            className="rounded-sm bg-casbGrayHover dark:bg-gray-700 h-40 flex flex-col items-center justify-between  font-bold w-full p-4"
          >
            {/* Header Section */}
            <div className="w-full flex items-start justify-start mb-2">
              <div className="flex items-center gap-2">
                <Image
                  src={list.image}
                  width={20}
                  height={10}
                  alt="image"
                  className="h-auto dark:invert dark:brightness-100"
                />
                <p className="text-black dark:text-white text-sm md:text-base">
                  {list.name}
                </p>
              </div>
            </div>

            {/* Content Box */}
            <div className="bg-white dark:bg-black rounded-sm flex-1 flex items-center justify-center w-[98%] md:w-[98%] lg:w-[110%] px-4">
              <p className="text-black dark:text-white font-bold text-lg md:text-xl">
                {list.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row mt-8 w-full">
        <div className="w-full lg:w-1/2 flex-1">
          <Chart />
        </div>
        <div className="w-full lg:w-1/2 flex-1">
          <LatestInvoices />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
