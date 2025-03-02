// components/Crud/InvoiceDeleter.tsx
"use client";

import React, { useState,useEffect } from "react";
import { Invoice } from "@/lib/types";

interface InvoiceDeleterProps {
  invoice: Invoice;
  onClose: () => void;
  onDeleted: (invoiceId: string) => void;
}

export default function InvoiceDeleter({
  invoice,
  onClose,
  onDeleted,
}: InvoiceDeleterProps) {
  const [deleteRequested, setDeleteRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    if (!deleteRequested) return;

    const deleteInvoice = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/auth/invoices/${invoice._id}/delete`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete invoice");
        }
        onDeleted(invoice._id);
        onClose();
      } catch (err: any) {
        setError(err.message || "Delete failed");
      } finally {
        setLoading(false);
        // Reset the trigger
        setDeleteRequested(false);
      }
    };

    deleteInvoice();
  }, [deleteRequested, invoice._id, onDeleted, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Delete Invoice</h2>
        <p className="mb-4">Are you sure you want to delete this invoice?</p>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setDeleteRequested(true)}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
