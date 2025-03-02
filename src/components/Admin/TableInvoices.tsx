
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InvoiceEditor from "./Crud/InvoiceEditor";
import InvoiceDeleter from "./Crud/InvoiceDeleter";
import { Spinner } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchLearners } from "@/features/learnerSlice";

export interface Invoice {
  _id: string;
  amount: number;
  learnerID: string;
  image: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  date: string;
  status: string;
  user?: {
    name: string;
    email: string;
    image?: string;
  };
}

interface TableInvoicesProps {
  serverInvoices: Invoice[];
  searchTerm: string;
}

export default function TableInvoices({
  serverInvoices,
  searchTerm,
}: TableInvoicesProps) {
  // Local state for invoices and UI management.
  const [invoices, setInvoices] = useState<Invoice[]>(serverInvoices);
  const [loading, setLoading] = useState(!serverInvoices.length);
  const [error, setError] = useState<string | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [deletingInvoice, setDeletingInvoice] = useState<Invoice | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Get learners from Redux (LearnerSlice)
  const learners = useSelector((state: RootState) => state.learner.learners);

  // If learners are not loaded, dispatch fetchLearners.
  useEffect(() => {
    if (learners.length === 0) {
      dispatch(fetchLearners({}));
    }
  }, [dispatch, learners.length]);

  // Fetch invoices if not provided.
  useEffect(() => {
    if (!serverInvoices.length) {
      fetchInvoices();
    }
  }, [serverInvoices.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/invoices");
      const data = await response.json();
      if (data && Array.isArray(data.invoices)) {
        setInvoices(data.invoices);
      } else if (Array.isArray(data)) {
        setInvoices(data);
      } else {
        console.error("Unexpected data format:", data);
        setInvoices([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  // Format invoices with learner info.
  const formattedInvoices = invoices.map((invoice) => {
    // Look for a learner with an _id matching invoice.learnerID.
    const learner = learners.find((l) => l._id === invoice.learnerID);


    return {
      formatted: {
        id: invoice._id,
        name: learner
          ? `${learner.firstname} ${learner.lastname}`
          : invoice.name || "Unknown Learner",
        email: learner ? learner.email : invoice.email || "No email available",
        image: learner
          ? learner.image || "/john.png"
          : invoice.user?.image || "/john.png",
        amount: invoice.amount,
        date: new Date(invoice.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: invoice.status.toLowerCase() as "paid" | "pending",
      },
      original: invoice,
    };
  });

  // Pagination calculations.
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = formattedInvoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(formattedInvoices.length / itemsPerPage);

  const handleUpdated = (updatedInvoice: Invoice) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv._id === updatedInvoice._id ? updatedInvoice : inv))
    );
  };

  const handleDeleted = (invoiceId: string) => {
    setInvoices((prev) => prev.filter((inv) => inv._id !== invoiceId));
  };

  return (
    <div className="p-4">
      {/* Invoice Editor Modal */}
      {editingInvoice && (
        <InvoiceEditor
          invoice={editingInvoice}
          onClose={() => setEditingInvoice(null)}
          onUpdated={handleUpdated}
        />
      )}

      {/* Invoice Deleter Modal */}
      {deletingInvoice && (
        <InvoiceDeleter
          invoice={deletingInvoice}
          onClose={() => setDeletingInvoice(null)}
          onDeleted={handleDeleted}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner size="lg" color="#01589A" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-red-500">Error: {error}</p>
        </div>
      ) : (
        <>
          <div className="w-full max-w-[100vw] overflow-x-auto">
            <Table className="w-full text-black dark:text-white p-2">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Learners</TableHead>
                  <TableHead className="font-bold">Email</TableHead>
                  <TableHead className="font-bold">Amount</TableHead>
                  <TableHead className="font-bold">Date</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className=" divide-y divide-gray-200 text-black dark:text-white">
                {currentItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentItems.map((item, index) => (
                    <TableRow
                      key={item.original._id}
                      className={cn(
                        // "hover:bg-gray-500",
                        index !== currentItems.length - 1 && "pb-4"
                      )}
                    >
                      <TableCell className="font-medium py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={item.formatted.image}
                              alt={item.formatted.name}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/avatar.png";
                              }}
                            />
                          </div>
                          <span>{item.formatted.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.formatted.email}</TableCell>
                      <TableCell>${item.formatted.amount.toFixed(2)}</TableCell>
                      <TableCell>{item.formatted.date}</TableCell>
                      <TableCell>
                        <button
                          type="button"
                          className={`flex items-center justify-center gap-2 w-28 p-2 cursor-pointer rounded ${
                            item.formatted.status === "paid"
                              ? "bg-casbPaid text-white"
                              : "bg-casbGreyPrimary text-black"
                          }`}
                        >
                          {item.formatted.status === "paid" ? (
                            <>
                              Paid
                              <Image
                                width={20}
                                height={20}
                                src="/correct.png"
                                alt="Paid"
                                className="cursor-pointer"
                              />
                            </>
                          ) : (
                            <>
                              Pending
                              <Image
                                width={20}
                                height={20}
                                src="/pending.png"
                                alt="Pending"
                                className="cursor-pointer"
                              />
                            </>
                          )}
                        </button>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2 w-10 h-10 cursor-pointer">
                          <Image
                            src="/edit.png"
                            width={30}
                            height={30}
                            alt="edit"
                            onClick={() => setEditingInvoice(item.original)}
                          />
                          <Image
                            src="/delete.png"
                            width={30}
                            height={30}
                            alt="delete"
                            onClick={() => setDeletingInvoice(item.original)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mt-8 ">
            <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground ">
              <div className="bg-casbGreyPrimary px-3 py-3 rounded-md dark:bg-black">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50"
                >
                  <Image
                    src="/less.png"
                    alt="Previous"
                    width={25}
                    height={25}
                    className="mx-auto"
                  />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-casbGreyPrimary px-3 py-3 rounded-md dark:bg-black">
                  <span className="text-gray-400 text-lg">{currentPage}</span>
                </div>
                <p>{`${currentPage} of ${totalPages}`}</p>
              </div>

              <div className="bg-casbGreyPrimary dark:bg-black px-3 py-3 rounded-md">
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="disabled:opacity-50"
                >
                  <Image
                    src="/greater.png"
                    alt="Next"
                    width={25}
                    height={25}
                    className="mx-auto"
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end md:justify-start gap-2">
              <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-md w-full md:w-auto">
                <p>Results per page</p>
                <p className="flex items-center justify-center gap-2 bg-casbGreyPrimary px-2 py-2 rounded-md dark:bg-black">
                  {itemsPerPage}
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 disabled:opacity-50"
                  >
                    <Image
                      src="/chevron.png"
                      alt="Chevron"
                      width={30}
                      height={30}
                      className="mx-auto"
                    />
                  </button>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
