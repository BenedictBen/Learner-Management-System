// src/app/api/invoices/[learnerId]/update/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { learnerId: string } }) {

     // Await the params promise to get the dynamic parameter.
  const { learnerId } = await params;
  // Read token from cookies (HTTP-only cookies can be read server-side)
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Access denied. No token provided." },
      { status: 401 }
    );
  }

  // Parse the request body
  const body = await req.json();

 

  try {
    // Forward the update request to the external API.
    const externalResponse = await fetch(`https://tmp-se-project.azurewebsites.net/api/learners/${learnerId}`, {
      method: "PUT", // or PATCH depending on your API
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await externalResponse.json();
    return NextResponse.json(data, { status: externalResponse.status });
  } catch (error: any) {
    console.error("Error updating invoice:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update invoice" },
      { status: 500 }
    );
  }
}
