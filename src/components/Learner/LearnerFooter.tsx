"use client";
import Image from "next/image";
import React from "react";
import { BrandLinks } from "../Admin/BrandLinks";

const LearnerFooter = () => {
  return (
    <div className="bg-casbBluePrimary w-auto">
      <div className="flex items-start justify-start md:items-center md:justify-evenly pt-12 mb-4 flex-col md:flex-row">
        {/* Logo Section */}
        <div className="flex items-start justify-start  w-full pl-16 md:pl-0 md:w-auto">
          <Image
            src="/logo-white.png"
            alt="logo"
            width={200}
            height={200}
            className="w-32 h-15 sm:w-36 sm:h-16 md:w-48 md:h-20"
          />
        </div>

        {/* Table Section (Visible on md and above) */}
        <div className="hidden md:block">
          <table className="table-auto text-left">
            <thead>
              <tr className="text-white">
                <th className="p-2">Menu</th>
                <th className="p-2">Contact</th>
                <th className="p-2">Social</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr>
                <td className="p-2">Home</td>
                <td className="p-2">+23341002000</td>
                <td className="p-2 underline cursor-pointer">LinkedIn</td>
              </tr>
              <tr className="text-white">
                <td className="p-2">Courses</td>
                <td className="p-2">New Reiss, Ghana, Accra</td>
                <td className="p-2 underline cursor-pointer">Facebook</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile View Contact & Social Sections */}
        <div className="flex w-full flex-col items-start gap-4 mt-8 text-white pl-16 md:hidden">
          {/* Contact Section */}
          <div className="flex flex-col items-start text-left gap-2">
            <h1 className="text-lg font-bold">Contact</h1>
            <p>+2334100200</p>
            <p>New Reiss, Ghana, Accra</p>
          </div>

          {/* Social Section */}
          <div className="flex flex-col items-start text-left gap-2">
            <h1 className="text-lg font-bold">Social</h1>
            <p className="underline">LinkedIn</p>
            <p className="underline">Facebook</p>
          </div>
        </div>
      </div>

      <hr className="text-white w-2/3 mx-auto my-6 border/3"></hr>

      <div className="flex items-center w-2/3 mx-auto justify-between px-4 py-4 text-white flex-col md:flex-row">
        <p className="sm:text-center">
          © copyright 2025 - G-client, All rights reserved
        </p>
        <p>By Benedict Baah</p>
        <BrandLinks />
        <div
          className="flex gap-1 cursor-pointer items-center hover-text-green-500"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <p>Back to top</p>
          <Image
            src="/arrow-up.png"
            alt="logo"
            width={15}
            height={15}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default LearnerFooter;
