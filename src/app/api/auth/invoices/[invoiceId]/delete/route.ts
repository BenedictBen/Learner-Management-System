// src/app/api/invoices/[invoiceId]/delete/route.ts
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest, { params }: { params: { invoiceId: string } }) {
    const { invoiceId } = await params;
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Access denied. No token provided." },
        { status: 401 }
      );
    }
  
    try {
      const externalResponse = await fetch(`https://tmp-se-project.azurewebsites.net/api/invoices/${invoiceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await externalResponse.json();
      return NextResponse.json(data, { status: externalResponse.status });
    } catch (error: any) {
      console.error("Error deleting invoice:", error);
      return NextResponse.json(
        { success: false, message: "Failed to delete invoice" },
        { status: 500 }
      );
    }
  }
  




