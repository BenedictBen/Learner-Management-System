// // src/app/api/invoices/[invoiceId]/delete/route.ts
// import { NextRequest, NextResponse } from "next/server";


// export async function DELETE(req: NextRequest, { params }: { params: { invoiceId: string } }) {
//     const { invoiceId } = await params;
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json(
//         { success: false, message: "Access denied. No token provided." },
//         { status: 401 }
//       );
//     }
  
//     try {
//       const externalResponse = await fetch(`https://tmp-se-project.azurewebsites.net/api/invoices/${invoiceId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       const data = await externalResponse.json();
//       return NextResponse.json(data, { status: externalResponse.status });
//     } catch (error: any) {
//       console.error("Error deleting invoice:", error);
//       return NextResponse.json(
//         { success: false, message: "Failed to delete invoice" },
//         { status: 500 }
//       );
//     }
//   }
  




import { NextRequest, NextResponse } from "next/server";


export async function DELETE(
  req: NextRequest,
  { params }: { params: { invoiceId: string } }
) {
  const { invoiceId } = params;
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Access denied. No token provided." },
      { status: 401 }
    );
  }

  try {
    const externalResponse = await fetch(
      `https://tmp-se-project.azurewebsites.net/api/invoices/${invoiceId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!externalResponse.ok) {
      throw new Error(`HTTP error! status: ${externalResponse.status}`);
    }

    const data = await externalResponse.json();
    return NextResponse.json(data, { status: externalResponse.status });
  } catch (error: any) {
    console.error("Error deleting invoice:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Failed to delete invoice",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: error.status || 500 }
    );
  }
}