// components/Crud/InvoiceEditor.tsx
"use client";

import React, { useState, useEffect } from "react";
import { FormValues, Invoice } from "@/lib/types"; // Ensure this matches your Invoice type
import { useForm } from "react-hook-form";

function hasErrorProperties(value: unknown): value is { name: string; message: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    typeof (value as any).name === 'string' &&
    'message' in value &&
    typeof (value as any).message === 'string'
  );
}

interface InvoiceEditorProps {
  invoice: Invoice;
  onClose: () => void;
  onUpdated: (updatedInvoice: Invoice) => void;
}

export default function InvoiceEditor({
  invoice,
  onClose,
  onUpdated,
}: InvoiceEditorProps) {
  const [amount, setAmount] = useState(invoice.amount);
  const [status, setStatus] = useState(invoice.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateRequested, setUpdateRequested] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Optimistically update the UI immediately
    const optimisticInvoice = { ...invoice, amount, status };
    onUpdated(optimisticInvoice);
    
    // Then trigger the API call
    setUpdateRequested(true);
  };
 
  useEffect(() => {
    if (!updateRequested) return;

    const updateInvoice = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/auth/invoices/${invoice._id}/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, status }),
        });

        if (!response.ok) {
          throw new Error("Failed to update invoice");
        }

        const updatedInvoice = await response.json();
        // (Optional) Reconcile the optimistic update with the actual server response
        onUpdated(updatedInvoice);
        onClose();
      } catch (err: any) {
        setError(err.message || "Update failed");
        // (Optional) You might choose to re-fetch or rollback the optimistic update here
      } finally {
        setLoading(false);
        setUpdateRequested(false);
      }
    };

    updateInvoice();
  }, [updateRequested, amount, status, invoice._id, onUpdated, onClose]);

    const {
     
      formState: { errors },
      watch,
    } = useForm<FormValues>({});


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white dark:bg-black p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Invoice</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                errors.amount
                  ? "!bg-red-100 border-gray-300"
                  : watch("amount")
                 ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                    : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
              } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300`}
           
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`w-full p-2 pl-10 pr-8 border-b-2 ${
                errors.status
                  ? "!bg-red-100 border-gray-300"
                  : watch("status")
                 ? "!bg-green-100 dark:bg-black dark:text-black border-gray-300"
                    : "border-casbBluePrimary bg-white dark:bg-black dark:text-white"
              } placeholder-gray-400 dark:placeholder-white focus:border-casbBluePrimary  focus:outline-none transition-colors duration-300 appearance-none`}
              required
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-black border-b-2 border-casbBluePrimary rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-casbBluePrimary text-white rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
