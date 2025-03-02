// src/app/api/invoices/create/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Get token from cookies
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Access denied. No token provided." },
      { status: 401 }
    );
  }

  try {
    // Get the invoice data from the request body
    const CourseData = await req.json();
    console.log("Received invoice data:", CourseData);

    if (CourseData.amount) {
        CourseData.amount = Number(CourseData.amount);
    }
 
    // Forward the data to the external API for invoice creation
    const externalResponse = await fetch(
      "https://tmp-se-project.azurewebsites.net/api/courses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(CourseData),
      }
    );

    const data = await externalResponse.json();
    if (!externalResponse.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to create invoice", details: data },
        { status: externalResponse.status }
      );
    }
    return NextResponse.json(data, { status: externalResponse.status });
  } catch (error: any) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create invoice" },
      { status: 500 }
    );
  }
}
