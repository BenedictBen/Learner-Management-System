"use client";
import Image from "next/image";
import { Divider } from "@chakra-ui/react";
import React from "react";

export function LatestInvoices() {
  const latests = [
    {
      id: 1,
      name: "Jane Copper",
      course: "Software Developer",
      image: "/jane.png",
      amount: "420.00",
    },
    {
      id: 2,
      name: "Savannah Nguyen",
      course: "Data Science",
      image: "/savanna.png",
      amount: "420.00",
    },
    {
      id: 3,
      name: "Jerome Bell",
      course: "Data Science",
      image: "/bell.png",
      amount: "420.00",
    },
    {
      id: 4,
      name: "Theresah Webb",
      course: "Cloud Engineer",
      image: "/webb.png",
      amount: "420.00",
    },
    {
      id: 5,
      name: "Ralph Edwards",
      course: "Software Developer",
      image: "/ralph.png",
      amount: "420.00",
    },
  ];
  return (
    <div className="w-full mib-h-full flex flex-col ">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold py-4 ">Latest Invoices</h1>
      </div>
      <div className="flex-1 overflow-hidden">
      <div className="w-full h-full border-8 border-casbGrayHover  rounded-md ">
        {latests.map((latest) => (
          <React.Fragment key={latest.id}>
            <div className="flex items-center justify-between px-3 py-6">
              <div className="flex items-center justify-start gap-3">
                <div>
                  <Image
                    src={latest.image}
                    width={40}
                    height={40}
                    alt="latest.image"
                  />
                </div>
                <div>
                  <h1>{latest.name}</h1>
                  <p>{latest.course}</p>
                </div>
              </div>
              <div>
                <p className="font-bold">${latest.amount}</p>
              </div>
            </div>
            <Divider
              orientation="horizontal"
            //   height="40px"
              mx={4}
              className=""
            />
          </React.Fragment>
        ))}
      </div>

      </div>
    </div>
  );
}
