"use client";

import { Divider, Stack } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import CourseRegisterModal from "./CourseRegisterModal";

const LearnerApplication = () => {
  const [showApplication, setShowApplication] = useState(false);
  return (
    <div>
      {!showApplication ? (

      <div>
        <div className=" flex flex-col mt-4 items-start md:items-center md:justify-center  gap-4 md:flex-row">
          <div className="flex gap-2 md:block">
            <h1 className="text-casbDisabled">Program</h1>
            <p className="font-semi-bold">Data Science</p>
          </div>
          <span className="hidden md:block">
            <Divider orientation="vertical" height="40px" mx={4} />
          </span>
          <div className="flex gap-2 md:block">
            <h1 className="text-casbDisabled">Date registered</h1>
            <p className="font-semi-bold">2024/11/16</p>
          </div>
          <span className="hidden md:block">
            <Divider orientation="vertical" height="40px" mx={4} />
          </span>

          <div className="flex gap-2 md:block">
            <h1 className="text-casbDisabled">Status</h1>
            <p className="font-semi-bold">Registered</p>
          </div>
          <span className="hidden md:block">
            <Divider orientation="vertical" height="40px" mx={4} />
          </span>

          <div className="flex gap-2 md:block">
            <h1 className="text-casbDisabled">Paid</h1>
            <p className="font-semi-bold">$150.00</p>
          </div>
        </div>
        <Divider
          orientation="horizontal"
          height="40px"
          mx={1}
          className="mb-8"
        />
        <div className="mt-4 bg-white">
  <div className="grid grid-cols-3 md:grid-cols-4 gap-4 justify-items-center md:justify-items-start">
    <button className="w-full h-full border border-casbDisabled px-2 py-2 md:px-6 md:py-3 rounded-sm">
      PowerBI
    </button>
    <button className="w-full h-full border border-casbSeaBlueSecondary px-2 py-2 md:px-6 md:py-3 rounded-sm">
      Python
    </button>
    <button className="w-full h-full border border-casbSuccess px-2 py-2 md:px-6 md:py-3 rounded-sm">
      Excel
    </button>
    <button className="w-full h-full border border-casbError px-2 py-2 md:px-6 md:py-3 rounded-sm">
      Tableau
    </button>
  </div>
</div>


        {/* Two buttons */}
        <div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-8">
          <div className="flex items-center justify-center  cursor-pointer text-black py-3 rounded md:w-52 w-80 bg-casbGreyPrimary">
            <button type="submit" className=" ">
              Home
            </button>
            <Image
              src="/chevron.png"
              alt="chevron"
              width={20}
              height={20}
              className="text-white"
            />
          </div>
          <div className="flex items-center justify-center  cursor-pointer text-white py-3 rounded md:w-64 w-80  bg-casbBluePrimary">
            <button type="submit" className=" " onClick={() => setShowApplication(true)}>
              Start new application
            </button>
            <Image
              src="/chevron-right-white.png"
              alt="chevron"
              width={20}
              height={20}
              className="text-white"
            />
          </div>
        </div>
      </div>
      ) : (

          <CourseRegisterModal onClose={() => setShowApplication(false)} />
      )}
    </div>
  );
};

export default LearnerApplication;
