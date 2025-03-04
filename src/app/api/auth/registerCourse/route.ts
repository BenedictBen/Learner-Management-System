// app/api/course/register/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  
  try {
    // 1. Get authentication token from cookies
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    // 2. Get registration data from frontend
    const registrationData = await request.json();

    // 3. Forward to backend API
    const backendResponse = await fetch('https://tmp-se-project.azurewebsites.net/api/learners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(registrationData)
    });

    // 4. Handle backend response
    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        { success: false, error: errorData.message || "Registration failed" },
        { status: backendResponse.status }
      );
    }

    // 5. Return success response
    const responseData = await backendResponse.json();
    return NextResponse.json({
      success: true,
      data: responseData
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}