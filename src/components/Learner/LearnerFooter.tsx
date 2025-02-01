"use client"
import Image from "next/image";
import React from "react";

const LearnerFooter = () => {
  return (
    <div className="bg-casbBluePrimary w-auto">
      <div className="flex items-center justify-evenly pt-12 mb-4 flex-col md:flex-row">
      <div className="">
  <Image
    src="/logo-white.png"
    alt="logo"
    layout="responsive"
    width={200}
    height={100} // Aspect ratio is maintained
  />
</div>
        <div className="hidden md:block">
        <table className=" table-auto text-left">
          <thead className="">
            <tr className="text-white">
              <th className="p-2">Menu</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Social</th>
            </tr>
          </thead>
          <tbody className="text-white">
            <tr className="">
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



<div className="flex w-full flex-col items-center gap-4 mt-4 text-white md:hidden">
  {/* Menu Section */}
  <div className="flex flex-col items-center text-center">
    <h1 className="text-lg font-bold p-2">Menu</h1>
    <p className="p-1">Home</p>
    <p className="p-1">Courses</p>
  </div>

  {/* Contact Section */}
  <div className="flex flex-col items-center text-center">
    <h1 className="text-lg font-bold p-2">Contact</h1>
    <p className="p-1">+2334100200</p>
    <p className="p-1">New Reiss</p>
  </div>

  {/* Social Section */}
  <div className="flex flex-col items-center text-center">
    <h1 className="text-lg font-bold p-2">Social</h1>
    <p className="p-1 underline">LinkedIn</p>
    <p className="p-1 underline">Facebook</p>
  </div>
</div>


      </div>
      <hr className="text-white w-2/3 mx-auto my-6 border/3"></hr>

      <div className="flex items-center w-2/3 mx-auto justify-between px-4 py-4 text-white flex-col md:flex-row">
        <p className="sm:text-center">
          © copyright 2025 - G-client, All rights reserved
        </p>
        <div 
  className="flex gap-1 cursor-pointer items-center" 
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
