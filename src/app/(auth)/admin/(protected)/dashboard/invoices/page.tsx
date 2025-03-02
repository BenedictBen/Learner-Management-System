"use client"

import InvoiceForms from "@/components/Admin/InvoiceForms";
import SearchBar  from "@/components/Admin/Search";
import TableInvoices from "@/components/Admin/TableInvoices";
import { Invoice } from "@/lib/types";

import Image from "next/image";
import React, { useRef, useState } from "react";



export default function InvoicesPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const serverInvoices: Invoice[] = [];
  
  return (
<div className="w-full overflow-x-hidden min-h-screen box-border ">
      {showForm ? (
        <InvoiceForms onClose={() => setShowForm(false)} />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex flex-row flex-nowrap items-center justify-between mb-4 gap-2">
            <h1 className="text-base md:text-2xl font-bold whitespace-nowrap">
              Invoices
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex md:hidden text-white text-sm bg-casbBluePrimary items-center gap-1 p-2 md:p-3 rounded-md"
            >
              Create Invoice
              <Image 
                src="/plus.png" 
                width={16} 
                height={16} 
                alt="plus"
                className="w-3 h-3 md:w-4 md:h-4"
              />
            </button>
          </div>

          {/* Search and Desktop Button */}
          <div className="flex flex-col gap-4 md:flex-row items-center justify-center md:justify-start">
            <SearchBar  placeholder="Search Invoices" 
           value={searchTerm}
           onChange={setSearchTerm}
              
              />
            <div className="hidden md:flex text-white bg-casbBluePrimary items-center gap-2 p-2 justify-center md:w-48">
              <button 
                onClick={() => setShowForm(true)}
                className=""
              >
                Create Invoice
              </button>
              <Image src="/plus.png" width={10} height={10} alt="plus" />
            </div>
          </div>

          {/* Invoices Table */}
          <div className="mt-12">
           
          <TableInvoices serverInvoices={serverInvoices} searchTerm={searchTerm}/>
         
          </div>
        </>
      )}
    </div>

  );
};


